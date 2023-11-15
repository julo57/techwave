import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../../context/shop-context';
import RatingStars from './RatingStars';
import './ProductSite.css';

function ProductSite() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState(null); // Dodano stan dla ocen
  const [reviews, setReviews] = useState(null); // Dodano stan dla recenzji
  const { addToCart } = useContext(ShopContext);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setRatings(response.data.ratings);
        fetchComments(); // Wywołaj funkcję do pobierania komentarzy
      })
      .catch(error => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);
  
  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/products/${productId}/comments`);
      setComments(response.data); // Ustaw pobrane komentarze
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  
  const handleSubmitComment = async (event) => {
    event.preventDefault();
    // Logika dodawania komentarza
  };


  if (!product) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      addToCart(product);
      setIsLoading(false);
    }, 500);
  };
  return (
    <div className="product-site">
      <div className="product-title-container">
        <h2 className="product-title">{product.name}</h2>
      </div>
      <div className="product-content">
        <div className="product-image-container">
          <img className="product-image" src={product.photo} alt={product.name} />
        </div>
        <div className="product-purchase-info">
          <div className="product-specs">
            {/* Tutaj wstawiasz specyfikacje produktu. Przykład: */}
            <p><strong>Ekran:</strong> {product.Screen}</p>
            <p><strong>Procesor:</strong> {product.Processor}</p>
            <p><strong>Pamięć RAM:</strong> {product.RAM}</p>
            <p><strong>Pamięć wbudowana:</strong> {product.GB}</p>
          </div>
          <div className="product-purchase-section">
            <p className="product-price">{product.price} zł</p>
            <button className="btn-add-to-cart" onClick={handleAddToCart} disabled={isLoading}>
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin />
              ) : (
                <FontAwesomeIcon icon={faShoppingCart} />
              )}
              Dodaj do koszyka
            </button>
          </div>
        </div>
      </div>
      <div className="product-description">
        <p>{product.description}</p>
      </div>


      {product && (
        <>
          {/* ... */}
          <div className="reviews-section">
            <h3>Oceny i recenzje</h3>
            <div className="average-rating">
              <RatingStars rating={product.rating} outOf={6} />
            </div>
            {/* ... reszta sekcji z recenzjami ... */}

            // Wewnątrz JSX ProductSite

            <div className="comments-section">
              {comments && comments.map(comment => (
                <div key={comment.id} className="comment">
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>


          </div>
        </>
      )}
    </div>
  );
}


export default ProductSite;