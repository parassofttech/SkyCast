import React from "react";
import { motion } from "framer-motion";
import { Wind } from "lucide-react";

const WindGraph = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  const hourlyData = forecast.slice(0, 8);

  const getDay = (dt_txt) => {
    return new Date(dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
    });
  };

  return (
    <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-cyan-500/20">
          <Wind className="text-cyan-300" size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            Wind Speed Forecast
          </h2>
          <p className="text-white/60 text-sm">
            Next 24 Hours
          </p>
        </div>
      </div>

      {/* Graph */}
      <div className="flex justify-between items-end h-64 gap-3">

        {hourlyData.map((item, index) => {
          const speed = item.wind.speed;
          const height = Math.max(speed * 10, 30);

          return (
            <div
              key={index}
              className="flex flex-col items-center flex-1"
            >
              {/* Speed */}
              <span className="text-xs mb-2 text-white/70">
                {speed.toFixed(1)}
              </span>

              {/* Bar */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                }}
                className="w-full rounded-t-2xl bg-gradient-to-t from-cyan-600 via-cyan-400 to-cyan-200 shadow-lg"
              />

              {/* DAY (UPDATED) */}
              <span className="mt-3 text-xs text-white/60 font-semibold">
                {getDay(item.dt_txt)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">

        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <p className="text-white/50 text-xs">Average</p>
          <p className="text-xl font-bold">
            {(
              hourlyData.reduce((a, b) => a + b.wind.speed, 0) /
              hourlyData.length
            ).toFixed(1)}
            <span className="text-sm"> m/s</span>
          </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <p className="text-white/50 text-xs">Maximum</p>
          <p className="text-xl font-bold">
            {Math.max(...hourlyData.map((i) => i.wind.speed)).toFixed(1)}
            <span className="text-sm"> m/s</span>
          </p>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 text-center">
          <p className="text-white/50 text-xs">Minimum</p>
          <p className="text-xl font-bold">
            {Math.min(...hourlyData.map((i) => i.wind.speed)).toFixed(1)}
            <span className="text-sm"> m/s</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default WindGraph;