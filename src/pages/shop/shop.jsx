import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import { useEffect } from "react";
import useAuthContext from "../../context/AuthContext";

export const Shop = () => {
  
  return (
    
    <div className="shop p-4 sm:p-8 md:p-16 lg:p-20">
      <div className="shopTitle text-center mb-8">
       
      </div>
      <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PRODUCTS.map((product) => (
          <Product data={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
