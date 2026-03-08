import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name: username, email, password });
      alert("Registration successful! Please login.");
      navigate("/");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Background */}
      <div className="hidden md:flex md:w-2/5 bg-white items-center justify-center p-12">
        <img
          src="/image.png"
          alt="Collaboration"
          className="w-full h-auto max-w-md"
        />
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center bg-gray-50 px-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleRegister} className="bg-emerald-50 rounded-2xl shadow-2xl p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-emerald-600 mb-2">Welcome to Collab Notes</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create Account</h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-gray-400"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg"
            >
              Create Account
            </button>

            <p className="text-center text-gray-600 text-sm mt-6">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                Login here
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
