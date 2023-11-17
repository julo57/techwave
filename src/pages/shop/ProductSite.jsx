import React, { useState, useEffect, useContext } from 'react';
import axios from "../../api/axios";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../../context/shop-context';
import RatingStars from './RatingStars';
import './ProductSite.css';
import useAuthContext from "../../context/AuthContext";



function ProductSite() {
  const productId = '1'; 
  //const { productId } = useParams();
  console.log('ProductId:', productId);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToCart } = useContext(ShopContext);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]); 
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const { user } = useAuthContext();
  

  const calculateAverageRating = () => {
    let sum = 0;
    if (commentsList.length === 0) return 0;
  
    commentsList.forEach(comment => {
      // Sprawdzenie, czy ocena jest liczbą i czy nie jest pusta
      if (!isNaN(comment.rating) && comment.rating !== '') {
        sum += parseFloat(comment.rating);
      }
    });
  
    // Obliczenie średniej oceny
    const averageRating = sum / commentsList.length;
    return isNaN(averageRating) ? 0 : averageRating; // Zapobieganie zwracaniu NaN
  };

  if (!user) {
  console.log('Nie zalogowany');
} else {
  console.log('Zalogowany');
}
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
    setIsSubmitting(true);


    if (!productId) {
      console.error("ProductId is undefined");
      return;
    }

    if (!comment.trim()) {
      alert('Komentarz nie może być pusty.');
      return;
    }

    try {
      await axios.get('/sanctum/csrf-cookie'); // Pobranie CSRF token
      const response = await axios.post(`http://localhost:8000/api/products/${productId}/comments`, {
        rating,
        content: comment,
    }, {
      headers: {
        Authorization: `Bearer ${user ? user.access_token : null}`, // Przekazanie tokena uwierzytelniającego
      }, 
      });
      setComments([...comments, response.data]); // Dodanie nowego komentarza do stanu
      setRating(0);
      setComment(''); // Resetowanie pola komentarza
      axios.get(`http://localhost:8000/api/products/${productId}`)
      .then(response => {
        setProduct(response.data);
        setCommentsList(response.data.comments || []); // Ustawienie listy komentarzy
        alert('Dodano komentarz.');
      })
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Użytkownik niezalogowany - wyświetl alert
        alert('Nie zalogowany użytkownik nie może dodać komentarza.');
      } else {
      console.error("Error submitting comment:", error);
      }
    }
    setIsSubmitting(false);
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
            {/* <h3>Oceny i recenzje</h3> */}
            <div className="average-rating">
            <div className="average-rating">
              <div className='rating'><RatingStars rating= {calculateAverageRating()} outOf={5} /></div>
            </div>
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


            {user ? (
              <form className="comment-form" onSubmit={handleSubmit}>
              </form>
            ) : (
              <div className="comment-form disabled">
                <div className="disabled-message">Zaloguj sie aby dodać Opinie i Komentarz</div>
              </div>
            )}


            {user && ( // Sprawdzenie, czy użytkownik jest zalogowany
            <form className="comment-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="rating">Ocena:</label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label htmlFor="comment">Komentarz:</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <button type="submit" className={`submit-button ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                Wyślij ocenę i komentarz
                {isSubmitting && (
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                )}
              </button>


            </form>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductSite;