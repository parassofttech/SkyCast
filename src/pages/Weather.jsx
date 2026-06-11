
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
  SearchAlert,
} from "lucide-react";

import WindGraph from "../components/WindGraph";
import TemperatureGraph from "../components/TemperatureGraph";
import HumidityGraph from "../components/HumidityGraph";
import FeelsLike from "../components/FeelsLike";
import Forecast5Day from "./Forecast5Day";
import Footer from "../components/Footer";

// import Forecast5Days from "./HourlyForecast";

const API_KEY = "510bcf437caefe44b7f1ffcaef70c320";

const Weather = () => {
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
      <div className=" flex flex-col justify-around ">
        <div>
          <h1 className=" gap-2 text-2xl mt-30 ml-[12%] pt-5 font-bold">
            <CloudSun /> SkyCast
          </h1>
        </div>

        <div className="flex mt-10 mx-[10%]  items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-2 shadow-lg hover:shadow-white/10 transition-all duration-300 focus-within:ring-2 focus-within:ring-white/30">

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
          {/* HIGHLIGHTS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card icon={<Thermometer />} title="Feels Like" value={`${weather.main.feels_like}°`} />
            <Card icon={<Droplets />} title="Humidity" value={`${weather.main.humidity}%`} />
            <Card icon={<Wind />} title="Wind" value={`${weather.wind.speed} m/s`} />
            <Card icon={<Gauge />} title="Pressure" value={weather.main.pressure} />
          </div>

          {/* FORECAST */}


        </div>
      )}
      {/* --- SUNRISE / SUNSET ARC --- */}

      {weather && (
        <div className="m-[12%] bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">
              ☀️ Sun Movement
            </h3>

            <div className="text-sm text-white/60">
              Live Solar Position
            </div>
          </div>

          {(() => {
            const sunrise = weather.sys.sunrise * 1000;
            const sunset = weather.sys.sunset * 1000;
            const now = Date.now();

            let progress = ((now - sunrise) / (sunset - sunrise)) * 100;

            progress = Math.max(0, Math.min(progress, 100));

            return (
              <>
                <div className="relative w-full h-48 flex justify-center">

                  <svg
                    viewBox="0 0 400 200"
                    className="w-full max-w-3xl"
                  >
                    {/* Glow Arc */}
                    <path
                      d="M40 170 A160 160 0 0 1 360 170"
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />

                    {/* Active Arc */}
                    <path
                      d="M40 170 A160 160 0 0 1 360 170"
                      fill="none"
                      stroke="url(#sunGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="503"
                      strokeDashoffset={503 - (503 * progress) / 100}
                    />

                    <defs>
                      <linearGradient
                        id="sunGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#fde047" />
                      </linearGradient>
                    </defs>

                    {/* Sun */}
                    <motion.circle
                      cx={40 + (320 * progress) / 100}
                      cy={
                        170 -
                        Math.sin((Math.PI * progress) / 100) * 160
                      }
                      r="12"
                      fill="#facc15"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                      }}
                      style={{
                        filter:
                          "drop-shadow(0px 0px 15px rgba(250,204,21,0.9))",
                      }}
                    />
                  </svg>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-orange-400 to-yellow-300"
                    />
                  </div>

                  <p className="text-center mt-3 text-sm text-white/70">
                    {progress.toFixed(0)}% of daylight completed
                  </p>
                </div>

                {/* Times */}
                <div className="grid grid-cols-3 gap-4 mt-8">

                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <p className="text-2xl mb-2">🌅</p>
                    <p className="text-xs text-white/50">
                      Sunrise
                    </p>
                    <p className="font-bold">
                      {formatTime(weather.sys.sunrise)}
                    </p>
                  </div>

                  <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-2xl p-4 text-center">
                    <p className="text-2xl mb-2">☀️</p>
                    <p className="text-xs text-white/50">
                      Current Time
                    </p>
                    <p className="font-bold">
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <p className="text-2xl mb-2">🌇</p>
                    <p className="text-xs text-white/50">
                      Sunset
                    </p>
                    <p className="font-bold">
                      {formatTime(weather.sys.sunset)}
                    </p>
                  </div>

                </div>
              </>
            );
          })()}
        </div>
      )}

      <div className="mt-10 max-w-7xl mx-auto px-4">
          <Forecast5Day forecast={forecast} setForecast={setForecast} />

        {/* GRID WRAPPER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <WindGraph forecast={forecast} />
          <TemperatureGraph forecast={forecast} />
          <HumidityGraph forecast={forecast} />
          <FeelsLike forecast={forecast} />


        </div>
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

export default Weather;