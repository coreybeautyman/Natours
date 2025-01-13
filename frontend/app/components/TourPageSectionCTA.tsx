import Link from 'next/link';
import React, { FC } from 'react';
import { CtaProps } from '../types/types';
import axios from 'axios';
import { useTour } from '../context/TourContext';
import { useAlert } from '../context/TempAlertContext';
import { useAuth } from '../context/AuthContext';
import Image from 'next/image';

const TourPageSectionCTA: FC<CtaProps> = ({
  images,
  duration,
  slug,
  tourId,
}) => {
  const { setPurchasedTour } = useTour();
  const { triggerAlert } = useAlert();
  const { user } = useAuth();

  const handleBookTour = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`,
        {
          withCredentials: true,
        }
      );

      const checkoutUrl = response.data.session.url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
      setPurchasedTour(true);
    } catch (error) {
      console.log(error);
      triggerAlert({
        message: 'There was an error with the booking, please try again.',
        type: 'error',
      });
    }
  };

  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <Image
            src="/img/logo-white.png"
            alt="Natours logo"
            width={500}
            height={500}
          />
        </div>
        <Image
          className="cta__img cta__img--1"
          src={`/img/tours/${images[1]}`}
          alt="Tour picture"
          width={500}
          height={500}
        />
        <Image
          className="cta__img cta__img--2"
          src={`/img/tours/${images[2]}`}
          alt="Tour picture 2"
          width={500}
          height={500}
        />
        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">{`${duration} days. 1 adventure. Infinite memories. Make it yours today!`}</p>

          {user ? (
            <button
              className="btn btn--green span-all-rows"
              id="book-tour"
              data-tour-id={slug}
              onClick={handleBookTour}
            >
              Book tour now!
            </button>
          ) : (
            <Link className="btn btn--green span-all-rows" href="/login">
              Log in to book tour!
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourPageSectionCTA;
