import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import Btn from '../../../ui/btn.tsx';

const Mobile = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden relative">
      {isAuthenticated ? (
        <button onClick={() => setOpen(!open)} className="p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      ) : (
        <NavLink to="/signup">
          <Btn variant="primary">Sign in</Btn>
        </NavLink>
      )}

      {open && (
        <div className="absolute right-0 top-10 bg-white border rounded shadow-md p-4 z-50">
          <nav className="flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" onClick={() => setOpen(false)}>
                  Dashboard
                </NavLink>
                <NavLink to="/profile" onClick={() => setOpen(false)}>
                  Профиль
                </NavLink>
                <NavLink
                  to="/dashboard/categories"
                  onClick={() => setOpen(false)}
                >
                  Категории
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={() => setOpen(false)}>
                  Войти
                </NavLink>
                <NavLink to="/signup" onClick={() => setOpen(false)}>
                  Регистрация
                </NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Mobile;
