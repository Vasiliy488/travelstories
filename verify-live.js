async function testWorker() {
    const workerUrl = 'https://aviasales-proxy.brainholland64.workers.dev/v2/prices/latest?currency=rub&period_type=year&page=1&limit=30&show_to_affiliates=true&sorting=price&trip_class=0';
    
    console.log(`Testing worker: ${workerUrl}`);
    
    try {
        const response = await fetch(workerUrl);
        
        console.log(`Status: ${response.status} ${response.statusText}`);
        
        if (!response.ok) {
            const text = await response.text();
            console.error('Error body:', text);
            return;
        }

        const data = await response.json();
        console.log('Success! Data received:');
        console.log(JSON.stringify(data, null, 2).slice(0, 500) + '...'); 
        
        if (data.data && data.data.length > 0) {
            console.log(`Values found: ${data.data.length}`);
        } else {
            console.warn('Data array is empty or missing.');
        }

    } catch (err) {
        console.error('Fetch error:', err);
    }
}

testWorker();
