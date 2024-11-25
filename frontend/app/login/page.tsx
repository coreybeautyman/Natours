'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const { login, failedLogin, setFailedLogin } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(email, password);
  };

  useEffect(() => {
    if (failedLogin) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
      const fadeOutTimer = setTimeout(() => setIsFadingOut(true), 3000);
      const resetTimer = setTimeout(() => {
        setFailedLogin(false);
        setIsFadingOut(false);
      }, 4000);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(resetTimer);
      };
    }
  }, [failedLogin, setFailedLogin]);

  return (
    <main className="main">
      <div
        className={`login-form ${failedLogin ? 'failed-login' : ''}  ${
          isFadingOut ? 'fade-out' : ''
        } ${isShaking ? 'shake' : ''}`}
      >
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form form--login" onSubmit={handleSubmit}>
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

          <div className="form__group ma-bt-md">
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form__input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className="form__group">
            <button type="submit" className="btn btn--green">
              Login
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
