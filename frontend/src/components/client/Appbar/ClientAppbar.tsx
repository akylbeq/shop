import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../app/hook.ts';
import { selectCartItems } from '../../../containers/client/Cart/cartSlice.ts';

const ClientAppbar = () => {
  const cart = useAppSelector(selectCartItems);

  return (
    <nav className="flex items-center justify-between py-5">
      <NavLink to="/kg" className="text-2xl font-bold flex gap-1 items-center">
        <img
          src="https://i.pinimg.com/736x/06/f9/89/06f989987dfcb48d68c869e906b054cf.jpg"
          alt="12"
          className="w-7 h-7"
        />
        <span>Shop</span>
      </NavLink>
      <NavLink
        to="/kg/cart"
        className="relative flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-gray-100 transition duration-200"
      >
        <div className="relative">
          <svg
            className="w-5 h-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            fill="currentColor"
          >
            <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
          </svg>
          {cart.length > 0 && (
            <span className="absolute -top-4 left-1 text-xs font-semibold bg-red-500 text-white rounded-full px-1 shadow">
              {cart.length}
            </span>
          )}
        </div>
        <p className="text-gray-800 font-semibold text-sm">Корзина</p>
      </NavLink>
    </nav>
  );
};

export default ClientAppbar;
