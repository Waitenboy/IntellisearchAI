import React from "react";

function Contact() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
      width: "100vw",
      background: "linear-gradient(135deg, #0d0d0d, #1a1a1a)",
      fontFamily: "monospace",
      margin: 0,
      padding: "40px 20px",
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
        textAlign: "center",
        maxWidth: "450px",
        width: "100%",
        transition: "transform 0.3s ease",
        color: "#fff",
      }}>
        <h1 style={{
          fontSize: "32px",
          marginBottom: "20px",
          color: "#ffffff",
          letterSpacing: "1px"
        }}>Contact Us</h1>
    
        <p style={{
          fontSize: "18px",
          marginBottom: "15px",
          color: " #dcdcdc"
        }}>
          📧 <strong>Email:</strong> <a href="mailto:support@intellisearch.com" style={{ color: "rgb(174, 122, 223)", textDecoration: "none" }}>support@intellisearch.com</a>
        </p>
    
        <p style={{
          fontSize: "18px",
          color: "#dcdcdc"
        }}>
          📞 <strong>Phone:</strong> <a href="tel:+1234567890" style={{ color: "rgb(174, 122, 223)", textDecoration: "none" }}>+123 456 7890</a>
        </p>
      </div>
    </div>
    
  );
}

export default Contact;
