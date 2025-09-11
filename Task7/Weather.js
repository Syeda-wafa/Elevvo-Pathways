// API key and elements
const apiKey = "9374706cdc2cd0035c8d265da4b8e1c6";
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const weatherDashboard = document.getElementById('weather-dashboard');

// Try to get user's location when page loads
document.addEventListener('DOMContentLoaded', () => {
  if (navigator.geolocation) {
    // Show that we're trying to get location
    weatherDashboard.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>Getting your location...</p>
      </div>
    `;
    
    // Get location with a timeout to prevent long loading
    const geoTimeout = setTimeout(() => {
      showWelcomeScreen();
    }, 3000); // Only wait 3 seconds for location
    
    navigator.geolocation.getCurrentPosition(
      position => {
        clearTimeout(geoTimeout);
        const { latitude, longitude } = position.coords;
        getWeatherByCoords(latitude, longitude);
      },
      error => {
        clearTimeout(geoTimeout);
        showWelcomeScreen();
      },
      { timeout: 2500, enableHighAccuracy: false }
    );
  } else {
    showWelcomeScreen();
  }
});

function showWelcomeScreen() {
  weatherDashboard.innerHTML = `
    <div class="welcome-message">
      <i class="fas fa-cloud-sun"></i>
      <h2>Welcome to Weather Dashboard</h2>
      <p>Search for a city or use your current location to get started</p>
    </div>
    
    <div class="location-permission">
      <p><i class="fas fa-info-circle"></i> Allow location access to see weather for your current location</p>
    </div>
  `;
}

// Search functionality
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherByCity(city);
    cityInput.value = '';
  }
});

// Enter key functionality
cityInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') searchBtn.click();
});

// Current location functionality
locationBtn.addEventListener('click', () => {
  if (navigator.geolocation) {
    showLoading("Getting your location...");
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        getWeatherByCoords(latitude, longitude);
      },
      error => {
        showError(`Location error: ${error.message}`);
      },
      { timeout: 5000, enableHighAccuracy: false }
    );
  } else {
    showError("Geolocation is not supported by your browser");
  }
});

// Fetch weather by city name
async function getWeatherByCity(city) {
  showLoading(`Loading weather for ${city}...`);
  
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    
    if (!response.ok) throw new Error("City not found");
    
    const currentData = await response.json();
    
    // Get forecast data
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const forecastData = await forecastResponse.json();
    
    displayWeather(currentData, forecastData, false);
  } catch (error) {
    showError(error.message);
  }
}

// Fetch weather by coordinates
async function getWeatherByCoords(lat, lon) {
  showLoading("Getting weather for your location...");
  
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    ]);
    
    if (!currentResponse.ok) throw new Error("Location not found");
    
    const currentData = await currentResponse.json();
    const forecastData = await forecastResponse.json();
    
    displayWeather(currentData, forecastData, true);
  } catch (error) {
    showError(error.message);
  }
}

// Display detailed weather for a single city
function displayWeather(current, forecastData, isCurrentLocation) {
  // Get 3-day forecast (selecting noon forecast for each day)
  const forecasts = [];
  const processedDays = new Set();
  
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.toDateString();
    
    // Only take one forecast per day (around noon)
    if (date.getHours() >= 11 && date.getHours() <= 13 && !processedDays.has(day) && forecasts.length < 3) {
      forecasts.push(item);
      processedDays.add(day);
    }
  });
  
  weatherDashboard.innerHTML = `
    <div class="weather-card">
      <h2 class="city-name">${current.name}, ${current.sys.country}
        ${isCurrentLocation ? '<span class="location-badge"><i class="fas fa-location-arrow"></i> Your Location</span>' : ''}
      </h2>
      <div class="temperature">${Math.round(current.main.temp)}°C</div>
      <img class="weather-icon" src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" alt="${current.weather[0].description}">
      <div class="weather-desc">${current.weather[0].description}</div>
      <div class="details">
        <div class="detail-item">
          <i class="fas fa-tint"></i>
          <div class="detail-value">${current.main.humidity}%</div>
          <div>Humidity</div>
        </div>
        <div class="detail-item">
          <i class="fas fa-wind"></i>
          <div class="detail-value">${current.wind.speed} m/s</div>
          <div>Wind Speed</div>
        </div>
        <div class="detail-item">
          <i class="fas fa-temperature-high"></i>
          <div class="detail-value">${Math.round(current.main.feels_like)}°C</div>
          <div>Feels Like</div>
        </div>
      </div>
    </div>
    
    <h3 class="forecast-title">3-Day Forecast</h3>
    <div class="forecast-container">
      ${forecasts.map(day => {
        const date = new Date(day.dt * 1000);
        return `
          <div class="forecast-day">
            <div class="forecast-date">${date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
            <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
            <div class="weather-desc">${day.weather[0].description}</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// Show loading state
function showLoading(message = "Loading...") {
  weatherDashboard.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>${message}</p>
    </div>
  `;
}

// Show error message
function showError(message) {
  weatherDashboard.innerHTML = `
    <div class="error-message">
      <i class="fas fa-exclamation-triangle"></i>
      <p>${message}</p>
      <button onclick="showWelcomeScreen()" style="background: #3498db; margin-top: 10px; padding: 10px 20px;">
        Back to Home
      </button>
    </div>
  `;
}