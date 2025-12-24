import React, { useState } from "react";
import { FaThermometerEmpty } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { CiCloud } from "react-icons/ci";
import { FaDroplet } from "react-icons/fa6";
import { TiWeatherPartlySunny } from "react-icons/ti";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "1367e60897c7edd5930975bbb0944f95"; 

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod === "404") {
        setError("City not found");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="app">
      <h1><TiWeatherPartlySunny/> Weather App</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p><FaThermometerEmpty/> Temperature: {weather.main.temp}°C</p>
          <p><CiCloud/> Condition: {weather.weather[0].main}</p>
          <p><FaDroplet/> Humidity: {weather.main.humidity}%</p>
          <p><FaWind/> Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
