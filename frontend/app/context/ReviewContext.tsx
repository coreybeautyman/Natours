'use client';

import axios from 'axios';
import { useContext, createContext, useState, useEffect } from 'react';
import { Review, ReviewContextType, ReviewProviderProps } from '../types/types';
import { useAuth } from './AuthContext';
import { useAlert } from './AlertContext';

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const [loadingGetReviews, setLoadingGetReviews] = useState<boolean>(false);
  const [loadingPostReviews, setLoadingPostReviews] = useState<boolean>(false);
  const [myReviews, setMyReviews] = useState<Review[] | undefined>(undefined);
  const [reviewsError, setReviewsError] = useState<string | null>(null);
  const [myReviewsInitialised, setMyReviewsIsInitialised] =
    useState<boolean>(false);
  const { isAuthenticated, user } = useAuth();
  const { triggerAlert } = useAlert();

  const resetReviewState = () => {
    setLoadingGetReviews(false);
    setMyReviews(undefined);
    setReviewsError(null);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      resetReviewState();
    }
  }, [isAuthenticated]);

  const postReview = async (
    review: string,
    starRating: number | null,
    tourId: string
  ) => {
    setLoadingPostReviews(true);
    if (!user || !isAuthenticated) return;
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/v1/reviews',
        {
          user: user._id,
          tour: tourId,
          review,
          rating: starRating,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.status === 'success') {
        triggerAlert({
          message: 'Review posted successfully',
          type: 'success',
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        triggerAlert({
          message: 'Only users are able to post reviews on tours',
          type: 'error',
        });
      } else {
        triggerAlert({ message: 'Review failed to post', type: 'error' });
      }

      console.log(error);
    } finally {
      setLoadingPostReviews(false);
    }
  };

  const fetchMyReviews = async () => {
    setLoadingGetReviews(true);
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
      setLoadingGetReviews(false);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        fetchMyReviews,
        myReviews,
        loadingGetReviews,
        reviewsError,
        myReviewsInitialised,
        postReview,
        loadingPostReviews,
        loadingReviews: loadingGetReviews || loadingPostReviews,
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
