import React, { useState, createContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Contact } from "./pages/contact";
import { FAQ } from "./pages/FAQ";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import PopUp from "./components/PopUp";
import { AuthProvider } from "./context/AuthContext";
import { NewsletterForm } from "./pages/NewsletterForm";
import { Footer } from "./pages/Footer";
import { AboutUs } from "./pages/AboutUs";
import { ComparationSite } from "./pages/ComparationSite";
import { ProductFilterPage } from "./pages/ProductFilterPage";
import global_en from './translations/en/global.json';
import global_pl from './translations/pl/global.json';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { Test } from "./pages/test";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword"; 


import Profile from "./components/Profile"; // Importuj komponent "Profile"
import ProductSite from "./pages/shop/ProductSite";

export const ThemeContext = createContext();
i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      global: global_en,
    },
    pl: {
      global: global_pl,
    },
  },
});

function App() {
  const [theme, setTheme] = useState("light");
  const [timedPopup, setTimedPopup] = useState(false);

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 3000); // Changed from 1000 to 3000 to delay the popup a bit more
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <I18nextProvider i18n={i18next}>
        <ShopContextProvider>
          <div className="App" id={theme}>
            <Router>
              <AuthProvider>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Shop />} />
                  <Route path="/ProductSite/:productId" element={<ProductSite />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/test" element={<Test />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/password-reset/:token" element={<ResetPassword />} />
                  <Route path="/FAQ" element={<FAQ />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/NewsletterForm" element={<NewsletterForm />} />
                  <Route path="/AboutUs" element={<AboutUs />} />
                  <Route path="/ComparationSite" element={<ComparationSite />} />
                  <Route path="/ProductFilterPage" element={<ProductFilterPage />} />

                  {/* Additional routes if any */}
                </Routes>
                <Footer />
              </AuthProvider>
            </Router>
            <main>
              <PopUp trigger={timedPopup} setTrigger={setTimedPopup}>
                <h1>Noworoczne Promocje!!!</h1>
                <img
                  src="https://www.easypromosapp.com/blog/wp-content/uploads/xxss-new-years-eve-promotions-and-giveaways.jpg"
                  alt="Noworoczne Promocje"
                />
              </PopUp>
            </main>
          </div>
        </ShopContextProvider>
      </I18nextProvider>
    </ThemeContext.Provider>
  );
}

export default App;
