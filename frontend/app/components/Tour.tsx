import Link from 'next/link';
import Image from 'next/image';

interface TourProps {
  tour: {
    name: string;
    slug: string;
    imageCover: string;
    duration: number;
    difficulty: string;
    summary: string;
    startLocation: {
      description: string;
    };
    maxGroupSize: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    startDates: Date[];
    locations: Array<{ description: string }>;
  };
}

const Tour: React.FC<TourProps> = ({ tour }) => {
  return (
    <div key={tour.slug} className="card">
      <div className="card__header">
        <div className="card__picture">
          <div className="card__picture-overlay">
            <Image
              className="card__picture-img"
              src={`/img/tours/${tour.imageCover}`}
              alt={tour.name}
              width={300}
              height={300}
            />
          </div>
        </div>
        <h3 className="heading-tertirary">
          <span>{tour.name}</span>
        </h3>
      </div>

      <div className="card__details">
        <h4 className="card__sub-heading">
          {tour.difficulty} {tour.duration}-day tour
        </h4>
        <p className="card__text">{tour.summary}</p>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-map-pin" />
          </svg>
          <span>{tour.startLocation.description}</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-calendar" />
          </svg>
          <span>
            {new Date(tour.startDates[0]).toLocaleString('en-us', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-flag" />
          </svg>
          <span>{tour.locations.length} stops</span>
        </div>
        <div className="card__data">
          <svg className="card__icon">
            <use xlinkHref="img/icons.svg#icon-user" />
          </svg>
          <span>{tour.maxGroupSize} people</span>
        </div>
      </div>

      <div className="card__footer">
        <p>
          <span className="card__footer-value">${tour.price}</span> |
          <span className="card__footer-text"> per person</span>
        </p>
        <p className="card__ratings">
          <span className="card__footer-value">{tour.ratingsAverage}</span> |
          <span className="card__footer-text">
            rating ({tour.ratingsQuantity})
          </span>
        </p>
        <Link className="btn btn--green btn--small" href={`/tour/${tour.slug}`}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default Tour;
