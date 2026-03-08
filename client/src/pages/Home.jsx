import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(null); // 'login' or 'register'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { name: username, email, password });
      alert("Registration successful! Please login.");
      setShowModal('login');
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Registration failed");
    }
  };

  const closeModal = () => {
    setShowModal(null);
    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto border-b border-gray-200">
        <div className="flex items-center gap-2">
          <img src="/icon.png" alt="Collab Notes Icon" className="w-10 h-10 rounded-lg shadow-lg" />
          <span className="text-2xl font-bold text-gray-900">Collab Notes</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal('login')}
            className="px-6 py-2 text-gray-700 hover:text-emerald-600 font-semibold transition duration-200"
          >
            Login
          </button>
          <button
            onClick={() => setShowModal('register')}
            className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition duration-200 shadow-lg"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Collaborate on Notes
              <span className="text-emerald-600"> Together</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create, share, and collaborate on notes in real-time with your team. 
              Stay organized and productive with Collab Notes.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowModal('register')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition duration-200 shadow-lg text-lg"
              >
                Get Started Free
              </button>
              <button
                onClick={() => setShowModal('login')}
                className="px-8 py-4 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition duration-200 text-lg"
              >
                Login
              </button>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200 hover:shadow-md transition duration-200">
                <div className="text-3xl mb-2">✓</div>
                <p className="text-sm font-semibold text-gray-700">Real-time Collaboration</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200 hover:shadow-md transition duration-200">
                <div className="text-3xl mb-2">⚡</div>
                <p className="text-sm font-semibold text-gray-700">Fast & Secure</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200 hover:shadow-md transition duration-200">
                <div className="text-3xl mb-2">🔍</div>
                <p className="text-sm font-semibold text-gray-700">Powerful Search</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block">
            <div className="relative">
              <img
                src="/collaboration-image.svg"
                alt="Collaboration"
                className="w-full h-96 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-900 py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600">© 2026 Collab Notes. All rights reserved.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showModal === 'login' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-emerald-50 rounded-2xl shadow-2xl p-10 w-full max-w-md border border-gray-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Login</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none">
                ×
              </button>
            </div>
            <p className="text-emerald-600 mb-8 font-medium">Welcome back to Collab Notes</p>

            <form onSubmit={handleLogin}>
              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white border border-gray-300 p-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-white border border-gray-300 p-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white p-3 rounded-lg font-semibold shadow-lg transition duration-200 transform hover:scale-105"
              >
                Login
              </button>
            </form>

            <p className="text-gray-600 text-center mt-6">
              Don't have an account?{' '}
              <span
                onClick={() => setShowModal('register')}
                className="text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium transition duration-200"
              >
                Create an account
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showModal === 'register' && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-emerald-50 rounded-2xl shadow-2xl p-10 w-full max-w-md border border-gray-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none">
                ×
              </button>
            </div>
            <p className="text-emerald-600 mb-8 font-medium">Join Collab Notes today</p>

            <form onSubmit={handleRegister}>
              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Username</label>
                <input
                  type="text"
                  placeholder="Choose a username"
                  className="w-full bg-white border border-gray-300 p-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-gray-700 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white border border-gray-300 p-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full bg-white border border-gray-300 p-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white p-3 rounded-lg font-semibold shadow-lg transition duration-200 transform hover:scale-105"
              >
                Create Account
              </button>
            </form>

            <p className="text-gray-600 text-center mt-6">
              Already have an account?{' '}
              <span
                onClick={() => setShowModal('login')}
                className="text-emerald-600 hover:text-emerald-700 cursor-pointer font-medium transition duration-200"
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
