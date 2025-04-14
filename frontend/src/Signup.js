import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupBg from "./components/signup1.jpg"; // Import the background image

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const inputStyle = {
  //   padding: "12px",
  //   margin: "8px 0",
  //   borderRadius: "8px",
  //   border: "1px solid #ddd",
  //   width: "100%",
  //   fontSize: "16px",
  //   outline: "none",
  // };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
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

  const inputStyleDark = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "10px",
    border: "1px solid #444",
    backgroundColor: " #1c1c2b",
    color: " #f5f5f5",
    fontSize: "16px",
    fontFamily: "monospace",
    letterSpacing: "0.5px",
    outline: "none",
    transition: "0.3s",
    boxShadow: "0 0 0px transparent",
  };
  
  
  

  return (
    <>
      {/* Fullscreen Background */}
<div style={{
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${signupBg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  zIndex: -1,
}}></div>

{/* Signup Box Wrapper */}
<div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",  // Align to top
  height: "100vh",
  paddingTop: "80px",        // Push it down a bit from the top
}}>
  <div style={{
    width: "100%",
    maxWidth: "420px",
    padding: "40px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #0d0d0d, #1f1a2f, #2e2644)",
    backdropFilter: "blur(20px)",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.6)",
    textAlign: "center",
    color: "#e0e0e0",
    fontFamily: "monospace",
  }}>
    <h2 style={{
      marginBottom: "25px",
      fontSize: "32px",
      color: "rgb(195, 132, 237)", // Bluish primary
      textShadow: "0 0 6px rgba(108, 158, 242, 0.3)",
      fontFamily:"Rasa"
    }}>
       Sign Up
    </h2>

    {error && <p style={{ color: " #ff6b6b", fontWeight: "bold" }}>{error}</p>}

    <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <input 
        type="text" 
        placeholder="Full Name" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        required 
        style={inputStyleDark}
      />

      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
        style={inputStyleDark}
      />

      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
        style={inputStyleDark}
      />
      
      <button 
        type="submit" 
        style={{
          background: "linear-gradient(135deg,rgb(33, 20, 41),rgb(177, 112, 230))",
          color: "white",
          border: "none",
          padding: "14px",
          borderRadius: "10px",
          fontSize: "17px",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "0.3s ease-in-out",
          boxShadow: "0 0 10px rgba(108, 158, 242, 0.3)",
        }}
        onMouseOver={(e) => e.target.style.boxShadow = "0 0 16px rgba(108, 158, 242, 0.6)"}
        onMouseOut={(e) => e.target.style.boxShadow = "0 0 10px rgba(108, 158, 242, 0.3)"}
      >
        Create Account
      </button>
    </form>

    <p style={{ marginTop: "20px", fontSize: "15px", color: "#bbb" }}>
      Already have an account? <a href="/login" style={{ color: "rgb(208, 109, 235)", fontWeight: "bold", textDecoration: "underline" }}>Login</a>
    </p>
  </div>
</div>



    </>
  );

  
}

export default Signup;
