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
    <div className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col">
      <input
        className="border-2 border-purple-200 p-4 w-full mb-4 rounded-lg text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border-2 border-purple-200 p-4 w-full mb-4 rounded-lg flex-1 resize-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        placeholder="Start writing your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          onClick={saveNote}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-lg"
        >
          Save Note
        </button>

        {note && (
          <>
            <button
              onClick={() => setShowCollaborators(true)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-lg"
            >
              Manage Collaborators
            </button>

            <button
              onClick={deleteNote}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-lg"
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
