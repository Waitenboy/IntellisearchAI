import React from "react";

function Contact() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh", // Ensures full viewport height
      width: "100vw", // Ensures full viewport width
      background: "linear-gradient(135deg,rgb(255, 255, 255),rgb(242, 195, 195))", // Full background gradient
      fontFamily: "monospace",
      margin: "0", // Ensure no margins
      padding: "0", // Remove any padding
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        maxWidth: "400px",
        width: "90%", // Ensures responsiveness
      }}>
        <h1 style={{ color: "#333", fontSize: "28px", marginBottom: "15px" }}>Contact Us</h1>
        <p style={{ color: "#555", fontSize: "18px", marginBottom: "10px" }}>
          📧 <strong>Email:</strong> support@intellisearch.com
        </p>
        <p style={{ color: "#555", fontSize: "18px" }}>
          📞 <strong>Phone:</strong> +123 456 7890
        </p>
      </div>
    </div>
  );
}

export default Contact;
