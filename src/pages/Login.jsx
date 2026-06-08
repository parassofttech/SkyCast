import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // simple demo login (frontend only)
    if (email && password) {
      const fakeToken =
        "token_" + Math.random().toString(36).substring(2);

      localStorage.setItem("token", fakeToken);
      setIsLoggedIn(true);

      alert("Login successful!");
      navigate("/");
    } else {
      alert("Please fill all fields");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  // If already logged in
  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-blue-700 text-white">
        <h1 className="text-3xl font-bold mb-4">
          You are already Logged In 🚀
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-6 py-2 rounded-xl font-bold"
        >
          Logout
        </button>
      </div>
    );
  }

  // Login form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-white/10 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 p-2 rounded bg-white/10 outline-none"
        />

        <button className="w-full bg-green-500 py-2 rounded-xl font-bold mb-4">
          Login
        </button>

        {/* Signup option */}
        <p className="text-center text-sm text-white/70">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-300 font-bold hover:underline"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;