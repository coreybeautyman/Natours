import React, { FC } from 'react';

interface Props {
  children: string;
}

const AlertMessage: FC<Props> = ({ children }) => {
  return (
    <div className="alert-page-container">
      <div className="alert-container">
        <h1 className="alert-text">{children}</h1>
      </div>
    </div>
  );
};

export default AlertMessage;
