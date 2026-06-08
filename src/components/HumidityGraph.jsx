import React from "react";
import { motion } from "framer-motion";
import { Droplets } from "lucide-react";

const HumidityGraph = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  const data = forecast.slice(0, 8);

  const getDay = (dt_txt) =>
    new Date(dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
    });

  return (
    <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-2xl bg-blue-500/20">
          <Droplets className="text-blue-300" size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">Humidity Flow</h2>
          <p className="text-white/60 text-sm">Atmospheric Moisture Levels</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {data.map((item, index) => {
          const humidity = item.main.humidity;

          return (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white/5 rounded-2xl p-4 overflow-hidden shadow-lg"
            >
              {/* Animated water fill */}
              <div className="absolute bottom-0 left-0 w-full">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${humidity}%` }}
                  transition={{ duration: 1 }}
                  className="bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300 opacity-30"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <p className="text-xs text-white/60 mb-1">
                  {getDay(item.dt_txt)}
                </p>

                <p className="text-2xl font-bold">
                  {humidity}%
                </p>

                <p className="text-xs text-white/40 mt-1">
                  Humidity
                </p>
              </div>

              {/* Floating droplets effect */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  delay: index * 0.2,
                }}
                className="absolute top-2 right-2 text-blue-300 opacity-50"
              >
                <Droplets size={16} />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-3 gap-4">

        <div className="bg-white/5 p-4 rounded-2xl text-center">
          <p className="text-white/50 text-xs">Average</p>
          <p className="text-xl font-bold">
            {(
              data.reduce((a, b) => a + b.main.humidity, 0) /
              data.length
            ).toFixed(0)}
            %
          </p>
        </div>

        <div className="bg-white/5 p-4 rounded-2xl text-center">
          <p className="text-white/50 text-xs">Maximum</p>
          <p className="text-xl font-bold">
            {Math.max(...data.map((i) => i.main.humidity))}%
          </p>
        </div>

        <div className="bg-white/5 p-4 rounded-2xl text-center">
          <p className="text-white/50 text-xs">Minimum</p>
          <p className="text-xl font-bold">
            {Math.min(...data.map((i) => i.main.humidity))}%
          </p>
        </div>

      </div>
    </div>
  );
};

export default HumidityGraph;