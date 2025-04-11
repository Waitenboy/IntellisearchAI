import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupBg from "./components/signup.jpg"; // Import the background image

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputStyle = {
    padding: "12px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "100%",
    fontSize: "16px",
    outline: "none",
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://intellisearchai.onrender.com/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Full-page Background */}
      <div style={{
        position: "fixed",  // Fixed so it covers the entire page
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${signupBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: -1,  // Push it behind the content
      }}></div>

      {/* Signup Box */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
        <div style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          borderRadius: "12px",
          background: "rgba(255, 255, 255, 0.9)",  // Slightly more opaque
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          color: "#333",
        }}>
          <h2 style={{ marginBottom: "20px", color: "#d63031" }}>Signup</h2>

          {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              style={inputStyle}
            />

            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={inputStyle}
            />

            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={inputStyle}
            />
            
            <button 
              type="submit" 
              style={{
                background: "rgb(191, 87, 87)",
                color: "white",
                border: "none",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onMouseOver={(e) => e.target.style.background = "#c0392b"}
              onMouseOut={(e) => e.target.style.background = "#rgb(191, 87, 87)"}
            >
              Signup
            </button>
          </form>

          <p style={{ marginTop: "15px", fontSize: "14px", color: "#333" }}>
            Already have an account? <a href="/login" style={{ color: "#d63031", fontWeight: "bold", textDecoration: "underline" }}>Login</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
