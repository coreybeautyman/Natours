import React, { FC, useState } from 'react';
import { CtaProps } from '../types/types';
import { useAuth } from '../context/AuthContext';
import { useReview } from '../context/ReviewContext';
import StarRating from './StarRating';

const TourPageSectionWriteReview: FC<CtaProps> = ({ tourId }) => {
  const [reviewText, setReviewText] = useState<string>('');
  const [starRating, setStarRating] = useState<number | null>(null);
  const { user } = useAuth();
  const { postReview } = useReview();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = (e: React.ChangeEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postReview(reviewText, starRating, tourId);
  };

  if (user) {
    return (
      <section className="section-review">
        <form className="review--cont">
          <h2 className="heading-secondary">What did you think of the tour?</h2>
          <textarea
            className="review--input"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={handleTextChange}
          ></textarea>
          <StarRating
            size={40}
            color="#55c57a"
            onSetMovieRating={setStarRating}
          />
          <button
            className="btn btn--green"
            id="book-tour"
            onClick={handleSubmitReview}
          >
            Submit
          </button>
        </form>
      </section>
    );
  }
};

export default TourPageSectionWriteReview;
