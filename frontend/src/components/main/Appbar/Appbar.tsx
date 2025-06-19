import { NavLink } from 'react-router-dom';
import logo from '../../../../public/img.png';
import { useAppSelector } from '../../../app/hook.ts';
import { selectUser } from '../../../slices/userSlice.ts';
import Desktop from './Desktop/Desktop.tsx';
import Mobile from './Mobile/Mobile.tsx';

const Appbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <nav className="py-2 flex justify-between items-center px-4 border-b">
      {user ? (
        <NavLink to="/shops" className="flex gap-1 items-center">
          <img src={logo} alt="logo" className="w-6 h-6 rounded-full" />
          <span className="font-semibold text-2xl">Shoplet</span>
        </NavLink>
      ) : (
        <NavLink to="/" className="flex gap-1 items-center">
          <img src={logo} alt="logo" className="w-6 h-6 rounded-full" />
          <span className="font-semibold text-2xl">Shoplet</span>
        </NavLink>
      )}

      <Desktop isAuthenticated={!!user} />
      <Mobile isAuthenticated={!!user} />
    </nav>
  );
};

export default Appbar;
