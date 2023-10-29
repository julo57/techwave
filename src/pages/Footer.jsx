
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export const Footer = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  const handleResize = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`footer-container ${isDesktop || scrollY > 100 ? "active" : ""}`}>
      <div className="footer-links">
        <Link to="/FAQ" className="footer-link">
          FAQ
        </Link>
        <Link to="/contact" className="footer-link">
          Contact
        </Link>
        <Link to="/NewsletterForm" className="footer-link">
          Newsletter
        </Link>
        <Link to="/AboutUs" className="footer-link">
          About Us
        </Link>
      </div>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 TechWave. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;


