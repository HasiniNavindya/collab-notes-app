import { useState, useEffect } from "react";
import API from "../services/api";
import CollaboratorModal from "./CollaboratorModal";

export default function NoteEditor({ note, refreshNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showCollaborators, setShowCollaborators] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  const saveNote = async () => {
    if (note) {
      await API.put(`/notes/${note._id}`, { title, content });
    } else {
      await API.post("/notes", { title, content });
    }
    refreshNotes();
  };

  const deleteNote = async () => {
    if (!note) return;
    await API.delete(`/notes/${note._id}`);
    refreshNotes();
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 h-full flex flex-col border border-gray-200">
      <input
        className="bg-white border-2 border-gray-300 p-4 w-full mb-4 rounded-lg text-xl font-semibold text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="bg-white border-2 border-gray-300 p-4 w-full mb-4 rounded-lg flex-1 resize-none text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        placeholder="Start writing your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          onClick={saveNote}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-lg"
        >
          Save Note
        </button>

        {note && (
          <>
            <button
              onClick={() => setShowCollaborators(true)}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-lg"
            >
              Manage Collaborators
            </button>

            <button
              onClick={deleteNote}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-lg"
            >
              Delete Note
            </button>
          </>
        )}
      </div>

      {showCollaborators && note && (
        <CollaboratorModal
          noteId={note._id}
          onClose={() => setShowCollaborators(false)}
        />
      )}
    </div>
  );
}
