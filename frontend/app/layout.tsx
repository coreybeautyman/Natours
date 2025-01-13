import type { Metadata } from 'next'; // Import Metadata type
import Header from './components/Header'; // Import Header component
import '../public/css/style.css'; // Global styles
import { AuthProvider } from './context/AuthContext';
import { TourProvider } from './context/TourContext';
import { Provider } from '@/components/ui/provider';
import { ReviewProvider } from './context/ReviewContext';
import AlertMessage from './components/AlertMessage';
import { AlertProvider } from './context/AlertContext';

// Define metadata for the app
export const metadata: Metadata = {
  title: 'Natours',
  description: 'Natours app description',
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AlertProvider>
      <AuthProvider>
        <TourProvider>
          <ReviewProvider>
            <html lang="en" suppressHydrationWarning>
              <body>
                <Provider>
                  <AlertMessage />
                  <Header />
                  {children}
                </Provider>
              </body>
            </html>
          </ReviewProvider>
        </TourProvider>
      </AuthProvider>
    </AlertProvider>
  );
}
