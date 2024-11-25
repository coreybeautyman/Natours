import React from 'react';

interface User {
  photo: string;
  name: string;
}

interface Review {
  user: User;
  review: string;
  rating: number;
}

interface reviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<reviewCardProps> = ({ review }) => (
  <div className="reviews__card">
    <div className="reviews__avatar">
      <img
        className="reviews__avatar-img"
        src={`/img/users/${review.user.photo}`}
        alt={review.user.name}
      />
      <h6 className="reviews__user">{review.user.name}</h6>
    </div>

    <p className="reviews__text">{review.review}</p>

    <div className="reviews__rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`reviews__star reviews__star--${
            review.rating >= star ? 'active' : 'inactive'
          }`}
        >
          <use xlinkHref="/img/icons.svg#icon-star" />
        </svg>
      ))}
    </div>
  </div>
);

export default ReviewCard;
