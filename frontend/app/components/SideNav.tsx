import React, { FC } from 'react';
import NavItem from './NavItem';
import { usePathname } from 'next/navigation';

interface Props {
  role: string | null;
}

const SideNav: FC<Props> = ({ role }) => {
  const pathname = usePathname();

  return (
    <nav className="user-view__menu">
      <ul className="side-nav">
        <NavItem
          link="/me"
          text="Settings"
          icon="settings"
          active={pathname === '/me'}
        />
        <NavItem
          link="/my-tours"
          text="My bookings"
          icon="briefcase"
          active={pathname === '/my-tours'}
        />
        <NavItem
          link="/my-reviews"
          text="My reviews"
          icon="star"
          active={pathname === '/my-reviews'}
        />
        <NavItem
          link="/my-reviews"
          text="Billing"
          icon="credit-card"
          active={pathname === '/billing'}
        />
      </ul>
      {role === 'admin' && (
        <div className="admin-nav">
          <h5 className="admin-nav__heading">Admin</h5>
          <ul className="side-nav">
            <NavItem link="#" text="Manage tours" icon="map" active={false} />
            <NavItem link="#" text="Manage users" icon="users" active={false} />
            <NavItem
              link="#"
              text="Manage reviews"
              icon="star"
              active={false}
            />
            <NavItem
              link="#"
              text="Manage bookings"
              icon="briefcase"
              active={false}
            />
          </ul>
        </div>
      )}
    </nav>
  );
};

export default SideNav;
