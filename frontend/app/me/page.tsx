'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SideNav from '../components/SideNav';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAlert } from '../context/TempAlertContext';
import AlertMessageStatic from '../components/AlertMessageStatic';
import Image from 'next/image';

const UserSettings: React.FC = () => {
  const { user, loading, updateSettings, updatePassword } = useAuth();
  const { triggerAlert } = useAlert();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const handleAccountSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ name, email, photo: file });
  };

  const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== passwordConfirm) {
      triggerAlert({ message: 'Passwords need to match', type: 'error' });
    } else {
      updatePassword({ currentPassword, newPassword, passwordConfirm });
    }
    setCurrentPassword('');
    setNewPassword('');
    setPasswordConfirm('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPhoto(reader.result as string);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoto(user.photo);
    }
  }, [user]);

  useEffect(() => {
    if (!user && !loading) {
      triggerAlert({
        type: 'error',
        message:
          'You are not logged in. Please log in to access your settings.',
      });
    }
  }, [user, loading, triggerAlert]);

  if (loading) return <LoadingSpinner />;

  if (!loading && !user) {
    return (
      <main className="main">
        <AlertMessageStatic message="You are not logged in." type="error" />
      </main>
    );
  }

  return (
    <>
      <main className="main">
        <div className="user-view">
          <SideNav role={user?.role} />
          <div className="user-view__content">
            <div className="user-view__form-container">
              <h2 className="heading-secondary ma-bt-md">
                Your account settings
              </h2>
              <form
                className="form form-user-data"
                onSubmit={handleAccountSettingsSubmit}
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
                  <Image
                    className="form__user-photo"
                    src={photo || '/frontend/public/img/users/default.jpg'}
                    alt="User photo"
                    width={500}
                    height={500}
                  />
                  <input
                    className="form__upload"
                    type="file"
                    accept="image/*"
                    id="photo"
                    name="photo"
                    onChange={handleFileChange}
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
              <form
                className="form form-user-password"
                onSubmit={handlePasswordChange}
              >
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
                    value={currentPassword}
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
                    value={newPassword}
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
                    value={passwordConfirm}
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
    </>
  );
};

export default UserSettings;
