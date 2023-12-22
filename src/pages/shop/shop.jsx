import React, { useState, useEffect } from "react";
import { Product } from "./product";
import "./shop.css";
import useProducts from "./useProducts";

export const Shop = (props) => {
  const { isLoading, error, products } = useProducts();
  const [filters, setFilters] = useState({
    RAM: '',  // For Laptop and Phone categories
    Storage: '',  // For Laptop and Phone categories
  });

  // Function to filter products
  const getFilteredProducts = () => {
    let filtered = products.filter(
      (product) => !props.selectedCategory || product.Category === props.selectedCategory
    );

    if (filters.RAM) {
      filtered = filtered.filter(product => product.RAM === parseInt(filters.RAM));
    }

    if (filters.Storage) {
      filtered = filtered.filter(product => product.Storage === parseInt(filters.Storage));
    }

    // Add more conditions for other filters if necessary

    return filtered;
  };

  // Call getFilteredProducts and store the results in state
  const [displayedProducts, setDisplayedProducts] = useState([]);

  // Use useEffect to update products when filters or selectedCategory changes
  useEffect(() => {
    setDisplayedProducts(getFilteredProducts());
  }, [products, filters, props.selectedCategory]);

  // Use useEffect to reset filters when the selectedCategory changes
  useEffect(() => {
    setFilters({
      RAM: '',
      Storage: '',
      // Reset other filters if necessary
    });
  }, [props.selectedCategory]);

  // User interface for filters
  const filtersUI = () => (
    <div className="filters">
      <label htmlFor="RAM">RAM:</label>
      <select
        id="RAM"
        value={filters.RAM}
        onChange={(e) => setFilters({ ...filters, RAM: e.target.value })}
      >
        <option value="">Wybierz</option>
        <option value="8">8GB</option>
        <option value="16">16GB</option>
        {/* Add more options */}
      </select>

      <label htmlFor="Storage">Storage:</label>
      <select
        id="Storage"
        value={filters.Storage}
        onChange={(e) => setFilters({ ...filters, Storage: e.target.value })}
      >
        <option value="">Wybierz</option>
        <option value="64">64GB</option>
        <option value="128">128GB</option>
        <option value="256">256GB</option>
        {/* Add more options */}
      </select>

      {/* Add more interfaces for other categories if necessary */}
    </div>
  );

  // Display products and handle loading and errors
  return (
    <div className="shop p-16 sm:p-8 md:p-16 lg:p-10">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && (
        <>
          {filtersUI()}
          <div className="shopTitle text-center mb-4">
            <h1 className="text-4xl font-bold mb-12">Nasza oferta</h1>
          </div>
          <div className="products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {displayedProducts.map((product) => (
              <Product key={product.id} data={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
