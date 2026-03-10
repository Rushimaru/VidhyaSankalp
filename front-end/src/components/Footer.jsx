import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="d-footer" style={{ padding: "20px 0" }}>
      <div style={{ textAlign: "center" }}>
        {/* Project Name */}
        <p
          style={{
            fontSize: "1.3rem",
            fontWeight: "700",
            letterSpacing: "3px",
            textTransform: "uppercase",
            margin: "0 0 6px",
          }}
        >
          ✦ VidhyaSankalp ✦
        </p>

        {/* Copyright */}
        <p
          style={{
            fontSize: "0.8rem",
            margin: 0,
            letterSpacing: "0.5px",
          }}
        >
          © {currentYear}{" "}
          <a
            href="https://digitaltripolystudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: "600",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            Digital Tripoly Studio
          </a>{" "}
          · All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;