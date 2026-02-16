// ===== КОНФИГУРАЦИЯ =====
const CONFIG = {
    // Cloudflare Worker Proxy (no token needed here)
    API_BASE: 'https://aviasales-proxy.brainholland64.workers.dev',
    MARKER: '703570', // Partner ID
    CURRENCY: 'rub',
    // API_TOKEN removed - handled by Worker
};

// ===== IATA-коды городов =====
// v1.1 Static List Restored
const CITIES = [
    // Россия
    { name: 'Москва', code: 'MOW' },
    { name: 'Санкт-Петербург', code: 'LED' },
    { name: 'Казань', code: 'KZN' },
    { name: 'Новосибирск', code: 'OVB' },
    { name: 'Екатеринбург', code: 'SVX' },
    { name: 'Сочи', code: 'AER' },
    { name: 'Краснодар', code: 'KRR' },
    { name: 'Ростов-на-Дону', code: 'ROV' },
    { name: 'Самара', code: 'KUF' },
    { name: 'Уфа', code: 'UFA' },
    { name: 'Калининград', code: 'KGD' },
    { name: 'Владивосток', code: 'VVO' },
    { name: 'Хабаровск', code: 'KHV' },
    { name: 'Иркутск', code: 'IKT' },
    { name: 'Красноярск', code: 'KJA' },
    { name: 'Тюмень', code: 'TJM' },
    { name: 'Пермь', code: 'PEE' },
    { name: 'Воронеж', code: 'VOZ' },
    { name: 'Волгоград', code: 'VOG' },
    { name: 'Нижний Новгород', code: 'GOJ' },
    { name: 'Челябинск', code: 'CEK' },
    { name: 'Омск', code: 'OMS' },
    { name: 'Томск', code: 'TOF' },
    { name: 'Барнаул', code: 'BAX' },
    { name: 'Якутск', code: 'YKS' },
    { name: 'Мурманск', code: 'MMK' },
    { name: 'Архангельск', code: 'ARH' },
    { name: 'Махачкала', code: 'MCX' },
    { name: 'Минеральные Воды', code: 'MRV' },
    { name: 'Сургут', code: 'SGC' },
    { name: 'Южно-Сахалинск', code: 'UUS' },
    { name: 'Петропавловск-Камчатский', code: 'PKC' },
    // Турция
    { name: 'Стамбул', code: 'IST' },
    { name: 'Анталья', code: 'AYT' },
    // ОАЭ
    { name: 'Дубай', code: 'DXB' },
    // Юго-Восточная Азия
    { name: 'Бангкок', code: 'BKK' },
    { name: 'Пхукет', code: 'HKT' },
    { name: 'Бали', code: 'DPS' },
    { name: 'Ханой', code: 'HAN' },
    { name: 'Куала-Лумпур', code: 'KUL' },
    { name: 'Сингапур', code: 'SIN' },
    // Китай (добавлено по запросу)
    { name: 'Шанхай', code: 'SHA' },
    { name: 'Пекин', code: 'PEK' },
    { name: 'Гуанчжоу', code: 'CAN' },
    // Кавказ
    { name: 'Тбилиси', code: 'TBS' },
    { name: 'Батуми', code: 'BUS' },
    { name: 'Ереван', code: 'EVN' },
    // СНГ
    { name: 'Минск', code: 'MSQ' },
    { name: 'Ташкент', code: 'TAS' },
    { name: 'Алматы', code: 'ALA' },
    { name: 'Бишкек', code: 'FRU' },
    // Египет
    { name: 'Хургада', code: 'HRG' },
    { name: 'Шарм-эль-Шейх', code: 'SSH' },
    { name: 'Каир', code: 'CAI' },
    // Балканы
    { name: 'Тиват', code: 'TIV' },
    { name: 'Белград', code: 'BEG' },
    // Южная Азия
    { name: 'Мале', code: 'MLE' },
    { name: 'Коломбо', code: 'CMB' },
    { name: 'Гоа', code: 'GOI' },
    { name: 'Дели', code: 'DEL' },
    // Восточная Азия
    { name: 'Сеул', code: 'ICN' },
    { name: 'Токио', code: 'NRT' },
    // Европа
    { name: 'Париж', code: 'CDG' },
    { name: 'Лондон', code: 'LHR' },
    { name: 'Рим', code: 'FCO' },
    { name: 'Барселона', code: 'BCN' },
    { name: 'Прага', code: 'PRG' },
    { name: 'Будапешт', code: 'BUD' },
];

let selectedFrom = null;
let selectedTo = null;
let tripType = 'roundtrip'; // 'roundtrip' или 'oneway'

// ===== ПЕРЕКЛЮЧАТЕЛЬ ТУДА-ОБРАТНО =====
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

// Установить минимальные даты (сегодня)
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

    // Обновлять мин. дату возврата при смене даты вылета
    departInput.addEventListener('change', () => {
        returnInput.min = departInput.value;
        if (returnInput.value < departInput.value) {
            returnInput.value = departInput.value;
        }
    });
}

// Формат даты для Aviasales: DDMM
function formatDateForAviasales(dateStr) {
    if (!dateStr || dateStr.trim() === '') return '';
    const [year, month, day] = dateStr.split('-');
    if (!day || !month) return '';
    return day + month;
}

// ===== Russian Month Formatting =====
const MONTHS_RU = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function formatDateForDisplay(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr; // fallback if invalid
    const day = date.getDate();
    const month = MONTHS_RU[date.getMonth()];
    return `${day} ${month}`;
}

// ===== ПОИСК БИЛЕТОВ (ОБНОВЛЕННЫЙ) =====
function searchFlights() {
    const fromCode = selectedFrom ? selectedFrom.code : '';
    const toCode = selectedTo ? selectedTo.code : '';
    const departDate = document.getElementById('inputDateDepart').value;
    const returnDate = document.getElementById('inputDateReturn').value;

    // Валидация
    if (!fromCode || !toCode) {
        if (!fromCode) document.getElementById('inputFrom').style.boxShadow = '0 0 0 2px #f97316';
        if (!toCode) document.getElementById('inputTo').style.boxShadow = '0 0 0 2px #f97316';
        setTimeout(() => {
            document.getElementById('inputFrom').style.boxShadow = '';
            document.getElementById('inputTo').style.boxShadow = '';
        }, 2000);
        return;
    }

    // Показываем лоадер
    const loader = document.getElementById('searchLoader');
    const loaderText = document.getElementById('loaderText');

    // Динамический текст
    const destName = selectedTo ? selectedTo.name : 'выбранном направлении';
    loaderText.innerText = `Ищем лучшие билеты в ${destName}...`;

    loader.classList.add('active');

    // Имитация поиска (2.5 сек)
    setTimeout(() => {
        // Формируем URL
        const departStr = formatDateForAviasales(departDate);
        let searchPath = `${fromCode}${departStr}${toCode}`;

        if (tripType === 'roundtrip' && returnDate) {
            const returnStr = formatDateForAviasales(returnDate);
            searchPath += returnStr;
        }

        const url = `https://www.aviasales.ru/search/${searchPath}1?marker=${CONFIG.MARKER}`;

        // Переход
        window.open(url, '_blank');

        // Скрываем лоадер через небольшую паузу (чтобы юзер понял, что произошло)
        setTimeout(() => {
            loader.classList.remove('active');
        }, 1000);

    }, 2500);
}

// ===== АВТОКОМПЛИТ ГОРОДОВ =====
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

// Закрыть автокомплит при клике вне
document.addEventListener('click', (e) => {
    // Закрываем, если клик НЕ по списку И НЕ по полям ввода
    if (!e.target.closest('.autocomplete-list') && 
        e.target.id !== 'inputFrom' && 
        e.target.id !== 'inputTo') {
        document.querySelectorAll('.autocomplete-list').forEach(el => el.classList.add('hidden'));
    }
});

// ===== ГОРЯЩИЕ ПРЕДЛОЖЕНИЯ — API =====
// Helpers for dynamic dates
const getFutureDate = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
};

const FALLBACK_DEALS = [
    { origin: 'MOW', origin_name: 'Москва', destination: 'IST', destination_name: 'Стамбул', price: 12500, trip: 'Туда-обратно', depart_date: getFutureDate(30), return_date: getFutureDate(37) },
    { origin: 'LED', origin_name: 'СПб', destination: 'HKT', destination_name: 'Пхукет', price: 45200, trip: 'Туда-обратно, 1 пересадка', depart_date: getFutureDate(45), return_date: getFutureDate(60) },
    { origin: 'MOW', origin_name: 'Москва', destination: 'AER', destination_name: 'Сочи', price: 8900, trip: 'В одну сторону', depart_date: getFutureDate(15) },
    { origin: 'KZN', origin_name: 'Казань', destination: 'DXB', destination_name: 'Дубай', price: 31000, trip: 'Туда-обратно', depart_date: getFutureDate(20), return_date: getFutureDate(27) },
    { origin: 'MOW', origin_name: 'Москва', destination: 'TBS', destination_name: 'Тбилиси', price: 14800, trip: 'Туда-обратно', depart_date: getFutureDate(10), return_date: getFutureDate(17) },
    { origin: 'LED', origin_name: 'СПб', destination: 'AYT', destination_name: 'Анталья', price: 18500, trip: 'Туда-обратно', depart_date: getFutureDate(35), return_date: getFutureDate(42) },
    { origin: 'MOW', origin_name: 'Москва', destination: 'BKK', destination_name: 'Бангкок', price: 35600, trip: 'Туда-обратно, 1 пересадка', depart_date: getFutureDate(50), return_date: getFutureDate(70) },
    { origin: 'SVX', origin_name: 'Екатеринбург', destination: 'TIV', destination_name: 'Тиват', price: 27400, trip: 'Туда-обратно', depart_date: getFutureDate(25), return_date: getFutureDate(32) },
];

// ===== ГОРЯЩИЕ ЦЕНЫ (API) =====
// Маппинг IATA → название города
const CITY_NAMES = {};
CITIES.forEach(c => CITY_NAMES[c.code] = c.name);

async function loadHotDeals() {
    const grid = document.getElementById('dealsGrid');

    // Показать shimmer
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
                trip: d.return_date ? 'Туда-обратно' : 'В одну сторону',
                depart_date: d.depart_date,
                return_date: d.return_date,
            }));
            renderDeals(deals);
        } else {
            console.warn('API returned no data, using fallback');
            renderDeals(FALLBACK_DEALS);
        }
    } catch (err) {
        console.warn('API недоступен, показываем примерные данные:', err);
        renderDeals(FALLBACK_DEALS);
    }
}

function renderDeals(deals) {
    const grid = document.getElementById('dealsGrid');
    grid.innerHTML = deals.map(deal => {
        const departStr = formatDateForAviasales(deal.depart_date);
        const returnStr = formatDateForAviasales(deal.return_date);
        
        // derin link structure: /MOW1506IST22061
        const searchLink = `https://www.aviasales.ru/search/${deal.origin}${departStr}${deal.destination}${returnStr}1?marker=${CONFIG.MARKER}`;

        return `
        <div class="deal-card group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-2xl hover:shadow-brand-100 transition-all duration-500">
            <div class="flex justify-between items-start mb-6">
                <div class="flex flex-col">
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Откуда</span>
                    <span class="text-lg font-bold text-gray-900">${deal.origin_name}</span>
                </div>
                <div class="bg-brand-50 p-2 rounded-2xl group-hover:bg-brand-600 group-hover:rotate-12 transition-all duration-500">
                    <i data-lucide="plane" class="text-brand-600 group-hover:text-white w-5 h-5"></i>
                </div>
            </div>

            <div class="flex flex-col mb-6">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Куда</span>
                <span class="text-2xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors">${deal.destination_name}</span>
            </div>

            <div class="flex items-center gap-6 mb-8 py-4 border-y border-gray-50">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                        <i data-lucide="calendar" class="w-4 h-4 text-orange-500"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[10px] font-bold text-gray-400 uppercase">Туда</span>
                        <span class="text-xs font-bold text-gray-700">${formatDateForDisplay(deal.depart_date)}</span>
                    </div>
                </div>
                ${deal.return_date ? `
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
                        <i data-lucide="calendar-check" class="w-4 h-4 text-brand-500"></i>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[10px] font-bold text-gray-400 uppercase">Обратно</span>
                        <span class="text-xs font-bold text-gray-700">${formatDateForDisplay(deal.return_date)}</span>
                    </div>
                </div>
                ` : ''}
            </div>

            <div class="mt-auto">
                <div class="flex items-baseline gap-1 mb-4">
                    <span class="text-3xl font-black text-orange-500">${deal.price.toLocaleString('ru-RU')}</span>
                    <span class="text-lg font-bold text-orange-500">₽</span>
                </div>
                
                <a href="${searchLink}" 
                   target="_blank" rel="noopener"
                   class="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-brand-600 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-gray-200">
                    <span>Найти билеты</span>
                    <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
                <p class="text-center text-[10px] font-bold text-gray-400 uppercase mt-3 tracking-tighter">${deal.trip}</p>
            </div>
        </div>
        `;
    }).join('');

    lucide.createIcons();
}

// ===== МОБИЛЬНОЕ МЕНЮ =====
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

// ===== АНИМАЦИИ ПРИ СКРОЛЛЕ =====
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// ===== ИНИЦИАЛИЗАЦИЯ =====
lucide.createIcons();
initDates();
loadHotDeals();

console.log('VoyogeStories Engine v1.1.1 — Autocomplete Fix ✈️');
