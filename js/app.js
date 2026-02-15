        // ===== РљРћРќР¤Р˜Р“РЈР РђР¦Р˜РЇ =====
        const CONFIG = {
            // Cloudflare Worker Proxy (no token needed here)
            API_BASE: 'https://aviasales-proxy.brainholland64.workers.dev',
            MARKER: '703570', // Partner ID
            CURRENCY: 'rub',
            // API_TOKEN removed - handled by Worker
        };

        // ===== IATA-РєРѕРґС‹ РіРѕСЂРѕРґРѕРІ =====
        // v1.1 Static List Restored
        const CITIES = [
            // Р РѕСЃСЃРёСЏ
            { name: 'РњРѕСЃРєРІР°', code: 'MOW' },
            { name: 'РЎР°РЅРєС‚-РџРµС‚РµСЂР±СѓСЂРі', code: 'LED' },
            { name: 'РљР°Р·Р°РЅСЊ', code: 'KZN' },
            { name: 'РќРѕРІРѕСЃРёР±РёСЂСЃРє', code: 'OVB' },
            { name: 'Р•РєР°С‚РµСЂРёРЅР±СѓСЂРі', code: 'SVX' },
            { name: 'РЎРѕС‡Рё', code: 'AER' },
            { name: 'РљСЂР°СЃРЅРѕРґР°СЂ', code: 'KRR' },
            { name: 'Р РѕСЃС‚РѕРІ-РЅР°-Р”РѕРЅСѓ', code: 'ROV' },
            { name: 'РЎР°РјР°СЂР°', code: 'KUF' },
            { name: 'РЈС„Р°', code: 'UFA' },
            { name: 'РљР°Р»РёРЅРёРЅРіСЂР°Рґ', code: 'KGD' },
            { name: 'Р’Р»Р°РґРёРІРѕСЃС‚РѕРє', code: 'VVO' },
            { name: 'РҐР°Р±Р°СЂРѕРІСЃРє', code: 'KHV' },
            { name: 'Р˜СЂРєСѓС‚СЃРє', code: 'IKT' },
            { name: 'РљСЂР°СЃРЅРѕСЏСЂСЃРє', code: 'KJA' },
            { name: 'РўСЋРјРµРЅСЊ', code: 'TJM' },
            { name: 'РџРµСЂРјСЊ', code: 'PEE' },
            { name: 'Р’РѕСЂРѕРЅРµР¶', code: 'VOZ' },
            { name: 'Р’РѕР»РіРѕРіСЂР°Рґ', code: 'VOG' },
            { name: 'РќРёР¶РЅРёР№ РќРѕРІРіРѕСЂРѕРґ', code: 'GOJ' },
            { name: 'Р§РµР»СЏР±РёРЅСЃРє', code: 'CEK' },
            { name: 'РћРјСЃРє', code: 'OMS' },
            { name: 'РўРѕРјСЃРє', code: 'TOF' },
            { name: 'Р‘Р°СЂРЅР°СѓР»', code: 'BAX' },
            { name: 'РЇРєСѓС‚СЃРє', code: 'YKS' },
            { name: 'РњСѓСЂРјР°РЅСЃРє', code: 'MMK' },
            { name: 'РђСЂС…Р°РЅРіРµР»СЊСЃРє', code: 'ARH' },
            { name: 'РњР°С…Р°С‡РєР°Р»Р°', code: 'MCX' },
            { name: 'РњРёРЅРµСЂР°Р»СЊРЅС‹Рµ Р’РѕРґС‹', code: 'MRV' },
            { name: 'РЎСѓСЂРіСѓС‚', code: 'SGC' },
            { name: 'Р®Р¶РЅРѕ-РЎР°С…Р°Р»РёРЅСЃРє', code: 'UUS' },
            { name: 'РџРµС‚СЂРѕРїР°РІР»РѕРІСЃРє-РљР°РјС‡Р°С‚СЃРєРёР№', code: 'PKC' },
            // РўСѓСЂС†РёСЏ
            { name: 'РЎС‚Р°РјР±СѓР»', code: 'IST' },
            { name: 'РђРЅС‚Р°Р»СЊСЏ', code: 'AYT' },
            // РћРђР­
            { name: 'Р”СѓР±Р°Р№', code: 'DXB' },
            // Р®РіРѕ-Р’РѕСЃС‚РѕС‡РЅР°СЏ РђР·РёСЏ
            { name: 'Р‘Р°РЅРіРєРѕРє', code: 'BKK' },
            { name: 'РџС…СѓРєРµС‚', code: 'HKT' },
            { name: 'Р‘Р°Р»Рё', code: 'DPS' },
            { name: 'РҐР°РЅРѕР№', code: 'HAN' },
            { name: 'РљСѓР°Р»Р°-Р›СѓРјРїСѓСЂ', code: 'KUL' },
            { name: 'РЎРёРЅРіР°РїСѓСЂ', code: 'SIN' },
            // РљРёС‚Р°Р№ (РґРѕР±Р°РІР»РµРЅРѕ РїРѕ Р·Р°РїСЂРѕСЃСѓ)
            { name: 'РЁР°РЅС…Р°Р№', code: 'SHA' },
            { name: 'РџРµРєРёРЅ', code: 'PEK' },
            { name: 'Р“СѓР°РЅС‡Р¶РѕСѓ', code: 'CAN' },
            // РљР°РІРєР°Р·
            { name: 'РўР±РёР»РёСЃРё', code: 'TBS' },
            { name: 'Р‘Р°С‚СѓРјРё', code: 'BUS' },
            { name: 'Р•СЂРµРІР°РЅ', code: 'EVN' },
            // РЎРќР“
            { name: 'РњРёРЅСЃРє', code: 'MSQ' },
            { name: 'РўР°С€РєРµРЅС‚', code: 'TAS' },
            { name: 'РђР»РјР°С‚С‹', code: 'ALA' },
            { name: 'Р‘РёС€РєРµРє', code: 'FRU' },
            // Р•РіРёРїРµС‚
            { name: 'РҐСѓСЂРіР°РґР°', code: 'HRG' },
            { name: 'РЁР°СЂРј-СЌР»СЊ-РЁРµР№С…', code: 'SSH' },
            { name: 'РљР°РёСЂ', code: 'CAI' },
            // Р‘Р°Р»РєР°РЅС‹
            { name: 'РўРёРІР°С‚', code: 'TIV' },
            { name: 'Р‘РµР»РіСЂР°Рґ', code: 'BEG' },
            // Р®Р¶РЅР°СЏ РђР·РёСЏ
            { name: 'РњР°Р»Рµ', code: 'MLE' },
            { name: 'РљРѕР»РѕРјР±Рѕ', code: 'CMB' },
            { name: 'Р“РѕР°', code: 'GOI' },
            { name: 'Р”РµР»Рё', code: 'DEL' },
            // Р’РѕСЃС‚РѕС‡РЅР°СЏ РђР·РёСЏ
            { name: 'РЎРµСѓР»', code: 'ICN' },
            { name: 'РўРѕРєРёРѕ', code: 'NRT' },
            // Р•РІСЂРѕРїР°
            { name: 'РџР°СЂРёР¶', code: 'CDG' },
            { name: 'Р›РѕРЅРґРѕРЅ', code: 'LHR' },
            { name: 'Р РёРј', code: 'FCO' },
            { name: 'Р‘Р°СЂСЃРµР»РѕРЅР°', code: 'BCN' },
            { name: 'РџСЂР°РіР°', code: 'PRG' },
            { name: 'Р‘СѓРґР°РїРµС€С‚', code: 'BUD' },
        ];

        let selectedFrom = null;
        let selectedTo = null;
        let tripType = 'roundtrip'; // 'roundtrip' РёР»Рё 'oneway'

        // ===== РџР•Р Р•РљР›Р®Р§РђРўР•Р›Р¬ РўРЈР”Р”Рђ-РћР‘Р РђРўРќРћ =====
        function toggleTripType(type) {
            tripType = type;
            const btnRound = document.getElementById('btnRoundTrip');
            const btnOne = document.getElementById('btnOneWay');
            const returnField = document.getElementById('returnDateField');

            if (type === 'roundtrip') {
                btnRound.classList.add('active');
                btnOne.classList.remove('active');
                returnField.classList.remove('hidden-date');
            } else {
                btnOne.classList.add('active');
                btnRound.classList.remove('active');
                returnField.classList.add('hidden-date');
            }
        }

        // РЈСЃС‚Р°РЅРѕРІРёС‚СЊ РјРёРЅРёРјР°Р»СЊРЅС‹Рµ РґР°С‚С‹ (СЃРµРіРѕРґРЅСЏ)
        function initDates() {
            const today = new Date();
            const todayStr = today.toISOString().split('T')[0];
            const weekLater = new Date(today);
            weekLater.setDate(weekLater.getDate() + 7);
            const weekStr = weekLater.toISOString().split('T')[0];

            const departInput = document.getElementById('inputDateDepart');
            const returnInput = document.getElementById('inputDateReturn');

            departInput.min = todayStr;
            departInput.value = todayStr;
            returnInput.min = todayStr;
            returnInput.value = weekStr;

            // РћР±РЅРѕРІР»СЏС‚СЊ РјРёРЅ. РґР°С‚Сѓ РІРѕР·РІСЂР°С‚Р° РїСЂРё СЃРјРµРЅРµ РґР°С‚С‹ РІС‹Р»РµС‚Р°
            departInput.addEventListener('change', () => {
                returnInput.min = departInput.value;
                if (returnInput.value < departInput.value) {
                    returnInput.value = departInput.value;
                }
            });
        }

        // Р¤РѕСЂРјР°С‚ РґР°С‚С‹ РґР»СЏ Aviasales: DDMM
        function formatDateForAviasales(dateStr) {
            if (!dateStr || dateStr.trim() === '') return '';
            const [year, month, day] = dateStr.split('-');
            if (!day || !month) return '';
            return day + month;
        }

        // ===== РџРћР˜РЎРљ Р‘Р˜Р›Р•РўРћР’ (РћР‘РќРћР’Р›Р•РќРќР«Р™) =====
        function searchFlights() {
            const fromCode = selectedFrom ? selectedFrom.code : '';
            const toCode = selectedTo ? selectedTo.code : '';
            const departDate = document.getElementById('inputDateDepart').value;
            const returnDate = document.getElementById('inputDateReturn').value;

            // Р’Р°Р»РёРґР°С†РёСЏ
            if (!fromCode || !toCode) {
                if (!fromCode) document.getElementById('inputFrom').style.boxShadow = '0 0 0 2px #f97316';
                if (!toCode) document.getElementById('inputTo').style.boxShadow = '0 0 0 2px #f97316';
                setTimeout(() => {
                    document.getElementById('inputFrom').style.boxShadow = '';
                    document.getElementById('inputTo').style.boxShadow = '';
                }, 2000);
                return;
            }

            // РџРѕРєР°Р·С‹РІР°РµРј Р»РѕР°РґРµСЂ
            const loader = document.getElementById('searchLoader');
            const loaderText = document.getElementById('loaderText');

            // Р”РёРЅР°РјРёС‡РµСЃРєРёР№ С‚РµРєСЃС‚
            const destName = selectedTo ? selectedTo.name : 'РІС‹Р±СЂР°РЅРЅРѕРј РЅР°РїСЂР°РІР»РµРЅРёРё';
            loaderText.innerText = `Р˜С‰РµРј Р»СѓС‡С€РёРµ Р±РёР»РµС‚С‹ РІ ${destName}...`;

            loader.classList.add('active');

            // Р˜РјРёС‚Р°С†РёСЏ РїРѕРёСЃРєР° (2.5 СЃРµРє)
            setTimeout(() => {
                // Р¤РѕСЂРјРёСЂСѓРµРј URL
                const departStr = formatDateForAviasales(departDate);
                let searchPath = `${fromCode}${departStr}${toCode}`;

                if (tripType === 'roundtrip' && returnDate) {
                    const returnStr = formatDateForAviasales(returnDate);
                    searchPath += returnStr;
                }

                const url = `https://www.aviasales.ru/search/${searchPath}1?marker=${CONFIG.MARKER}`;

                // РџРµСЂРµС…РѕРґ
                window.open(url, '_blank');

                // РЎРєСЂС‹РІР°РµРј Р»РѕР°РґРµСЂ С‡РµСЂРµР· РЅРµР±РѕР»СЊС€СѓСЋ РїР°СѓР·Сѓ (С‡С‚РѕР±С‹ СЋР·РµСЂ РїРѕРЅСЏР», С‡С‚Рѕ РїСЂРѕРёР·РѕС€Р»Рѕ)
                setTimeout(() => {
                    loader.classList.remove('active');
                }, 1000);

            }, 2500);
        }

        // ===== РђР’РўРћРљРћРњРџР›Р˜Рў Р“РћР РћР”РћР”РћР’ =====
        function showAutocomplete(type) {
            const listId = type === 'from' ? 'autocompleteFrom' : 'autocompleteTo';
            const inputId = type === 'from' ? 'inputFrom' : 'inputTo';
            const list = document.getElementById(listId);
            const query = document.getElementById(inputId).value.toLowerCase();

            const filtered = query
                ? CITIES.filter(c => c.name.toLowerCase().includes(query))
                : CITIES.slice(0, 10);

            renderAutocomplete(list, filtered, type);
            list.classList.remove('hidden');
        }

        function filterCities(type) {
            showAutocomplete(type);
        }

        function renderAutocomplete(list, cities, type) {
            list.innerHTML = cities.map(city => `
                <div class="px-4 py-2.5 cursor-pointer text-left text-sm text-gray-700 font-medium flex justify-between items-center transition"
                     onclick="selectCity('${type}', '${city.name}', '${city.code}')">
                    <span>${city.name}</span>
                    <span class="text-xs text-gray-400 font-mono">${city.code}</span>
                </div>
            `).join('');
        }

        function selectCity(type, name, code) {
            if (type === 'from') {
                selectedFrom = { name, code };
                document.getElementById('inputFrom').value = name;
                document.getElementById('autocompleteFrom').classList.add('hidden');
            } else {
                selectedTo = { name, code };
                document.getElementById('inputTo').value = name;
                document.getElementById('autocompleteTo').classList.add('hidden');
            }
        }

        // Р—Р°РєСЂС‹С‚СЊ Р°РІС‚РѕРєРѕРјРїР»РёС‚ РїСЂРё РєР»РёРєРµ РІРЅРµ
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.group')) {
                document.querySelectorAll('.autocomplete-list').forEach(el => el.classList.add('hidden'));
            }
        });

        // ===== Р“РћР РЇР©Р˜Р• РџР Р•Р”Р›РћР–Р•РќР˜РЇ вЂ” API =====
        const FALLBACK_DEALS = [
            { origin: 'MOW', origin_name: 'РњРѕСЃРєРІР°', destination: 'IST', destination_name: 'РЎС‚Р°РјР±СѓР»', price: 12500, trip: 'РўСѓР”Р°-РѕР±СЂР°С‚РЅРѕ' },
            { origin: 'LED', origin_name: 'РЎРџР±', destination: 'HKT', destination_name: 'РџС…СѓРєРµС‚', price: 45200, trip: 'РўСѓР”Р°-РѕР±СЂР°С‚РЅРѕ, 1 РїРµСЂРµСЃР°РґРєР°' },
            { origin: 'MOW', origin_name: 'РњРѕСЃРєРІР°', destination: 'AER', destination_name: 'РЎРѕС‡Рё', price: 8900, trip: 'Р’ РѕРґРЅСѓ СЃС‚РѕСЂРѕРЅСѓ' },
            { origin: 'KZN', origin_name: 'РљР°Р·Р°РЅСЊ', destination: 'DXB', destination_name: 'Р”СѓР±Р°Р№', price: 31000, trip: 'РўСѓР”Р°-РѕР±СЂР°С‚РЅРѕ' },
            { origin: 'MOW', origin_name: 'РњРѕСЃРєРІР°', destination: 'TBS', destination_name: 'РўР±РёР»РёСЃРё', price: 14800, trip: 'РўСѓР”Р°-РѕР±СЂР°С‚РЅРѕ' },
            { origin: 'LED', origin_name: 'РЎРџР±', destination: 'AYT', destination_name: 'РђРЅС‚Р°Р»СЊСЏ', price: 18500, trip: 'РўСѓР”Р°-РѕР±СЂР°С‚РЅРѕ' },
            { origin: 'MOW', origin_name: 'РњРѕСЃРєРІР°', destination: 'BKK', destination_name: 'Р‘Р°РЅРіРєРѕРє', price: 35600, trip: 'РўСѓР”Р°-РѕР±СЂР°С‚РЅРѕ, 1 РїРµСЂРµСЃР°РґРєР°' },
            { origin: 'SVX', origin_name: 'Р•РєР°С‚РµСЂРёРЅР±СѓСЂРі', destination: 'TIV', destination_name: 'РўРёРІР°С‚', price: 27400, trip: 'РўСѓР”Р°-РѕР±СЂР°С‚РЅРѕ' },
        ];

        // ===== Р“РћР РЇР©Р˜Р• Р¦Р•РќР« (API) =====
        // РњР°РїРїРёРЅРі IATA в†’ РЅР°Р·РІР°РЅРёРµ РіРѕСЂРѕРґР°
        const CITY_NAMES = {};
        CITIES.forEach(c => CITY_NAMES[c.code] = c.name);

        async function loadHotDeals() {
            const grid = document.getElementById('dealsGrid');

            // РџРѕРєР°Р·Р°С‚СЊ shimmer
            grid.innerHTML = Array(8).fill('<div class="shimmer rounded-2xl h-48"></div>').join('');

            try {
                const response = await fetch(
                    `${CONFIG.API_BASE}/v2/prices/latest?currency=${CONFIG.CURRENCY}&period_type=year&page=1&limit=8&sorting=price&trip_class=0`
                );

                if (!response.ok) throw new Error('API Error');

                const data = await response.json();

                if (data.success && data.data && data.data.length > 0) {
                    const deals = data.data.map(d => ({
                        origin: d.origin,
                        origin_name: CITY_NAMES[d.origin] || d.origin,
                        destination: d.destination,
                        destination_name: CITY_NAMES[d.destination] || d.destination,
                        price: d.value,
                        trip: d.return_date ? 'РўСѓР”Р°-РѕР±СЂР°С‚РЅРѕ' : 'Р’ РѕРґРЅСѓ СЃС‚РѕСЂРѕРЅСѓ',
                        depart_date: d.depart_date,
                        return_date: d.return_date,
                    }));
                    renderDeals(deals);
                } else {
                    renderDeals(FALLBACK_DEALS);
                }
            } catch (err) {
                console.warn('API РЅРµРґРѕСЃС‚СѓРїРµРЅ, РїРѕРєР°Р·С‹РІР°РµРј РїСЂРёРјРµСЂРЅС‹Рµ РґР°РЅРЅС‹Рµ:', err);
                renderDeals(FALLBACK_DEALS);
            }
        }

        function renderDeals(deals) {
            const grid = document.getElementById('dealsGrid');
            grid.innerHTML = deals.map(deal => {
                const departStr = formatDateForAviasales(deal.depart_date);
                const returnStr = formatDateForAviasales(deal.return_date);
                const searchLink = `https://www.aviasales.ru/search/${deal.origin}${departStr}${deal.destination}${returnStr}1?marker=${CONFIG.MARKER}`;
                console.log('Generated Link:', {
                    origin: deal.origin,
                    dest: deal.destination,
                    depart: departStr,
                    return: returnStr,
                    link: searchLink
                });

                return `
                <div class="deal-card bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col">
                    <div class="flex justify-between items-start mb-4">
                        <div class="bg-brand-50 p-2.5 rounded-xl">
                            <i data-lucide="plane" class="text-brand-600 w-5 h-5"></i>
                        </div>
                        <span class="text-green-600 font-bold text-lg">РѕС‚ ${deal.price.toLocaleString('ru-RU')} в‚Ѕ</span>
                    </div>
                    <h3 class="font-bold font-heading text-gray-900 mb-1">${deal.origin_name} в†’ ${deal.destination_name}</h3>
                    <p class="text-xs text-gray-500 mb-4 flex-1">${deal.trip}</p>
                    <a href="${searchLink}" 
                       target="_blank" rel="noopener"
                       class="block w-full py-2.5 bg-gray-50 text-brand-600 rounded-xl text-sm font-bold hover:bg-brand-600 hover:text-white transition-all text-center">
                        РЎРјРѕС‚СЂРµС‚СЊ Р±РёР»РµС‚С‹ в†’
                    </a>
                </div>
            `;
            }).join('');

            // РџРµСЂРµРёРЅРёС†РёР°Р»РёР·РёСЂРѕРІР°С‚СЊ Lucide РёРєРѕРЅРєРё
            lucide.createIcons();
        }

        // ===== РњРћР‘Р˜Р›Р¬РќРћР• РњР•РќР® =====
        function openMobileMenu() {
            document.getElementById('mobileMenu').classList.add('open');
            document.getElementById('mobileOverlay').classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeMobileMenu() {
            document.getElementById('mobileMenu').classList.remove('open');
            document.getElementById('mobileOverlay').classList.remove('open');
            document.body.style.overflow = '';
        }

        // ===== РђРќР˜РњРђР¦Р˜Р˜ РџР Р˜ РЎРљР РћР›Р›Р• =====
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

        // ===== Р˜РќР˜Р¦Р˜РђР›Р˜Р—РђР¦Р˜РЇ =====
        lucide.createIcons();
        initDates();
        loadHotDeals();

        console.log('VoyogeStories Engine v1.0 вЂ” Initialized вњ€пёЏ');
