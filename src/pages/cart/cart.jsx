import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./cart.css";

export const Cart = () => {
  const {t} = useTranslation("global");
  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const navigate = useNavigate();

  return (
    <div className="cart p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl text-center">{t("cart.title")}</h1>
      </div>
      <div className="cart">
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) {
            return (
              <CartItem
                key={product.id}
                data={product}
                imageClass="mx-auto" // Dodaj klasę "mx-auto" dla wyśrodkowanego zdjęcia
              />
            );
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout mt-8 text-center">
          <p className="text-lg md:text-xl">{t("cart.paragraph")}: PLN {totalAmount}</p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-center justify-center">
            <button
              className="w-40 h-12 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
              onClick={() => navigate("/")}
            >
             {t("cart.button")}
            </button>
            <button
              className="w-40 h-12 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              onClick={() => {
                checkout();
                navigate("/checkout");
              }}
            >
              {t("cart.button2")}
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-lg md:text-xl mt-4 text-center">{t("cart.title2")}</h1>
      )}
    </div>
  );
};
