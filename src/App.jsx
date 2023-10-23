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
import { AuthProvider } from "./context/AuthContext";


function App() {
  

  return (
    <div className="App">
      <ShopContextProvider> 
     
        <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          </AuthProvider>
        </Router>
      
      </ShopContextProvider>
    </div>
  );
}

export default App;
