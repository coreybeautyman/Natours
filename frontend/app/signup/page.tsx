'use client';

import React, { useState } from 'react';
import { useAuth } from '../context/TempAuthContext';
import Image from 'next/image';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [photoName, setPhotoName] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [displayPhotoName, setDisplayPhotoName] = useState<string | null>(null);

  const { isShaking, isFadingOut, signup } = useAuth();

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setDisplayPhotoName(selectedFile.name);
      setPhotoFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPhotoName(reader.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    signup(name, email, password, passwordConfirm, photoFile);
  };

  return (
    <main className="main">
      <div
        className={`signup-form ${isShaking ? 'shake' : ''} ${
          isFadingOut ? 'fade-out' : ''
        }`}
      >
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

          <div className="form__group form__photo-upload">
            <input
              className="form__upload"
              type="file"
              accept="image/*"
              id="photo"
              name="photo"
              onChange={handleImgUpload}
            />
            <label htmlFor="photo">Choose new photo</label>
            {photoName && (
              <span className="signup--photo-preview-cont">
                <p className="upload--img-text">{displayPhotoName}</p>
                <Image
                  className="form__user-photo signup--user-photo"
                  src={photoName}
                  alt="User photo"
                  width={500}
                />
              </span>
            )}
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
