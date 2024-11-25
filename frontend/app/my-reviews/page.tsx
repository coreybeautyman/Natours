'use client';
import React, { FC, useEffect } from 'react';
import { useTour } from '../context/tourContext';
import Tour from '../components/Tour';
import LoadingSpinner from '../components/LoadingSpinner';
import SideNav from '../components/SideNav';
import { useReview } from '../context/reviewContext';
import AccountSectionMyReviews from '../components/AccountSectionMyReviews';
import AlertMessage from '../components/AlertMessage';

const MyReviews: FC = () => {
  const { fetchMyReviews, loading, myReviews } = useReview();

  useEffect(() => {
    fetchMyReviews();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <main className="main">
      <div className="user-view">
        <SideNav role={null} />
        <div className="user-view__content">
          {!loading && myReviews.length === 0 ? (
            <AlertMessage>No Reviews yet</AlertMessage>
          ) : (
            <div className="my-reviews">
              <AccountSectionMyReviews reviews={myReviews} />;
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyReviews;
