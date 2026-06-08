import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  CloudSun,
  Search,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
  Sunrise,
  Sunset,
  Navigation,
} from "lucide-react";
import TemperatureGraph from "./TemperatureGraph";
// import Forecast5Days from "./HourlyForecast";

const API_KEY = "510bcf437caefe44b7f1ffcaef70c320";

const Forecast5Days = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Lucknow");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");

      const current = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: `${cityName},IN`,
            appid: API_KEY,
            units: "metric",
          },
        }
      );

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast`,
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
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);
 const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

  const handleSearch = (e) => {
  e.preventDefault();

  const trimmedCity = city.trim();

  if (!trimmedCity) return;

  fetchWeather(trimmedCity);
};

  const bg = () => {
    if (!weather) return "from-blue-500 to-indigo-700";
    const w = weather.weather[0].main.toLowerCase();
    if (w.includes("cloud")) return "from-slate-500 to-blue-700";
    if (w.includes("rain")) return "from-blue-800 to-slate-900";
    if (w.includes("clear")) return "from-orange-400 to-blue-600";
    return "from-blue-500 to-indigo-700";
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bg()} text-white `}>

      {/* NAVBAR */}
      <div className=" flex justify-around ">
        <div>
          <h1 className=" gap-2 text-2xl mt-30 pt-5 font-bold">
          <CloudSun /> SkyWeather
        </h1>
        </div>

       <div className="flex mt-33 items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-2 shadow-lg hover:shadow-white/10 transition-all duration-300 focus-within:ring-2 focus-within:ring-white/30">

  {/* INPUT */}
  <input
    value={city}
    onChange={(e) => setCity(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleSearch(e);
    }}
    placeholder="Search city... (Lucknow, Delhi, Mumbai)"
    className="flex-1 bg-transparent outline-none text-white placeholder-white/60 text-sm   md:text-base"
  />

  {/* DIVIDER */}
  <div className="w-px h-6 bg-white/20"></div>

  {/* BUTTON */}
  <button
    type="submit"
    onClick={handleSearch}
    className="group flex items-center justify-center bg-gradient-to-r from-white/20 to-white/10 hover:from-white/30 hover:to-white/20 p-2 rounded-xl transition-all duration-300 active:scale-95"
  >
    <Search className="text-white group-hover:scale-110 transition-transform duration-200" />
  </button>

</div>

      </div>

      {loading && (
        <p className="text-center mt-20 text-lg">Loading...</p>
      )}

      {error && (
        <p className="text-center mt-20 text-red-300">{error}</p>
      )}

      {/* MAIN CONTENT */}
      {weather && (
        <div className="max-w-6xl mx-auto p-6">

          {/* CURRENT WEATHER */}
          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-lg flex justify-between items-center">
            <div>
              <h2 className="text-6xl font-bold">
                {Math.round(weather.main.temp)}°
              </h2>
              <p className="text-xl mt-2 capitalize">
                {weather.weather[0].description}
              </p>
              <p className="text-white/70 flex items-center gap-2 mt-1">
                <Navigation size={16} />
                {weather.name}, {weather.sys.country}
              </p>
            </div>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              className="w-40"
            />
          </div>
<TemperatureGraph forecast={forecast} />
          {/* HIGHLIGHTS */}
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <Card icon={<Thermometer />} title="Feels Like" value={`${weather.main.feels_like}°`} />
            <Card icon={<Droplets />} title="Humidity" value={`${weather.main.humidity}%`} />
            <Card icon={<Wind />} title="Wind" value={`${weather.wind.speed} m/s`} />
            <Card icon={<Gauge />} title="Pressure" value={weather.main.pressure} />
          </div>

          {/* FORECAST */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">5 Day Forecast</h2>

            <div className="grid md:grid-cols-5 gap-4">
              {forecast.map((day, i) => (
                <div
                  key={i}
                  className="bg-white/10 p-5 rounded-2xl text-center backdrop-blur"
                >
                  <p className="font-bold">
                    {new Date(day.dt_txt).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </p>

                  <img
                    className="mx-auto"
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  />

                  <p className="text-2xl font-bold">
                    {Math.round(day.main.temp)}°
                  </p>

                  <p className="text-xs uppercase text-white/70">
                    {day.weather[0].main}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
      {/* --- SUNRISE / SUNSET ARC --- */}
<div className="mt-12 bg-white/10 p-6 rounded-2xl backdrop-blur">

  <h3 className="text-lg font-bold mb-6 text-center">
    Sun Movement
  </h3>

  <div className="relative flex justify-center">

    <svg viewBox="0 0 200 100" className="w-72 h-36">

      {/* Background Arc */}
      <path
        d="M10 90 A90 90 0 0 1 190 90"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="4"
      />

      {/* Animated Arc */}
      <motion.path
        d="M10 90 A90 90 0 0 1 190 90"
        fill="none"
        stroke="orange"
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2 }}
      />

      {/* Sun Dot (fixed animation using path motion) */}
      <motion.circle
        r="6"
        fill="yellow"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{
          duration: 2,
          ease: "easeInOut",
        }}
        style={{
          offsetPath: "path('M10 90 A90 90 0 0 1 190 90')",
        }}
      />

    </svg>
  </div>

  {/* Time Labels */}
  <div className="flex justify-between text-xs text-white/70 mt-2 px-4">
    <span>🌅 {formatTime(weather?.sys?.sunrise)}</span>
    <span>🌇 {formatTime(weather?.sys?.sunset)}</span>
  </div>
  <div className="h-100"></div>

</div>
    </div>
  );
};

const Card = ({ icon, title, value }) => (
  <div className="bg-white/10 p-5 rounded-2xl backdrop-blur text-center">
    <div className="flex justify-center mb-2">{icon}</div>
    <p className="text-sm text-white/60">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default Forecast5Days;