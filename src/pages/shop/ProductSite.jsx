import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../../context/shop-context';
import RatingStars from './RatingStars';
import './ProductSite.css';


function ProductSite() {
  const productId = '1'; 
  //const { productId } = useParams();
  console.log('ProductId:', productId);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useContext(ShopContext);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]); // Poprawka na pustą tablicę
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  
  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setCommentsList(response.data.comments || []); // Ustawienie listy komentarzy
      })
      .catch(error => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!productId) {
      console.error("ProductId is undefined");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8000/api/products/${productId}/comments`, {
        rating,
        content: comment,
      });
      setComments([...comments, response.data]); // Dodanie nowego komentarza do stanu
      setRating(0);
      setComment(''); // Resetowanie pola komentarza
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
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
          <div className="reviews-section">
            <h3>Oceny i recenzje</h3>
            <div className="average-rating">
              <RatingStars rating={product.rating} outOf={6} />
            </div>

            <div className="comments-section">
              {commentsList.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-content">
                    <div className="comment-author">{comment.author}</div>
                    <div className="comment-text">{comment.content}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="rating">Ocena:</label>
                <input
                  id="rating"
                  type="number"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  min="0"
                  max="6"
                />
              </div>
              <div>
                <label htmlFor="comment">Komentarz:</label>
                <textarea
                  id="comment"
                  value={comment} // Upewnij się, że to jest 'comment', a nie 'comments'
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button type="submit">Wyślij ocenę i komentarz</button>
            </form> */}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductSite;