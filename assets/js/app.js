const searchInput = document.getElementById('txtsearch');
const loader = document.getElementById('loader');
const weatherContent = document.getElementById('weather-content');

async function getWeatherData() {
    const city = searchInput.value || "Colombo";
    showLoader(true);

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d183496ef2c04b47b9270328251308&q=${city}&days=7&aqi=no&alerts=no`);

        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        updateUI(data);

        // Show content with animation
        weatherContent.classList.remove('hidden-load');
        weatherContent.classList.add('animate-fade-in');
    } catch (error) {
        alert("Oops! City not found. Please try again.");
        console.error(error);
    } finally {
        showLoader(false);
    }


}

function updateUI(data) {
    document.getElementById('city-name').innerText = data.location.name;
    document.getElementById('country-name').innerText = data.location.country;
    document.getElementById('current-date').innerText = new Date(data.location.localtime).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById('last-updated').innerText = `Last updated: ${data.current.last_updated}`;

    document.getElementById('main-icon').src = `https:${data.current.condition.icon.replace('64x64', '128x128')}`;
    document.getElementById('condition-text').innerText = data.current.condition.text;

    document.getElementById('temp-c').innerText = `${Math.round(data.current.temp_c)}°C`;
    document.getElementById('temp-f').innerText = `${Math.round(data.current.temp_f)}°F`;
    document.getElementById('feels-like').innerText = `${Math.round(data.current.feelslike_c)}°C`;
    document.getElementById('humidity').innerText = `${data.current.humidity}%`;
    document.getElementById('uv-index').innerText = data.current.uv;

    document.getElementById('wind-speed').innerText = `${data.current.wind_kph} km/h`;
    document.getElementById('pressure').innerText = `${data.current.pressure_mb} mb`;
    document.getElementById('visibility').innerText = `${data.current.vis_km} km`;

    const hourlyContainer = document.getElementById('hourly-container');
    hourlyContainer.innerHTML = '';
            

}