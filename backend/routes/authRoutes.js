const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "your_secret_key";  // Change this to a strong secret
const User = require("../models/User");

// Fetch search history
router.get("/history/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user.searchHistory);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add a new search query
router.post("/history/:userId", async (req, res) => {
    try {
        const { query } = req.body;
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.searchHistory.unshift(query); // Add new search at the beginning
        await user.save();
        res.json(user.searchHistory);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Clear search history
router.delete("/history/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.searchHistory = [];
        await user.save();
        res.json({ message: "Search history cleared" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});



// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "User already exists" });

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "Signup successful" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Protected Route Example
router.get("/profile", async (req, res) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        res.json(user);
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
});

module.exports = router;
