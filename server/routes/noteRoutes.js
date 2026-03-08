const express = require("express");
const router = express.Router();

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes,
  addCollaborator,
  getCollaborators,
  removeCollaborator
} = require("../controllers/noteController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createNote);
router.get("/", auth, getNotes);
router.put("/:id", auth, updateNote);
router.delete("/:id", auth, deleteNote);
router.get("/search", auth, searchNotes);
router.post("/:id/collaborators", auth, addCollaborator);
router.get("/:id/collaborators", auth, getCollaborators);
router.delete("/:id/collaborators/:userId", auth, removeCollaborator);

module.exports = router;