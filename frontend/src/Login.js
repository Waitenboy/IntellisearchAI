import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginBg from "./components/signup.jpg"; // Ensure you have the correct image path

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const inputStyle = {
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    width: "100%",
    fontSize: "16px",
    outline: "none",
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("🟢 Login API Response:", data);

      if (!response.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      console.log("✅ Stored userId:", data.userId);

      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Full-page Background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      ></div>

      {/* Login Box */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "30px",
            borderRadius: "12px",
            background: "rgba(255, 255, 255, 0.9)", // Slight transparency for readability
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            color: "#333",
          }}
        >
          <h2 style={{ fontFamily: "monospace", marginBottom: "20px", color: "#d63031" }}>
            Login
          </h2>

          {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

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
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "rgb(191, 87, 87)",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "15px",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#c0392b")}
              onMouseOut={(e) => (e.target.style.background = "rgb(191, 87, 87)")}
            >
              Login
            </button>
          </form>

          <p style={{ marginTop: "15px", fontSize: "14px", color: "#333" }}>
            Don't have an account?{" "}
            <a href="/signup" style={{ color: "#d63031", fontWeight: "bold", textDecoration: "underline" }}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
