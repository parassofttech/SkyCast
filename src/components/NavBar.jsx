import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CloudSun,
  MapPin,
  Menu,
  X,
  LogOut,
  User,
} from "lucide-react";
import Logo from "../assets/SkyCast_Logo.png"

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Forecast", path: "/forecast" },
    { name: "About", path: "/about" },
  ];

  // check login status
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.25)] flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 flex items-center justify-center shadow-lg">
                <img src={Logo} alt="logo" />
                {/* <CloudSun size={28} className="text-white" /> */}
              </div>

              <div>
                <h1 className="text-white text-2xl font-bold">
                  Sky<span className="text-cyan-400">Cast</span>
                </h1>
                <p className="text-gray-300 text-xs">Real-Time Forecast</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-8 text-white font-medium">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="relative group">
                    <span className="group-hover:text-cyan-400 transition">
                      {item.name}
                    </span>
                    <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-4">

              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                <MapPin size={16} className="text-cyan-400" />
                <span className="text-gray-200 text-sm">
                  Lucknow, India
                </span>
              </div>

              {/* LOGIN / LOGOUT BUTTON */}
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 rounded-full text-white font-semibold hover:scale-105 transition"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 px-5 py-2.5 rounded-full text-white font-semibold hover:scale-105 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-white"
            >
              <Menu size={30} />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-slate-950/95 backdrop-blur-xl border-l border-white/10 z-50 transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-white text-xl font-bold">Menu</h2>

          <button onClick={() => setOpen(false)} className="text-white">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-5">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className="text-white text-lg hover:text-cyan-400 transition border-b border-white/10 pb-3"
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile login/logout */}
          {!isLoggedIn ? (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="mt-4 bg-cyan-500 text-center py-2 rounded-xl text-white"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 py-2 rounded-xl text-white"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;