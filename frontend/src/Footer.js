import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // Import social icons

function Footer() {
    return (
        <footer style={{
            backgroundColor: "#eedddd",
            color: "black",
            textAlign: "center",
            padding: "20px",
            fontSize: "18px",
            position: "relative",
            bottom: 0,
            width: "100vw", // Ensure full width
            height: "280px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <p style={{ 
                margin: "10px 0",
                textShadow: "2px 2px 4px white",
                fontSize: "20px",
                fontFamily: "monospace"
            }}>
                &copy; {new Date().getFullYear()} IntelliSearch. All rights reserved.
            </p>

            {/* Social Media Icons */}
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={30} color="black" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={30} color="black" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={30} color="black" />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
