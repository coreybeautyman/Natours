'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { AlertContextProps, AlertMessageProps } from '../types/types';

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertMessage, setAlertMessage] = useState<AlertMessageProps | null>(
    null
  );

  const triggerAlert = useCallback((message: AlertMessageProps) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  }, []);

  return (
    <AlertContext.Provider value={{ alertMessage, triggerAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used with in AlertProvider');
  }
  return context;
};
