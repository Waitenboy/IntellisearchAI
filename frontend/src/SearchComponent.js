

import React, { useState,useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import pdfpic from "./components/pdfpic.jpg";
import { useNavigate } from "react-router-dom";

const SearchComponent = () => {
    const [query, setQuery] = useState("");
    const [youtubeResults, setYoutubeResults] = useState([]);
    const [googleResults, setGoogleResults] = useState([]);
    const [summary, setSummary] = useState("");
    const [quiz, setQuiz] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const [resultMessage, setResultMessage] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("fr"); // Default to French
    const [translatedSummary, setTranslatedSummary] = useState("");
    const [similarTopics, setSimilarTopics] = useState([]);
    // const [loadingQuiz, setLoadingQuiz] = useState(false);

    const [hasSearched, setHasSearched] = useState(false); // Track if search has been performed

    const handleSearchAndShowTranslate = () => {
        if (query.trim()) {
            fetchResults(query); // Assuming this is your function for fetching search results
            setHasSearched(true); // Mark that search has been performed
        }
    };
    

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/quiz?topic=${encodeURIComponent(query)}`);
        }
    };
    

    const handleSpeechInput = () => {
        console.log("Speech input activated");
        const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
        recognition.lang = "en-US";
        recognition.start();
        setIsListening(true);

        recognition.onresult = (event) => {
            const spokenText = event.results[0][0].transcript;
            setQuery(spokenText);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };
    };


    

    const fetchResults = async (searchQuery = null) => {

        const queryToUse = searchQuery || query;
        console.log(queryToUse);
        if (!queryToUse) return;
        setLoading(true);
        setError("");
        setSummary("");
        setQuiz(null);
        setSelectedAnswer("");
        setTranslatedSummary("");
        setLoading(true);
        saveSearchHistory(query);
        setSimilarTopics([]);

        try {
            const [ytRes, googleRes] = await Promise.all([
                axios.get(`http://localhost:5000/api/youtube?q=${queryToUse}`),
                axios.get(`http://localhost:5000/api/google?q=${queryToUse}`)
            ]);

            setYoutubeResults(ytRes.data);
            setGoogleResults(googleRes.data);

            try {
                console.log(queryToUse);
                const aiRes = await axios.post("http://localhost:5000/api/summary", { topic: queryToUse });
                console.log(queryToUse);
                // Remove the first line
                const cleanedText = aiRes.data.summary.replace(/^Summarize the following.*?\n/, "").trim();
            
                // Split summary and related topics
                const parts = cleanedText.split("Related topics:");
                const cleanedSummary = parts[0].trim(); // Extract the main summary
            
                let relatedTopics = [];
                if (parts[1]) {
                    relatedTopics = parts[1]
                        .split(",") // Split by commas
                        .map(topic => topic.trim()) // Remove whitespace
                        .filter(topic => topic.length > 0); // Remove empty strings
                }
            
                setSummary(cleanedSummary || "Summary not available");
                setSimilarTopics(relatedTopics);
            } catch {
                setSummary("AI Summary is currently unavailable.");
                setSimilarTopics([]); // Reset similar topics on error
            }
            
            setLoading(true);

        } catch {
            setError("Failed to fetch data. Please try again.");
            setQuiz([]);
        } finally {
            setLoading(false);
        }
    };

    

    const handleTranslate = async () => {
        if (!summary) {
            alert("Please generate a summary first!");
            return;
        }

        console.log("Translating summary to:", selectedLanguage);
        setTranslatedSummary("Translating...");

        try {
            const translateRes = await axios.post("http://localhost:5000/api/translate", {
                summary,
                targetLanguages: [selectedLanguage] // Sending an array
            });

            if (translateRes.data.translations && translateRes.data.translations[selectedLanguage]) {
                console.log("Translation received:", translateRes.data.translations[selectedLanguage]);
                setTranslatedSummary(translateRes.data.translations[selectedLanguage]);
            } else {
                setTranslatedSummary("Translation failed.");
            }
        } catch (error) {
            console.error("Error translating summary:", error);
            setTranslatedSummary("Translation unavailable.");
        }
    };


    const downloadPDF = () => {
        const doc = new jsPDF();
    
        // Load parchment-style background
        const img = new Image();
        img.src = pdfpic; // Ensure this image is accessible
    
        img.onload = () => {
            //doc.addImage(img, "JPEG", 0, 0, 210, 297); // Full A4 background
            // **Set Background Color**
            doc.setFillColor("white"); // Light gray background (RGB)
            doc.rect(0, 0, 210, 297, "F"); // A4 size (210mm x 297mm), "F" fills the rectangle
            // Load and add logo
            const logo = new Image();
            logo.src = "/logo512.png"; // Public folder image
    
            logo.onload = () => {
                // **Logo Placement**
                doc.addImage(logo, "PNG", 18, 13, 11, 11); // Adjusted for better proportions
    
                // **Styled "IntelliSearch" Title**
                doc.setFont("monospace", "bold");
                doc.setFontSize(17); // Equivalent to h6 but slightly larger for visibility
                doc.setTextColor(0, 0, 0); // Black color
                const title = "IntelliSearch";
                let xPos = 30; // Starting position
                const spacing = 1.5; // Adjust spacing (play around with this value)

                for (let i = 0; i < title.length; i++) {
                    doc.text(title[i], xPos, 20);
                    xPos += doc.getTextWidth(title[i]) + spacing; // Move X position with spacing
                }

                // **Add a Separator Line Below "IntelliSearch"**
                doc.setLineWidth(0.8); // Thin line for aesthetics
                doc.line(20, 27, 190, 27); // Draws a line across the page
   
                // **Topic Underline**
                doc.setFont("monospace")
                doc.setFontSize(20);
                doc.text(`Topic: ${query}`, 25, 40, { align: "left" });
                doc.setLineWidth(0.8);
                doc.line(20, 50, 190, 50); // Underline
    
                // **Summary Content Formatting**
                doc.setFontSize(13);
                doc.setFont("monospace", "bold");
                let marginLeft = 25;
                let marginTop = 60;
                let maxWidth = 170;
                let lineHeight = 8;
    
                doc.text("Original Summary:", marginLeft, marginTop);
                marginTop += 6;
                doc.text(summary, marginLeft, marginTop, { maxWidth: maxWidth, align: "justify", lineHeightFactor: 1.5 });
    
                marginTop += 10 + doc.splitTextToSize(summary, maxWidth).length * lineHeight;
    
                if (translatedSummary) {
                    doc.setFontSize(13);
                    doc.setFont("times", "bold");
                    doc.text("Translated Summary:", marginLeft, marginTop);
                    marginTop += 6;
                    doc.setFont("times", "normal");
                    doc.text(translatedSummary, marginLeft, marginTop, { maxWidth: maxWidth, align: "justify", lineHeightFactor: 1.5 });
                }
    
                // **Footer**
                doc.setFontSize(12);
                doc.setFont("courier", "italic");
                doc.text("Generated by IntelliSearch", 20, 280);
    
                // **Date Placement**
                let currentDate = new Date().toLocaleDateString();
                doc.setFontSize(12);
                doc.setFont("helvetica", "italic");
                doc.text(`Date: ${currentDate}`, 170, 280); // Aligned properly
    
                // Save PDF
                doc.save(`${query}.pdf`);
            };
    
            logo.onerror = () => {
                console.error("Failed to load logo.");
                alert("Error: Unable to load logo. Check file path.");
            };
        };
    
        img.onerror = () => {
            console.error("Failed to load background image.");
            alert("Error: Unable to load parchment background. Check file path.");
        };
    };
    
    

    const saveSearchHistory = async (query) => {
        const userId = localStorage.getItem("userId");
        if (!userId) return;
    
        try {
            const response = await fetch(`http://localhost:5000/api/user/${userId}/save-history`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ searchQuery: query }),
            });
    
            const data = await response.json();
            console.log("✅ Updated History:", data.searchHistory);
        } catch (err) {
            console.error("❌ Error saving history:", err);
        }
    };
    
    const navigate = useNavigate();
    
    return (
        <div style={styles.container}>
            {/* Search Bar & Speak Icon in a Row */}
    <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center" }}>
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter a topic..."
            style={styles.searchBox}
        />

        {/* Speak Button (Always Visible) */}
        <button onClick={handleSpeechInput} style={styles.micButton}>
            🎤
        </button>
    </div>

    {/* Search Button Below the Input Field */}
    <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={handleSearchAndShowTranslate} disabled={loading} style={styles.searchButton}>
            {loading ? "Searching..." : "Search"}
        </button>
    </div>

    {/* Show Translate Section Only After Search */}
    {hasSearched && (
        <div style={{ marginTop: "15px", textAlign: "center" }}>
            <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)} style={styles.dropdown}>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                {/* <option value="hi">Hindi</option> */}
                <option value="de">German</option>
                <option value="zh">Chinese</option>
            </select>
            <button onClick={handleTranslate} style={styles.translateButton}>Translate</button>
        </div>
    )}



        {summary && (
            <div style={styles.section}>
                <h3 style={{ ...styles.heading, fontWeight: "bold" }}>AI Summary</h3>
                <p style={{ color: "rgb(249, 247, 255)", fontSize: "16px", lineHeight: "1.6" }}>{summary}</p>
            </div>
        )}

        {translatedSummary && (
            <div style={styles.section}>
                <h3 style={{ ...styles.heading, fontWeight: "bold" }}>Translated Summary</h3>
                <p style={{ color: "rgb(255, 255, 255)", fontSize: "16px", lineHeight: "1.6" }}>{translatedSummary}</p>
            </div>
        )}

<div style={{ textAlign: "center", marginTop: "20px" }}>
  <button
    onClick={handleSearch}
    disabled={!query.trim()}
    style={{
      padding: "14px 28px",
      fontSize: "20px",
      fontFamily: "monospace",
      fontWeight: "600",
      background: query.trim()
        ? "linear-gradient(135deg, #8E2DE2, #4A00E0)"
        : "linear-gradient(135deg, #444, #333)",
      color: "#fff",
      border: "1px solid rgba(255,255,255,0.15)",
      borderRadius: "14px",
      cursor: query.trim() ? "pointer" : "not-allowed",
      boxShadow: query.trim()
        ? "0 8px 20px rgba(142,45,226,0.3)"
        : "none",
      transition: "all 0.3s ease-in-out",
      backdropFilter: "blur(5px)",
    }}
    onMouseOver={(e) => {
      if (query.trim()) {
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 12px 24px rgba(142,45,226,0.4)";
      }
    }}
    onMouseOut={(e) => {
      e.target.style.transform = "translateY(0)";
      e.target.style.boxShadow = "0 8px 20px rgba(142,45,226,0.3)";
    }}
  >
    🚀 Take a quiz!
  </button>
</div>


            
            {similarTopics.length > 0 && (
                <div style={{ marginTop: "20px", padding: "10px", background: "linear-gradient(135deg, #1a1a1a, #2c2c2c)", borderRadius: "5px" }}>
                    <h3 style={{ fontWeight: "bold", color: "white" }}>Related Topics:</h3>
                    <div>
                        {similarTopics.map((topic, index) => (
                            <p 
                                key={index} 
                                style={{ color: "white", margin: "5px 0", cursor: "pointer", textDecoration: "underline" }} 
                                onClick={() => {
                                    console.log("Clicked topic:", topic);
                                    setQuery(topic); // Update search bar
                                    fetchResults(topic);
                                    
                                    
                                }}
                                
                            >
                                {topic}
                            </p>
                        ))}
                    </div>
                </div>
            )}


            {youtubeResults.length > 0 && (
                <div style={styles.section}>
                    <h3 style={{ ...styles.heading, fontWeight: "bold" }}>YouTube Results</h3>

                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {youtubeResults.slice(0, 5).map(video => (
                            <li key={video.videoId} style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
                                <a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "white" }}>
                                    <img src={video.thumbnail} alt={video.title} style={{ width: "120px", height: "90px", marginRight: "10px", borderRadius: "5px" }} />
                                    <span>{video.title}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}



            {googleResults.length > 0 && (
                <div style={styles.section}>
                    <h3 style={{ ...styles.heading, fontWeight:"bold"}}>Top Google Results</h3>
                    <ul>
                        {googleResults.slice(0, 5).map(result => ( // Slice the first 5 results
                            <li key={result.link}>
                                <a href={result.link} target="_blank" rel="noopener noreferrer" style={{ color: "white", textDecoration: "none" }}>
                                    {result.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}


            {summary || youtubeResults.length || googleResults.length ? (
                <button onClick={downloadPDF} style={styles.pdfButton}>
                    Download PDF
                </button>
            ) : null}
        </div>
    );
};

const styles = {
    translateButton: {
        padding: "8px",  // Reduced padding for a smaller button
        fontSize: "14px", // Slightly smaller font
        cursor: "pointer",
        marginLeft: "8px", // Slightly reduced margin
        background: "linear-gradient(135deg, #8E2DE2, #4A00E0)",
        color: "#fff",
        

    },
    
    
    dropdown: { padding: "8px", fontSize: "16px", cursor: "pointer", marginLeft: "10px" },
    container: {
        fontFamily: "monospace",
        background: "rgba(255, 255, 255, 0.2)", // semi-transparent white
        backdropFilter: "blur(10px)", // adds a blur behind the box
        WebkitBackdropFilter: "blur(10px)", // for Safari support
        padding: "30px",
        borderRadius: "16px",
        maxWidth: "900px",
        margin: "40px auto",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)", // soft modern shadow
        border: "1px solid rgba(255, 255, 255, 0.18)", // light border
    },
    
    searchBox: {
        width: "100%",
        padding: "14px 18px",
        fontSize: "16px",
        fontWeight: 500,
        borderRadius: "14px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        color: "white",
        outline: "none",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        marginBottom: "24px",
        transition: "all 0.3s ease",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        letterSpacing: "0.5px",
        caretColor: "#fff",
        "::placeholder": {
          color: "rgba(255, 255, 255, 0.5)",
        }
    },
    searchButton: {
        width: "100%",
        padding: "14px",
        fontSize: "16px",
        fontWeight: 600,
        background: "linear-gradient(135deg, #8E2DE2, #4A00E0)",
        color: "#fff",
        border: "none",
        borderRadius: "14px",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
        boxShadow: "0 8px 24px rgba(142, 45, 226, 0.35)",
        letterSpacing: "0.7px",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0 12px 32px rgba(142, 45, 226, 0.45)",
            background: "linear-gradient(135deg, #9F44D3, #5732C6)"
        },
        "&:disabled": {
            cursor: "not-allowed",
            opacity: 0.6,
            boxShadow: "none",
            background: "linear-gradient(135deg, #444, #333)"
        }
    },
    
        
    micButton: {
        marginLeft: "8px",
        padding: "8px",  // Reduced padding for a smaller button
        fontSize: "34px", // Slightly smaller font
        backgroundColor: "transparent",
        color: "white",
        border: "none",
        borderRadius: "4px", // Slightly smaller border radius
        cursor: "pointer",
    
    },
    pdfButton: {
        width: "100%",
        padding: "12px",
        fontSize: "18px",
        background: "linear-gradient(135deg, #8E2DE2, #4A00E0)",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "15px",
    },
    section: {
        marginTop: "20px",
        padding: "20px",
        background: "linear-gradient(135deg, #1a1a1a, #2c2c2c)", // Dark gradient background
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.6)", // Deeper shadow for depth
        border: "1px solid rgba(255, 255, 255, 0.1)" // Soft border
    },
    heading: {
        fontSize: "24px",
        color: "white",
        background: "linear-gradient(90deg, #ffffff, #d0a9f5)", // White to light purple gradient
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontWeight: "bold",
        marginBottom: "15px",
        letterSpacing: "1px",
        textShadow: "2px 2px 6px rgba(255, 255, 255, 0.1)"
    },
    
    quizContainer: {
        textAlign: "center",
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        width: "50%",
        margin: "auto",
        background: "#f9f9f9"
    },
    quizOptions: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    quizOption: {
        margin: "5px 0",
        display: "flex",
        alignItems: "center",
        gap: "10px"
    },
};

export default SearchComponent;


