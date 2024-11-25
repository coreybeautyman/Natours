'use client';

import React, { useEffect } from 'react';
import Tour from './components/Tour';
import { ObjectId } from 'mongodb';
import { useTour } from './context/tourContext';
import { all } from 'axios';
import { Spinner } from '@chakra-ui/react';
import LoadingSpinner from './components/LoadingSpinner';

interface TourProp {
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
}

const OverviewPage: React.FC = () => {
  const {
    myTours,
    allTours,
    fetchAllTours,
    fetchMyTours,
    loading,
    myToursInitialised,
    allToursInitialised,
  } = useTour();

  useEffect(() => {
    if (!myToursInitialised) fetchMyTours();
  }, [myTours, fetchMyTours, myToursInitialised]);

  useEffect(() => {
    if (!allToursInitialised) fetchAllTours();
  }, [allTours, fetchAllTours]);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="main">
      <div className="card-container">
        {allTours &&
          allTours.map((tour: TourProp) => (
            <Tour tour={tour} key={tour.name} />
          ))}
      </div>
    </main>
  );
};

export default OverviewPage;
