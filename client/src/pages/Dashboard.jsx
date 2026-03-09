import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import NoteEditor from "../components/NoteEditor";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [favorites, setFavorites] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [filterTag, setFilterTag] = useState("");
  const navigate = useNavigate();

  const fetchNotes = async () => {
    const res = await API.get("/notes");
    setNotes(res.data);
  };

  const fetchUserProfile = async () => {
    try {
      const res = await API.get("/auth/me");
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Failed to fetch user profile");
    }
  };

  const searchNotes = async () => {
    if (!search.trim()) {
      fetchNotes();
      return;
    }
    const res = await API.get(`/notes/search?q=${search}`);
    setNotes(res.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleFavorite = (noteId) => {
    const newFavorites = favorites.includes(noteId)
      ? favorites.filter(id => id !== noteId)
      : [...favorites, noteId];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const getSortedNotes = () => {
    let sorted = [...notes];
    
    // Filter by tag if selected
    if (filterTag) {
      sorted = sorted.filter(note => note.tags && note.tags.includes(filterTag));
    }
    
    switch (sortBy) {
      case "recent":
        sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        break;
      case "alphabetical":
        sorted.sort((a, b) => (a.title || "Untitled").localeCompare(b.title || "Untitled"));
        break;
      default:
        break;
    }
    return sorted;
  };

  const getAllTags = () => {
    const tagSet = new Set();
    notes.forEach(note => {
      if (note.tags) {
        note.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    fetchNotes();
    fetchUserProfile();
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const allTags = getAllTags();
  const sortedNotes = getSortedNotes();
  const pinnedNotes = sortedNotes.filter(note => note.pinned);
  const unpinnedNotes = sortedNotes.filter(note => !note.pinned);
  const favoriteNotes = unpinnedNotes.filter(note => favorites.includes(note._id));
  const regularNotes = unpinnedNotes.filter(note => !favorites.includes(note._id));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-96 bg-white shadow-2xl flex flex-col border-r border-gray-200">
        {/* User Profile Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-600 to-emerald-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-emerald-600 font-bold text-xl shadow-lg">
                {currentUser?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{currentUser?.name || "User"}</h3>
                <p className="text-emerald-100 text-sm">{currentUser?.email || ""}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm transition duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-2 mb-3">
            <input
              className="bg-gray-50 border border-gray-300 p-3 flex-1 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && searchNotes()}
            />
            <button
              onClick={searchNotes}
              className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-5 rounded-lg transition duration-200 shadow-md font-medium"
            >
              Search
            </button>
          </div>

          <button
            onClick={() => setSelectedNote(null)}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white p-3 w-full rounded-lg transition duration-200 shadow-md font-medium"
          >
            + New Note
          </button>
        </div>

        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setFilterTag("")}
                className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                  filterTag === "" 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag === filterTag ? "" : tag)}
                  className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                    filterTag === tag 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sort and Stats */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-600 font-medium">
              {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
              {pinnedNotes.length > 0 && ` • ${pinnedNotes.length} Pinned`}
              {favorites.length > 0 && ` • ${favorites.length} Favorites`}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 px-3 py-1.5 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="recent">Recent</option>
              <option value="oldest">Oldest</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto p-4">
          {notes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium mb-2">No notes yet</p>
              <p className="text-gray-400 text-sm">Create your first note to get started</p>
            </div>
          ) : (
            <>
              {/* Pinned Notes */}
              {pinnedNotes.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Pinned</h4>
                  {pinnedNotes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      isSelected={selectedNote?._id === note._id}
                      isFavorite={favorites.includes(note._id)}
                      onSelect={() => setSelectedNote(note)}
                      onToggleFavorite={() => toggleFavorite(note._id)}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              )}

              {/* Favorite Notes */}
              {favoriteNotes.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">Favorites</h4>
                  {favoriteNotes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      isSelected={selectedNote?._id === note._id}
                      isFavorite={true}
                      onSelect={() => setSelectedNote(note)}
                      onToggleFavorite={() => toggleFavorite(note._id)}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              )}

              {/* Regular Notes */}
              {regularNotes.length > 0 && (
                <div>
                  {(favoriteNotes.length > 0 || pinnedNotes.length > 0) && (
                    <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">All Notes</h4>
                  )}
                  {regularNotes.map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      isSelected={selectedNote?._id === note._id}
                      isFavorite={false}
                      onSelect={() => setSelectedNote(note)}
                      onToggleFavorite={() => toggleFavorite(note._id)}
                      formatDate={formatDate}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 p-8">
        <NoteEditor note={selectedNote} refreshNotes={fetchNotes} />
      </div>
    </div>
  );
}

// Note Card Component
function NoteCard({ note, isSelected, isFavorite, onSelect, onToggleFavorite, formatDate }) {
  const contentPreview = note.content?.substring(0, 80) || "No content";
  const hasCollaborators = note.collaborators && note.collaborators.length > 0;
  
  const colorClasses = {
    gray: 'bg-gray-50 border-l-gray-400',
    blue: 'bg-blue-50 border-l-blue-400',
    green: 'bg-green-50 border-l-green-400',
    yellow: 'bg-yellow-50 border-l-yellow-400',
    red: 'bg-red-50 border-l-red-400',
    purple: 'bg-purple-50 border-l-purple-400',
  };
  
  const noteColor = note.color || 'gray';
  const colorClass = colorClasses[noteColor] || colorClasses.gray;

  return (
    <div
      className={`p-4 mb-2 cursor-pointer rounded-xl transition duration-200 border-2 border-l-4 ${
        isSelected
          ? `bg-emerald-50 border-emerald-500 ${colorClass.split(' ')[1]}`
          : `${colorClass.split(' ')[0]} hover:bg-gray-50 border-gray-200 hover:border-emerald-300 ${colorClass.split(' ')[1]} shadow-sm hover:shadow-md`
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          {note.pinned && <span className="text-yellow-600 text-xs font-semibold bg-yellow-100 px-2 py-0.5 rounded" title="Pinned">Pinned</span>}
          <h3 className="font-semibold text-gray-900 truncate pr-2">
            {note.title || 'Untitled Note'}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {hasCollaborators && (
            <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {note.collaborators.length}
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className={`text-sm px-2 py-0.5 rounded border transition duration-200 ${
              isFavorite 
                ? 'bg-yellow-100 text-yellow-600 border-yellow-300 hover:bg-yellow-200' 
                : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
            }`}
          >
            {isFavorite ? 'Favorite' : 'Favorite'}
          </button>
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-2 line-clamp-2">{contentPreview}</p>
      
      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {note.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="text-xs text-gray-500">+{note.tags.length - 3}</span>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">{formatDate(note.updatedAt)}</span>
        {hasCollaborators && (
          <span className="text-emerald-600 font-medium">
            {note.collaborators.length} collaborator{note.collaborators.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
}
