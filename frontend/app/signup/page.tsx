'use client';
import React, { useState } from 'react';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [photo, setPhoto] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle sign-up logic here
    if (password !== passwordConfirm) {
      console.log('Passwords do not match');
      return;
    }

    // Further sign-up logic like API calls, etc.
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Profile Picture:', photo);
  };

  return (
    <main className="main">
      <div className="signup-form">
        <h2 className="heading-secondary ma-bt-lg">Sign up for an account</h2>
        <form className="form form--signup" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="name" className="form__label">
              Full name
            </label>
            <input
              id="name"
              type="text"
              className="form__input"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="form__group ma-bt-md">
            <label htmlFor="passwordConfirm" className="form__label">
              Confirm password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className="form__input"
              placeholder="••••••••"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className="form__group">
            <label htmlFor="photo" className="form__label">
              Profile picture (optional)
            </label>
            <input
              id="photo"
              type="url"
              className="form__input"
              placeholder="URL"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          <div className="form__group">
            <button type="submit" className="btn btn--green">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpPage;
