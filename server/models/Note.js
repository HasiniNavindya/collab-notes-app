const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
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

module.exports = mongoose.model("Note", noteSchema);