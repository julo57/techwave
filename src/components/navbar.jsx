import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
//import logo from "./your-logo.png"; // Podmień ścieżkę do swojego loga
//import "./navbar.css"; // Zachowaj istniejący plik CSS, jeśli zawiera dodatkowe niestandardowe style

export const Navbar = () => {
  return (
    <div className="bg-white border-gray-200 dark:bg-gray-900 p-4">
      <div className=" flex items-center justify-between mx-auto">
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
          <Link to="/FAQ" className="text-white hover:text-blue-500">
            FAQ
          </Link>
          <Link to="/contact" className="text-white hover:text-blue-500">
            Contact
          </Link>
        </div>
        <Link to="/cart" className="text-white hover:text-blue-500">
          <ShoppingCart size={32} />
        </Link>
      </div>
    </div>
  );
};
