import React, { useContext, useMemo, useCallback } from "react";
import { ShopContext } from "../../context/shop-context";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Product = React.memo((props) => {
  const {t} = useTranslation("global");
  const { id, name, price, photo } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleProductClick = useCallback(() => {
    navigate(`/ProductSite/${id}`);
  }, [id, navigate]);

  const cartItemCount = useMemo(() => cartItems[id], [cartItems, id]);


  return (
    <div className="product" onClick={handleProductClick}>
      <img src={photo} alt={name} loading="lazy" />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> PLN {price}</p>
      </div>
    </div>
  );
});

export  default Product;