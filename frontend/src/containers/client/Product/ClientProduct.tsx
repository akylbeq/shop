import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { addToCart, selectCartItems } from '../Cart/cartSlice.ts';
import { useParams } from 'react-router-dom';
import { products } from '../Home/ClientHome.tsx';

const ClientProduct = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const product = products.find((p) => p.slug === id);
  const cartItems = useAppSelector(selectCartItems);

  if (!product) {
    return null;
  }
  const isInCart = cartItems.find((id) => parseFloat(id) === product.id);

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Изображение продукта */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg">
          <img
            className="w-full h-[50vh] object-cover transition-transform duration-500 hover:scale-105"
            src="https://i.pinimg.com/736x/f5/76/64/f57664b8eb513213ba5ffc9228d24eb8.jpg"
            alt="product"
          />
        </div>

        {/* Информация о продукте */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-600 text-base leading-relaxed mb-6">
              {product.description}
            </p>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-indigo-600">123 c</span>
              <span className="text-lg text-gray-400 line-through">169 c</span>
            </div>
          </div>

          {/* Кнопки для покупки и добавления в корзину */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex gap-2 justify-center bg-indigo-600 text-white py-3 px-6 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-300 transform hover:scale-105">
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#fff"
                  d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"
                />
              </svg>
              <span>Купить</span>
            </button>
            <button
              disabled={!!isInCart}
              onClick={() => dispatch(addToCart(product.id))}
              className={
                'flex gap-2 justify-center border border-gray-300 text-gray-700 py-3 px-6 rounded-lg text-sm hover:bg-gray-100 transition duration-300 transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100'
              }
            >
              <svg
                className="w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z" />
              </svg>
              <span>В корзину</span>
            </button>
          </div>
        </div>
      </div>

      {/* Подробности и описание */}
      <div className="mt-10 text-gray-600">
        <h2 className="text-xl font-semibold">Подробное описание</h2>
        <p className="text-base mt-4">{product.description}</p>
      </div>

      {/* Похожие товары */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Похожие товары
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Карточки похожих товаров */}
          {[
            {
              id: 1,
              title: 'Чайник из нержавеющей стали',
              image:
                'https://i.pinimg.com/736x/e7/1a/29/e71a292421b150ff82fe191ea835cb47.jpg',
              price: '149 c',
            },
            {
              id: 2,
              title: 'Чайник с деревянной ручкой',
              image:
                'https://i.pinimg.com/736x/e7/1a/29/e71a292421b150ff82fe191ea835cb47.jpg',
              price: '179 c',
            },
            {
              id: 3,
              title: 'Эмальированный чайник',
              image:
                'https://i.pinimg.com/736x/e7/1a/29/e71a292421b150ff82fe191ea835cb47.jpg',
              price: '129 c',
            },
          ].map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                className="w-full h-32 object-cover"
                src={product.image}
                alt={product.title}
              />
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800">
                  {product.title}
                </h3>
                <p className="text-xl font-bold text-indigo-600 mt-2">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientProduct;
