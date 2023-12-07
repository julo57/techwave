import React, { createContext, useState } from 'react';

// Utworzenie nowego kontekstu
export const PaymentContext = createContext();

// Domyślne wartości dla szczegółów płatności
const getDefaultPaymentDetails = () => {
  return {
    deliveryMethod: 'courier', // domyślna metoda dostawy
    paymentMethod: 'online', // domyślna metoda płatności
    address: {
      name: '',
      street: '',
      city: '',
      zip: '',
    },
    promoCode: '',
    discountRate: 0, // domyślna wartość zniżki
    newsletterSubscription: false,
    termsAgreement: false,
  };
};

// Provider kontekstu
export const PaymentContextProvider = ({ children }) => {
  const [paymentDetails, setPaymentDetails] = useState(getDefaultPaymentDetails());

  // Metoda aktualizująca szczegóły płatności
  const updatePaymentDetails = (details) => {
    setPaymentDetails(prevDetails => ({ ...prevDetails, ...details }));
  };

  // Metoda aplikowania kodu promocyjnego
  const applyPromoCode = (code) => {
    // Logika sprawdzająca kod i ustawiająca zniżkę
    if (code === 'PROMO10') {
      setPaymentDetails(currentDetails => ({
        ...currentDetails,
        promoCode: code,
        discountRate: 0.1 // 10% zniżki
      }));
    }
    // Dalsze przypadki kodów promocyjnych
  };

  // Wartości przekazywane przez Provider
  const contextValue = {
    paymentDetails,
    updatePaymentDetails,
    applyPromoCode, // Dodanie tej metody do wartości kontekstu
  };

  return <PaymentContext.Provider value={contextValue}>{children}</PaymentContext.Provider>;
};

export default PaymentContextProvider;
