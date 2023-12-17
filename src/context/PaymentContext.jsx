import React, { createContext, useState } from 'react';

export const PaymentContext = createContext();

const getDefaultPaymentDetails = () => {
  return {
    deliveryMethod: 'courier',
    paymentMethod: 'online',
    address: {
      name: '',
      street: '',
      city: '',
      zip: '',
    },
    promoCode: '',
    discountRate: 0,
    newsletterSubscription: false,
    termsAgreement: false,
  };
};

export const PaymentContextProvider = ({ children }) => {
  const [paymentDetails, setPaymentDetails] = useState(getDefaultPaymentDetails());
  const [deliveryCost, setDeliveryCost] = useState(0);

  const updatePaymentDetails = (details) => {
    setPaymentDetails(prevDetails => ({ ...prevDetails, ...details }));
  };

  const applyPromoCode = (code) => {
    if (code === 'PROMO10') {
      setPaymentDetails(currentDetails => ({
        ...currentDetails,
        promoCode: code,
        discountRate: 0.1 // 10% discount
      }));
    }
    // Additional promo code logic here
  };

  const updateDeliveryCost = (cost) => {
    console.log("Updating delivery cost in context to:", cost);
    setPaymentDetails(prevDetails => ({
      ...prevDetails,
      deliveryCost: cost
    }));
  };

  const contextValue = {
    paymentDetails,
    updatePaymentDetails,
    applyPromoCode,
    deliveryCost,
    updateDeliveryCost,
  };

  return (
    <PaymentContext.Provider value={contextValue}>
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContextProvider;
