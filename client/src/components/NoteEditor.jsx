import { useState, useEffect } from "react";
import API from "../services/api";

export default function NoteEditor({ note, refreshNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
    <div>
      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3 rounded min-h-96"
        placeholder="Note Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="mt-3 flex gap-2">
        <button
          onClick={saveNote}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>

        <button
          onClick={deleteNote}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
