'use client';

import axios, { AxiosError } from 'axios';
import validator from 'validator';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAlert } from './AlertContext';
import {
  AuthContextType,
  AuthProviderProps,
  DataType,
  PasswordData,
  ResponseData,
  User,
} from '../types/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const router = useRouter();
  const { triggerAlert } = useAlert();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/v1/users/me',
          {
            withCredentials: true,
          }
        );

        if (!response.data.data.doc.photo.startsWith('data:'))
          response.data.data.doc.photo = `/img/users/${response.data.data.doc.photo}`;

        setUser(response.data.data.doc);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 401) {
            setUser(null);
          }
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const signup = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    photoFile: File | null
  ) => {
    setLoading(true);
    if (password !== passwordConfirm) {
      triggerAlert({ type: 'error', message: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    const validEmail = validator.isEmail(email);

    if (!validEmail) {
      triggerAlert({ type: 'error', message: 'Invalid email address' });
      setLoading(false);
      return;
    }

    const formData = new FormData();

    if (photoFile) formData.append('photo', photoFile);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('passwordConfirm', passwordConfirm);

    try {
      await axios.post('http://127.0.0.1:8000/api/v1/users/signup', formData);

      triggerAlert({
        type: 'success',
        message: 'Signup successfull! Welcome!',
      });

      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ResponseData>;

        if (axiosError.response?.data?.error?.code === 11000) {
          triggerAlert({
            type: 'error',
            message: 'Email already exists, please log in',
          });
        }
      } else {
        triggerAlert({
          type: 'error',
          message: 'Signup failed, please try again',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) return;

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.status !== 'success') {
        throw new Error('User login failed');
      }
      if (!response.data.data.user.photo.startsWith('data:'))
        response.data.data.user.photo = `/img/users/${response.data.data.user.photo}`;

      setUser(response.data.data.user);

      triggerAlert({
        type: 'success',
        message: `Login Succesfull! Welcome ${
          response.data.data.user.name.split(' ')[0]
        }!`,
      });

      router.push('/');
    } catch (error) {
      triggerAlert({
        type: 'error',
        message: 'error logging in please try again',
      });
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
      setTimeout(() => setIsFadingOut(true), 3000);
      setIsFadingOut(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(
        'http://127.0.0.1:8000/api/v1/users/logout',
        {
          withCredentials: true,
        }
      );
      if (response.data.status === 'success') setUser(null);
      triggerAlert({
        type: 'success',
        message: 'User logged out!',
      });
    } catch (error) {
      triggerAlert({
        type: 'error',
        message: 'Error logging out. Please try again!',
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (data: PasswordData) => {
    const passwordData = {
      oldPassword: data.currentPassword,
      newPassword: data.newPassword,
      newPasswordConfirm: data.passwordConfirm,
    };

    try {
      const url = 'http://127.0.0.1:8000/api/v1/users/updatePassword';

      await axios.patch(url, passwordData, {
        withCredentials: true,
      });
      triggerAlert({
        type: 'success',
        message: 'Password updated successfully!',
      });
    } catch (error) {
      console.log(error);
      triggerAlert({
        type: 'error',
        message: 'Password failed to update. Please try again.',
      });
    }
  };

  const updateSettings = async (data: DataType) => {
    const formData = new FormData();

    if (data.photo) formData.append('photo', data.photo);
    formData.append('name', data.name);
    formData.append('email', data.email);

    try {
      const url = 'http://127.0.0.1:8000/api/v1/users/updateMe';

      const res = await axios.patch(url, formData, {
        withCredentials: true,
      });

      if (res.data.status === 'success') {
        triggerAlert({
          type: 'success',
          message: 'User settings updated successfully!',
        });
        setUser(res.data.data.user);
      }
    } catch (error) {
      triggerAlert({
        type: 'error',
        message: 'There was an error updating user settings, please try again.',
      });
      console.log(error);
    }
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        isAuthenticated,
        loading,
        updateSettings,
        updatePassword,
        isFadingOut,
        isShaking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
