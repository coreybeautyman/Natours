'use client';
import React, { FC, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import SideNav from '../components/SideNav';
import { useReview } from '../context/ReviewContext';
import AccountSectionMyReviews from '../components/AccountSectionMyReviews';
import AlertMessageStatic from '../components/AlertMessageStatic';

const MyReviews: FC = () => {
  const { loadingReviews, myReviews, fetchMyReviews } = useReview();

  useEffect(() => {
    if (myReviews === undefined) {
      fetchMyReviews();
    }
  }, [myReviews, fetchMyReviews]);
  if (loadingReviews) return <LoadingSpinner />;

  if (!loadingReviews && myReviews?.length === 0) {
    return (
      <main className="main">
        <div className="user-view">
          <SideNav role={null} />
          <div className="user-view__content">
            <AlertMessageStatic message="No reviews yet" type="error" />
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
          <div className="my-reviews">
            <AccountSectionMyReviews reviews={myReviews} />;
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyReviews;
