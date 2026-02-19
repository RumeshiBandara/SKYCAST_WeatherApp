const searchInput = document.getElementById('txtsearch');
const loader = document.getElementById('loader');
const weatherContent = document.getElementById('weather-content');

 async function getWeatherData() {
     const city = searchInput.value || "Colombo";
     showLoader(true);


 }