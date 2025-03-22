const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// ✅ Bookmark Schema
const bookmarkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    query: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

// ✅ Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ error: "Access Denied" });

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = decoded;
        next();
    });
};

// ✅ Save a bookmark
router.post("/bookmarks", verifyToken, async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return res.status(400).json({ error: "Query is required" });

        const newBookmark = new Bookmark({ userId: req.user.id, query });
        await newBookmark.save();
        res.status(201).json({ message: "Bookmark saved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Fetch user's bookmarks
router.get("/bookmarks", verifyToken, async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.json(bookmarks);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Delete a bookmark
router.delete("/bookmarks/:id", verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const bookmark = await Bookmark.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!bookmark) return res.status(404).json({ error: "Bookmark not found" });
        res.json({ message: "Bookmark deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
