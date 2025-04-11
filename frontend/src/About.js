import React, { useEffect, useRef, useState } from "react";
import backgroundImage from "./components/carouselimg.png"; // Imports the image
import img4 from "./components/img44.gif";
import img5 from "./components/img55.gif";
import img6 from "./components/img66.gif"

import "./About.css";

function About() {
const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the image is visible
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* Background Image Section */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100vw", // Ensures full width
          height: "70vh", // Makes it full screen height
          position: "relative", // Needed for absolute positioning of text
        }}
      >
        {/* "About Us" Text at Bottom Left */}
        <div
          style={{
            position: "absolute",
            bottom: "5%", // Adjust spacing from the bottom
            left: "5%", // Adjust spacing from the left
            color: "white",
            fontSize: "48px",
            fontWeight: "bold",
            fontFamily: "monospace",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          About Us
        </div>
      </div>

      {/* About Content Section (Image on Left, Text on Right) */}
      <div className="about-container">
        {/* Image (Spread Across Left Half) */}
        <div ref={imageRef} className={`about-image-container ${isVisible ? "fade-in" : "fade-in" }`}>
          <img src={img4} alt="About" className="about-image" />
        </div>

        {/* Text Content on the Right */}
        <div className="about-text" >
          <h1>Empowering Education & Social Impact</h1>
          <p>
          This platform isn't just about learning—it’s about accessibility and inclusivity. The speech-to-text feature makes it easier for individuals with writing challenges to explore topics, while multilingual support breaks language barriers. By tracking searches, quiz submissions, and progress, students can stay motivated and engaged. With badges and rewards for active learners, education becomes more interactive and goal-oriented. Our AI tutor is designed to make quality education accessible to all, bridging the gap between curiosity and structured learning. 
          </p>
        </div>
      </div>

      {/* Second Section: Text on Left, Image on Right */}
      <div className="about-container reverse">
        {/* Text on Left */}
        <div className="about-text">
          <h1>Beyond Google & ChatGPT: More Than Just Answers</h1>
          <p>
          While Google and ChatGPT provide scattered search results or lengthy responses, our AI tutor refines and curates information specifically for learning. Along with AI-generated summaries, it also fetches the top five Google and YouTube results, ensuring you get diverse and reliable sources for deeper understanding. The built-in quiz feature further reinforces learning by testing your knowledge, while the roadmap tool helps you create a personalized study plan tailored to your timeline.
          </p>
        </div>

        {/* Image on Right */}
        <div ref={imageRef} className={`about-image-container ${isVisible ? "fade-in" : "fade-in"}`}>
          <img src={img5} alt="How IntelliSearch Works" className="about-image" />
        </div>
      </div>

      {/* About Content Section (Image on Left, Text on Right) */}
      <div className="about-container">
        {/* Image (Spread Across Left Half) */}
        <div ref={imageRef} className={`about-image-container ${isVisible ? "fade-in" : "fade-in" }`}>
          <img src={img6} alt="About" className="about-image" />
        </div>

        {/* Text Content on the Right */}
        <div className="about-text" >
          <h1>A Smarter Way to Learn with AI</h1>
          <p>
          Our AI-powered tutor revolutionizes the way you study by generating concise, easy-to-understand summaries of any topic. Whether you type or speak your query, the AI instantly curates key insights, saving you hours of research. Unlike traditional search engines, our platform goes beyond just providing information—it organizes it into structured study plans, making complex topics easier to grasp. Plus, with the option to save summaries as PDFs, you can revisit your learning materials anytime, anywhere.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
