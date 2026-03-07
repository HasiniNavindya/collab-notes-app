const Note = require("../models/Note");

// Create Note
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.create({
      title,
      content,
      owner: req.user
    });

    res.status(201).json(note);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get Notes
exports.getNotes = async (req, res) => {
  try {

    const notes = await Note.find({
      $or: [
        { owner: req.user },
        { collaborators: req.user }
      ]
    }).populate("owner collaborators", "name email");

    res.json(notes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update Note
exports.updateNote = async (req, res) => {
  try {

    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    if (
      note.owner.toString() !== req.user &&
      !note.collaborators.includes(req.user)
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    await note.save();

    res.json(note);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Delete Note
exports.deleteNote = async (req, res) => {
  try {

    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ message: "Note not found" });

    if (note.owner.toString() !== req.user) {
      return res.status(403).json({ message: "Only owner can delete" });
    }

    await note.deleteOne();

    res.json({ message: "Note deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search Notes
exports.searchNotes = async (req, res) => {
  try {

    const query = req.query.q;

    const notes = await Note.find({
      $text: { $search: query },
      $or: [
        { owner: req.user },
        { collaborators: req.user }
      ]
    });

    res.json(notes);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};