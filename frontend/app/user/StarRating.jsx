'use client'

import { useState } from "react";
import ReactStars from "react-rating-stars-component";


const StarRating = ({ totalStars }) => {
  const [rating, setRating] = useState(totalStars);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div>
      <ReactStars
        count={5}
        onChange={handleStarClick}
        value={rating}
        size={40}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
      />
    </div>
  );
};

export default StarRating;
