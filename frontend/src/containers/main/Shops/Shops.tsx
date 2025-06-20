import Btn from '../../../components/ui/btn.tsx';
import { Plus, Store } from 'lucide-react';
import { useEffect, useState } from 'react';
import ShopsAdd from './ShopsAdd.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { selectShops } from '../../../slices/shopsSlice.ts';
import { fetchShops } from '../../../thunks/shopsThunk.ts';
import { useNavigate } from 'react-router-dom';

const Shops = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();
  const shops = useAppSelector(selectShops);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchShops());
  }, [dispatch]);

  return (
    <div className="w-full">
      {modal && <ShopsAdd closeModal={() => setModal(false)} />}

      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-2">
          <Store width={20} />
          <p className="font-semibold text-lg">Мои магазины</p>
        </div>
        <Btn variant="outline" onClick={() => setModal(true)}>
          Создать магазин
        </Btn>
      </div>

      <div className="flex flex-wrap gap-4 mt-5">
        {shops.length > 0 ? (
          <>
            {shops.map((shop) => (
              <div
                key={shop._id}
                className="w-36 h-48 rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow flex flex-col items-center cursor-pointer focus-visible:ring-2 focus-visible:ring-primary/50"
                tabIndex={0}
                onClick={() => navigate(`/shops/${shop.slug}`)}
              >
                <img
                  src={shop.logo}
                  alt={shop.name}
                  className="w-full h-28 object-cover"
                />
                <div className="flex-1 flex items-center justify-center px-2">
                  <span className="text-center font-medium text-sm truncate">
                    {shop.name}
                  </span>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setModal(true)}
              aria-label="Добавить магазин"
              className="w-36 h-48 rounded-xl border border-dashed border-primary/40 flex flex-col items-center justify-center text-primary hover:bg-primary/10 transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              <Plus size={48} />
              <span className="mt-2 text-sm font-medium">Добавить</span>
            </button>
          </>
        ) : (
          <div className="w-full py-10 text-center text-muted-foreground">
            У вас ещё нет магазинов. Нажмите «Создать магазин», чтобы добавить
            первый!
          </div>
        )}
      </div>
    </div>
  );
};

export default Shops;
