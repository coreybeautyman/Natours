import React, { FC } from 'react';
import ReviewCard from './ReviewCard';
import { ReviewsProps } from '../types/types';

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
