import React, { useContext, useState } from 'react';
import { ShopContext } from '../../context/shop-context';
import CartItem from './cart-item';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuthContext from "../../context/AuthContext";

import './cart.css';

export const Cart = () => {
  const { t } = useTranslation('global');
  const { cartItems, getTotalCartAmount } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const { user, login } = useAuthContext();
  const navigate = useNavigate();
  const [email] = useState("");
  const [password] = useState("");

  const handleCheckout = async () => {
    if (user) {
      navigate('/payment');
    } else {
      const result = await login({ email, password });
      if (result) {
        navigate('/order');
      } else {
        navigate('/loginRegistryGuest');
      }
    }
  };

  return (
    <div className="cart p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl text-center">{t('cart.title')}</h1>
      </div>
      <div className="cart-items-container">
        {Object.values(cartItems).filter(item => item.quantity > 0).map(item => (
          <CartItem key={item.id} data={item} />
        ))}
      </div>
      <div className="checkout mt-8 text-center">
        <p className="text-lg md:text-xl">{t('cart.total')}: PLN {totalAmount}</p>
        <button
          className="w-40 h-12 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          onClick={() => navigate('/')}
        >
          {t('cart.button')}
        </button>
        <button
          className="w-40 h-12 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
          onClick={handleCheckout}
        >
          {t('cart.checkout')}
        </button>
      </div>
    </div>
  );
};

export default Cart;
