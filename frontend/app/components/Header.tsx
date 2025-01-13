'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../context/TempAuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    logout();
  };

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link href="/" className="nav__el">
          All Tours
        </Link>
      </nav>

      <div className="header__logo">
        <Image
          src="/img/logo-white.png"
          alt="Natours logo"
          width={75}
          height={100}
          priority
        />
      </div>

      <nav className="nav nav--user">
        {user ? (
          <>
            <button onClick={handleLogout} className="nav__el nav__el--logout">
              Logout
            </button>
            <Link href="/me" className="nav__el">
              <Image
                src={user.photo}
                alt={`photo of ${user.name}`}
                className="nav__user-img"
                width={40}
                height={40}
              />
              <span>{user.name.split(' ')[0]}</span>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login" className="nav__el">
              Log in
            </Link>
            <Link href="/signup" className="nav__el nav__el--cta">
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
