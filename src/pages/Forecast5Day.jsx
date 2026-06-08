import React from "react";
import { motion } from "framer-motion";

const Forecast5Day = ({ forecast }) => {
  // ✅ safety check (prevents "undefined list" crash)
  if (!forecast || forecast.length === 0) {
    return (
      <div className="text-center text-white/60 mt-10">
        No forecast data available
      </div>
    );
  }

  return (
    <section className="mt-12 px-4">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-white">
          🌤️ 5 Day Forecast
        </h2>
        <div className="flex-1 h-px bg-white/20" />
      </div>

      {/* Forecast Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        {forecast.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-5 text-center"
          >

            {/* Day */}
            <p className="text-sm font-bold text-white/70">
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>

            {/* Icon */}
            <img
              className="w-16 mx-auto my-3"
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            {/* Temp */}
            <h3 className="text-2xl font-bold">
              {Math.round(day.main.temp)}°
            </h3>

            {/* Condition */}
            <p className="text-xs uppercase text-white/60 mt-1">
              {day.weather[0].main}
            </p>

          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default Forecast5Day;