'use client';
import React, { FC, useEffect } from 'react';
import { useTour } from '../context/tourContext';
import Tour from '../components/Tour';
import LoadingSpinner from '../components/LoadingSpinner';
import SideNav from '../components/SideNav';
import AlertMessage from '../components/AlertMessage';
import { useAuth } from '../context/authContext';

const MyTours: FC = () => {
  const { loading, myTours, fetchMyTours, myToursInitialised } = useTour();

  useEffect(() => {
    console.log(myToursInitialised);
    if (!myToursInitialised) fetchMyTours();
  }, [myTours, myToursInitialised]);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="main">
      <div className="user-view">
        <SideNav role={null} />
        <div className="user-view__content">
          {!loading && myToursInitialised && myTours.length === 0 ? (
            <AlertMessage>No Bookings yet</AlertMessage>
          ) : (
            <div className="my-tours">
              <div className="my-bookings-card-container">
                {myTours &&
                  myTours.map((tour) => <Tour tour={tour} key={tour.name} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyTours;
