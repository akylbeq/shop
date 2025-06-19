import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { removeFromCart, selectCartItems } from './cartSlice.ts';
import { products } from '../Home/ClientHome.tsx';
import { Link } from 'react-router-dom';

const ClientCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  console.log(cartItems);
  const isInCart = products.filter((p) =>
    cartItems.some((i) => parseFloat(i) === p.id),
  );

  return (
    <div className=" space-y-4">
      <div className="space-y-4">
        {isInCart.length > 0 ? (
          isInCart.map((p) => (
            <div
              key={p.id}
              className="sm:flex items-center gap-4 p-2 sm:p-4 shadow-lg rounded-2xl overflow-hidden bg-white relative transition hover:shadow-2xl lg:max-w-2xl mx-auto"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full sm:w-24 h-24 object-contain sm:object-cover rounded-xl mx-auto "
              />
              <div className="flex-1">
                <h5 className="text-lg font-semibold text-gray-800">
                  {p.title}
                </h5>
                <p className="text-sm text-gray-500 mt-1">{p.description}</p>
              </div>
              <div className="flex flex-col items-end justify-between h-full">
                <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-sm mt-1 sm:mt-0">
                  ${p.price}
                </span>
                <button
                  className="mt-2 py-1 px-3 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
                  onClick={() => dispatch(removeFromCart(p.id))}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            Ваша корзина пуста
          </div>
        )}
      </div>

      {isInCart.length > 0 && (
        <div className="border-t sm:border-0 pt-6 text-center">
          <Link
            to="checkout"
            className="bg-green-500 hover:bg-green-600 transition text-white font-medium py-3 px-6 rounded-2xl w-full max-w-xs mx-auto"
          >
            Оформить заказ
          </Link>
        </div>
      )}
    </div>
  );
};

export default ClientCart;
