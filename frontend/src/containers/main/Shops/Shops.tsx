import Btn from '../../../components/ui/btn.tsx';
import { Plus, Store } from 'lucide-react';
import { useState } from 'react';
import ShopsAdd from './ShopsAdd.tsx';

const Shops = () => {
  const [modal, setModal] = useState(false);

  return (
    <div>
      {modal && <ShopsAdd closeModal={() => setModal(false)} />}
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-1">
          <Store width={18} />
          <p className="font-medium text-lg">Мои магазины</p>
        </div>
        <Btn variant="outline" onClick={() => setModal(true)}>
          Создать магазин
        </Btn>
      </div>

      <div>
        <div
          className="w-36 h-48 border-3 rounded-lg flex items-center justify-center"
          onClick={() => setModal(true)}
        >
          <Plus size={68} />
        </div>
      </div>
    </div>
  );
};

export default Shops;
