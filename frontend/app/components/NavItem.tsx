import Link from 'next/link';

type NavItemProps = {
  link: string;
  text: string;
  icon: string;
  active: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ link, text, icon, active }) => (
  <Link href={link} className={active ? 'side-nav--active' : ''}>
    <svg>
      <use xlinkHref={`img/icons.svg#icon-${icon}`} />
    </svg>
    {text}
  </Link>
);

export default NavItem;
