import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { createContext } from "react"
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import "./navbar.css";

export const ThemeContext = createContext("null");

export const Navbar = ({ toggleTheme, theme }) => {
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 p-4">
      <div className="flex items-center justify-between mx-auto">
        <div className="links flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-blue-500">
            Shop
          </Link>
          <Link to="/login" className="text-white hover:text-blue-500">
            Log in
          </Link>
          <Link to="/register" className="text-white hover:text-blue-500">
            Register
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search Products"
              className="p-2 border rounded-lg"
            />
          </div>
          <button>Tu będzie zmiana koloru</button>
          <ThemeSwitchButton toggleTheme={toggleTheme} theme={theme} />
          <Link to="/cart" className="text-white hover:text-blue-500">
            <ShoppingCart size={32} />
          </Link>
        </div>
      </div>
    </div>
  );
};
