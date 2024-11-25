'use client';

import axios from 'axios';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  photo: string;
  role: string;
  _id: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  relload: () => void;
  failedLogin: boolean;
  setFailedLogin: React.Dispatch<React.SetStateAction<boolean>>;
  updateSetting: () => void;
  alertMessage: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider to wrap around the app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [failedLogin, setFailedLogin] = useState<boolean>(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const verifyUser = async () => {
      setError(null);
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/v1/users/me',
          {
            withCredentials: true,
          }
        );
        setUser(response.data.data.doc);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle case when the user is not logged in (e.g. no valid JWT)
          setError(error.response.data.message);
          console.log(error.response.data.message);
          setUser(null); // No user is logged in
        } else {
          // For any other errors (network errors, etc.)
          console.log('An error occurred', error);
        }
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

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
      if (response.data.status !== 'success')
        throw new Error('User login failed');

      setUser(response.data.data.user);

      // Redirect to home page after successful login
      router.push('/');
    } catch (error) {
      setFailedLogin(true);
      console.error('Error fetching user:', error);
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
      router.reload();

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (data, type) => {
    try {
      const url =
        type === 'password'
          ? 'http://127.0.0.1:8000/api/v1/users/updatePassword'
          : 'http://127.0.0.1:8000/api/v1/users/updateMe';
      const res = await axios({
        method: 'PATCH',
        url,
        data,
      });
      if (res.data.status === 'success') {
        showAlert('success', `${type.toUpperCase()} updated successfully!`);
      }
    } catch (error) {
      showAlert('error', err.response.data.message);
    }
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
        failedLogin,
        setFailedLogin,
        updateSettings,
        alertMessage,
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
