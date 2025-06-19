import { Link } from 'react-router-dom';
import Btn from '../../../components/ui/btn.tsx';
import { UserMutation } from '../../../types.ts';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { signup } from '../../../thunks/userThunk.ts';
import { selectUserError } from '../../../slices/userSlice.ts';
import { toast } from 'sonner';

const Sign = () => {
  const dispatch = useAppDispatch();
  const [userMutation, setUserMutation] = useState<UserMutation>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const error = useAppSelector(selectUserError);

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserMutation((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await dispatch(signup(userMutation));
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
          Создать аккаунт
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Имя
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              onChange={onHandleChange}
              value={userMutation.name}
            />
          </div>
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
              value={userMutation.email}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Номер телефона
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="+996"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              onChange={onHandleChange}
              value={userMutation.phone}
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
              value={userMutation.password}
            />
          </div>
          <Btn type="submit" variant="primary" size="md" className="w-full">
            Зарегистрироваться
          </Btn>
        </form>
        <p className="text-sm text-center text-gray-600">
          Уже есть аккаунт?{' '}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Sign;
