'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import { useContext, createContext, ReactNode, useState } from 'react';

type User = {
  _id: string;
  name: string;
  photo: string;
};

type Review = {
  id: string;
  review: string;
  rating: number;
  tour: string;
  user: User;
};

type ReviewContextType = {
  loading: boolean;
  myReviews: Review[] | undefined;
  fetchMyReviews: () => void;
  error: string | null;
};

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

type ReviewProviderProps = {
  children: ReactNode;
};

export const ReviewProvider: React.FC<ReviewProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [myReviews, setMyReviews] = useState<Review[] | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  const fetchMyReviews = async () => {
    setError(null);
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/reviews/my-reviews',
        {
          withCredentials: true,
        }
      );

      setMyReviews(response.data.data.reviews);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        fetchMyReviews,
        myReviews,
        loading,
        error,
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
