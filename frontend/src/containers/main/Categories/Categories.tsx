import Btn from '../../../components/ui/btn.tsx';
import { useEffect, useState } from 'react';
import CategoryCreating from './CategoryCreating.tsx';
import { useAppDispatch, useAppSelector } from '../../../app/hook.ts';
import { selectAdminCategories } from '../../../slices/categorySlice.ts';
import { fetchCategories } from '../../../thunks/categoryThunk.ts';
import { columns } from './columns.tsx';
import { DataTable } from '../../../components/main/DataTable/DataTable.tsx';

const Categories = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAdminCategories);
  // const error = useAppSelector(selectCategoriesError)

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="p-4">
      {modalOpen && <CategoryCreating closeModal={() => setModalOpen(false)} />}

      <div className="flex justify-between items-center mb-4">
        <h6>Категории</h6>
        <Btn variant="outline" onClick={() => setModalOpen(true)}>
          Создать категорию
        </Btn>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <DataTable
          columns={columns}
          data={categories}
          filterColumn="name"
          filterPlaceholder="Найти по названию"
        />
      </div>
    </div>
  );
};

export default Categories;
