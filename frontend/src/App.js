
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
import "./App.css";


function App() {
    return (
        <div id="root">
            <Router>
                <ResponsiveAppBar />

                <div className="main-content">
                    <Routes>
                        <Route path="/" element={
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
                                        
                                        <div style={{ textAlign: "center", margin: "20px 0" }}>
                                            <Link to="/roadmap">
                                                <button style={{ 
                                                    padding: "10px 20px", 
                                                    fontSize: "16px", 
                                                    fontWeight: "bold", 
                                                    backgroundColor: "#bb7777", 
                                                    color: "white", 
                                                    border: "none", 
                                                    borderRadius: "5px", 
                                                    cursor: "pointer", 
                                                    transition: "background 0.3s" 
                                                }}
                                                onMouseOver={(e) => e.target.style.backgroundColor = "rgb(135, 84, 84)"}
                                                onMouseOut={(e) => e.target.style.backgroundColor = "#bb7777"}
                                                >
                                                    Create a Study Plan
                                                </button>
                                            </Link>
                                        </div>

                                        <FeaturesSection />
                                    </div>
                                </div>
                                <TestimonialsSection />
                            </>
                        } />
                        
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
