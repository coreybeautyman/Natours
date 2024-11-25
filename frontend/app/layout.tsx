import type { Metadata } from 'next'; // Import Metadata type
import Header from './components/Header'; // Import Header component
import '../public/css/style.css'; // Global styles
import { AuthProvider } from './context/authContext';
import { TourProvider } from './context/tourContext';
import { Provider } from '@/components/ui/provider';
import { ReviewProvider } from './context/reviewContext';

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
    <AuthProvider>
      <TourProvider>
        <ReviewProvider>
          <html lang="en" suppressHydrationWarning>
            <body>
              <Provider>
                <Header />
                {children}
              </Provider>
            </body>
          </html>
        </ReviewProvider>
      </TourProvider>
    </AuthProvider>
  );
}
