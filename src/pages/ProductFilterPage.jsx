// ProductFilterPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductFilterPage.css';

export const ProductFilterPage = () => {
    const [filters, setFilters] = useState({
        category: [],
        price: { min: '', max: '' },
        ram: [],
        storage: [],
    });
    const [products, setProducts] = useState([]);

    // Handle change for checkbox filters like category, ram, and storage
    const handleCheckboxChange = (filterType, value, checked) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: checked
                ? [...prevFilters[filterType], value]
                : prevFilters[filterType].filter((item) => item !== value),
        }));
    };

    // Handle change for price filters
    const handlePriceChange = (name, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            price: {
                ...prevFilters.price,
                [name]: value,
            },
        }));
    };

    // Fetch products based on the current filters
    const fetchFilteredProducts = async () => {
        const queryParams = {
            // Convert array filters to comma-separated strings
            category: filters.category.join(','),
            ram: filters.ram.join(','),
            storage: filters.storage.join(','),
            // Include price filters if they have been set
            ...(filters.price.min && { priceMin: filters.price.min }),
            ...(filters.price.max && { priceMax: filters.price.max }),
        };

        try {
            const response = await axios.get('http://localhost:8000/api/products', { params: queryParams });
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="product-filter-page">
            <div className="filter-sidebar">
                {/* ... other filters ... */}
                {/* Price Filter */}
                <div>
                    <h3>Cena</h3>
                    <input 
                        type="number" 
                        name="min" 
                        value={filters.price.min}
                        onChange={(e) => handlePriceChange('min', e.target.value)}
                        placeholder="od"
                    />
                    <input 
                        type="number" 
                        name="max" 
                        value={filters.price.max}
                        onChange={(e) => handlePriceChange('max', e.target.value)}
                        placeholder="do"
                    />
                </div>
                {/* RAM Filter */}
                {/* ... */}
                {/* Storage Filter */}
                {/* ... */}
                <button onClick={fetchFilteredProducts}>Filtruj</button>
            </div>
            <div className="product-list">
                <h2>Produkty</h2>
                {/* Display products here */}
                {products.map(product => (
                    <div key={product.id} className="product-item">
                        <h3>{product.name}</h3>
                        {/* Add more product details here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductFilterPage;
