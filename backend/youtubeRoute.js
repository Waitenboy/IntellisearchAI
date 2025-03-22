const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load API key from .env file

const router = express.Router();
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // Store API key in .env

router.get("/youtube", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ error: "Missing search query" });
        }

        if (!YOUTUBE_API_KEY) {
            return res.status(500).json({ error: "YouTube API key is missing" });
        }

        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}&maxResults=10`;

        const response = await axios.get(url);

        // Check if the API response is valid
        if (!response.data || !response.data.items) {
            return res.status(500).json({ error: "Invalid response from YouTube API" });
        }

        // Extract useful information
        const videos = response.data.items.map((video) => ({
            title: video.snippet.title,
            videoId: video.id.videoId,
            channelTitle: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.default.url,
            url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        }));

        res.json(videos);
    } catch (error) {
        console.error("YouTube API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to fetch YouTube videos", details: error.message });
    }
});

module.exports = router;
