import { NavLink } from 'react-router-dom';
import Btn from '../../../ui/btn.tsx';

const Desktop = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <div className="hidden md:flex gap-4 items-center">
      {isAuthenticated ? (
        <>
          <NavLink to="/dashboard/main" className="hover:underline">
            Dashboard
          </NavLink>
          <NavLink to="/profile" className="hover:underline">
            Профиль
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/signup">
            <Btn variant="primary">Регистрация / Вход</Btn>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Desktop;
