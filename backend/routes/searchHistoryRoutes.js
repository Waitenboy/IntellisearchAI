const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure this model is correctly set up

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Temporary storage for search history (used if no authentication is required)
let globalSearchHistory = [];

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

// ✅ Save search history (supports both authenticated users & global storage)
router.post("/api/search-history", async (req, res) => {
    const { query } = req.body;  // Ensure request body is correctly structured
    if (!query) return res.status(400).json({ error: "Search query is required" });

    try {
        if (req.headers.authorization) {
            // If user is authenticated, store history in User model
            const user = await User.findById(req.user.id);
            if (!user) return res.status(404).json({ error: "User not found" });

            user.searchHistory.unshift(query); // Add new search at the beginning
            if (user.searchHistory.length > 10) user.searchHistory.pop(); // Keep only last 10 searches

            await user.save();
            return res.json({ message: "Search saved successfully", searchHistory: user.searchHistory });
        } else {
            // If no authentication, store globally
            globalSearchHistory.unshift(query);
            if (globalSearchHistory.length > 10) globalSearchHistory.pop();

            return res.json({ message: "Search saved successfully", searchHistory: globalSearchHistory });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Fetch search history
router.get("/api/search-history", async (req, res) => {
    try {
        if (req.headers.authorization) {
            const user = await User.findById(req.user.id);
            if (!user) return res.status(404).json({ error: "User not found" });

            return res.json({ searchHistory: user.searchHistory });
        } else {
            return res.json({ searchHistory: globalSearchHistory });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

// ✅ Clear search history
router.delete("/api/search-history", async (req, res) => {
    try {
        if (req.headers.authorization) {
            const user = await User.findById(req.user.id);
            if (!user) return res.status(404).json({ error: "User not found" });

            user.searchHistory = [];
            await user.save();
            return res.json({ message: "Search history cleared successfully" });
        } else {
            globalSearchHistory = [];
            return res.json({ message: "Global search history cleared successfully" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
