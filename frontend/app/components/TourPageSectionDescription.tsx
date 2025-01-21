import React from 'react';
import Image from 'next/image';
import OverviewBox from './OverviewBox';
import { TourPageSectionDescriptionProps } from '../types/types';

const TourPageSectionDescription: React.FC<TourPageSectionDescriptionProps> = ({
  name,
  difficulty,
  maxGroupSize,
  ratingsAverage,
  guides,
  description,
  startDates,
}) => {
  const paragraphs = description.split('\n');

  const date = new Date(startDates[0]).toLocaleString('en-us', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="section-description">
      <div className="overview-box">
        <div>
          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
            <OverviewBox label="Next date" text={date} icon="calendar" />
            <OverviewBox
              label="Difficulty"
              text={difficulty}
              icon="trending-up"
            />
            <OverviewBox
              label="Participants"
              text={`${maxGroupSize} people`}
              icon="user"
            />
            <OverviewBox
              label="Rating"
              text={`${ratingsAverage}/5`}
              icon="star"
            />
          </div>

          <div className="overview-box__group">
            <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
            {guides.map((guide) => (
              <React.Fragment key={guide.name}>
                <div className="overview-box__wrapper">
                  <Image
                    className="overview-box__img"
                    src={`/img/users/${guide.photo}`}
                    alt={guide.name}
                    width={70}
                    height={70}
                  />
                  <span className="overview-box__text">{guide.name}</span>
                  {guide.role === 'lead-guide' && (
                    <span className="overview-box__label">Lead guide</span>
                  )}
                  {guide.role === 'guide' && (
                    <span className="overview-box__label">Tour guide</span>
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="description-box">
        <h2 className="heading-secondary ma-bt-lg">About {name} tour</h2>
        {paragraphs.map((p, idx) => (
          <p key={idx} className="description__text">
            {p}
          </p>
        ))}
      </div>
    </section>
  );
};

export default TourPageSectionDescription;
