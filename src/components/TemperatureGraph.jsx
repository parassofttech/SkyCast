import React from "react";
import { motion } from "framer-motion";
import { Thermometer } from "lucide-react";

const TemperatureGraph = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  const data = forecast.slice(0, 8);

  const getDay = (dt_txt) => {
    return new Date(dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  const temps = data.map((i) => i.main.temp);

  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);

  return (
    <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-orange-500/20">
          <Thermometer className="text-orange-300" size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Temperature Forecast
          </h2>
          <p className="text-white/60 text-sm">
            Next 24 Hours Overview
          </p>
        </div>
      </div>

      {/* Graph */}
      <div className="flex justify-between items-end h-64 gap-3">

        {data.map((item, index) => {
          const temp = item.main.temp;

          // normalize height (30 - 220 range)
          const height =
            ((temp - minTemp) / (maxTemp - minTemp || 1)) * 180 + 30;

          return (
            <div
              key={index}
              className="flex flex-col items-center flex-1"
            >
              {/* TEMP */}
              <span className="text-xs mb-2 text-white/70">
                {temp.toFixed(1)}°
              </span>

              {/* BAR */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                }}
                className="w-full rounded-t-2xl bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-300 shadow-lg"
              />

              {/* DAY */}
              <span className="mt-3 text-xs text-white/60 font-semibold">
                {getDay(item.dt_txt)}
              </span>
            </div>
          );
        })}
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mt-8">

        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <p className="text-white/50 text-xs">Average</p>
          <p className="text-xl font-bold">
            {(
              temps.reduce((a, b) => a + b, 0) / temps.length
            ).toFixed(1)}
            <span className="text-sm">°C</span>
          </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <p className="text-white/50 text-xs">Maximum</p>
          <p className="text-xl font-bold">
            {maxTemp.toFixed(1)}
            <span className="text-sm">°C</span>
          </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <p className="text-white/50 text-xs">Minimum</p>
          <p className="text-xl font-bold">
            {minTemp.toFixed(1)}
            <span className="text-sm">°C</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default TemperatureGraph;