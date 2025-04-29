const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const input = document.querySelector('.search-box input');

function fetchWeather() {
    const APIKey = 'a6952f825a1142be969162131252604';
    const city = input.value.trim();

    if (city === '') return;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}&aqi=no`)
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                console.log("API Error: ", json.error);
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fade-in');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fade-in');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            image.src = "https:" + json.current.condition.icon;
            temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
            description.innerHTML = `${json.current.condition.text}`;
            humidity.innerHTML = `${json.current.humidity}%`;
            wind.innerHTML = `${parseInt(json.current.wind_kph)}Km/h`;

            weatherBox.classList.remove('fade-in');
            weatherDetails.classList.remove('fade-in');

            void weatherBox.offsetWidth;
            void weatherDetails.offsetWidth;

            weatherBox.classList.add('fade-in');
            weatherDetails.classList.add('fade-in');

            container.style.height = '590px';
        })
        .catch(error => {
            console.log("Error: ", error);
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
        });
}

search.addEventListener('click', fetchWeather);
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});
