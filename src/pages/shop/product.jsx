import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useTranslation } from "react-i18next";

export const Product = (props) => {
  const {t} = useTranslation("global");
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (
    <div className="product">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> PLN {price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        {t("shop.button")} {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
