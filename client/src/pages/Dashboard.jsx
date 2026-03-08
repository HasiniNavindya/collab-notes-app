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
    <div className="flex h-screen bg-gradient-to-br from-purple-50 to-purple-100">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-xl p-6 flex flex-col border-r border-purple-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-700">My Notes</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition duration-200 shadow-md"
          >
            Logout
          </button>
        </div>

        <input
          className="border border-purple-200 p-3 w-full mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="Search notes..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={searchNotes}
          className="bg-purple-600 hover:bg-purple-700 text-white p-3 w-full mb-3 rounded-lg transition duration-200 shadow-md font-medium"
        >
          Search
        </button>

        <button
          onClick={() => setSelectedNote(null)}
          className="bg-purple-500 hover:bg-purple-600 text-white p-3 w-full mb-4 rounded-lg transition duration-200 shadow-md font-medium"
        >
          + New Note
        </button>

        <div className="flex-1 overflow-y-auto">
          {notes.map((note) => (
            <div
              key={note._id}
              className={`p-3 mb-2 cursor-pointer rounded-lg transition duration-200 ${
                selectedNote?._id === note._id
                  ? 'bg-purple-100 border-2 border-purple-600'
                  : 'bg-purple-50 hover:bg-purple-100 border border-purple-200'
              }`}
              onClick={() => setSelectedNote(note)}
            >
              <h3 className="font-semibold text-gray-800 truncate">{note.title || 'Untitled'}</h3>
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
