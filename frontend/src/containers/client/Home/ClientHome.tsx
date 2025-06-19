import './style.css';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hook.ts';
import { addToCart } from '../Cart/cartSlice.ts';
export const categories = [
  { id: 1, name: 'Электроника', slug: 'electronics' },
  { id: 2, name: 'Одежда', slug: 'clothing' },
  { id: 3, name: 'Обувь', slug: 'shoes' },
  { id: 4, name: 'Аксессуары', slug: 'accessories' },
  { id: 5, name: 'Книги', slug: 'books' },
  { id: 6, name: 'Игрушки', slug: 'toys' },
  { id: 7, name: 'Дом и сад', slug: 'home-garden' },
  { id: 8, name: 'Косметика', slug: 'beauty' },
  { id: 9, name: 'Спорт и отдых', slug: 'sports' },
  { id: 10, name: 'Зоотовары', slug: 'pets' },
];

export const products = [
  {
    id: 1,
    title: 'LED гирлянда',
    description: 'Украсьте свой дом тёплым светом.',
    image:
      'https://i.pinimg.com/736x/d8/68/d5/d868d5ad0fc80a7ad923bf9b1a53dce2.jpg',
    price: 990,
    oldPrice: 1490,
    isOnSale: true,
    saleEndsAt: '2025-04-28T23:59:59',
    slug: 'led-garland',
  },
  {
    id: 2,
    title: 'Декоративное зеркало',
    description: 'Современное настенное зеркало с золотой окантовкой.',
    image:
      'https://i.pinimg.com/736x/d8/68/d5/d868d5ad0fc80a7ad923bf9b1a53dce2.jpg',
    price: 1790,
    oldPrice: 2190,
    isOnSale: true,
    saleEndsAt: '2025-04-27T23:59:59',
    slug: 'decorative-mirror',
  },
  {
    id: 3,
    title: 'Декоративное зеркало',
    description: 'Современное настенное зеркало с золотой окантовкой.',
    image:
      'https://i.pinimg.com/736x/42/20/f0/4220f015db19144e88fbf04789b08a69.jpg',
    price: 1790,
    oldPrice: 2190,
    isOnSale: true,
    saleEndsAt: '2025-04-27T23:59:59',
    slug: 'decorative-mirror',
  },
  {
    id: 4,
    title: 'Декоративное зеркало',
    description: 'Современное настенное зеркало с золотой окантовкой.',
    image:
      'https://i.pinimg.com/736x/42/20/f0/4220f015db19144e88fbf04789b08a69.jpg',
    price: 1790,
    oldPrice: 2190,
    isOnSale: true,
    saleEndsAt: '2025-04-27T23:59:59',
    slug: 'decorative-mirror',
  },
  {
    id: 5,
    title: 'Декоративное зеркало',
    description: 'Современное настенное зеркало с золотой окантовкой.',
    image:
      'https://i.pinimg.com/736x/42/20/f0/4220f015db19144e88fbf04789b08a69.jpg',
    price: 1790,
    oldPrice: 2190,
    isOnSale: true,
    saleEndsAt: '2025-04-27T23:59:59',
    slug: 'decorative-mirror',
  },
  {
    id: 6,
    title: 'Декоративное зеркало',
    description: 'Современное настенное зеркало с золотой окантовкой.',
    image:
      'https://i.pinimg.com/736x/42/20/f0/4220f015db19144e88fbf04789b08a69.jpg',
    price: 1790,
    oldPrice: 2190,
    isOnSale: true,
    saleEndsAt: '2025-04-27T23:59:59',
    slug: 'decorative-mirror',
  },
  {
    id: 7,
    title: 'Декоративное зеркало',
    description: 'Современное настенное зеркало с золотой окантовкой.',
    image:
      'https://i.pinimg.com/736x/42/20/f0/4220f015db19144e88fbf04789b08a69.jpg',
    price: 1790,
    oldPrice: 2190,
    isOnSale: true,
    saleEndsAt: '2025-04-27T23:59:59',
    slug: 'decorative-mirror',
  },
  {
    id: 8,
    title: 'Декоративное зеркало',
    description: 'Современное настенное зеркало с золотой окантовкой.',
    image:
      'https://i.pinimg.com/736x/42/20/f0/4220f015db19144e88fbf04789b08a69.jpg',
    price: 1790,
    oldPrice: 2190,
    isOnSale: true,
    saleEndsAt: '2025-04-27T23:59:59',
    slug: 'decorative-mirror',
  },
  // остальной список
];

const ClientHome = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="mt-30">
      <div className="flex flex-col md:flex-row md:justify-evenly gap-8 mb-16">
        <div className="text-sm flex-1 my-auto">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </h1>
          <p className="text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
            commodi cumque doloremque, hic in, molestiae quaerat quo quod
            ratione reiciendis ullam ut! Blanditiis est fugiat laboriosam
            mollitia quia unde voluptas.
          </p>
        </div>
        <div className="hidden sm:block w-80 rounded-lg overflow-hidden shadow-xl">
          <img
            src="https://i.pinimg.com/736x/f0/b8/4a/f0b84ac5ea53426282c3b8e7502ab075.jpg"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Список категорий и поиск */}
      <div className="overflow-hidden">
        <ul className="flex gap-3 overflow-x-auto bg-gray-100 rounded-lg p-2 shadow-sm">
          {categories.map((category) => (
            <li
              key={category.id}
              className="px-4 py-2 bg-white hover:bg-indigo-50 rounded-lg transition-all duration-200 text-sm font-medium text-gray-800 cursor-pointer whitespace-nowrap"
            >
              🔥 {category.name}
            </li>
          ))}
        </ul>
        <div className="flex items-stretch gap-2 my-6 px-1">
          <input
            type="text"
            placeholder="Поиск..."
            className="border border-gray-300 rounded-lg w-full px-4 py-2 text-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm hover:bg-indigo-600 transition-all">
            Найти
          </button>
        </div>
      </div>

      {/* Карточки товаров */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            onClick={() => navigate('product/' + product.slug)}
            key={product.id + Math.random()}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="w-full aspect-[4/3] overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {product.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-base font-bold text-indigo-600">
                  {product.price}₽
                </p>
                <button
                  onClick={() => dispatch(addToCart(product.id))}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H220l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Акции недели */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4">🔥 Скидки недели</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {products
            .filter((p) => p.isOnSale)
            .map((product) => (
              <div
                key={product.id + Math.random()}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -
                    {Math.round(100 - (product.price / product.oldPrice) * 100)}
                    %
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm sm:text-base font-medium text-gray-800">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-lg font-bold text-indigo-600">
                      {product.price}c
                    </p>
                    <p className="text-sm line-through text-gray-400">
                      {product.oldPrice}c
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
