import React from "react";
import { motion } from "framer-motion";
import { ThermometerSun } from "lucide-react";

const FeelsLike = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  const data = forecast.slice(0, 8);

  const getDay = (dt_txt) =>
    new Date(dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
    });

  const temps = data.map((i) => i.main.temp);
  const feels = data.map((i) => i.main.feels_like);

  const maxVal = Math.max(...temps, ...feels);
  const minVal = Math.min(...temps, ...feels);

  const normalize = (value) =>
    ((value - minVal) / (maxVal - minVal || 1)) * 180;

  return (
    <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-orange-500/20">
          <ThermometerSun className="text-orange-300" size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">Feels Like vs Actual</h2>
          <p className="text-white/60 text-sm">Temperature Comparison Line</p>
        </div>
      </div>

      {/* GRAPH AREA */}
      <div className="relative h-64">

        {/* GRID LINES */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-20">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border-t border-white/30"></div>
          ))}
        </div>

        {/* LINES */}
        <svg className="w-full h-full" viewBox="0 0 400 200">

          {/* ACTUAL TEMP LINE */}
          <motion.polyline
            fill="none"
            stroke="#f97316"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={data
              .map((item, i) => {
                const x = (i / (data.length - 1)) * 400;
                const y = 200 - normalize(item.main.temp);
                return `${x},${y}`;
              })
              .join(" ")}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* FEELS LIKE LINE */}
          <motion.polyline
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="5,5"
            points={data
              .map((item, i) => {
                const x = (i / (data.length - 1)) * 400;
                const y = 200 - normalize(item.main.feels_like);
                return `${x},${y}`;
              })
              .join(" ")}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />

          {/* POINTS */}
          {data.map((item, i) => {
            const x = (i / (data.length - 1)) * 400;

            return (
              <g key={i}>
                {/* Actual point */}
                <circle
                  cx={x}
                  cy={200 - normalize(item.main.temp)}
                  r="4"
                  fill="#f97316"
                />

                {/* Feels like point */}
                <circle
                  cx={x}
                  cy={200 - normalize(item.main.feels_like)}
                  r="4"
                  fill="#38bdf8"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* LABELS */}
      <div className="flex justify-between mt-4 text-xs text-white/60">
        {data.map((item, i) => (
          <span key={i}>{getDay(item.dt_txt)}</span>
        ))}
      </div>

      {/* LEGEND */}
      <div className="flex gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span>Actual Temp</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-sky-400 rounded-full"></div>
          <span>Feels Like</span>
        </div>
      </div>

    </div>
  );
};

export default FeelsLike;