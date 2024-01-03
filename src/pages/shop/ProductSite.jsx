import React, { useState, useEffect, useContext } from 'react';
import axios from "../../api/axios";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../../context/shop-context';
import RatingStars from './RatingStars';
import './ProductSite.css';
import useAuthContext from "../../context/AuthContext";
import { useTranslation } from "react-i18next";



function ProductSite() {
  const {t} = useTranslation("global");
 
  const { productId } = useParams();
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
      setCommentsList(response.data.comments || []);
      setIsLoading(false);
    })
    .catch(error => {
      console.error("Error fetching product:", error);
      setIsLoading(false);
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

  const renderProductSpecs = (product) => {
    switch (product.Category) {
      case 'Monitor':
      case 'TV':
        return (
          <>
            <p><strong>{t("product.Diagonal")}: {product.diagonal}</strong></p>
            <p><strong>{t("product.Matrix")}: {product.Matrix}</strong></p>
            <p><strong>{t("product.Resolution")}: {product.Resolution}</strong></p>
            <p><strong>{t("product.EnergyClass")}: {product.Energyclass}</strong></p>
          </>
        );
      case 'Tablet':
      case 'Laptop':
      case 'Phone':
        return (
          <>
            <p><strong>{t("product.Screen")}: {product.Screen}Hz</strong></p>
            <p><strong>{t("product.Processor")}: {product.Processor}</strong></p>
            <p><strong>{t("product.RAM")}: {product.RAM}GB</strong></p>
            <p><strong>{t("product.Storage")}: {product.Storage}GB</strong></p>
          </>
        );
      case 'Headphones':
        return (
          <>
            <p><strong>{t("product.Connection")}: {product.Connection}</strong></p>
            <p><strong>{t("product.Microphone")}: {product.Microphone}</strong></p>
            <p><strong>{t("product.NoiseCancelling")}: {product.NoiseCancelling}</strong></p>
            <p><strong>{t("product.HeadphoneType")}: {product.HeadphoneType}</strong></p>
          </>
        );
      case 'Printer':
        return (
          <>
            <p><strong>{t("product.PrintingTechnology")}: {product.PrintingTechnology}</strong></p>
            <p><strong>{t("product.Interfaces")}: {product.Interfaces}</strong></p>
            <p><strong>{t("product.PrintSpeed")}: {product.PrintSpeed}</strong></p>
            <p><strong>{t("product.DuplexPrinting")}: {product.DuplexPrinting}</strong></p>
          </>
        );
      // Add other cases for different categories as needed
      default:
        return <p>{t("product.NoSpecifications")}</p>;
    }
  };

  if (isLoading) {
    return (
      <div className="spinner-container">
        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

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
            {renderProductSpecs(product)}
          </div>
          <div className="product-purchase-section">
            <p className="product-price">{product.price} zł</p>
            <button className="btn-add-to-cart" onClick={handleAddToCart} disabled={isLoading || isSubmitting}>
              {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faShoppingCart} />}
              Dodaj do koszyka
            </button>
          </div>
        </div>
      </div>
      <div className="product-description">
        <p>{product.description}</p>
      </div>
  
      <div className="reviews-section">
        <div className="average-rating">
          <RatingStars rating={calculateAverageRating()} outOf={5} />
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
            <div>
              <label htmlFor="rating">Ocena:</label>
              <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
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
              <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <button type="submit" className={`submit-button ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
              Wyślij ocenę i komentarz
              {isSubmitting && <FontAwesomeIcon icon={faSpinner} spin />}
            </button>
          </form>
        ) : (
          <div className="comment-form disabled">
            <div className="disabled-message">Zaloguj się, aby dodać opinię i komentarz.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductSite;