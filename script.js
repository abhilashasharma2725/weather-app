document.getElementById('get-weather').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name.');
    }
});

function fetchWeatherData(city) {
    const apiKey = '967d7f00145a59cecaf31f2b2e0a3589';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Show loader
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('weather-info').classList.add('hidden');
    document.getElementById('error-message').classList.add('hidden');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader').classList.add('hidden');

            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                document.getElementById('error-message').classList.remove('hidden');
            }
        })
        .catch(error => {
            document.getElementById('loader').classList.add('hidden');
            document.getElementById('error-message').classList.remove('hidden');
            console.error('Error fetching weather data:', error);
        });
}

function displayWeatherData(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp} °C`;
    document.getElementById('weather-description').textContent = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('feels-like').textContent = `Feels Like: ${data.main.feels_like} °C`;

    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('weather-icon').src = iconUrl;

    // Set sunrise and sunset times
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById('sunrise-sunset').textContent = `Sunrise: ${sunriseTime}, Sunset: ${sunsetTime}`;

    document.getElementById('weather-info').classList.remove('hidden');

    // Change background based on weather condition
    const weatherCondition = data.weather[0].main.toLowerCase();
    if (weatherCondition.includes('sun')) {
        document.body.classList.add('sunny');
    } else if (weatherCondition.includes('rain')) {
        document.body.classList.add('rainy');
    } else if (weatherCondition.includes('cloud')) {
        document.body.classList.add('cloudy');
    }
}
