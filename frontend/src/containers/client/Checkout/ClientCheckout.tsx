import { useAppSelector } from '../../../app/hook.ts';
import { selectCartItems } from '../Cart/cartSlice.ts';
import { products } from '../Home/ClientHome.tsx';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../components/ui/collapsible.tsx';
import {
  RadioGroup,
  RadioGroupItem,
} from '../../../components/ui/radio-group.tsx';
import { useState } from 'react';
import FileInput from '../../../components/ui/file.tsx';

const ClientCheckout = () => {
  // const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const order = products.filter((p) =>
    cartItems.some((i) => parseFloat(i) === p.id),
  );
  const match = order.reduce((acc, cur) => (acc += cur.price), 0);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  return (
    <div className="mt-8 space-y-6 w-full lg:w-2/4 mx-auto">
      {/* Заголовок заказа */}
      <h5 className="text-center text-2xl font-semibold text-gray-800">
        Оформление заказа
      </h5>

      <div className="space-y-4">
        {/* Список товаров */}
        {order.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-4 shadow-lg rounded-lg bg-white hover:shadow-2xl transition duration-300"
          >
            <p className="text-lg font-medium text-gray-700">{p.title}</p>
            <span className="text-sm text-gray-600">цена: {p.price}</span>
          </div>
        ))}

        {/* Итоговая сумма */}
        <div className="border-t pt-2">
          <span className="block text-right font-semibold text-lg text-gray-800">
            Итог: {match}
          </span>
        </div>
      </div>

      <label className="w-full">
        <Collapsible className="w-full border border-gray-300 rounded-lg shadow-md transition duration-300 hover:shadow-2xl">
          <CollapsibleTrigger className="bg-gray-100 text-gray-700 p-3 rounded-lg text-lg font-medium">
            Метод оплаты
          </CollapsibleTrigger>
          <CollapsibleContent className="p-4 bg-gray-50 rounded-lg sm:w-2/4">
            <RadioGroup
              defaultValue="comfortable"
              onValueChange={setPaymentMethod}
              value={paymentMethod}
            >
              {/* Наличные */}
              <div className="flex items-center space-x-4 mb-4">
                <RadioGroupItem value="money" id="r1" className="w-8 h-8" />
                <div className="flex items-center justify-between w-full">
                  <label
                    htmlFor="r1"
                    className="text-lg text-gray-700 font-medium"
                  >
                    Наличные
                  </label>
                  <svg
                    className="w-12 rounded-lg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M64 64C28.7 64 0 92.7 0 128L0 384c0 35.3 28.7 64 64 64l448 0c35.3 0 64-28.7 64-64l0-256c0-35.3-28.7-64-64-64L64 64zm64 320l-64 0 0-64c35.3 0 64 28.7 64 64zM64 192l0-64 64 0c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64l0 64-64 0zm64-192c-35.3 0-64-28.7-64-64l64 0 0 64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
                  </svg>
                </div>
              </div>

              {/* Мобильный банк */}
              <div className="flex items-center space-x-4 mb-4">
                <RadioGroupItem value="mbank" id="r2" className="w-8 h-8" />
                <div className="flex items-center justify-between w-full">
                  <label
                    htmlFor="r2"
                    className="text-lg text-gray-700 font-medium"
                  >
                    М банк
                  </label>
                  <img
                    src="https://play-lh.googleusercontent.com/xf5_bSz5pNxQHd2K9yig3wM8LAaDigaLhMWdjsVKwSPW0CoyFXoJNUr7Iix1hzTgyg0=w240-h480-rw"
                    alt="m"
                    className="w-12 rounded-lg"
                  />
                </div>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>
      </label>

      {paymentMethod === 'mbank' ? (
        <div>
          <div className="w-full border border-gray-300 rounded-lg shadow-md transition duration-300 hover:shadow-2xl mt-5 p-3">
            <p className="text-lg">Переведите {match} сом на указанный номер</p>
            <div className="flex items-center justify-between sm:justify-start gap-5 w-full my-4">
              <p className="text-lg font-medium">+996774624962</p>
              <button
                className="bg-blue-500 py-2 px-3 rounded-2xl text-white active:bg-red-600 transition-colors duration-150"
                onClick={() => navigator.clipboard.writeText('+996774624696')}
              >
                Копировать
              </button>
            </div>
            <FileInput />
            <button className="bg-blue-500 py-2 px-3 rounded-2xl text-white mt-5 w-full font-medium">
              Я оплатил
            </button>
          </div>
          <div className="w-full border border-gray-300 rounded-lg shadow-md transition duration-300 hover:shadow-2xl mt-5 p-3 space-y-2">
            <h5 className="text-lg font-medium text-gray-700">Доставка</h5>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Ваше имя
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Введите имя"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Телефон
              </label>
              <input
                type="tel"
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                placeholder="+996..."
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Улица</label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Квартира / Дом
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Номер квартиры
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Комментарий к заказу
              </label>
              <textarea
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                placeholder="..."
                rows={3}
              ></textarea>
            </div>
          </div>
          <button className="w-full py-2 bg-blue-600 rounded-2xl font-medium text-white">
            Подтвердить
          </button>
        </div>
      ) : paymentMethod === 'money' ? (
        <div className="w-full border border-gray-300 rounded-lg shadow-md transition duration-300 hover:shadow-2xl mt-5 p-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1364.8123832099395!2d74.5646525!3d42.8774415!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb51a66b8124d%3A0x189e70a5776c8f8a!2z0JzQsNCz0LDQt9C40L0gItCf0LDRiNGC0LXRgiI!5e1!3m2!1sru!2skg!4v1745856916118!5m2!1sru!2skg"
            width="100%"
            height="400"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <form className="space-y-4 mt-3">
            <a
              href="https://maps.app.goo.gl/sffJB1bPFrHGGDtS6"
              target="_blank"
              className="my-3 block text-center text-white rounded-lg font-medium py-2 px-3 bg-blue-700"
            >
              Наш адрес
            </a>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Ваше имя
              </label>
              <input
                type="text"
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                placeholder="Введите имя"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Телефон
              </label>
              <input
                type="tel"
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                placeholder="+996..."
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Комментарий к заказу
              </label>
              <textarea
                className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                placeholder="..."
                rows={3}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-2xl font-medium hover:bg-green-700 transition"
            >
              Подтвердить заказ
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default ClientCheckout;
