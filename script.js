const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("cityInput");
const weatherDisplay = document.getElementById("weatherDisplay");

searchButton.addEventListener("click", async () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    const { name, weather, main, wind } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    weatherDisplay.innerHTML = `
      <h2>${name}</h2>
      <img src="${iconUrl}" alt="${weather[0].description}">
      <p>${weather[0].description.toUpperCase()}</p>
      <p>Temperature: ${main.temp}°C</p>
      <p>Wind Speed: ${wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});
