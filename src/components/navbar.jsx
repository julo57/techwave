import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "phosphor-react";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import "./navbar.css";
import useAuthContext from "../context/AuthContext";

export const Navbar = ({ toggleTheme, theme }) => {
  const { user, logout } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mx-auto">
        <div className="md:flex md:items-center space-x-8">
          <Link to="/" className="text-white hover:text-blue-500">
            Shop
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
      placeholder="Search Products"
      className="p-2 border rounded-lg"
    />
  </div>
  <ThemeSwitchButton toggleTheme={toggleTheme} theme={theme} />

  <div className="user-icon-container">
    <div className="user-icon">
      <User size={32} className="text-white" />
      {!user && (
        <ul className="user-menu">
          <li>
            <Link to="/login">Zaloguj</Link>
          </li>
        </ul>
      )}

      {user && (
        <ul className="user-menu">
          <li>
            <Link to="/profile">Mój profil</Link>
          </li>
          <li onClick={logout}>Wyloguj</li>
        </ul>
      )}
    </div>
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
