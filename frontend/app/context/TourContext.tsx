'use client';

import axios from 'axios';
import {
  useContext,
  createContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { Tour, TourContextType, TourProviderProps } from '../types/types';

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider: React.FC<TourProviderProps> = ({ children }) => {
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [myTours, setMyTours] = useState<Tour[]>([]);
  const [tour, setTour] = useState<Tour | undefined>(undefined);
  const [allToursLoading, setAllToursLoading] = useState<boolean>(false);
  const [oneTourLoading, setOneTourLoading] = useState<boolean>(false);
  const [myToursLoading, setMyToursLoading] = useState<boolean>(false);
  const [myToursInitialised, setMyToursIsInitialised] =
    useState<boolean>(false);
  const [allToursInitialised, setallToursIsInitialised] =
    useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  const [myToursError, setMyToursError] = useState<string | null>(null);
  const [allToursError, setAllToursError] = useState<string | null>(null);
  const [oneTourError, setOneTourError] = useState<string | null>(null);
  const [purchasedTour, setPurchasedTour] = useState<boolean>(false);

  const resetTourState = () => {
    setAllTours([]);
    setMyTours([]);
    setTour(undefined);
    setAllToursLoading(false);
    setOneTourLoading(false);
    setMyToursLoading(false);
    setMyToursIsInitialised(false);
    setallToursIsInitialised(false);
    setMyToursError(null);
    setAllToursError(null);
    setOneTourError(null);
    setPurchasedTour(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      resetTourState();
    }
  }, [isAuthenticated]);

  const fetchAllTours = useCallback(async () => {
    setAllToursLoading(true);
    setAllToursError(null);

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/tours');
      setAllTours(response.data.data.doc);
      setallToursIsInitialised(true);
    } catch (error) {
      setAllToursError('Failed to fetch tours');
      console.log(error);
    } finally {
      setAllToursLoading(false);
    }
  }, []);

  const fetchOneTour = async (slug: string | string[] | undefined) => {
    if (!slug) return;
    setOneTourLoading(true);
    setOneTourError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/tour/${slug}`);
      setTour(response.data.tour);
    } catch (error) {
      console.log(error);
      setOneTourError('Failed to fetch tour');
    } finally {
      setOneTourLoading(false);
    }
  };

  const fetchMyTours = useCallback(async () => {
    if (myToursInitialised || !isAuthenticated) return;
    setMyToursLoading(true);
    setMyToursError(null);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/my-tours`, {
        withCredentials: true,
      });
      setMyTours(response.data.tours);
      setMyToursIsInitialised(true);
    } catch (error) {
      setMyToursError('failed to load tours');
      console.log(error);
    } finally {
      setMyToursLoading(false);
    }
  }, [myToursInitialised, isAuthenticated]);

  useEffect(() => {
    if (purchasedTour && isAuthenticated) {
      fetchMyTours();
      setPurchasedTour(false);
    }
  }, [purchasedTour, isAuthenticated, fetchMyTours]);

  return (
    <TourContext.Provider
      value={{
        allTours,
        myTours,
        tour,
        loading: oneTourLoading || myToursLoading || allToursLoading,
        fetchAllTours,
        fetchMyTours,
        fetchOneTour,
        myToursInitialised,
        allToursInitialised,
        allToursError,
        myToursError,
        oneTourError,
        oneTourLoading,
        myToursLoading,
        allToursLoading,
        setPurchasedTour,
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
