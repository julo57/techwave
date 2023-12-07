// Zaimportuj useState i createContext z React
import { createContext, useState } from 'react';

// Stwórz nowy kontekst
export const ShopContext = createContext(null);

// Domyślny stan dla koszyka
const getDefaultCart = () => {
  return {};
};

// Provider dla ShopContext
export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Funkcja obliczająca całkowitą wartość koszyka
  const getTotalCartAmount = () => {
    return Object.values(cartItems).reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const newCartItems = { ...prevItems };
      if (newCartItems[product.id]) {
        newCartItems[product.id].quantity += 1;
      } else {
        // Assuming 'photo' is the property from the product object
        newCartItems[product.id] = { ...product, quantity: 1, imageUrl: product.photo };
      }
      return newCartItems;
    });
  };

  // Funkcja usuwająca produkt z koszyka
  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[id].quantity > 1) {
        newItems[id].quantity = 0;
      } else {
        delete newItems[id];
      }
      return newItems;
    });
  };

  // Funkcja aktualizująca ilość produktu w koszyku
  const updateCartItemCount = (quantity, id) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (quantity > 0) {
        newItems[id].quantity = quantity;
      } else {
        delete newItems[id];
      }
      return newItems;
    });
  };

  // Funkcja realizująca zakup
  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  // Wartości przekazywane przez Provider
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
    checkout,
  };
  

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};
