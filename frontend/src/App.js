
import React from "react";
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
import roadmapimg from "./roadmapimg.json";
import "./App.css";

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem("token"); 
    return token ? element : <Navigate to="/login" />;
};


function App() {
    return (
        <div id="root">
            <Router>
                <ResponsiveAppBar />

                <div className="main-content">
                    <Routes>
                    <Route path="/" element={<PrivateRoute element={
                            <>
                                <div style={{ marginBottom: "390px" }}> 
                                    <UncontrolledExample />
                                </div>
                                
                                <div className="content" style={{ padding: "60px" }}>
                                    <div className="container">
                                    <h1 style={{ 
                                                fontWeight: "bold", 
                                                fontSize: "40px", 
                                                fontFamily: "monospace", 
                                                letterSpacing: "2px", 
                                                // textTransform: "uppercase", 
                                                color: "#2C3E50" 
                                            }}>
                                                🔍 IntelliSearch
                                            </h1>
                                            <p style={{ 
                                                fontSize: "22px", 
                                                fontFamily: "monospace", 
                                                color: "#555", 
                                                marginTop: "10px", 
                                                fontWeight: "500" 
                                            }}>
                                                Begin searching now!
                                            </p>

                                        
                                        <SearchComponent />
                                        
                                        <div 
                                        style={{ 
                                            width: "100%", 
                                            backgroundColor: "rgb(155, 59, 59)", // Light red-pinkish background
                                            padding: "60px 0px", // Increased padding for better spacing
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center"
                                        }}
                                    >
                                         {/* Lottie Animation */}
                                         <Lottie 
                                                animationData={roadmapimg} 
                                                style={{ 
                                                    width: 300, 
                                                    height: 300, 
                                                    margin: "0 auto", 
                                                    display: "block", 
                                                    marginBottom: "-70px", // Pulls closer to the text
                                                    marginTop: "-80px" // Moves it upward
                                                }} 
                                            />


                                            <h2 
                                                style={{ 
                                                    fontSize: "35px", 
                                                    fontWeight: "bold", 
                                                    color: "rgb(234, 187, 187)", 
                                                    marginBottom: "10px", 
                                                    marginTop: "0px" // Ensure no extra top margin
                                                }}
                                            >
                                                Want to create a roadmap and know how to study?
                                            </h2>

                                    <p style={{ fontSize: "18px", color: "white", marginBottom: "25px" }}>
                                        We got you covered. Check this out!
                                    </p>
                                        <div style={{ textAlign: "center" }}>
                                            <Link to="/roadmap">
                                                <button 
                                                    style={{ 
                                                        padding: "18px 40px", // Bigger button
                                                        fontSize: "22px", // Larger text
                                                        fontWeight: "bold",
                                                        backgroundColor: "rgb(231, 204, 204)",
                                                        color: "black",
                                                        border: "none",
                                                        borderRadius: "10px", // More rounded
                                                        cursor: "pointer",
                                                        transition: "background 0.3s, transform 0.2s",
                                                        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)" // Stronger shadow
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.backgroundColor = "rgb(225, 124, 124)";
                                                        e.target.style.transform = "scale(1.1)"; // Slight zoom effect
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.backgroundColor = "rgb(231, 177, 177)";
                                                        e.target.style.transform = "scale(1)"; // Reset zoom
                                                    }}
                                                >
                                                    Create a Study Plan
                                                </button>
                                            </Link>
                                        </div>
                                    </div>


                                        <FeaturesSection />
                                    </div>
                                </div>
                                <TestimonialsSection />
                            </>
                         } />} />
                        
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/roadmap" element={<Roadmap />} />
                    <Route path="/home" element={<Navigate to="/" />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>

                <Footer />
            </Router>
        </div>
    );
}

export default App;
