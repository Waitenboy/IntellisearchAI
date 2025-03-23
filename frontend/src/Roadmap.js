

import React, { useState, useEffect } from "react";
import axios from "axios";
import roadmap1 from './components/roadmap.gif';


import jsPDF from "jspdf";
import html2canvas from "html2canvas";





function Roadmap() {
    const [topic, setTopic] = useState("");
    const [weeks, setWeeks] = useState(4); // Default to 4 weeks
    const [roadmap, setRoadmap] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when the component loads
    }, []);

    const handleDownloadPDF = async () => {
        const roadmapElement = document.getElementById("roadmap-content");
        
        if (!roadmapElement) {
            alert("No roadmap to download. Please generate a roadmap first.");
            return;
        }
    
        try {
            const canvas = await html2canvas(roadmapElement, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
    
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190; // A4 width
            const pageHeight = 297; // A4 height in mm
            const marginTop = 10; // Leave some space at the top
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
    
            let yPosition = marginTop; // Start below the top margin
    
            let currentPage = 1;
            while (yPosition < imgHeight) {
                pdf.addImage(imgData, "PNG", 10, yPosition * -1 + marginTop, imgWidth, imgHeight);
    
                if (yPosition + pageHeight < imgHeight) {
                    pdf.addPage();
                    yPosition += pageHeight; // Move to the next section
                } else {
                    break; // Stop if all content fits
                }
            }
    
            pdf.save("Study_Roadmap.pdf");
    
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    };

    const handleGenerateRoadmap = async () => {
        if (!topic.trim()) {
            setError("Please enter a study topic.");
            return;
        }

        setLoading(true);
        setError(null);
        setRoadmap("");

        try {
            const response = await axios.post("http://localhost:5000/api/roadmap", { 
                topic, 
                weeks 
            });

            setRoadmap(response.data.roadmap);
        } catch (err) {
            setError("Failed to generate roadmap. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div>
            {/* Full-width Heading */}
            <div style={{
                width: "100vw",
                height: "100px", // Increased height
                backgroundColor: "rgb(206, 101, 101)",
                color: "white",
                padding: "25px 20px", // Increased padding
                textAlign: "left",
                fontSize: "40px",
                fontWeight: "bold",
                position: "fixed",
                top: "70px",
                left: "0",
                zIndex: "1000"
            }}>

                Roadmaps
            </div>

             {/* Section with Image on Left & Description on Right */}
        <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            marginTop: "100px", 
            padding: "20px"
        }}>
            {/* Image */}
            <img 
                src={roadmap1} 
                alt="Roadmap Illustration" 
                style={{ width: "40%", borderRadius: "10px", marginRight: "20px" }}
            />

            {/* Description */}
<div style={{ width: "50%", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
    <h3 style={{ fontSize: "35px", marginBottom: "15px", fontWeight: "bold", color: "#333" }}>
        📚 Plan Your Learning Journey
    </h3>

    <h4 style={{ fontSize: "22px", marginBottom: "10px", color: "#444" }}>
        How It Works:
    </h4>
    <ul style={{ fontSize: "17px", lineHeight: "1.8", paddingLeft: "25px", color: "#555" }}>
        <li><strong>📌 Enter a Topic:</strong> Choose any subject you want to learn, e.g., <em>Machine Learning</em> or <em>Web Development</em>.</li>
        <li><strong>⏳ Select a Duration:</strong> Pick the number of weeks you want to complete your study in.</li>
        <li><strong>📅 Generate Your Roadmap:</strong> Get a structured, step-by-step plan to cover key concepts efficiently.</li>
    </ul>

    <p style={{ fontSize: "17px", marginTop: "20px", fontWeight: "bold", color: "#222", textAlign: "center" }}>
        🚀 Stay focused, organized, and make consistent progress toward your learning goals!
    </p>
</div>


        </div>

    
            {/* Main Content */}
            <div style={{ padding: "20px", textAlign: "center", marginTop: "20px" }}>
            <input
                    type="text"
                    placeholder="Enter a topic (e.g., Machine Learning)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "700px",
                        marginRight: "10px",
                        border: "2px solid black", // Black border
                        borderRadius: "5px" // Optional: Adds rounded corners
                    }}
                />

    
                {/* Dropdown for Weeks Selection */}
                <select
                    value={weeks}
                    onChange={(e) => setWeeks(Number(e.target.value))}
                    style={{ padding: "10px", marginRight: "10px" }}
                >
                    {[...Array(12).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1} {i === 0 ? "week" : "weeks"}
                        </option>
                    ))}
                </select>
    
                <button
                    onClick={handleGenerateRoadmap}
                    style={{ padding: "10px", backgroundColor: "rgb(206, 101, 101)", color: "white", border: "none", cursor: "pointer" }}
                >
                    Generate Roadmap
                </button>
                
                {loading && <p>Generating roadmap...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                
                                    {roadmap && (
                        <div id="roadmap-content"
                            style={{
                                marginTop: "50px",
                                textAlign: "left",
                                maxWidth: "700px",
                                margin: "auto",
                                backgroundColor: "#f9f9f9",
                                padding: "20px",
                                borderRadius: "12px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                                fontSize: "16px",
                                lineHeight: "1.8",
                                color: "#333",
                            }}
                        >
                            <h3
                                style={{
                                    textAlign: "center",
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#444",
                                    marginBottom: "15px",
                                }}
                            >
                                📍 Your Personalized Study Roadmap
                            </h3>
                            <div dangerouslySetInnerHTML={{ __html: roadmap }} />
                            

                        </div>
                        
                    )}
                    {/* Download Button */}
                    <button
                                        onClick={handleDownloadPDF}
                                        style={{
                                            marginTop: "20px",
                                            padding: "10px 20px",
                                            backgroundColor: "rgb(206, 101, 101)",
                                            color: "white",
                                            border: "none",
                                            cursor: "pointer",
                                            borderRadius: "5px",
                                            display: "block",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                        }}
                                    >
                                        📥 Download Roadmap
                                    </button>

            </div>
        </div>
    );
    
}

export default Roadmap;
