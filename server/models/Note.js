const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  
  tags: [String],
  color: {
    type: String,
    default: 'gray'
  },
  pinned: {
    type: Boolean,
    default: false
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  collaborators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]

}, { timestamps: true });

noteSchema.index({ title: "text", content: "text" });

module.exports = mongoose.model("Note", noteSchema);