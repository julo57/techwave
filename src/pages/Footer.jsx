import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

export const Footer = () => {
  const {t} = useTranslation("global");
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
          {t("foooter.link")}
        </Link>
        <Link to="/NewsletterForm" className="footer-link">
          Newsletter
        </Link>
        <Link to="/AboutUs" className="footer-link">
        {t("foooter.link2")}
        </Link>
        <Link to="/PrivacyPolicy" className="footer-link">
        {t("foooter.link3")}
        </Link>
        <Link to="/Statute" className="footer-link">
        {t("foooter.link4")}
        </Link>

        <div className="footer-social-media">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">
            <FontAwesomeIcon icon={faFacebookF} className="faFacebookF" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">
              <FontAwesomeIcon icon={faInstagram} className="faInstagram" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon-link">
              <FontAwesomeIcon icon={faTwitter} className="faTwitter" />
          </a>
        </div>
      </div>
      <p className="text-center text-gray-500 text-xs">
        &copy;2023 TechWave. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
