import React, { FC } from 'react';
import Image from 'next/image';
import { PictureProps } from '../types/types';

const TourPageSectionPictures: FC<PictureProps> = ({ images, name }) => {
  return (
    <section className="section-pictures">
      {images.map((img, i) => (
        <Image
          key={i}
          className={`picture-box__img picture-box__img--${i + 1}`}
          src={`/img/tours/${img}`}
          alt={`${name} Tour ${i + 1}`}
          width={350}
          height={350}
        />
      ))}
    </section>
  );
};

export default TourPageSectionPictures;
