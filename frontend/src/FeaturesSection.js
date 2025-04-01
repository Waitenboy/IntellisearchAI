import React from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { GiAchievement } from "react-icons/gi";
// import { MdHistoryEdu } from "react-icons/md";
import Lottie from "lottie-react";
import dashboard from "./components/dashboard.json";
import badge from "./components/badge.json";
import history from "./components/history.json";

function FeaturesSection() {
    return (
        <section style={{
            backgroundColor: "#eedddd",  
            color: "black",
            padding: "100px 5vw", // Increased padding for more height
            textAlign: "center",
            fontFamily: "monospace",
            width: "100vw", // Full width
            minHeight: "80vh", // Make section at least 80% of screen height
            display: "flex",
            flexDirection: "column",
            justifyContent: "center" // Center content vertically
        }}>
           <h2 style={{
                fontSize: "60px", // Bigger and bolder
                fontWeight: "bold",
                // textTransform: "uppercase",
                color: "black", // Eye-catching color
                textShadow: "3px 3px 6px rgba(0, 0, 0, 0.2)",
                letterSpacing: "1px",
                marginBottom: "100px",
                fontFamily: "Rasa", // Modern font
                // textTransform: "uppercase",
            }}>
                🔓 Unlock Exclusive Features!
            </h2>
            
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
                gap: "50px", // More spacing between items
                padding: "0 5vw",
                alignItems: "center" // Center grid items
            }}>
                {/* Feature 1 */}
                <div style={{ textAlign: "center" }}>
                        {/* Lottie Animation */}
                        <Lottie 
                                animationData={dashboard} 
                                style={{ width: 150, height: 150, margin: "0 auto", display: "block" }} 
                            />

                        <h3 style={{ textShadow: "2px 2px 4px white", fontSize: "22px", fontWeight: "bold" }}>
                            Personalized Dashboard
                        </h3>

                        <p style={{ lineHeight: "1.8", fontSize: "16px", color: "#333" }}>
                            Track your searches, quiz attempts, and study progress in one place.
                        </p>
                        </div>

                {/* Feature 2 */}
                <div>
                <Lottie 
                                animationData={badge} 
                                style={{ width: 150, height: 150, margin: "0 auto", display: "block" }} 
                            />
                    <h3 style={{ textShadow: "2px 2px 4px white" }}>Earn Badges & Achievements</h3>
                    <p style={{ lineHeight: "1.8" }}>Unlock badges based on your learning activity and stay motivated.</p>
                </div>

                {/* Feature 3 */}
                <div>
                <Lottie 
                                animationData={history} 
                                style={{ width: 150, height: 150, margin: "0 auto", display: "block" }} 
                            />
                    <h3 style={{ textShadow: "2px 2px 4px white" }}>Search & Quiz History</h3>
                    <p style={{ lineHeight: "1.8" }}>Easily revisit past searches to reinforce learning.</p>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
