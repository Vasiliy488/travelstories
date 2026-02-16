import { createHash } from 'node:crypto';

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            // 1. Start Search Endpoint
            if (path === '/search/start' && request.method === 'POST') {
                const body = await request.json();
                // Body should contain: origin, destination, date, passengers, trip_class
                // Example: { "origin": "MOW", "destination": "IST", "date": "2024-10-25", "passengers": { "adults": 1, "children": 0, "infants": 0 }, "trip_class": "Y" }

                const token = env.AVIASALES_TOKEN;
                const marker = body.marker || '703570'; // Default marker if not provided
                const host = 'tickets-api.travelpayouts.com';

                // Construct payload for Aviasales API
                const payload = {
                    signature: '', // Will be calculated
                    marker: marker,
                    host: host,
                    user_ip: request.headers.get('CF-Connecting-IP') || '127.0.0.1',
                    locale: 'ru',
                    search_params: {
                        trip_class: body.trip_class || 'Y',
                        passengers: body.passengers || { adults: 1, children: 0, infants: 0 },
                        directions: [
                            {
                                origin: body.origin,
                                destination: body.destination,
                                date: body.date
                            }
                        ]
                    }
                };

                if (body.return_date) {
                    payload.search_params.directions.push({
                        origin: body.destination,
                        destination: body.origin,
                        date: body.return_date
                    });
                }

                // Standard V1 Signature (Fixed Order)
                // token:marker:date:destination:origin:adults:children:infants:trip_class:user_ip
                const sigString = [
                    token,
                    payload.marker,
                    payload.search_params.directions[0].date,
                    payload.search_params.directions[0].destination,
                    payload.search_params.directions[0].origin,
                    payload.search_params.passengers.adults,
                    payload.search_params.passengers.children,
                    payload.search_params.passengers.infants,
                    payload.search_params.trip_class
                ].join(':');

                const signature = createHash('md5').update(sigString).digest('hex');
                payload.signature = signature;

                // Make the request
                const response = await fetch('https://tickets-api.travelpayouts.com/search/affiliate/start', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Real-Host': host,
                        'X-User-IP': payload.user_ip,
                        'X-Signature': signature,
                        'X-Affiliate-User-Id': marker, // Partner ID
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();
                return new Response(JSON.stringify(data), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });

            }

            // 2. Poll Results Endpoint
            if (path === '/search/results' && request.method === 'GET') {
                const searchId = url.searchParams.get('search_id');
                if (!searchId) return new Response('Missing search_id', { status: 400 });

                const resultsUrl = `https://tickets-api.travelpayouts.com/search/affiliate/results?search_id=${searchId}`;

                const response = await fetch(resultsUrl);
                const data = await response.json();

                return new Response(JSON.stringify(data), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }

            // 3. Keep Existing "Latest Prices" Endpoint (Legacy)
            if (path === '/v2/prices/latest') {
                const query = url.search;
                const apiUrl = `https://api.travelpayouts.com/v2/prices/latest${query}`;

                const newHeaders = new Headers(request.headers);
                newHeaders.set('X-Access-Token', env.AVIASALES_TOKEN);
                // Prevent compression issues by asking for plain text (or letting fetch handle it implicitly by not forwarding client's preference)
                newHeaders.delete('Accept-Encoding');

                const response = await fetch(apiUrl, {
                    method: request.method,
                    headers: newHeaders
                });

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    try {
                        const data = await response.json();
                        return new Response(JSON.stringify(data), {
                            headers: { 'Content-Type': 'application/json', ...corsHeaders }
                        });
                    } catch (e) {
                        // If JSON parse fails, return text for debugging
                        const text = await response.text();
                        return new Response(`Invalid JSON from Aviasales: ${text.substring(0, 500)}`, { status: 502, headers: corsHeaders });
                    }
                } else {
                    // Non-JSON response
                    const text = await response.text();
                    return new Response(text, { status: response.status, headers: { ...corsHeaders, 'Content-Type': contentType || 'text/plain' } });
                }
            }

            return new Response('Not Found', { status: 404, headers: corsHeaders });

        } catch (err) {
            return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
        }
    }
};
