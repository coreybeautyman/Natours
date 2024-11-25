import React from 'react';
import OverviewBox from './OverviewBox';

interface Guide {
  name: string;
  photo: string;
  role: 'lead-guide' | 'guide';
}

interface SectionDescriptionProps {
  name: string;
  difficulty: string;
  maxGroupSize: number;
  ratingsAverage: number;
  guides: Guide[];
  description: string;
  startDates: Date[];
}

const TourPageSectionDescription: React.FC<SectionDescriptionProps> = ({
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
              <div key={guide.name} className="overview-box__detail">
                <img
                  className="overview-box__img"
                  src={`/img/users/${guide.photo}`}
                  alt={guide.name}
                />
                {guide.role === 'lead-guide' && (
                  <span className="overview-box__label">Lead guide</span>
                )}
                {guide.role === 'guide' && (
                  <span className="overview-box__label">Tour guide</span>
                )}
                <span className="overview-box__text">{guide.name}</span>
              </div>
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
