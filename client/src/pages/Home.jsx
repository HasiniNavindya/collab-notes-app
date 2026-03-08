import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">CN</span>
          </div>
          <span className="text-2xl font-bold text-purple-700">Collab Notes</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 text-purple-600 hover:text-purple-700 font-semibold transition duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200 shadow-md"
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
              <span className="text-purple-600"> Together</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create, share, and collaborate on notes in real-time with your team. 
              Stay organized and productive with Collab Notes.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition duration-200 shadow-lg text-lg"
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold rounded-lg transition duration-200 text-lg"
              >
                Login
              </button>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">✓</div>
                <p className="text-sm text-gray-600">Real-time Collaboration</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">⚡</div>
                <p className="text-sm text-gray-600">Fast & Secure</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">🔍</div>
                <p className="text-sm text-gray-600">Powerful Search</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block">
            <div 
              className="w-full h-96 bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: "url('https://img.freepik.com/free-vector/teamwork-collaboration-business-concept-partnership-support-communication-work-vector-flat-illustration-with-people-assembling-jigsaw-with-puzzle-pieces-together_107791-7652.jpg?semt=ais_rp_50_assets&w=740&q=80')"
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Collab Notes?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-gray-600">
                Add collaborators to your notes and work together seamlessly in real-time.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rich Text Editor</h3>
              <p className="text-gray-600">
                Create beautiful notes with our intuitive and powerful text editor.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your notes are encrypted and secure. Only you and your collaborators can access them.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">© 2026 Collab Notes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
