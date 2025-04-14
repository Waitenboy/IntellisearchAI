import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupBg from "./components/signup1.jpg"; // Using the same background as Signup

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputStyleDark = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: "10px",
    border: "1px solid #444",
    backgroundColor: "#1c1c2b",
    color: "#f5f5f5",
    fontSize: "16px",
    fontFamily: "monospace",
    letterSpacing: "0.5px",
    outline: "none",
    transition: "0.3s",
    boxShadow: "0 0 0px transparent",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
        setError("Email and password are required.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/request-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }), // ✅ Send password too
        });

        const data = await response.json();

        if (response.ok) {
            alert("OTP sent to your email!");
            setStep(2);
        } else {
            setError(data.error);
        }
    } catch (error) {
        setError("Failed to request OTP.");
    }
};


  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    if (!password) {
        setError("Password is required.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp, password }), // ✅ Send password too
        });

        const data = await response.json();

        if (response.ok) {
            alert("Login successful!");
            localStorage.setItem("token", data.token);
            window.dispatchEvent(new Event("storage"));
            navigate("/");
        } else {
            setError(data.error); // Display backend error (wrong OTP or password)
        }
    } catch (error) {
        setError("OTP verification failed.");
    }
};


  return (
    <>
       {/* Background Image */}
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

    {/* Login Box Wrapper */}
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      height: "100vh",
      paddingTop: "100px",
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
          color: "rgb(195, 132, 237)",
          textShadow: "0 0 6px rgba(108, 158, 242, 0.3)",
          fontFamily: "Rasa",
        }}>
          Login
        </h2>

        {error && <p style={{ color: "#ff6b6b", fontWeight: "bold" }}>{error}</p>}

        {step === 1 ? (
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
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
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <input 
              type="text" 
              placeholder="Enter OTP" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
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
              Verify OTP & Login
            </button>
          </form>
        )}

        <p style={{ marginTop: "20px", fontSize: "15px", color: "#bbb" }}>
          Don't have an account? <a href="/signup" style={{ color: "rgb(208, 109, 235)", fontWeight: "bold", textDecoration: "underline" }}>Signup</a>
        </p>
      </div>
    </div>
    </>
  );
}

export default Login;
