import { toast } from 'sonner';
import { useAppDispatch } from '../../../app/hook.ts';
import {
  deleteCategoryById,
  fetchCategories,
} from '../../../thunks/categoryThunk.ts';
import CategoryEdit from './CategoryEdit.tsx';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu.tsx';
import { Button } from '../../../components/ui/button.tsx';
import { MoreHorizontal } from 'lucide-react';
import { Category } from '../../../types.ts';

const CategoryActions = ({ category }: { category: Category }) => {
  const dispatch = useAppDispatch();
  const deleteCategory = async (id: string) => {
    const result = await dispatch(deleteCategoryById(id));
    if (deleteCategoryById.fulfilled.match(result)) {
      toast.success('Категория удалена');
      await dispatch(fetchCategories());
    } else {
      toast.error('Возникла ошибка при удалении');
    }
  };
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return (
      <CategoryEdit category={category} closeModal={() => setIsEdit(false)} />
    );
  }

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setIsEdit(true)}>
            Редактировать
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => deleteCategory(category._id)}>
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryActions;
