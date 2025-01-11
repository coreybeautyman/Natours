// types.ts

import { ObjectId } from 'mongodb';
import { Dispatch, ReactNode, SetStateAction } from 'react';

// --- Shared Types ---

export type User = {
  name: string;
  photo: string;
  role: string;
  _id: string;
  email: string;
  token: string;
};

export type Image = {
  image: string;
};

export interface AlertMessageProps {
  type: 'success' | 'error';
  message: string;
}

export interface AlertContextProps {
  alertMessage: AlertMessageProps | null;
  triggerAlert: (message: AlertMessageProps) => void;
}

export type UserReview = {
  _id: string;
  name: string;
  photo: string;
};

export type ReviewContextType = {
  loadingReviews: boolean;
  myReviews: Review[] | undefined;
  fetchMyReviews: () => void;
  reviewsError: string | null;
  myReviewsInitialised: boolean;
  postReview: (
    review: string,
    starRating: number | null,
    tourId: string
  ) => void;
  loadingGetReviews: boolean;
  loadingPostReviews: boolean;
};

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    photoFile: File | null
  ) => void;
  isAuthenticated: boolean;
  loading: boolean;
  updateSettings: (data: DataType) => void;
  updatePassword: (data: PasswordData) => void;
  isFadingOut: boolean;
  isShaking: boolean;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface DataType {
  name: string;
  email: string;
  photo?: File | null;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  passwordConfirm: string;
}

interface ErrorResponse {
  code: number;
  message: string;
}

export interface ResponseData {
  error: ErrorResponse;
}

// --- Props Types ---
export interface CtaProps {
  images: Image[];
  duration: number;
  slug: string;
  tourId: string;
}

export type WriteReviewProps = {
  tourId: string;
};

export type SignupProps = {
  email: string;
  password: string;
  passwordConfirm: string;
  photoFile: File;
};

export type TourProviderProps = {
  children: ReactNode;
};

export type ReviewProviderProps = {
  children: ReactNode;
};

export interface PictureProps {
  images: Image[];
  name: string;
}

export type UserSettingsProps = {
  user: User;
  loading: boolean;
  updateSettings: (data: DataType) => void;
  updatePassword: (data: PasswordData) => void;
};

export interface ReviewsProps {
  reviews: Review[];
}

export type TourPageSectionDescriptionProps = {
  name: string;
  difficulty: string;
  maxGroupSize: number;
  ratingsAverage: number;
  guides: Guide[];
  description: string;
  startDates: Date[];
};

// --- Main Models ---

export interface Guide {
  name: string;
  photo: string;
  role: 'lead-guide' | 'guide';
}

export interface Review {
  id: string;
  rating: number;
  review: string;
  tour: string;
  user: UserReview;
}

export type Tour = {
  name: string;
  guides: Guide[];
  description: string;
  images: Image[];
  id: string;
  slug: string;
  imageCover: string;
  duration: number;
  difficulty: string;
  summary: string;
  startLocation: {
    description: string;
    type: string;
    address: string;
    coordinates: Array<number>;
  };
  maxGroupSize: number;
  reviews: Review[]; // This should be an array of reviews
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  startDates: Date[];
  locations: Array<{
    description: string;
    type: string;
    coordinates: Array<number>;
    day: number;
    _id: ObjectId;
  }>;
};

// --- Context Types ---

export type TourContextType = {
  allTours: Tour[];
  myTours: Tour[];
  tour: Tour | undefined;
  fetchAllTours: () => void;
  fetchMyTours: () => void;
  fetchOneTour: (slug: string | undefined | string[]) => void;
  myToursInitialised: boolean;
  allToursInitialised: boolean;
  allToursError: string | null;
  myToursError: string | null;
  oneTourError: string | null;
  oneTourLoading: boolean;
  myToursLoading: boolean;
  allToursLoading: boolean;
  loading: boolean;
  setPurchasedTour: Dispatch<SetStateAction<boolean>>;
};
