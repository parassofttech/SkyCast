import React from "react";
import { motion } from "framer-motion";
import {
  CloudSun,
  ShieldCheck,
  Gauge,
  Wind,
  Globe,
  Sparkles,
  Layers,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: <CloudSun size={28} className="text-amber-400" />,
      title: "Real-Time Weather",
      desc: "Get ultra-precise weather updates with live temperature metrics, changing conditions, and hyper-local forecasts.",
      color: "group-hover:bg-amber-500/20",
    },
    {
      icon: <Wind size={28} className="text-teal-400" />,
      title: "Wind Insights",
      desc: "Track real-time wind speed, current directions, and atmospheric changes with responsive, beautiful visual graphs.",
      color: "group-hover:bg-teal-500/20",
    },
    {
      icon: <Gauge size={28} className="text-sky-400" />,
      title: "Advanced Metrics",
      desc: "Deep-dive into humidity, barometric pressure, real feel, UV index, and dew points seamlessly arranged in one dashboard.",
      color: "group-hover:bg-sky-500/20",
    },
    {
      icon: <ShieldCheck size={28} className="text-indigo-400" />,
      title: "Reliable Data",
      desc: "Powered by military-grade, trusted weather APIs guaranteeing redundancy and highly consistent forecasting.",
      color: "group-hover:bg-indigo-500/20",
    },
  ];

  // Framer Motion Animation Settings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } },
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-white overflow-hidden relative font-sans">
      
      {/* BACKGROUND GRAPHICS & BLUR AMBIENT CORES */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-1/4 w-[600px] h-[600px] bg-indigo-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative py-28 px-6">
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-white/10 rounded-full px-4 py-1.5 mb-6 backdrop-blur-xl shadow-lg shadow-black/40">
              <Sparkles size={14} className="text-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">About SkyCast</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-none">
              Weather.<br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Reimagined.
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg leading-relaxed">
              SkyCast bridges the gap between complex meteorological analytics and everyday utility. 
              Engineered with fluid visual architectures to bring clarity to your day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES SECTION (STAGGERED) ================= */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Why Choose SkyCast?
          </h2>
          <p className="text-slate-500 mt-3 text-sm md:text-base">
            Everything you need to master atmospheric shifts, stacked with powerful mechanics.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/5 hover:border-white/10 rounded-[2rem] p-8 shadow-2xl transition-all duration-300 backdrop-blur-xl"
            >
              {/* Card Hover Glow Backplate */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/[0.02] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className={`w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-6 border border-white/5 shadow-inner transition-colors duration-300 ${item.color}`}>
                {item.icon}
              </div>

              <h3 className="text-lg font-bold mb-3 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= MISSION & DATA GRID SECTION ================= */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Text/Stats Block */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Our Core Mission
            </h2>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              We fundamentally believe weather monitoring should be stunningly straightforward and deeply informative. 
              By decoupling raw data streams into human-centric UI, SkyCast delivers absolute convenience without trading depth.
            </p>

            {/* Premium Dynamic Stats Display */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-5 bg-slate-900/60 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
                <h3 className="text-3xl md:text-4xl font-extrabold text-cyan-400 tracking-tight">
                  99.4%
                </h3>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mt-1">
                  Forecast Accuracy
                </p>
              </div>

              <div className="p-5 bg-slate-900/60 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
                <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-400 tracking-tight">
                  &lt; 1s
                </h3>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mt-1">
                  Live Sync Rate
                </p>
              </div>
            </div>
          </motion.div>

          {/* Advanced Animated Interactive Globe Showcase */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative bg-gradient-to-b from-slate-900/80 to-slate-950/80 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 text-center flex flex-col justify-center items-center group overflow-hidden min-h-[350px] shadow-2xl shadow-indigo-950/20"
          >
            {/* Soft Ambient Inner Core Light */}
            <div className="absolute w-44 h-44 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />

            {/* Rotating Outer Rings */}
            <div className="absolute w-52 h-52 border border-dashed border-cyan-500/20 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-60 h-60 border border-cyan-500/5 rounded-full animate-[spin_20s_linear_infinite_reverse]" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="relative z-10 p-4"
            >
              <Globe size={110} className="text-gradient from-cyan-400 to-indigo-500 text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]" />
            </motion.div>

            <h3 className="text-xl font-bold mt-6 tracking-tight z-10">
              Global Grid Coverage
            </h3>

            <p className="text-slate-400 text-xs md:text-sm mt-2 max-w-xs leading-relaxed z-10">
              Instantly track real-time telemetry from any coordinates worldwide with unified cloud sync grids.
            </p>
          </motion.div>

        </div>
      </section>

     

      {/* ================= DEVELOPER / TECH STACK SECTION ================= */}
      <section className="max-w-5xl mx-auto px-6 pb-28">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-slate-900/90 via-slate-950/90 to-slate-900/90 border border-white/5 rounded-[2.5rem] backdrop-blur-xl p-10 md:p-14 text-center overflow-hidden shadow-2xl"
        >
          {/* Subtle Accent Glow Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-cyan-500/10">
            <Layers size={26} className="text-white animate-pulse" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Engineered with Precision
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            SkyCast leverages high-performance architectural systems like React v19, Tailwind CSS, 
            Framer Motion hardware acceleration, and next-gen asynchronous edge-APIs.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-8 text-xs font-semibold text-slate-400">
            {["React", "TailwindCSS", "Framer Motion", "Lucide Icons", "REST APIs"].map((tech) => (
              <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default About;