'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import { useContext, createContext, ReactNode, useState } from 'react';
import { useAuth } from './authContext';

type Tour = {
  name: string;
  slug: string;
  imageCover: string;
  duration: number;
  difficulty: string;
  summary: string;
  startLocation: {
    description: string;
    type: string;
    address: string;
    coordinates: Array<number>;
  };
  maxGroupSize: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  startDates: Date[];
  locations: Array<{
    description: string;
    type: string;
    coordinates: Array<number>;
    day: number;
    _id: ObjectId;
  }>;
};

type TourContextType = {
  allTours: Tour[];
  myTours: Tour[];
  tour: Tour | undefined;
  loading: boolean;
  error: string | null;
  fetchAllTours: () => void;
  fetchMyTours: () => void;
  fetchOneTour: (slug: string) => void;
  myToursInitialised: boolean;
  setMyToursIsInitialised: () => void;
  allToursInitialised: boolean;
  setallToursIsInitialised: () => void;
};

const TourContext = createContext<TourContextType | undefined>(undefined);

type TourProviderProps = {
  children: ReactNode;
};

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [myTours, setMyTours] = useState<Tour[]>([]);
  const [tour, setTour] = useState<Tour | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [myToursInitialised, setMyToursIsInitialised] =
    useState<boolean>(false);
  const [allToursInitialised, setallToursIsInitialised] =
    useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const fetchAllTours = async () => {
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/tours');
      setAllTours(response.data.data.doc);
      setallToursIsInitialised(true);
    } catch (error) {
      setError('Failed to fetch tours');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOneTour = async (slug: string) => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/tour/${slug}`);
      setTour(response.data.tour);
    } catch (error) {
      console.log(error);
      setError('Failed to fetch tour');
    } finally {
      setLoading(false);
    }
  };

  const fetchMyTours = async () => {
    if (myToursInitialised || !isAuthenticated) return;
    setError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/my-tours`, {
        withCredentials: true,
      });
      setMyTours(response.data.tours);
      setMyToursIsInitialised(true);
    } catch (error) {
      console.log(error);
      setError('Failed to fetch tour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TourContext.Provider
      value={{
        allTours,
        myTours,
        tour,
        loading,
        fetchAllTours,
        fetchMyTours,
        fetchOneTour,
        error,
        myToursInitialised,
        allToursInitialised,
      }}
    >
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);

  if (!context) throw new Error('useTour must be used within a TourProvider');
  return context;
};
