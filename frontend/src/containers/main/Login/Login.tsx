import Btn from '../../../components/ui/btn.tsx';
import { Link } from 'react-router-dom';
import { UserAuthorization } from '../../../types.ts';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { login } from '../../../thunks/userThunk.ts';
import { toast } from 'sonner';
import { selectUserError } from '../../../slices/userSlice.ts';

const Login = () => {
  const dispatch = useAppDispatch();
  const [userAuth, setUserAuth] = useState<UserAuthorization>({
    email: '',
    password: '',
  });
  const error = useAppSelector(selectUserError);

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserAuth((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onHandleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(login(userAuth));
  };

  useEffect(() => {
    if (error) {
      toast('Ошибка', {
        description: error.message,
        className: 'text-center text-red-600',
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Вход в аккаунт
        </h2>
        <form className="space-y-4" onSubmit={onHandleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              onChange={onHandleChange}
              value={userAuth.email}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Пароль
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              onChange={onHandleChange}
              value={userAuth.password}
            />
          </div>
          <div className="flex justify-end">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Забыли пароль?
            </a>
          </div>
          <Btn type="submit" variant="primary" size="md" className="w-full">
            Войти
          </Btn>
        </form>
        <p className="text-sm text-center text-gray-600">
          Нет аккаунта?{' '}
          <Link
            to="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
