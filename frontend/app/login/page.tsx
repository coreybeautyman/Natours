'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { login, isFadingOut, isShaking } = useAuth();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>
      <main className="main">
        <div
          className={`login-form  ${isFadingOut ? 'fade-out' : ''} ${
            isShaking ? 'shake' : ''
          }`}
        >
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
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

            <div className="form__group form__btns">
              <button type="submit" className="btn btn--green">
                Login
              </button>
              <Link
                href="/forgot-password"
                className="btn btn--green forgot-pass"
              >
                Forgot Password
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
