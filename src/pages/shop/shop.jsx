import React from "react";

import { Product } from "./product";
import "./shop.css";
import { useEffect } from "react";
import useAuthContext from "../../context/AuthContext";
import useProducts from "./useProducts";

// export const Shop = (props) => {
//   console.log("props", props)
//   const { isLoading, error, products } = useProducts();
//   console.log("products", {products, isLoading, error})

//   const filteredProductsByCategory = products.filter(el => !props.selectedCategory || el.Category === props.selectedCategory).slice(0, 12); 
//   console.log("filteredProductsByCategory", filteredProductsByCategory);

//   return (
    
//     <div className="shop p-4 sm:p-8 md:p-16 lg:p-20">
//       <div className="shopTitle text-center mb-8">
       
//       </div>
//       <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {filteredProductsByCategory.map((product) => (
//           <Product data={product} key={product.id}/>
//         ))}
//       </div>
//     </div>
//   );
// };
export const Shop = (props) => {
  const { isLoading, error, products } = useProducts();
  console.log("products", { products, isLoading, error });

  const filteredProductsByCategory = products.filter(
    (el) => !props.selectedCategory || el.Category === props.selectedCategory
  );

  const displayedProducts =
    props.selectedCategory === "" ? filteredProductsByCategory.slice(0, 12) : filteredProductsByCategory;

  return (
    <div className="shop p-16 sm:p-8 md:p-16 lg:p-10">
      <div className="shopTitle text-center mb-4">
        <h1 className="text-4xl font-bold mb-12 ">Nasza oferta </h1>
      </div>
      <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedProducts.map((product) => (
          <Product data={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};