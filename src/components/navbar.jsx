import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Microphone } from "phosphor-react";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import "./navbar.css";
import useAuthContext from "../context/AuthContext";
import flagaImage from '../assets/products/flaga2.png';
import flagaImage2 from '../assets/products/flaga.png';
import { useTranslation } from "react-i18next";
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import fetchProducts from '../components/fetchProducts';
import NavbarCategories from "./NavbarCategories";

export const Navbar = ({ toggleTheme, theme, setSelectedCategory }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const { user, logout } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(flagaImage);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dodane
  const dropdownRef = useRef(null); // Dodane
  const { t, i18n } = useTranslation("global");

  useEffect(() => {
    if (listening) {
      setSearchTerm(transcript);
    }
  }, [transcript, listening]);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const filter = searchTerm.toLowerCase();
      setFilteredProducts(allProducts.filter(product =>
        product.name.toLowerCase().includes(filter)
      ));
    } else {
      setFilteredProducts([]);
      setIsSearchActive(false);
    }
  }, [searchTerm, allProducts]);

  const handleSearch = () => {
    setIsLoading(true);
    setError(null);
    fetchProducts()
      .then(data => {
        setAllProducts(data);
        setIsSearchActive(true);
        setIsLoading(false);
      })
      .catch(err => {
        setError("Nie udało się pobrać produktów");
        setIsLoading(false);
      });
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  const handleProductClick = (productId) => {
    console.log('Kliknięto produkt o ID:', productId);
    setDropdownVisible(false);
    navigate(`/ProductSite/${productId}`);
  }
  const handleFlagClick = () => {
    const newImage = currentImage === flagaImage ? flagaImage2 : flagaImage;
    setCurrentImage(newImage);
    const newLang = i18n.language === "en" ? "pl" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleMicClick = () => {
    SpeechRecognition.startListening();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="text-white hover:text-blue-500" onClick={()=>{
          setSelectedCategory("");
        }}>
          <img src="/logo.png" alt="logo" className="h-12" />
        </Link>

        <div className="flex items-center space-x-8">
          <ThemeSwitchButton toggleTheme={toggleTheme} theme={theme} />
          {user ? (
            <Link to="/profile">
              <User size={32} className="text-white hover:text-blue-500" />
            </Link>
          ) : (
            <Link to="/login">
              <User size={32} className="text-white hover:text-blue-500" />
            </Link>
          )}
          <Link to="/cart" className="text-white hover:text-blue-500">
            <ShoppingCart size={32} />
          </Link>
          <button onClick={handleMicClick}>
            <Microphone className="microphone" color="white" size={32} />
          </button>
          <img
            id="flag"
            src={currentImage}
            alt="Flag"
            onClick={handleFlagClick}
          />
        </div>

        <button className="md:hidden text-white" onClick={handleMobileMenuToggle}>
          &#9776;
        </button>

        <div className={`w-full md:block ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <input
            type="text"
            value={searchTerm}
            placeholder={t("navbar.placeholder")}
            className="p-2 border rounded-lg w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setDropdownVisible(true)}
          />
          {isLoading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {isSearchActive && dropdownVisible && (
            <ul className="dropdown-list" ref={dropdownRef}>
              {filteredProducts.map(product => (
                <Link to={`/ProductSite/${product.id}`} key={product.id}>
                  <li key={product.id} onClick={() => handleProductClick(product.id)}>
                    {product.name}
                  </li>
                </Link>
              ))}
            </ul>
          )}
          <button className="ok" onClick={handleSearch}>
            Szukaj
          </button>
        </div>
      </div>
      <NavbarCategories  
        setSelectedCategory={setSelectedCategory}
      />
    </nav>
  );
};

export default Navbar;
