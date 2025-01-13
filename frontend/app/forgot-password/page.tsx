'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import validator from 'validator';
import axios from 'axios';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [emailIsReal, setEmailIsReal] = useState<boolean | undefined>(
    undefined
  );
  const {} = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailIsReal(isValidEmail(email));

    console.log(isValidEmail(email));

    if (emailIsReal === false) {
      console.log('email not real', emailIsReal, email);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
      setTimeout(() => setIsFadingOut(true), 3000);
      setTimeout(() => {
        setIsFadingOut(false);
      }, 4000);
      setEmailIsReal(undefined);
    } else {
      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/v1/users/forgotPassword',
          { email },
          { headers: { 'Content-Type': 'application/json' } }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isValidEmail = (email: string): boolean => {
    return validator.isEmail(email);
  };

  return (
    <main className="main">
      <div
        className={`login-form ${
          emailIsReal === false ? 'failed-login' : ''
        }  ${isFadingOut ? 'fade-out' : ''} ${isShaking ? 'shake' : ''}`}
      >
        <h2 className="heading-secondary ma-bt-lg">Forgot Password</h2>
        <form className="form form--login" onSubmit={handleLoginSubmit}>
          <div className="form__group">
            <label htmlFor="email" className="form__label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form__input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form__group form__btns">
            <button type="submit" className="btn btn--green">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
