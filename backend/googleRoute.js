const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;  // Paste your Google API key in .env file
const SEARCH_ENGINE_ID = process.env.GOOGLE_CX;    // Paste your Search Engine ID (CX code) in .env file

router.get("/google", async (req, res) => {
    try {
        const query = req.query.q;
        const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}`;
        
        const response = await axios.get(url);
        res.json(response.data.items);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Google search results" });
    }
});

module.exports = router;
