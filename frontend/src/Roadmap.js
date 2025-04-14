
import React, { useState, useEffect } from "react";
import axios from "axios";
import roadmap1 from './components/roadmap.gif';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import roadmapbg from "./components/roadmap.jpg";
import roadmaping from "./roadmapicon.json";
import Lottie from "lottie-react";
// import bgstatic from "./components/roadmapbg.jpg"

function Roadmap() {
    const [topic, setTopic] = useState("");
    const [weeks, setWeeks] = useState(4); // Default to 4 weeks
    const [difficulty, setDifficulty] = useState("Beginner");
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
                weeks ,
                difficulty
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
            <div
  style={{
    width: "100vw",
    background: "linear-gradient(135deg, #0d0d0d, #1f1a2f, #2e2644)",
    color: "#ffffff",
    padding: "20px 40px",
    position: "fixed",
    top: "90px",
    left: "0",
    zIndex: "1000",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    display: "flex",
    justifyContent: "center", // Center content horizontally
    height:"150px"
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Iceland",
      gap: "20px",
    }}
  >
    {/* Optional Lottie animation */}
    {/* 
    <Lottie 
      animationData={roadmaping} 
      style={{ width: 100, height: 100 }} 
    /> 
    */}

    <div
      style={{
        fontSize: "50px",
        fontWeight: "700",
        lineHeight: "1",
      }}
    >
      🚀 Roadmaps
    </div>
  </div>
</div>



             {/* Section with Image on Left & Description on Right */}
             <div style={{ 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: "200px", 
    padding: "40px",
    // background: "linear-gradient(135deg, #0d0d0d, #1f1a2f, #2e2644)",
    borderRadius: "20px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
    maxWidth: "1200px",
    marginLeft: "auto",
    marginRight: "auto"
}}>
    {/* Image */}
    <img 
        src={roadmap1} 
        alt="Roadmap Illustration" 
        style={{ width: "40%", borderRadius: "15px", marginRight: "30px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)" }}
    />

    {/* Description */}
    <div style={{ 
        width: "60%", 
        padding: "30px", 
        background: "linear-gradient(135deg, #0d0d0d, #1f1a2f, #2e2644)", 
        borderRadius: "15px", 
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(12px)",
        color: "#ffffff",
        fontFamily: "Rasa"
    }}>
        <h3 style={{ fontSize: "32px", marginBottom: "20px", fontWeight: "bold" }}>
            📚 Plan Your Learning Journey
        </h3>

        <h4 style={{ fontSize: "22px", marginBottom: "15px", color: "#ddd" }}>
            How It Works:
        </h4>

        <ul style={{ fontSize: "17px", lineHeight: "1.8", paddingLeft: "25px", color: "#ccc" }}>
            <li><strong>📌 Enter a Topic:</strong> Choose any subject you want to learn, e.g., <em>Machine Learning</em> or <em>Web Development</em>.</li>
            <li><strong>⏳ Select a Duration and Difficulty:</strong> Pick the number of weeks you want to complete your study in and the level of understanding.</li>
            <li><strong>📅 Generate Your Roadmap:</strong> Get a structured, step-by-step plan to cover key concepts efficiently.</li>
        </ul>

        <p style={{ fontSize: "17px", marginTop: "25px", fontWeight: "bold", color: "#fff", textAlign: "center" }}>
            🚀 Stay focused, organized, and make consistent progress toward your learning goals!
        </p>
    </div>
</div>

            {/* Main Content */}
            <div style={{ padding: "20px", textAlign: "center", marginTop: "20px", marginBottom:"150px" }}>
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

                <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{ padding: "10px", marginRight: "10px" }}
                >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                </select>

    
                <button
                    onClick={handleGenerateRoadmap}
                    style={{
                        padding: "10px",
                        backgroundColor: "#2e2644",
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
    width: "100vw", // ensure full screen width
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: roadmap
      ? `url(${roadmapbg}) no-repeat center center/cover`
      : "none",
    padding: roadmap ? "40px 20px" : "0",
    margin: "0",
    overflow: "hidden", // avoids unwanted scrollbars
    backgroundAttachment: "fixed", // optional: makes background fixed on scroll for a parallax-like effect
  }}
  
>
{roadmap && (
  <div
    id="roadmap-content"
    style={{
      textAlign: "left",
      maxWidth: "1000px",
      background: "rgba(20, 20, 30, 0.7)", // Slightly more opaque for readability
      backdropFilter: "blur(20px)",
      padding: "40px",
      borderRadius: "24px",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6)",
      fontSize: "28px",
      lineHeight: "2",
      color: " #f0f0f0",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease-in-out",
      animation: "fadeIn 0.6s ease-out",
      zIndex: "10",
      fontFamily: "Rasa",
    }}
  >
    <h3
      style={{
        textAlign: "center",
        fontSize: "40px",
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: "25px",
        letterSpacing: "2px",
        textShadow: "2px 2px 12px rgba(255, 255, 255, 0.15)",
        paddingBottom: "12px",
        borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      🚀 Your Personalized Study Roadmap
    </h3>

    <div
      style={{
        padding: "20px 0",
        fontSize: "20px",
        color: " #e0e0e0",
        lineHeight: "2",
        letterSpacing: "0.5px",
        fontWeight: "400",
        wordBreak: "break-word",
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
                                            backgroundColor: "#2e2644",
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
