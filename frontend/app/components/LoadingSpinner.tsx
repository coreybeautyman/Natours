import { Spinner } from '@chakra-ui/react';
import React, { FC } from 'react';

const LoadingSpinner: FC = ({}) => {
  return (
    <main className="main">
      <div className="spinner">
        <Spinner
          size="xl"
          color="green.500"
          animationDuration="0.7s"
          borderWidth="3px"
        />
      </div>
    </main>
  );
};

export default LoadingSpinner;
