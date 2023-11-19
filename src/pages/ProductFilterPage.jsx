import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductFilterPage.css';
import { useTranslation } from "react-i18next";
export const ProductFilterPage = () => {
    const { t } = useTranslation("global");
    const [allProducts, setAllProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [sortPreference, setSortPreference] = useState('priceAsc'); // Default sorting by price ascending
    const [filters, setFilters] = useState({
        category: [],
        priceMin: '',
        priceMax: '',
        ram: [],
        storage: [],
    });

    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products');
                setAllProducts(response.data);
                // Apply initial sorting by price descending
                setDisplayedProducts(response.data.sort((a, b) => b.price - a.price));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchAllProducts();
    }, []);

    const handleCheckboxChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: prev[filterType].includes(value)
                ? prev[filterType].filter(item => item !== value)
                : [...prev[filterType], value],
        }));
    };

    const handlePriceChange = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const applyFiltersAndSort = () => {
        // Kopiuj wszystkie produkty
        let filteredProducts = [...allProducts];

        // Zastosuj filtry
        if (filters.category.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                filters.category.includes(product.category)
            );
        }
        if (filters.priceMin !== '' && filters.priceMax !== '') {
            filteredProducts = filteredProducts.filter(product =>
                product.price >= parseFloat(filters.priceMin) &&
                product.price <= parseFloat(filters.priceMax)
            );
        }
        if (filters.ram.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                filters.ram.includes(product.RAM)
            );
        }
        if (filters.storage.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                filters.storage.includes(product.storage)
            );
        }

        // Sortowanie na podstawie wybranej preferencji
        switch (sortPreference) {
            case 'priceAsc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'priceDesc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'ramAsc':
                filteredProducts.sort((a, b) => a.RAM - b.RAM);
                break;
            case 'ramDesc':
                filteredProducts.sort((a, b) => b.RAM - a.RAM);
                break;
            case 'storageAsc':
                filteredProducts.sort((a, b) => a.storage - b.storage);
                break;
            case 'storageDesc':
                filteredProducts.sort((a, b) => b.storage - a.storage);
                break;
            default:
                break; // Handle default case or no sorting
        }

        // Ustaw wyświetlane produkty
        setDisplayedProducts(filteredProducts);
    };

    const handleFilterButtonClick = (event) => {
        event.preventDefault(); // Prevent default form submission
        applyFiltersAndSort();
    };

    return (
        <div className="product-filter-page">
            <div className="filter-sidebar">
                <h2>Filtry</h2>
                <div>
                    <select className="Czarny" value={sortPreference} onChange={(e) => setSortPreference(e.target.value)}>
                        <option value="priceAsc">{t("filter.Pricelow")}</option>
                        <option value="priceDesc">{t("filter.Pricehigh")}</option>
                        <option value="ramAsc">{t("filter.RAMlow")}</option>
                        <option value="ramDesc">{t("filter.RAMhigh")}</option>
                        <option value="storageAsc">{t("filter.Storagelow")}</option>
                        <option value="storageDesc">{t("filter.Storagehigh")}</option>
                    </select>
                </div>
                <button onClick={handleFilterButtonClick} className='filter'>{t("filter.filtr")}</button>
            </div>
            <div className="product-list">
                <h2>Produkty</h2>
                {displayedProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <h3>{product.name}</h3>
                        <p>Pamięć RAM (GB): {product.RAM}</p>
                        <p>Storage (GB): {product.storage}</p>
                        <p>Cena: {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductFilterPage;
