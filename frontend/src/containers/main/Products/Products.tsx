import Btn from '../../../components/ui/btn.tsx';
import { useEffect, useState } from 'react';
import ProductAdd from './ProductAdd.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { selectProducts } from '../../../slices/productsSlice.ts';
import { fetchProducts } from '../../../thunks/productsThunk.ts';
import { DataTable } from '../../../components/main/DataTable/DataTable.tsx';
import { productColumns } from './columns.tsx';
import { fetchCategories } from '../../../thunks/categoryThunk.ts';

const Products = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          dispatch(fetchProducts()),
          dispatch(fetchCategories()),
        ]);
      } catch (error) {
        console.error('Ошибка загрузки:', error);
      }
    };

    void loadData();
  }, [dispatch]);

  return (
    <div className="p-4">
      {modal && <ProductAdd closeModal={() => setModal(false)} />}
      <div className="flex items-center justify-between mb-4">
        <h6>Продукты</h6>
        <Btn variant="outline" onClick={() => setModal(true)}>
          Добавить продукт
        </Btn>
      </div>
      <DataTable
        columns={productColumns}
        data={products}
        filterColumn="title"
        filterPlaceholder="Название"
      />
    </div>
  );
};

export default Products;
