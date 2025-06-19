import { useMemo, useState } from 'react';
import { IProduct } from '../../../types.ts';
import { useAppDispatch } from '../../../app/hook.ts';
import { toast } from 'sonner';
import ProductEdit from './ProductEdit.tsx';
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
import {
  deleteProductById,
  fetchProducts,
} from '../../../thunks/productsThunk.ts';

const ProductActions = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const deleteProduct = async (id: string) => {
    const result = await dispatch(deleteProductById(id));
    if (deleteProductById.fulfilled.match(result)) {
      toast.success('Продукт удален');
      await dispatch(fetchProducts());
    } else {
      toast.error('Возникла ошибка при удалении');
    }
  };
  const [isEdit, setIsEdit] = useState(false);

  const memoizedProduct = useMemo(() => product, [product]);

  if (isEdit) {
    return (
      <ProductEdit
        product={{
          ...memoizedProduct,
          category: memoizedProduct.category
            ? memoizedProduct.category._id
            : '',
        }}
        closeModal={() => setIsEdit(false)}
      />
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
          <DropdownMenuItem onClick={() => deleteProduct(product._id)}>
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProductActions;
