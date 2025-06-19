import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="bg-gray-50 py-20 space-y-32">
      {/* Hero Section */}
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Создайте свой интернет-магазин за несколько минут
            </h1>
            <p className="text-lg text-gray-700">
              Запустите онлайн-бизнес без программирования и больших затрат.
              Выберите готовый шаблон, настройте под ваш бренд и{' '}
              <span className="font-semibold">
                начните продавать уже сегодня
              </span>
              .
            </p>
            <Link to="/sign">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-xl text-base font-medium transition-colors">
                Создать магазин
              </button>
            </Link>
          </div>
          <div className="flex-shrink-0 w-full lg:w-1/2">
            <img
              src="https://atassist.com/blog/uploads/images/2020/05/image_750x_5ed118c21b67c.jpg"
              alt="Создание интернет-магазина"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container mx-auto px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">О нас</h2>
        <p className="mx-auto max-w-3xl text-gray-700">
          Мы – платформа №1 в Кыргызстане по быстрому запуску
          интернет-магазинов. Наша миссия – дать каждому возможность выйти в
          онлайн без технических барьеров и лишних затрат.
        </p>
      </div>

      {/* How It Works */}
      <div className="container mx-auto px-6 lg:px-8 space-y-10">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Как это работает
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: 1,
              title: 'Регистрация',
              desc: 'Создайте аккаунт за пару кликов.',
            },
            {
              step: 2,
              title: 'Добавление продуктов',
              desc: 'Добавьте продукты.',
            },
            {
              step: 3,
              title: 'Запуск продаж',
              desc: 'Опубликуйте и начинайте принимать заказы.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg space-y-4"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold rounded-full text-xl">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-center">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Почему выбирают нас
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="bg-indigo-50 rounded-2xl shadow p-6 space-y-3">
            <h3 className="text-xl font-semibold text-indigo-600">
              Просто и быстро
            </h3>
            <p className="text-gray-700">
              Интерфейс интуитивный — справится даже новичок.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-2xl shadow p-6 space-y-3">
            <h3 className="text-xl font-semibold text-indigo-600">
              Готовые шаблоны
            </h3>
            <p className="text-gray-700">
              Адаптивный дизайн под любые устройства.
            </p>
          </div>
          <div className="bg-indigo-50 rounded-2xl shadow p-6 space-y-3">
            <h3 className="text-xl font-semibold text-indigo-600">
              Поддержка 24/7
            </h3>
            <p className="text-gray-700">Наши специалисты всегда на связи.</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container mx-auto px-6 lg:px-8 space-y-12">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Отзывы наших клиентов
        </h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            {
              text: '«Запустил магазин за вечер, уже на следующий день получил первый заказ!»',
              author: 'Айбек, Бишкек',
            },
            {
              text: '«Никаких сложностей, платформа идеально подходит для малого бизнеса.»',
              author: 'Алина, Ош',
            },
            {
              text: '«Отличная поддержка и удобные инструменты — рекомендую всем!»',
              author: 'Нурсултан, Каракол',
            },
          ].map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col justify-between"
            >
              <p className="text-gray-700 mb-6 italic">"{r.text}"</p>
              <span className="text-indigo-600 font-semibold">{r.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
