import React from 'react';

interface TourHeaderProps {
  name: string;
  imageCover: string;
  duration: number;
  startLocation: {
    description: string;
  };
}

const TourPageSectionHeader: React.FC<TourHeaderProps> = ({
  name,
  imageCover,
  duration,
  startLocation,
}) => {
  return (
    <section className="section-header">
      <div className="header__hero">
        <div className="header__hero-overlay">&nbsp;</div>
        <img
          className="header__hero-img"
          src={`/img/tours/${imageCover}`}
          alt={`${name}`}
        />
      </div>
      <div className="heading-box">
        <h1 className="heading-primary">
          <span>{name} tour</span>
        </h1>
        <div className="heading-box__group">
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlinkHref="/img/icons.svg#icon-clock" />
            </svg>
            <span className="heading-box__text">{duration} days</span>
          </div>
          <div className="heading-box__detail">
            <svg className="heading-box__icon">
              <use xlinkHref="/img/icons.svg#icon-map-pin" />
            </svg>
            <span className="heading-box__text">
              {startLocation.description}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourPageSectionHeader;
