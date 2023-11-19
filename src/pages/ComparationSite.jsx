import React, { useState } from "react";
import axios from 'axios';
import "./comparationSite.css";

export const ComparationSite = () => {
  // States for the left side
  const [searchTermLeft, setSearchTermLeft] = useState("");
  const [productLeft, setProductLeft] = useState(null);
  const [isLoadingLeft, setIsLoadingLeft] = useState(false);
  const [errorLeft, setErrorLeft] = useState(null);
  const [searchResultsLeft, setSearchResultsLeft] = useState([]);

  // States for the right side
  const [searchTermRight, setSearchTermRight] = useState("");
  const [productRight, setProductRight] = useState(null);
  const [isLoadingRight, setIsLoadingRight] = useState(false);
  const [errorRight, setErrorRight] = useState(null);
  const [searchResultsRight, setSearchResultsRight] = useState([]);

  // Function to fetch product details
  const fetchProductDetails = async (searchTerm, setSearchResults, setIsLoading, setError) => {
    setIsLoading(true);
    setError(null);
    setProductLeft(null); // Clear previous product details for the left
    setProductRight(null); // Clear previous product details for the right
    if (!searchTerm.trim()) {
      setSearchResults([]); // Clear the search results if the search term is empty
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:8000/api/products`, {
        params: { search: searchTerm }
      });
      setSearchResults(response.data.length > 0 ? response.data : null);
      setError(response.data.length > 0 ? null : "No products found with that name");
    } catch (error) {
      setError("Error fetching product details");
      console.error(error);
    }
    setIsLoading(false);
  };

  // Function to render a product's details in a table
  const renderProductTable = (product) => {
    return product && (
      <table className="product-details-table">
        <tbody>
          <tr>
            <td>Name:</td>
            <td>{product.name}</td>
          </tr>
          <tr>
            <td>Screen:</td>
            <td>{product.Screen}</td>
          </tr>
          <tr>
            <td>Processor:</td>
            <td>{product.Processor}</td>
          </tr>
          <tr>
            <td>RAM:</td>
            <td>{product.RAM}</td>
          </tr>
          <tr>
            <td>Storage:</td>
            <td>{product.GB}</td>
          </tr>
          <tr>
            <td>Price:</td>
            <td>{product.price}</td>
          </tr>
          {/* Add more product details here */}
        </tbody>
      </table>
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Left Column */}
      <div style={{ flex: 1, padding: '10px' }}>
        <input
          type="text"
          value={searchTermLeft}
          placeholder="Search Product (Left)"
          onChange={(e) => setSearchTermLeft(e.target.value)}
        />
        <button onClick={() => fetchProductDetails(searchTermLeft, setSearchResultsLeft, setIsLoadingLeft, setErrorLeft)}>
          Search Left
        </button>
        {isLoadingLeft && <p>Loading...</p>}
        {errorLeft && <p>{errorLeft}</p>}
        {searchResultsLeft && searchResultsLeft.map(product => (
          <div key={product.id} onClick={() => setProductLeft(product)}>
            {product.name}
          </div>
        ))}
        {renderProductTable(productLeft)}
      </div>
      
      {/* Right Column */}
      <div style={{ flex: 1, padding: '10px' }}>
        <input
          type="text"
          value={searchTermRight}
          placeholder="Search Product (Right)"
          onChange={(e) => setSearchTermRight(e.target.value)}
        />
        <button onClick={() => fetchProductDetails(searchTermRight, setSearchResultsRight, setIsLoadingRight, setErrorRight)}>
          Search Right
        </button>
        {isLoadingRight && <p>Loading...</p>}
        {errorRight && <p>{errorRight}</p>}
        {searchResultsRight && searchResultsRight.map(product => (
          <div key={product.id} onClick={() => setProductRight(product)}>
            {product.name}
          </div>
        ))}
        {renderProductTable(productRight)}
      </div>
    </div>
  );
};