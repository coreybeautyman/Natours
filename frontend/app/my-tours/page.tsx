'use client';
import React, { FC, useEffect } from 'react';
import { useTour } from '../context/TempTourContext';
import Tour from '../components/Tour';
import LoadingSpinner from '../components/LoadingSpinner';
import SideNav from '../components/SideNav';
import { useAuth } from '../context/TempAuthContext';

import AlertMessageStatic from '../components/AlertMessageStatic';

const MyTours: FC = () => {
  const { loading, myTours, fetchMyTours, myToursInitialised } = useTour();

  const { user, loading: userLoading } = useAuth();

  useEffect(() => {
    if (!myToursInitialised && user) fetchMyTours();
  }, [myToursInitialised, user, fetchMyTours]);

  if (loading) return <LoadingSpinner />;

  if (!user && !userLoading) {
    return (
      <main className="main">
        <div className="user-view">
          <SideNav role={null} />
          <div className="user-view__content">
            <AlertMessageStatic
              message="You are not logged in. Please log in to access your settings."
              type="error"
            />
          </div>
        </div>
      </main>
    );
  }

  if (!loading && myToursInitialised && myTours.length === 0) {
    return (
      <main className="main">
        <div className="user-view">
          <SideNav role={null} />
          <div className="user-view__content">
            <AlertMessageStatic
              message="You dont have any tour bookings yet"
              type="error"
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="user-view">
        <SideNav role={null} />
        <div className="user-view__content">
          <div className="my-tours">
            <div className="my-bookings-card-container">
              {myTours &&
                myTours.map((tour) => <Tour tour={tour} key={tour.name} />)}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyTours;
