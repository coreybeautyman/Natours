import React, { FC, useState } from 'react';
import { WriteReviewProps } from '../types/types';
import { useAuth } from '../context/TempAuthContext';
import { useReview } from '../context/TempReviewContext';
import StarRating from './StarRating';

const TourPageSectionWriteReview: FC<WriteReviewProps> = ({ tourId }) => {
  const [reviewText, setReviewText] = useState<string>('');
  const [starRating, setStarRating] = useState<number | null>(null);
  const { user } = useAuth();
  const { postReview } = useReview();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postReview(reviewText, starRating, tourId);
    setReviewText('');
    setStarRating(null);
  };

  if (user) {
    return (
      <section className="section-review">
        <form className="review--cont" onSubmit={handleSubmitReview}>
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
            rating={starRating}
          />
          <button className="btn btn--green" id="book-tour">
            Submit
          </button>
        </form>
      </section>
    );
  }
};

export default TourPageSectionWriteReview;
