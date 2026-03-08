import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Image Background */}
      <div 
        className="hidden md:flex md:w-2/5 bg-contain bg-center bg-no-repeat p-8"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/teamwork-collaboration-business-concept-partnership-support-communication-work-vector-flat-illustration-with-people-assembling-jigsaw-with-puzzle-pieces-together_107791-7652.jpg?semt=ais_rp_50_assets&w=740&q=80')",
          backgroundSize: '90%'
        }}
      >
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-3/5 flex items-center justify-center bg-gray-50 px-8">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="bg-purple-50 rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-purple-700 mb-2">Welcome to Collab Notes</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Login</h2>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2">Username</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-gray-600 text-sm mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-right mb-6">
              <a href="#" className="text-sm text-purple-600 hover:text-purple-700">
                Forgot password?
              </a>
            </div>

            <button 
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg"
            >
              Login
            </button>

            <p className="text-center text-gray-600 text-sm mt-6">
              Don't have any account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-purple-600 hover:text-purple-700 font-semibold"
              >
                Create an account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}