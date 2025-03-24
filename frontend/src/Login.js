import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import signupBg from "./components/signup.jpg"; // Using the same background as Signup

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
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
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          color: "#333",
        }}>
          <h2 style={{ marginBottom: "20px", color: "#d63031" }}>Login</h2>
          {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

          {step === 1 ? (
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
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
                onMouseOut={(e) => e.target.style.background = "rgb(191, 87, 87)"}
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input 
                type="text" 
                placeholder="Enter OTP" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
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
                onMouseOut={(e) => e.target.style.background = "rgb(191, 87, 87)"}
              >
                Verify OTP & Login
              </button>
            </form>
          )}

          <p style={{ marginTop: "15px", fontSize: "14px", color: "#333" }}>
            Don't have an account? <a href="/signup" style={{ color: "#d63031", fontWeight: "bold", textDecoration: "underline" }}>Signup</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
