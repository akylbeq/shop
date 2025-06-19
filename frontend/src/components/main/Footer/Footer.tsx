import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto px-6 lg:px-8 grid gap-10 md:grid-cols-3 text-gray-700">
        {/* Column 1 */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-900">Shoplet</h4>
          <p>
            Создайте свой интернет-магазин быстро и просто — без кода и лишних
            затрат.
          </p>
        </div>

        {/* Column 2 */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-900">Навигация</h4>
          <ul className="space-y-1">
            <li>
              <NavLink to="/" className="hover:text-indigo-600 transition">
                Главная
              </NavLink>
            </li>
            <li>
              <a href="#about" className="hover:text-indigo-600 transition">
                О нас
              </a>
            </li>
            <li>
              <a
                href="#how-it-works"
                className="hover:text-indigo-600 transition"
              >
                Как это работает
              </a>
            </li>
            <li>
              <a href="#reviews" className="hover:text-indigo-600 transition">
                Отзывы
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-gray-900">Контакты</h4>
          <p>Email: support@shoplet.kg</p>
          <p>Телефон: +996 700 123 456</p>
          <p>Кыргызстан, г. Бишкек</p>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Shoplet. Все права защищены.
      </div>
    </footer>
  );
};

export default Footer;
