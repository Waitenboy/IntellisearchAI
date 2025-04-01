
import React, { useState, useEffect } from "react";
import axios from "axios";
import roadmap1 from './components/roadmap.gif';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import roadmapbg from "./components/roadmapbg.gif";
import bgstatic from "./components/roadmapbg.jpg"

function Roadmap() {
    const [topic, setTopic] = useState("");
    const [weeks, setWeeks] = useState(4); // Default to 4 weeks
    const [roadmap, setRoadmap] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when the component loads
    }, []);

    const spinnerStyle = {
        border: "4px solid rgba(255, 255, 255, 0.3)",
        borderTop: "4px solid #333", // Darker color for the spinner
        borderRadius: "50%",
        width: "30px",
        height: "30px",
        animation: "spin 1s linear infinite",
        marginRight: "10px",
      };
    
      // Adding a <style> element for the keyframes directly in JSX
      const styleElement = (
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      );
    

      const handleDownloadPDF = async () => {
        const roadmapElement = document.getElementById("roadmap-content");
        
        if (!roadmapElement) {
            alert("No roadmap to download. Please generate a roadmap first.");
            return;
        }
    
        try {
            // Wait for custom fonts to be ready before rendering
            await document.fonts.ready; 

             // Create a temporary container with the background image
             const clonedElement = roadmapElement.cloneNode(true);
             clonedElement.style.position = "absolute";
             clonedElement.style.left = "-9999px"; // Move it off-screen
             clonedElement.style.backgroundImage = `url(${roadmapbg})`; // Use static JPG background
             clonedElement.style.backgroundSize = "cover"; // Ensure full coverage
             clonedElement.style.backgroundRepeat = "no-repeat";
             clonedElement.style.backgroundPosition = "center"; // Center the background image

                document.body.appendChild(clonedElement); // Add to DOM for rendering
    
            const canvas = await html2canvas(roadmapElement, { 
                scale: 3, // Increase quality
                backgroundColor: null, // Capture background image
                useCORS: true, // Avoid cross-origin issues if the image is external
            });

            document.body.removeChild(clonedElement); // Clean up after rendering
    
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190;
            const pageHeight = 297;
            const marginTop = 10;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

    
            let yPosition = marginTop;
    
            while (yPosition < imgHeight) {
                pdf.addImage(imgData, "PNG", 10, yPosition * -1 + marginTop, imgWidth, imgHeight);
                if (yPosition + pageHeight < imgHeight) {
                    pdf.addPage();
                    yPosition += pageHeight;
                } else {
                    break;
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
                    style={{
                        padding: "10px",
                        backgroundColor: "rgb(206, 101, 101)",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                        marginRight: "10px", // Adds space between the button and the spinner
                      }}
                >
                    Generate Roadmap
                </button>
                {styleElement}
                {loading && (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center", // Centers the spinner horizontally within its container
      marginTop: "10px", // Adds spacing below the button
    }}
  >
    <div style={spinnerStyle}></div>
    {/* <p style={{ fontSize: "20px", color: "#333", marginLeft: "10px" }}>Generating roadmap...</p> */}
  </div>
)}

                {error && <p style={{ color: "red" }}>{error}</p>}
                <div
    style={{
        minHeight: roadmap ? "100vh" : "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: roadmap ? `url(${roadmapbg}) no-repeat center center/cover` : "none",
        padding: roadmap ? "40px 20px" : "0",
    }}
>
    {roadmap && (
        <div
            id="roadmap-content"
            style={{
                textAlign: "left",
                maxWidth: "850px",
                background: "rgba(255, 255, 255, 0.45)", // Transparent white
                backdropFilter: "blur(15px)", // Glassmorphism effect
                padding: "30px",
                borderRadius: "20px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)", // Soft shadow
                fontSize: "17px",
                lineHeight: "1.8",
                color: "black",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                transition: "all 0.3s ease-in-out",
                animation: "fadeIn 0.6s ease-out",
                zIndex: "10",
            }}
        >
            <h3
                style={{
                    textAlign: "center",
                    fontSize: "32px", // Slightly larger for prominence
                    fontWeight: "bold",
                    color: "rgb(0, 0, 0)", // Keeping black as requested
                    marginBottom: "20px",
                    letterSpacing: "1.5px", // Wider spacing for elegance
                    // textTransform: "uppercase",
                    textShadow: "4px 4px 12px rgba(0, 0, 0, 0.25)", // More prominent text shadow
                    // fontFamily: "Arial, sans-serif", // Modern font
                    lineHeight: "1.3", // Slightly tighter line height for a clean look
                    letterSpacing: "2px", // Added a touch of refinement
                    paddingBottom: "10px",
                    borderBottom: "2px solid rgba(0, 0, 0, 0.2)", // Subtle underline effect for visual impact
                }}
            >
                🚀 Your Personalized Study Roadmap
            </h3>
            <div
                style={{
                    padding: "15px 0",
                    fontSize: "18px", // Slightly increased font size for readability
                    color: "black",
                    lineHeight: "1.8",
                    // fontFamily: "Roboto, sans-serif", // Clean modern font
                    letterSpacing: "0.5px", // Subtle letter spacing for better flow
                    fontWeight: "400", // Regular weight for body text
                    wordBreak: "break-word", // Ensure long words break properly
                }}
                dangerouslySetInnerHTML={{ __html: roadmap }}
            />
        </div>
    )}
</div>


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
