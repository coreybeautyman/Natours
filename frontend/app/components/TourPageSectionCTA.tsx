import Link from 'next/link';
import React, { FC } from 'react';

interface Image {
  image: string;
}

interface CtaProps {
  images: Image[];
  duration: number;
  user: boolean;
  slug: string;
}

const TourPageSectionCTA: FC<CtaProps> = ({ images, duration, user, slug }) => {
  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src="/img/logo-white.png" alt="Natours logo" />
        </div>
        <img
          className="cta__img cta__img--1"
          src={`/img/tours/${images[1]}`}
          alt="Tour picture"
        />
        <img
          className="cta__img cta__img--2"
          src={`/img/tours/${images[2]}`}
          alt="Tour picture 2"
        />
        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">{`${duration} days. 1 adventure. Infinite memories. Make it yours today!`}</p>

          {user ? (
            <button
              className="btn btn--green span-all-rows"
              id="book-tour"
              data-tour-id={slug}
            >
              Book tour now!
            </button>
          ) : (
            <Link className="btn btn--green span-all-rows" to="/login">
              Log in to book tour!
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default TourPageSectionCTA;
