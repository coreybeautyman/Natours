'use client';

import axios from 'axios';
import { useContext, createContext, useState, useEffect } from 'react';
import { Review, ReviewContextType, ReviewProviderProps } from '../types/types';
import { useAuth } from './AuthContext';

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const [loadingReviews, setLoadingReviews] = useState<boolean>(false);
  const [myReviews, setMyReviews] = useState<Review[] | undefined>(undefined);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [myReviewsInitialised, setMyReviewsIsInitialised] =
    useState<boolean>(false);
  const { isAuthenticated } = useAuth();

  const resetReviewState = () => {
    setLoadingReviews(false);
    setMyReviews(undefined);
    setReviewsError(null);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      resetReviewState();
    }
  }, [isAuthenticated]);

  const fetchMyReviews = async () => {
    setLoadingReviews(true);
    setReviewsError(null);
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/reviews/my-reviews',
        {
          withCredentials: true,
        }
      );
      setMyReviewsIsInitialised(true);
      setMyReviews(response.data.data.reviews);
    } catch (error) {
      setReviewsError('error loading reviews');
      console.log(error);
    } finally {
      setLoadingReviews(false);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        fetchMyReviews,
        myReviews,
        loadingReviews,
        reviewsError,
        myReviewsInitialised,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReview = () => {
  const context = useContext(ReviewContext);
  if (!context) throw new Error('useTour must be used within a TourProvider');
  return context;
};
