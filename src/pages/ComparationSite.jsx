import React, { useState } from "react";
import axios from 'axios';
import "./comparationSite.css";
import { useTranslation } from "react-i18next";

export const ComparationSite = () => {
  const { t } = useTranslation("global");

  // Stany dla lewej i prawej strony
  const [searchTermLeft, setSearchTermLeft] = useState("");
  const [productLeft, setProductLeft] = useState(null);
  const [isLoadingLeft, setIsLoadingLeft] = useState(false);
  const [errorLeft, setErrorLeft] = useState(null);
  const [searchResultsLeft, setSearchResultsLeft] = useState([]);

  const [searchTermRight, setSearchTermRight] = useState("");
  const [productRight, setProductRight] = useState(null);
  const [isLoadingRight, setIsLoadingRight] = useState(false);
  const [errorRight, setErrorRight] = useState(null);
  const [searchResultsRight, setSearchResultsRight] = useState([]);

  const [category, setCategory] = useState("");

  // Funkcja do pobierania szczegółów produktu
  const fetchProductDetails = async (side, searchTerm) => {
    const setIsLoading = side === 'left' ? setIsLoadingLeft : setIsLoadingRight;
    const setSearchResults = side === 'left' ? setSearchResultsLeft : setSearchResultsRight;
    const setError = side === 'left' ? setErrorLeft : setErrorRight;
  
    setIsLoading(true);
    setError(null);
  
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await axios.get(`http://localhost:8000/api/products`, {
        params: { search: searchTerm, category: category }
      });
      setSearchResults(response.data.length > 0 ? response.data : []);
      setError(response.data.length > 0 ? null : "No products found with that name");
    } catch (error) {
      setError("Error fetching product details");
      console.error(error);
    }
    setIsLoading(false);
  };
  

  // Funkcja renderująca specyfikacje produktu
  const renderProductSpecs = (product) => {
    if (!product) return null;
  
    switch (product.Category) {
      case 'Monitor':
      case 'TV':
        return (
          <>
            <p><strong>Diagonal:</strong> {product.diagonal}</p>
            <p><strong>Matrix:</strong> {product.Matrix}</p>
            <p><strong>Resolution:</strong> {product.Resolution}</p>
            <p><strong>Energy Class:</strong> {product.Energyclass}</p>
          </>
        );
      case 'Tablet':
      case 'Laptop':
      case 'Phone':
        return (
          <>
            <p><strong>Screen:</strong> {product.Screen}</p>
            <p><strong>Processor:</strong> {product.Processor}</p>
            <p><strong>RAM:</strong> {product.RAM}</p>
            <p><strong>Storage:</strong> {product.Storage}</p>
          </>
        );
      case 'Headphones':
        return (
          <>
            <p><strong>Connection:</strong> {product.connection}</p>
            <p><strong>Microphone:</strong> {product.microphone}</p>
            <p><strong>Noise Cancelling:</strong> {product.noisecancelling}</p>
            <p><strong>Headphone Type:</strong> {product.headphonetype}</p>
          </>
        );
      case 'Printer':
        return (
          <>
            <p><strong>Printing Technology:</strong> {product.Printingtechnology}</p>
            <p><strong>Interfaces:</strong> {product.Interfaces}</p>
            <p><strong>Print Speed:</strong> {product.Printspeed}</p>
            <p><strong>Duplex Printing:</strong> {product.Duplexprinting}</p>
          </>
        );
      // Dodaj inne przypadki dla różnych kategorii, jeśli potrzebne
      default:
        return <p>Brak dostępnych specyfikacji dla tej kategorii.</p>;
    }
  };

  // Funkcja do renderowania wyboru kategorii
  const renderCategorySelection = () => (
    <select onChange={(e) => {
      console.log("Wybrano kategorię:", e.target.value); // Logowanie zmiany kategorii
      setCategory(e.target.value);
    }}>
      <option value="">Select Category</option>
      <option value="Laptop">Laptop</option>
      <option value="TV">TV</option>
      {/* Dodaj więcej kategorii tutaj */}
    </select>
  );
  


  return (
    <div className="comparation-site-container">
      {/* Wybór kategorii */}
      <div className="category-selection" style={{ textAlign: 'center', marginBottom: '20px' }}>
        {renderCategorySelection()}
      </div>
    
      <div className="responsive-columns" style={{ display: 'flex' }}>
        {/* Lewa Kolumna */}
        <div className="column" style={{ flex: 1, padding: '10px' }}>
          <input
            type="text"
            value={searchTermLeft}
            placeholder="Wyszukaj produkt"
            onChange={(e) => setSearchTermLeft(e.target.value)}
          />
          <button onClick={() => fetchProductDetails('left', searchTermLeft)}>
            Szukaj
          </button>
          {isLoadingLeft && <p>Loading...</p>}
          {errorLeft && <p>{errorLeft}</p>}
          <div>
            {searchResultsLeft.map((product) => (
              <div key={product.id} onClick={() => setProductLeft(product)}>
                {product.name}
              </div>
            ))}
          </div>
          {productLeft && renderProductSpecs(productLeft)}
        </div>
    
        {/* Prawa Kolumna */}
        <div className="column" style={{ flex: 1, padding: '10px' }}>
          <input
            type="text"
            value={searchTermRight}
            placeholder="Wyszukaj produkt"
            onChange={(e) => setSearchTermRight(e.target.value)}
          />
          <button onClick={() => fetchProductDetails('right', searchTermRight)}>
            Szukaj
          </button>
          {isLoadingRight && <p>Loading...</p>}
          {errorRight && <p>{errorRight}</p>}
          <div>
            {searchResultsRight.map((product) => (
              <div key={product.id} onClick={() => setProductRight(product)}>
                {product.name}
              </div>
            ))}
          </div>
          {productRight && renderProductSpecs(productRight)}
        </div>
      </div>
    </div>
  );
};