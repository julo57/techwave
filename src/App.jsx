import React, { useState, createContext, useContext, useEffect } from "react";
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


export const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState("light");
  const [timedPopup, setTimedPopup] = useState(false); // Przenieś to poza funkcję toggleTheme

  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 1000);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <ShopContextProvider>
        

          <Router>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
            <Footer />
            <Routes>
              <Route path="/FAQ" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/NewsletterForm" element={<NewsletterForm />} />
              <Route path="/AboutUs" element={<AboutUs />} />
            </Routes>
            </AuthProvider>
          </Router>
          
        </ShopContextProvider>
        <main>
          <PopUp trigger={timedPopup} setTrigger={setTimedPopup}>
            <h1>Noworoczne Promocje!!!</h1>
            <img src="https://www.easypromosapp.com/blog/wp-content/uploads/xxss-new-years-eve-promotions-and-giveaways.jpg" alt="Noworoczne Promocje" />
          </PopUp>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
