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