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
            backgroundColor: "#111015", // Deep dark background
            color: "#f5f5f5",
            padding: "100px 5vw",
            textAlign: "center",
            fontFamily: "monospace",
            width: "100vw",
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            <h2
  style={{
    fontSize: "70px",
    // fontWeight: "bold",
    background: "linear-gradient(135deg, #ffffff, #d8b4f8)", // white to light purple
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "2px 2px 12px rgba(216, 180, 248, 0.2)", // soft light purple glow
    letterSpacing: "1px",
    marginBottom: "80px",
    fontFamily: "crimson Text", // gives a high-end classic feel
    textTransform: "uppercase",
  }}
>
  EXCLUSIVE FEATURES!
</h2>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "50px",
                padding: "0 5vw",
                alignItems: "center"
            }}>
                {/* Feature 1 */}
                <div style={{ textAlign: "center" }}>
                    <Lottie 
                        animationData={dashboard} 
                        style={{ width: 150, height: 150, margin: "0 auto", display: "block" }} 
                    />
                    <h3 style={{ 
                        textShadow: "2px 2px 4px #000", 
                        fontSize: "22px", 
                        fontWeight: "bold",
                        color: "#E2C4FF"
                    }}>
                        Personalized Dashboard
                    </h3>
                    <p style={{ lineHeight: "1.8", fontSize: "16px", color: "#ccc" }}>
                        Track your searches, quiz attempts, and study progress in one place.
                    </p>
                </div>
        
                {/* Feature 2 */}
                <div>
                    <Lottie 
                        animationData={badge} 
                        style={{ width: 150, height: 150, margin: "0 auto", display: "block" }} 
                    />
                    <h3 style={{ 
                        textShadow: "2px 2px 4px #000", 
                        fontSize: "22px", 
                        fontWeight: "bold",
                        color: "#FFB6C1"
                    }}>
                        Earn Badges & Achievements
                    </h3>
                    <p style={{ lineHeight: "1.8", color: "#ccc", fontSize: "16px" }}>
                        Unlock badges based on your learning activity and stay motivated.
                    </p>
                </div>
        
                {/* Feature 3 */}
                <div>
                    <Lottie 
                        animationData={history} 
                        style={{ width: 150, height: 150, margin: "0 auto", display: "block" }} 
                    />
                    <h3 style={{ 
                        textShadow: "2px 2px 4px #000", 
                        fontSize: "22px", 
                        fontWeight: "bold",
                        color: "#9FE2BF"
                    }}>
                        Search & Quiz History
                    </h3>
                    <p style={{ lineHeight: "1.8", color: "#ccc", fontSize: "16px" }}>
                        Easily revisit past searches to reinforce learning.
                    </p>
                </div>
            </div>
        </section>
        
    );
}

export default FeaturesSection;
