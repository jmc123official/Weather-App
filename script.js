const apiKey = '87118f57f05055e985adb2a05170711b'; // Replace with your OpenWeatherMap API key

const submitBtn = document.getElementById('submitBtn');
const cityInput = document.getElementById('cityInput');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');

submitBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

async function fetchWeather(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

function displayWeather(data) {
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather icon">`;
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    weatherDescription.textContent = data.weather[0].description;
}

