
import React,{ useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import ResponsiveAppBar from "./Navbar";
import SearchComponent from "./SearchComponent";
import Login from "./Login";
import Signup from "./Signup";
import About from "./About";
import Contact from "./Contact";
import Profile from "./Profile";
import Forum from "./Forum";
import UncontrolledExample from "./Carousel";
import FeaturesSection from "./FeaturesSection"; 
import TestimonialsSection from "./TestimonialsSection";
import Footer from "./Footer"; 
import Quiz from "./quiz";
import Roadmap from "./Roadmap";
import Lottie from "lottie-react";
import roadmapimg from "./roadmapimg1.json";
import "./App.css";

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token"); 
    return token ? element : <Navigate to="/login" />;
};

function SplineBackground() {
    useEffect(() => {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js";
      script.async = true;
      document.body.appendChild(script);
      document.body.style.overflowX = 'hidden';
      return () => {
        document.body.removeChild(script);
      };
    }, []);
    return (
        <div style={{ overflow: 'hidden'}}>
        <spline-viewer
          style={{
            position: 'absolute',
            top: '80px',
            left: 0,
            width: '100%',
            height: '80%',
            transform: 'scale(1.3)', 
            zIndex: -1
          }}
          url="https://prod.spline.design/J62yabQLZrDyzmsj/scene.splinecode"
        />
        </div>
      );
    }  

    
function App() {
    return (
        <div id="root">
            <Router>
                <ResponsiveAppBar />

                <div className="main-content">
                    <Routes>
                    <Route path="/" element={
                            <>
                                
                                <SplineBackground />
                               
                                <div className="content" style={{ padding: "60px", marginTop: "680px" }}>

                                    <div className="container">
                                   
                                        
                                        <SearchComponent />
                                        
                                        <div 
                                        style={{ 
                                            width: "100%", 
                                            background: "linear-gradient(135deg, #0d0d0d, #1f1a2f, #2e2644)",  // Dark background
                                            minHeight: "700px",
                                            padding: "60px 20px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                                        }}
                                    >
                                        {/* Lottie Animation */}
                                        <Lottie 
                                            animationData={roadmapimg} 
                                            style={{ 
                                                width: 400,           // ⬅ Increase size here
                                                height: 400,          // ⬅ Increase size here
                                                marginBottom: "-70px", // Optional: adjust spacing
                                                marginTop: "-120px"     // Optional: adjust spacing
                                            }} 
                                        />
                                        <h2 
                                            style={{ 
                                                fontSize: "32px", 
                                                fontWeight: "bold", 
                                                color: "#F8F8F8", 
                                                marginBottom: "14px", 
                                                marginTop: "0px",
                                                // minHeight: "100px",
                                                fontFamily: "Special Elite",
                                                fontSize: "40px",
                                                letterSpacing: "1px"
                                            }}
                                        >
                                           Running out of time and don't know how to study?
                                        </h2>

                                        <p 
                                            style={{ 
                                                fontSize: "28px", 
                                                color: "#ccc", 
                                                marginBottom: "30px", 
                                                maxWidth: "600px",
                                                fontFamily: "Crimson Text"
                                            }}
                                        >
                                            We got you covered. Check this out!
                                        </p>

                                        <div style={{ textAlign: "center" }}>
                                            <Link to="/roadmap">
                                                <button 
                                                    style={{ 
                                                        padding: "16px 36px",
                                                        fontSize: "18px",
                                                        fontWeight: "600",
                                                        background: "linear-gradient(135deg, #8E2DE2, #4A00E0)",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: "12px",
                                                        cursor: "pointer",
                                                        transition: "all 0.3s ease",
                                                        boxShadow: "0 6px 20px rgba(142, 45, 226, 0.4)",
                                                        marginBottom: '-10px'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.background = "linear-gradient(135deg, #9F44D3, #5732C6)";
                                                        e.target.style.transform = "translateY(-3px)";
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.background = "linear-gradient(135deg, #8E2DE2, #4A00E0)";
                                                        e.target.style.transform = "translateY(0)";
                                                    }}
                                                >
                                                    Create a Roadmap
                                                </button>
                                            </Link>
                                        </div>
                                    </div>

                                    <FeaturesSection />
                                    {/* <div style={{ 
                                            marginTop: '40px', 
                                            display: 'flex', 
                                            justifyContent: 'center', 
                                            overflow: 'hidden' 
                                            }}>
                                            <div style={{ 
                                                transform: 'scale(1.3)',   // Zoom in
                                                transformOrigin: 'center', // Keep zoom centered
                                                width: '100%',
                                                maxWidth: '1000px',
                                                height: '1000px'
                                            }}>  
                                        <spline-viewer
                                            url="https://prod.spline.design/INtBPMdsnvM2CLJK/scene.splinecode"
                                            style={{ width: '100%', height: '100%',  }}
                                            ></spline-viewer>
                                            </div>
                                            </div> */}
                                        
                                    </div>
                                </div>
                                
                                {/* <div style={{ backgroundColor: "#ffffff" }}>
                                    <TestimonialsSection />
                                    </div> */}

                            </>
                         } />
                        
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/roadmap" element={<PrivateRoute element={<Roadmap />} />} />
                    <Route path="/home" element={<Navigate to="/" />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/forum" element={<PrivateRoute element={<Forum />}/>}  />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                    </Routes>
                </div>

                <Footer />
            </Router>
        </div>
    );
}

export default App;
