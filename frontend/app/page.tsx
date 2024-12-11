'use client';

import React, { useEffect } from 'react';
import Tour from './components/Tour';
import { useTour } from './context/TourContext';
import LoadingSpinner from './components/LoadingSpinner';
import { useReview } from './context/ReviewContext';

const OverviewPage: React.FC = () => {
  const {
    allTours,
    fetchAllTours,
    fetchMyTours,
    loading,
    myToursInitialised,
    allToursInitialised,
    allToursError,
    myToursError,
  } = useTour();

  const { fetchMyReviews, reviewsError, myReviewsInitialised } = useReview();

  useEffect(() => {
    if (!myToursInitialised && !myToursError) fetchMyTours();
  }, [fetchMyTours, myToursInitialised, myToursError]);

  useEffect(() => {
    if (!allToursInitialised && !allToursError) fetchAllTours();
  }, [fetchAllTours, allToursInitialised, allToursError]);


  useEffect(() => {
    if (!myReviewsInitialised && !reviewsError) fetchMyReviews();
  }, [fetchMyReviews, myReviewsInitialised, reviewsError]);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="main">
      <div className="card-container">
        {allTours &&
          allTours.map((tour) => <Tour tour={tour} key={tour.name} />)}
      </div>
    </main>
  );
};

export default OverviewPage;
