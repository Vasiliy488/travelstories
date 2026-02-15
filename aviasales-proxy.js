export default {
    async fetch(request, env) {
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Access-Token',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(request.url);
        const apiToken = (env.AVIASALES_TOKEN || '').trim(); // Set securely in Cloudflare

        if (!apiToken) {
            return new Response('Server Error: Missing configuration (AVIASALES_TOKEN)', { status: 500 });
        }

        if (url.pathname === '/v2/prices/latest') {
            const targetUrl = new URL('https://api.travelpayouts.com/v2/prices/latest');
            targetUrl.search = url.search;

            const newRequest = new Request(targetUrl, {
                headers: {
                    'X-Access-Token': apiToken
                }
            });

            const response = await fetch(newRequest);
            const data = await response.text();

            return new Response(data, {
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json'
                }
            });
        }

        return new Response('Not Found', { status: 404 });
    }
};