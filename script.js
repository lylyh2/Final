function displayWeather(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.main.temp);
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = temperature + " °C";

    // Display additional weather information
    let weatherDescriptionElement = document.querySelector("#weather-description");
    weatherDescriptionElement.innerHTML = response.data.weather[0].description; 

    let windSpeedElement = document.querySelector("#wind-speed");
    windSpeedElement.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} km/h`;

    // Display weather icon
    let weatherIconElement = document.querySelector("#weather-icon");
    let iconUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
    weatherIconElement.setAttribute("src", iconUrl); // Set the icon source
    weatherIconElement.setAttribute("alt", response.data.weather[0].description); 
}

function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;

    let apiKey = "6509abc2b7c4b101385d8dcd3c430520"; // Replace with your OpenWeatherMap API key
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}`;

    axios.get(apiUrl).then(displayWeather).catch(error => {
        alert("City not found! Please try again."); // Error handling
    });
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
