import React from 'react';
import { faStar, faStarHalfAlt, faStar as faStarRegular } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ProductSite';


const RatingStars = ({ rating, outOf = 5 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = outOf - fullStars - halfStar;

  return (
    <div className="rating-stars">
      {[...Array(fullStars)].map((_, i) => (
        <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="star full-star" />
      ))}
      {halfStar === 1 && <FontAwesomeIcon icon={faStarHalfAlt} className="star half-star" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FontAwesomeIcon key={`empty-${i}`} icon={faStarRegular} className="star empty-star" />
      ))}
    </div>
  );
};

export default RatingStars;
