import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import "./shop.css";
import { useEffect } from "react";
import useAuthContext from "../../context/AuthContext";

export const Shop = () => {
  const {user, getUser } = useAuthContext();

  useEffect(() => {
    if(!user){
      getUser();
    }
  }, [])
  return (
    
    <div className="shop bg-gray-100 p-4 sm:p-8 md:p-16 lg:p-20">
      <div className="shopTitle text-center mb-8">
        <div>{user?.name}</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          „TechWave” <br /> Sklep internetowy z elektroniką
        </h1>
      </div>
      <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PRODUCTS.map((product) => (
          <Product data={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
