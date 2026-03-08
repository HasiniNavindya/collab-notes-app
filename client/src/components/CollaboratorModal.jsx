import { useState, useEffect } from "react";
import API from "../services/api";

export default function CollaboratorModal({ noteId, onClose }) {
  const [collaborators, setCollaborators] = useState([]);
  const [email, setEmail] = useState("");

  const fetchCollaborators = async () => {
    try {
      const res = await API.get(`/notes/${noteId}/collaborators`);
      setCollaborators(res.data);
    } catch (error) {
      console.error("Failed to fetch collaborators");
    }
  };

  const addCollaborator = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/notes/${noteId}/collaborators`, { email });
      setEmail("");
      fetchCollaborators();
      alert("Collaborator added successfully!");
    } catch (error) {
      alert("Failed to add collaborator. Make sure the email exists.");
    }
  };

  const removeCollaborator = async (userId) => {
    try {
      await API.delete(`/notes/${noteId}/collaborators/${userId}`);
      fetchCollaborators();
      alert("Collaborator removed successfully!");
    } catch (error) {
      alert("Failed to remove collaborator");
    }
  };

  useEffect(() => {
    if (noteId) {
      fetchCollaborators();
    }
  }, [noteId]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all animate-slideUp border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-emerald-600">Manage Collaborators</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-3xl font-light leading-none transition duration-200"
          >
            ×
          </button>
        </div>

        <form onSubmit={addCollaborator} className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Add Collaborator by Email</label>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="colleague@example.com"
              className="flex-1 bg-white border-2 border-gray-300 p-3 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-md"
            >
              Add
            </button>
          </div>
        </form>

        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Current Collaborators</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {collaborators.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No collaborators yet</p>
            ) : (
              collaborators.map((collab) => (
                <div
                  key={collab._id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">{collab.name}</p>
                    <p className="text-sm text-gray-600">{collab.email}</p>
                  </div>
                  <button
                    onClick={() => removeCollaborator(collab._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm transition duration-200 shadow-sm"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}
