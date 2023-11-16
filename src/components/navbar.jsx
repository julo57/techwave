import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Microphone, MagnifyingGlass } from "phosphor-react";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import "./navbar.css";
import useAuthContext from "../context/AuthContext";
import flagaImage2 from '../assets/products/flaga.png';
import flagaImage from '../assets/products/flaga2.png';
import { useTranslation } from "react-i18next";
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'



export const Navbar = ({ toggleTheme, theme }) => {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const { user, logout } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(flagaImage);
  const { t, i18n } = useTranslation("global");

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleFlagClick = () => {
    if (currentImage === flagaImage) {
      setCurrentImage(flagaImage2);
      i18n.changeLanguage("pl"); // Change language to Polish
      onFlagChange(flagaImage2);
    } else {
      setCurrentImage(flagaImage);
      i18n.changeLanguage("en"); // Change language to English
      onFlagChange(flagaImage);
    }
  };
  const handleMicClick = ()=>{
    alert('Button clicked!');
  }

  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mx-auto">
        <div className="md:flex md:items-center space-x-8">
          <Link to="/" className="text-white hover:text-blue-500">
            <img src="/logo.png" alt="logo" className="h-12" />
          </Link>
        </div>

        <div className="md:flex md:items-center space-x-8">
          <Link to="/ProductSite" className="text-white hover:text-blue-500">
            {t("ProductSite")}
          </Link>
        </div>

        <div className="md:hidden">
          <button
            className="text-white"
            onClick={handleMobileMenuToggle}
          >
            &#9776;
          </button>
        </div>

        <div className={`md:flex items-center space-x-6  ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <div className="search-container">
          <input
          type="text"
          value={transcript}
          placeholder={t("navbar.placeholder")}
          className="p-2 border rounded-lg"
          readOnly // Dodanie tego atrybutu
        />

            
          </div>

          <button onClick={SpeechRecognition.startListening}>
            <div className="product-image">
              <Microphone className="microphone "color="white" size={32}  />
            </div>
          </button>

          <img
            id="flag"
            src={currentImage}
            alt="Flaga Polski"
            onClick={handleFlagClick}
          />

          <ThemeSwitchButton toggleTheme={toggleTheme} theme={theme} />

          <div className="user-icon-container">
            {user ? (
              <Link to="/profile">
                <User size={32} className="text-white hover:text-blue-500" />
              </Link>
            ) : (
              <Link to="/login">
                <User size={32} className="text-white hover:text-blue-500" />
              </Link>
            )}
          </div>

          <div className="user-icon-container">
            <Link to="/cart" className="text-white hover:text-blue-500">
              <ShoppingCart size={32} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
