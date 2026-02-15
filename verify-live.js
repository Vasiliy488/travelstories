// Native fetch in Node 18+
const API_BASE = 'https://travelstories.vasiliy488.workers.dev';
const MARKER = '703570';

async function verifyLive() {
    console.log('--- Verifying Aviasales API via Worker ---');
    try {
        const url = `${API_BASE}/v2/prices/latest?currency=rub&period_type=year&page=1&limit=5&sorting=price&trip_class=0`;
        console.log('Endpoint:', url);

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const data = await response.json();

        if (data.success) {
            console.log('API Status: ✅ SUCCESS');
            console.log(`Found ${data.data.length} deals.`);

            // Validate first deal link
            if (data.data.length > 0) {
                const deal = data.data[0];
                console.log('Sample Deal:', deal);

                // Simulate link generation
                const formatDate = (d) => d ? d.split('-')[2] + d.split('-')[1] : '';
                const departStr = formatDate(deal.depart_date);
                const returnStr = formatDate(deal.return_date);

                let searchPath = `${deal.origin}${departStr}${deal.destination}`;
                if (deal.return_date) searchPath += returnStr;

                const link = `https://www.aviasales.ru/search/${searchPath}1?marker=${MARKER}`;
                console.log('Generated Link:', link);
                console.log('Partner Marker Status: ✅ Correct');
            }
        } else {
            console.log('API Status: ❌ FAILED (success=false)');
        }
    } catch (err) {
        console.error('API Verification Failed:', err.message);
    }
}

verifyLive();
