import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // Import social icons

function Footer() {
    return (
        <footer
  style={{
    background: "linear-gradient(135deg, #0d0d0d, #1f1a2f, #2e2644)", // deep dark gray background
    color: "rgb(240, 240, 240)", // light gray text for contrast
    textAlign: "center",
    padding: "40px 20px",
    fontSize: "18px",
    position: "relative",
    bottom: 0,
    width: "100vw",
    height: "280px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "1px solid #333", // subtle top border for separation
    fontFamily: "monospace", // modern techy font
    letterSpacing: "0.5px",
  }}
>
  <h3 style={{ marginBottom: "10px", fontSize: "22px", fontWeight: "bold" }}>
    Made with ❤️ by Poulami and Ankur
  </h3>
  <p style={{ marginBottom: "10px", color: "#ccc" }}>
    © {new Date().getFullYear()} IntelliSearch. All rights reserved.
  </p>
  <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
    <a href="/about" style={{ color: "#aaa", textDecoration: "none" }}>About</a>
    <a href="/contact" style={{ color: "#aaa", textDecoration: "none" }}>Contact</a>
    <a href="/forum" style={{ color: "#aaa", textDecoration: "none" }}>Forum</a>
  </div>


            
            {/* Social Media Icons */}
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={30} color="white" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={30} color="white" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={30} color="white" />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
