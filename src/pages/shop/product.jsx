
import React, { useContext, useMemo, useCallback } from "react";
import { ShopContext } from "../../context/shop-context";
import { useTranslation } from "react-i18next";
import useProduct from "./useProduct";
import { useNavigate } from "react-router-dom";

export const Product = React.memo((props) => {
  const {t} = useTranslation("global");
  const { id, name, price, photo } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const { isLoading, error, product } = useProduct(id); // Use dynamic id
  const navigate = useNavigate();

  const handleProductClick = useCallback(() => {
    navigate(`/ProductSite/${id}`);
  }, [id, navigate]);

  const cartItemCount = useMemo(() => cartItems[id], [cartItems, id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

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

 