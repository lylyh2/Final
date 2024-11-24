function displayWeather(response) {
  // Display current temperature
  const temperatureElement = document.querySelector("#current-temperature");
  const temperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = `${temperature} °C`;

  // Display city name
  const cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.name;

  // Display weather description
  const weatherDescriptionElement = document.querySelector("#weather-description");
  weatherDescriptionElement.innerHTML = response.data.weather[0].description;

  // Display wind speed
  const windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)} km/h`;

  // Display humidity
  const humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

  // Display weather icon
  const weatherIconElement = document.querySelector("#weather-icon");
  const iconUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  weatherIconElement.setAttribute("src", iconUrl);
  weatherIconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(event) {
  event.preventDefault();
  const searchInputElement = document.querySelector("#search-input");
  const city = searchInputElement.value.trim();

  if (!city) {
    alert("Please enter a valid city name.");
    return;
  }

  const apiKey = "6509abc2b7c4b101385d8dcd3c430520"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayWeather)
    .catch(() => alert("City not found! Please try again."));
}

function formatDate(date) {
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const formattedDay = days[date.getDay()];

  return `${formattedDay} ${hours}:${minutes}`;
}

// Display current date
const currentDateElement = document.querySelector("#current-date");
currentDateElement.innerHTML = formatDate(new Date());

// Add event listener to search form
const searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
