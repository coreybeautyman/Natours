'use client';

import React, { useEffect } from 'react';
import { useTour } from '@/app/context/TourContext';
import { useParams } from 'next/navigation';
import TourPageSectionHeader from '@/app/components/TourPageSectionHeader';
import TourPageSectionDescription from '@/app/components/TourPageSectionDescription';
import TourPageSectionPictures from '@/app/components/TourPageSectionPictures';
import TourPageSectionReviews from '@/app/components/TourPageSectionReviews';
import TourPageSectionCTA from '@/app/components/TourPageSectionCTA';
import Head from 'next/head';
import LoadingSpinner from '@/app/components/LoadingSpinner';

const TourPage = () => {
  const { slug } = useParams();
  const { loading, tour, fetchOneTour } = useTour();
  useEffect(() => {
    fetchOneTour(slug);
  }, [slug]);
  if (loading) return <LoadingSpinner />;

  if (tour)
    return (
      <>
        <Head>
          <title>{slug} Tour</title>
        </Head>
        <main className="main">
          <TourPageSectionHeader
            name={tour.name}
            imageCover={tour.imageCover}
            duration={tour.duration}
            startLocation={tour.startLocation}
          />

          <TourPageSectionDescription
            name={tour.name}
            difficulty={tour.difficulty}
            maxGroupSize={tour.maxGroupSize}
            ratingsAverage={tour.ratingsAverage}
            guides={tour.guides}
            description={tour.description}
            startDates={tour.startDates}
          />

          <TourPageSectionPictures images={tour.images} name={tour.name} />

          <TourPageSectionReviews reviews={tour.reviews} />

          <TourPageSectionCTA
            images={tour.images}
            duration={tour.duration}
            slug={tour.slug}
            tourId={tour.id}
          />
        </main>
      </>
    );
};

export default TourPage;
