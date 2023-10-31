import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import "./navbar.css";
import flagaImage2 from '../assets/products/flaga.png';
import flagaImage from '../assets/products/flaga2.png';
import { useTranslation } from "react-i18next";

export const Navbar = ({ toggleTheme, theme, onFlagChange }) => {
  const [currentImage, setCurrentImage] = useState(flagaImage);
  const { t, i18n } = useTranslation("global");

  const handleFlagClick = () => {
    if (currentImage === flagaImage) {
      setCurrentImage(flagaImage2);
      i18n.changeLanguage("pl"); // Zmiana języka na polski
      onFlagChange(flagaImage2);
    } else {
      setCurrentImage(flagaImage);
      i18n.changeLanguage("en"); // Zmiana języka na angielski
      onFlagChange(flagaImage);
    }
  }

  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mx-auto">
        <div className="links flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-blue-500">
            {t("navbar.link")}
          </Link>
          <Link to="/login" className="text-white hover:text-blue-500">
            {t("navbar.link2")}
          </Link>
          <Link to="/register" className="text-white hover:text-blue-500">
            {t("navbar.link3")}
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="search-container">
            <input
              type="text"
              placeholder={t("navbar.placeholder")}
              className="p-2 border rounded-lg"
            />
          </div>
          <img
            id="flag"
            src={currentImage}
            alt="Flaga Polski"
            onClick={handleFlagClick}
          />
          <ThemeSwitchButton toggleTheme={toggleTheme} theme={theme} />
          <Link to="/cart" className="text-white hover:text-blue-500">
            <ShoppingCart size={32} />
          </Link>
        </div>
      </div>
    </div>
  );
};
