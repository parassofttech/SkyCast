import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "510bcf437caefe44b7f1ffcaef70c320";

const ForecastPage = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city] = useState("Lucknow");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");

      const current = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: `${cityName},IN`,
            appid: API_KEY,
            units: "metric",
          },
        }
      );

      const forecastRes = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            q: `${cityName},IN`,
            appid: API_KEY,
            units: "metric",
          },
        }
      );

      setWeather(current.data);

      const daily = forecastRes.data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      );

      setForecast(daily.slice(0, 5));
    } catch (err) {
      console.error(err);
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading Forecast...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        {error}
      </div>
    );
  }

  if (!forecast.length) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Forecast Data Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-950 text-white">
      
      <h1 className="text-5xl font-bold text-center mb-12">
        5 Day Forecast
      </h1>

      {weather && (
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-white/70">
            Current Temperature: {Math.round(weather.main.temp)}°
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white/10 border border-white/10 p-6 rounded-3xl backdrop-blur-xl hover:scale-105 transition-all duration-300"
          >
            <p className="text-lg font-bold mb-2">
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "long",
              })}
            </p>

            <p className="text-sm text-white/60 mb-4">
              {new Date(day.dt_txt).toLocaleDateString()}
            </p>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`}
              alt="weather"
              className="mx-auto w-24"
            />

            <p className="text-4xl font-bold text-center">
              {Math.round(day.main.temp)}°
            </p>

            <p className="text-center capitalize mt-2 text-white/70">
              {day.weather[0].description}
            </p>

            <div className="mt-4 border-t border-white/10 pt-4 text-sm space-y-2">
              <p>💧 Humidity: {day.main.humidity}%</p>
              <p>💨 Wind: {day.wind.speed} m/s</p>
              <p>🌡 Feels Like: {Math.round(day.main.feels_like)}°</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastPage;