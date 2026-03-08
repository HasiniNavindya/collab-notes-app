import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import NoteEditor from "../components/NoteEditor";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const searchNotes = async () => {
    const res = await API.get(`/notes/search?q=${search}`);
    setNotes(res.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-2xl p-6 flex flex-col border-r border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-600">My Notes</h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm transition duration-200 shadow-md"
          >
            Logout
          </button>
        </div>

        <input
          className="bg-white border border-gray-300 p-3 w-full mb-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Search notes..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={searchNotes}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white p-3 w-full mb-3 rounded-lg transition duration-200 shadow-md font-medium"
        >
          Search
        </button>

        <button
          onClick={() => setSelectedNote(null)}
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-3 w-full mb-4 rounded-lg transition duration-200 shadow-md font-medium"
        >
          + New Note
        </button>

        <div className="flex-1 overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note._id}
              className={`p-3 mb-2 cursor-pointer rounded-lg transition duration-200 ${
                selectedNote?._id === note._id
                  ? 'bg-emerald-50 border-2 border-emerald-500'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setSelectedNote(note)}
            >
              <h3 className="font-semibold text-gray-900 truncate">{note.title || 'Untitled'}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-8">
        <NoteEditor note={selectedNote} refreshNotes={fetchNotes} />
      </div>
    </div>
  );
}
