import React, { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { selectUser } from '../../../slices/userSlice.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { session } from '../../../thunks/userThunk.ts';

interface Props {
  children: ReactNode;
}

const Middleware: React.FC<Props> = ({ children }) => {
  const user = useAppSelector(selectUser);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(session());
  }, [dispatch]);

  const protect = ['/login', '/signup'].includes(pathname);

  useEffect(() => {
    if (protect && user) {
      navigate('/');
    }
  }, [navigate, user, protect]);

  return <>{children}</>;
};

export default Middleware;
