const express = require("express");
const router = express.Router();

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes,
  addCollaborator
} = require("../controllers/noteController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createNote);
router.get("/", auth, getNotes);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);
router.get("/search", auth, searchNotes);
router.post("/:id/collaborators", auth, addCollaborator);

module.exports = router;