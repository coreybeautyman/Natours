import React, { FC } from 'react';
import ReviewCard from './ReviewCard';

interface User {
  name: string;
  photo: string;
  _id: string;
}

interface Review {
  id: string;
  rating: number;
  review: string;
  tour: string;
  user: User;
}

interface ReviewsProps {
  reviews: Review[];
}

const TourPageSectionReviews: FC<ReviewsProps> = ({ reviews }) => {
  return (
    <section className="section-reviews">
      <div className="reviews">
        {reviews.map((review, idx) => (
          <ReviewCard review={review} key={idx} />
        ))}
      </div>
    </section>
  );
};

export default TourPageSectionReviews;
