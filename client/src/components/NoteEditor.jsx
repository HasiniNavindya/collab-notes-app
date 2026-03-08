import { useState, useEffect } from "react";
import API from "../services/api";
import CollaboratorModal from "./CollaboratorModal";

const NOTE_COLORS = [
  { name: 'gray', bg: 'bg-gray-100', border: 'border-gray-300', label: 'Default' },
  { name: 'blue', bg: 'bg-blue-100', border: 'border-blue-300', label: 'Blue' },
  { name: 'green', bg: 'bg-green-100', border: 'border-green-300', label: 'Green' },
  { name: 'yellow', bg: 'bg-yellow-100', border: 'border-yellow-300', label: 'Yellow' },
  { name: 'red', bg: 'bg-red-100', border: 'border-red-300', label: 'Red' },
  { name: 'purple', bg: 'bg-purple-100', border: 'border-purple-300', label: 'Purple' },
];

const TEMPLATES = [
  { name: 'Meeting Notes', content: '**Meeting Date:** \n\n**Attendees:**\n- \n\n**Agenda:**\n1. \n\n**Discussion:**\n\n**Action Items:**\n- [ ] \n\n**Next Meeting:**' },
  { name: 'Project Plan', content: '**Project Name:**\n\n**Goal:**\n\n**Timeline:**\nStart Date: \nEnd Date: \n\n**Milestones:**\n- [ ] \n\n**Resources:**\n\n**Notes:**' },
  { name: 'To-Do List', content: '**Today\'s Tasks:**\n- [ ] \n- [ ] \n- [ ] \n\n**Priority:**\n🔴 High:\n🟡 Medium:\n🟢 Low:\n\n**Notes:**' },
  { name: 'Blank', content: '' }
];

export default function NoteEditor({ note, refreshNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [color, setColor] = useState("gray");
  const [pinned, setPinned] = useState(false);
  const [showCollaborators, setShowCollaborators] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setTags(note.tags || []);
      setColor(note.color || "gray");
      setPinned(note.pinned || false);
    } else {
      setTitle("");
      setContent("");
      setTags([]);
      setColor("gray");
      setPinned(false);
    }
  }, [note]);

  const saveNote = async () => {
    const noteData = { title, content, tags, color, pinned };
    if (note) {
      await API.put(`/notes/${note._id}`, noteData);
    } else {
      await API.post("/notes", noteData);
    }
    refreshNotes();
  };

  const deleteNote = async () => {
    if (!note) return;
    await API.delete(`/notes/${note._id}`);
    setShowDeleteConfirm(false);
    refreshNotes();
  };

  const duplicateNote = async () => {
    if (!note) return;
    await API.post("/notes", { 
      title: `${title} (Copy)`, 
      content, 
      tags, 
      color, 
      pinned: false 
    });
    refreshNotes();
  };

  const exportNote = (format) => {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${title || 'note'}-${timestamp}`;
    
    if (format === 'txt') {
      const text = `${title}\n${'='.repeat(title.length)}\n\n${content}`;
      downloadFile(text, `${filename}.txt`, 'text/plain');
    } else if (format === 'md') {
      const markdown = `# ${title}\n\n${content}`;
      downloadFile(markdown, `${filename}.md`, 'text/markdown');
    } else if (format === 'json') {
      const json = JSON.stringify({ title, content, tags, createdAt: note?.createdAt, updatedAt: note?.updatedAt }, null, 2);
      downloadFile(json, `${filename}.json`, 'application/json');
    }
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const applyTemplate = (template) => {
    setContent(template.content);
    setTitle(template.name === 'Blank' ? '' : template.name);
    setShowTemplates(false);
  };

  const wordCount = content.trim().split(/\s+/).filter(word => word.length > 0).length;
  const charCount = content.length;
  const currentColor = NOTE_COLORS.find(c => c.name === color) || NOTE_COLORS[0];

  return (
    <div className={`${currentColor.bg} rounded-2xl shadow-2xl p-8 h-full flex flex-col border-2 ${currentColor.border}`}>
      {/* Header with Note Info and Actions */}
      <div className="mb-4 pb-4 border-b border-gray-300">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {/* Pin Toggle */}
            <button
              onClick={() => setPinned(!pinned)}
              className={`text-2xl hover:scale-110 transition duration-200 ${pinned ? 'text-yellow-500' : 'text-gray-400'}`}
              title={pinned ? "Unpin note" : "Pin note"}
            >
              📌
            </button>
            
            {/* Color Picker */}
            <div className="relative">
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition duration-200"
                title="Change color"
              >
                🎨 Color
              </button>
              {showColorPicker && (
                <div className="absolute top-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-xl p-3 z-10">
                  <div className="grid grid-cols-3 gap-2">
                    {NOTE_COLORS.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => { setColor(c.name); setShowColorPicker(false); }}
                        className={`${c.bg} border-2 ${c.border} rounded-lg p-2 hover:scale-105 transition duration-200 ${color === c.name ? 'ring-2 ring-emerald-500' : ''}`}
                        title={c.label}
                      >
                        <div className="w-8 h-8"></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Template Button */}
            {!note && (
              <button
                onClick={() => setShowTemplates(!showTemplates)}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition duration-200"
              >
                📋 Templates
              </button>
            )}

            {/* Export Dropdown */}
            {note && (
              <div className="relative group">
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition duration-200">
                  📥 Export
                </button>
                <div className="absolute top-full mt-2 bg-white border-2 border-gray-300 rounded-lg shadow-xl p-2 hidden group-hover:block z-10">
                  <button onClick={() => exportNote('txt')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm">
                    📄 Text (.txt)
                  </button>
                  <button onClick={() => exportNote('md')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm">
                    📝 Markdown (.md)
                  </button>
                  <button onClick={() => exportNote('json')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm">
                    🔧 JSON (.json)
                  </button>
                </div>
              </div>
            )}

            {/* Duplicate Button */}
            {note && (
              <button
                onClick={duplicateNote}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition duration-200"
                title="Duplicate note"
              >
                📋 Duplicate
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {note && (
              <>
                <span className="text-sm text-gray-600">
                  Last edited: {new Date(note.updatedAt).toLocaleString()}
                </span>
                {note.collaborators && note.collaborators.length > 0 && (
                  <span className="flex items-center gap-1 text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <span>👥</span>
                    <span>{note.collaborators.length} collaborator{note.collaborators.length !== 1 ? 's' : ''}</span>
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* Tags Section */}
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm border border-emerald-300"
            >
              <span>🏷️ {tag}</span>
              <button
                onClick={() => removeTag(tag)}
                className="text-emerald-600 hover:text-emerald-800 font-bold"
              >
                ×
              </button>
            </span>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Add tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTag()}
              className="bg-white border border-gray-300 px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={addTag}
              className="text-emerald-600 hover:text-emerald-700 font-bold text-xl"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Templates Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowTemplates(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose a Template</h3>
            <div className="grid grid-cols-2 gap-4">
              {TEMPLATES.map((template) => (
                <button
                  key={template.name}
                  onClick={() => applyTemplate(template)}
                  className="text-left p-4 border-2 border-gray-300 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition duration-200"
                >
                  <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-500 line-clamp-3">{template.content || 'Start from scratch'}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <input
        className="bg-white border-2 border-gray-300 p-4 w-full mb-4 rounded-lg text-xl font-semibold text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="bg-white border-2 border-gray-300 p-4 w-full mb-4 rounded-lg flex-1 resize-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono"
        placeholder="Start writing your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Stats Bar */}
      <div className="mb-4 text-sm text-gray-600 flex items-center justify-between bg-white rounded-lg p-3 border border-gray-300">
        <div className="flex items-center gap-4">
          {!note && <span className="text-emerald-600 font-medium">✨ New note</span>}
          {pinned && <span className="text-yellow-600 font-medium">📌 Pinned</span>}
          {tags.length > 0 && <span className="text-gray-500">{tags.length} {tags.length === 1 ? 'tag' : 'tags'}</span>}
        </div>
        <div>
          {wordCount} words • {charCount} characters
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={saveNote}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-lg"
        >
          💾 Save Note
        </button>

        {note && (
          <>
            <button
              onClick={() => setShowCollaborators(true)}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-lg"
            >
              👥 Collaborators
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200 shadow-lg"
            >
              🗑️ Delete
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowDeleteConfirm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Delete Note?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{title || 'Untitled Note'}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={deleteNote}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition duration-200"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
