import React from "react";
import { motion } from "framer-motion";
import { CloudSun, Globe, Mail, ArrowUp,  Briefcase   } from "lucide-react";

const Footer = () => {
  // Framer Motion Parent Variant for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60 } },
  };

  return (
    <footer className="relative bg-[#0b0f19] text-white border-t border-white/5 overflow-hidden">
      
      {/* 1. ADVANCED BACKGROUND EFFECTS */}
      {/* Subtle Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      {/* Ambient Radial Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* 2. TOP & MIDDLE SECTION (MAIN CONTENT) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-7xl mx-auto px-6 pt-16 pb-12 grid grid-cols-1 md:grid-cols-12 gap-10 z-10"
      >
        {/* BRAND COLUMN (Spans 4 columns) */}
        <motion.div variants={itemVariants} className="md:col-span-4 space-y-5">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="p-3 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl shadow-lg shadow-sky-500/20 group-hover:rotate-6 transition-transform duration-300">
              <CloudSun className="text-white w-6 h-6 animate-pulse" />
            </div>
            <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              SkyCast
            </h1>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Real-time weather insights with stunning visuals, precise hourly updates, 
            and next-gen forecasting. Experience weather forecasting reimagined.
          </p>
          {/* Social Icons with sleek hover effect */}
          <div className="flex items-center gap-3 pt-2">
            {[
             
              { icon: <Globe size={18} />, link: "#" },
              { icon: <Briefcase   size={18} />, link: "#" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 bg-slate-800/60 hover:bg-sky-500 hover:text-white rounded-xl border border-white/5 transition-colors duration-300 text-slate-400"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* QUICK LINKS COLUMN (Spans 3 columns) */}
        <motion.div variants={itemVariants} className="md:col-span-3">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-200 mb-5 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-sky-500">
            Navigation
          </h2>
          <ul className="space-y-3.5 text-slate-400 text-sm font-medium">
            {["Home", "Forecast", "About"].map((link) => (
              <li key={link} className="w-fit">
                <a href={`/${link.toLowerCase().replace(" ", "-")}`} className="group relative transition-colors duration-300 hover:text-sky-400 flex items-center">
                  {link}
                  <span className="absolute left-0 bottom-[-2px] w-0 h-[1.5px] bg-sky-400 transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CONTACT COLUMN (Spans 2 columns) */}
        <motion.div variants={itemVariants} className="md:col-span-2">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-200 mb-5 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-sky-500">
            Contact Us
          </h2>
          <div className=" flex flex-col space-y-4 text-slate-400 text-sm">
            {/* <a href="mailto:support@skyweather.com" className="flex items-center gap-2.5 hover:text-sky-400 transition-colors duration-300 group"> */}
              <Mail size={16} className=" flex-none text-slate-500 group-hover:text-sky-400 transition-colors" /> 
              <span className="flex flex-row">paras113s@gmail.com</span>
            {/* </a> */}
            {/* <a href="https://www.skyweather.app" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 hover:text-sky-400 transition-colors duration-300 group"> */}
              <Globe size={16} className="text-slate-500 group-hover:text-sky-400 transition-colors" /> 
              <span>skyCast</span>
            {/* </a> */}
          </div>
        </motion.div>

        {/* NEWSLETTER COLUMN (Spans 3 columns) */}
        <motion.div variants={itemVariants} className="md:col-span-3">
          <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-200 mb-5 relative after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-[2px] after:bg-sky-500">
            Stay Updated
          </h2>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Subscribe to our newsletter for weather alerts & updates.
          </p>
          {/* <div className="relative flex items-center">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full px-4 py-2.5 bg-slate-900/80 border border-white/10 rounded-xl text-xs focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all duration-300 placeholder:text-slate-600"
            />
            <button className="absolute right-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-medium text-xs rounded-lg hover:shadow-lg hover:shadow-sky-500/20 transition-all duration-300 active:scale-95">
              Join
            </button>
          </div> */}
        </motion.div>
      </motion.div>

      {/* DIVIDER LINE WITH GRADIENT */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* 3. BOTTOM BAR */}
      <div className="relative max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-xs gap-4 z-10">
        <p className="font-medium">
          © {new Date().getFullYear()} <span className="text-slate-400 font-semibold">SkyCast</span>. All rights reserved.
        </p>

        <p className="flex items-center gap-1 font-medium sm:order-none order-first">
          Made with <span className="text-rose-500 animate-pulse text-sm">♥</span> for a seamless weather experience
        </p>

        {/* SCROLL TO TOP WITH NEOMORPHIC/GLOW HOVER */}
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3 bg-slate-800/80 hover:bg-sky-500 hover:text-white text-slate-400 rounded-full border border-white/5 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;