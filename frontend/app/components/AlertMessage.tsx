'use client';

import React, { FC } from 'react';
import { useAlert } from '../context/AlertContext';

const AlertMessage: FC = () => {
  const { alertMessage } = useAlert();

  if (!alertMessage) return null;

  const alertStyle =
    alertMessage.type === 'success'
      ? 'alert--success'
      : alertMessage.type === 'error'
      ? 'alert--error'
      : '';

  return (
    <div className={`alert-page-container ${alertStyle}`}>
      <div className="alert-container">
        <h1 className="alert-text">{alertMessage.message}</h1>
      </div>
    </div>
  );
};

export default AlertMessage;
