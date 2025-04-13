import React, {useEffect} from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { GiAchievement } from "react-icons/gi";
// import { MdHistoryEdu } from "react-icons/md";
import Lottie from "lottie-react";
import dashboard from "./components/dashboard.json";
import badge from "./components/badge.json";
import history from "./components/history.json";

function FeaturesSection() {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script); // Clean up when component unmounts
        };
      }, []);
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
<spline-viewer 
        url="https://prod.spline.design/8gh4ICe1CqUM7Ngt/scene.splinecode" 
        style={{ 
          width: '100%', 
          height: '500px',  // Adjust the height as needed
          transform: 'scale(1.4)',  // Zoom in by scaling the scene
          transformOrigin: 'center center',  // Ensure zoom is centered
          marginTop: '0px'  // Reduce top margin
        }} 
      ></spline-viewer>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "50px",
                padding: "0 5vw",
                alignItems: "center",
                marginTop: "200px" 
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
