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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">My Notes</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Logout
          </button>
        </div>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Search notes..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={searchNotes}
          className="bg-gray-700 text-white p-2 w-full mb-3"
        >
          Search
        </button>

        <button
          onClick={() => setSelectedNote(null)}
          className="bg-green-500 text-white p-2 w-full mb-3"
        >
          New Note
        </button>

        {notes.map((note) => (
          <div
            key={note._id}
            className="p-2 bg-white mb-2 cursor-pointer"
            onClick={() => setSelectedNote(note)}
          >
            {note.title}
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 p-4">
        <NoteEditor note={selectedNote} refreshNotes={fetchNotes} />
      </div>
    </div>
  );
}
