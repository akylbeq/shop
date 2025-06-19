import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { IProduct } from '../../../types.ts';
import ProductActions from './ProductActions.tsx';

export const productColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Название <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('title')}</div>
    ),
  },
  {
    accessorKey: 'category',
    header: 'category',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.category?.name ?? '-'}</div>
    ),
  },
  {
    accessorKey: 'originalPrice',
    header: () => <div className="text-right">Цена</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right text-sm text-muted-foreground">
          {row.getValue('originalPrice')}
        </div>
      );
    },
  },
  {
    accessorKey: 'discountPrice',
    header: () => <div className="text-right">Скидочная цена</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right text-sm text-muted-foreground">
          {row.getValue('discountPrice') || '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'active',
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right text-sm">
          {row.original.active ? 'Видно' : 'Не видно'}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => <ProductActions product={row.original} />,
  },
];
