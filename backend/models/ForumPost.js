const mongoose = require("mongoose");

const ForumPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User collection
  userName: { type: String, required: true }, // Store username directly for display
  question: { type: String, required: true },
  replies: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      userName: { type: String, required: true },
      replyText: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ForumPost", ForumPostSchema);
