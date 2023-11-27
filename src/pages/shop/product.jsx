import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { useTranslation } from "react-i18next";
import useProduct from "./useProduct";
import { useNavigate } from "react-router-dom";

export const Product = (props) => {
  const {t} = useTranslation("global");
  const { id, name, price, photo } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const { isLoading, error, product } = useProduct("2");
  console.log("product", {product, isLoading, error})
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    console.log("clicked");
    navigate(`/ProductSite/${productId}`);
  };
  
  const cartItemCount = cartItems[id];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="product" onClick={() =>handleProductClick(id)}>
      <img src={photo} />
      <div className="description">
        <p>
          <b>{name}</b>
        </p>
        <p> PLN {price}</p>
      </div>
  
    </div>
  );
};

