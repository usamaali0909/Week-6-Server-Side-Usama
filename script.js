const apiKey = "7fb2419b6590358813596992c464d300"; 
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const searchHistory = document.getElementById('search-history');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim();

    if (cityName !== '') {
        fetchWeather(cityName);
    }
});

function updateSearchHistory(city) {
    const listItem = document.createElement('li');
    listItem.textContent = city;
    searchHistory.appendChild(listItem);

    listItem.addEventListener('click', () => {
        cityInput.value = city;
        searchButton.click();
    });
}

function updateCurrentWeather(data) {
    currentWeather.innerHTML = `
        <h2>Current Weather in ${data.city}</h2>
        <p>Date: ${data.date}</p>
        <p>Weather Conditions: ${data.weather}</p>
        <p>Temperature: ${data.temperature}°C</p>
        <p>Humidity: ${data.humidity}%</p>
        <p>Wind Speed: ${data.windSpeed} m/s</p>
    `;
}

function updateForecast(forecastData) {
    forecast.innerHTML = `
        <h2>5-Day Forecast</h2>
        <ul>
            ${forecastData.map(day => `
                <li>
                    <p>Date: ${day.date}</p>
                    <p>Weather Conditions: ${day.weather}</p>
                    <p>Temperature: ${day.temperature}°C</p>
                    <p>Humidity: ${day.humidity}%</p>
                    <p>Wind Speed: ${day.windSpeed} m/s</p>
                </li>
            `).join('')}
        </ul>
    `;
}

function fetchWeather(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            updateSearchHistory(cityName);
            const currentWeatherData = {
                city: cityName,
                date: '2023-10-30',
                weather: 'Cloudy',
                temperature: 22,
                humidity: 62,
                windSpeed: 5.5,
            };
            updateCurrentWeather(currentWeatherData);
            const forecastData = [
                {
                    date: '2023-10-31',
                    weather: 'Partly Cloudy',
                    temperature: 23,
                    humidity: 58,
                    windSpeed: 5.2,
                },
            ];
            updateForecast(forecastData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}
