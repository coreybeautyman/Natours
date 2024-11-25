'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { Spinner } from '@chakra-ui/react';
import SideNav from '../components/SideNav';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';

type User = {
  name: string;
  email: string;
  photo: string;
  role: string;
};

type UserSettingsProps = {
  user: User;
};

const UserSettings: React.FC<UserSettingsProps> = () => {
  const { user, loading, updateSetting, alertMessage, setAlertMessage } =
    useAuth();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const handleNameEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSetting({ name, email });
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {}, [alertMessage]);

  // Check if the user data is still loading
  if (loading) return <LoadingSpinner />;

  // If no user is available after loading, render an error or a login prompt
  if (!user && !loading) {
    return (
      <main className="main">
        <AlertMessage>
          You are not logged in. Please log in to access your settings.
        </AlertMessage>
      </main>
    );
  }

  return (
    <main className="main">
      <div className="user-view">
        <SideNav role={user.role} />
        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">
              Your account settings
            </h2>
            <form
              className="form form-user-data"
              onSubmit={handleNameEmailSubmit}
            >
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="form__input"
                  type="text"
                  value={name}
                  required
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  className="form__input"
                  type="email"
                  value={email}
                  required
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form__group form__photo-upload">
                <img
                  className="form__user-photo"
                  src={`/img/users/${user.photo}`}
                  alt="User photo"
                />
                <input
                  className="form__upload"
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green">
                  Save settings
                </button>
              </div>
            </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form className="form form-user-password">
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">
                  Current password
                </label>
                <input
                  id="password-current"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="password">
                  New password
                </label>
                <input
                  id="password"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <input
                  id="password-confirm"
                  className="form__input"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green btn--save-password">
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserSettings;
