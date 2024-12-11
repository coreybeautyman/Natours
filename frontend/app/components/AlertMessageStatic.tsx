'use client';

import React, { FC } from 'react';
import { AlertMessageProps } from '../types/types';

const AlertMessageStatic: FC<AlertMessageProps> = ({ type, message }) => {
  const alertStyle =
    type === 'success'
      ? 'alert--success'
      : type === 'error'
      ? 'alert--error'
      : '';

  return (
    <div className={`alert-page-container-static ${alertStyle}`}>
      <div className="alert-container">
        <h1 className="alert-text">{message}</h1>
      </div>
    </div>
  );
};

export default AlertMessageStatic;
