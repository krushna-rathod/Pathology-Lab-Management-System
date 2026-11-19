import React from "react";
import "./footer.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";



const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">

        {/* LEFT */}
        <div className="footerSection">
          <h3>Pathology Lab</h3>
          <p>
            Providing accurate and reliable diagnostic services with advanced technology.
          </p>
        </div>

        {/* CENTER */}
        <div className="footerSection">
          <h4>Quick Links</h4>
<ul>
  <li><a href="/">Home</a></li>
  <li><a href="#tests">Tests</a></li>
  <li><a href="#contact">Contact</a></li>
</ul>
        </div>

        {/* RIGHT */}
        <div className="footerSection">
          <h4>Contact Info</h4>
          <p>Email: rathodkrushna5157@gmail.com</p>
          <p>Phone: +91 9579255157</p>
          <p>Location: Maharashtra, India</p>

          {/* SOCIAL LINKS */}
          <div className="socialIcons">
            <a href="https://instagram.com/your_username" target="_blank" rel="noreferrer">
              <FaInstagram />

            </a>

            <a href="https://linkedin.com/in/krushna-rathod" target="_blank" rel="noreferrer">
             <FaLinkedin />
            </a>
          </div>
        </div>

      </div>

      <div className="footerBottom">
        © 2026 Pathology Lab | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;