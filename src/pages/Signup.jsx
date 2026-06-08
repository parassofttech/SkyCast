import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    // Error remove while typing
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const generateToken = () => {
    return (
      "token_" +
      Math.random().toString(36).substring(2) +
      Date.now().toString(36)
    );
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const token = generateToken();

      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: form.name,
          email: form.email,
        })
      );

      alert("Signup Successful 🎉");

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-800 to-purple-900 px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-white/60 mt-2">
            Join WeatherX Today
          </p>
        </div>

        <form onSubmit={handleSignup}>

          {/* Name */}
          <div className="mb-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 outline-none border transition-all ${
                errors.name
                  ? "border-red-500"
                  : "border-white/20 focus:border-cyan-400"
              }`}
            />

            {errors.name && (
              <p className="text-red-400 text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 outline-none border transition-all ${
                errors.email
                  ? "border-red-500"
                  : "border-white/20 focus:border-cyan-400"
              }`}
            />

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/50 outline-none border transition-all ${
                errors.password
                  ? "border-red-500"
                  : "border-white/20 focus:border-cyan-400"
              }`}
            />

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-white/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-cyan-400 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>

        </form>
      </div>

    </div>
  );
};

export default Signup;