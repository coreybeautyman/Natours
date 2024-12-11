import React, { FC } from 'react';
import { PictureProps } from '../types/types';

const TourPageSectionPictures: FC<PictureProps> = ({ images, name }) => {
  return (
    <section className="section-pictures">
      {images.map((img, i) => (
        <div key={i} className="picture-box">
          <img
            className={`picture-box__img picture-box__img--${i + 1}`}
            src={`/img/tours/${img}`}
            alt={`${name} Tour ${i + 1}`}
          />
        </div>
      ))}
    </section>
  );
};

export default TourPageSectionPictures;
