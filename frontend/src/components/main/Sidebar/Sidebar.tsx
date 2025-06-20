import {
  BarChart,
  Home,
  Percent,
  Settings,
  ShoppingCart,
  Store,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../../lib/utils.ts';

const navItems = [
  { label: 'Главная', icon: Home, href: 'main' },
  { label: 'Категории', icon: BarChart, href: 'categories' },
  { label: 'Продукты', icon: ShoppingCart, href: 'products' },
  { label: 'Скидки', icon: Percent, href: 'discount' },
  { label: 'Мои магазины', icon: Store, href: '/shops' },
  { label: 'Настройки', icon: Settings, href: 'settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const patch = location.pathname.split('/')[3];

  return (
    <aside className="w-40 min-h-screen border-r p-4 bg-white hidden md:block">
      <nav className="space-y-2">
        {navItems.map(({ label, icon: Icon, href }) => (
          <NavLink
            key={label}
            to={href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted',
              patch === href
                ? 'bg-muted text-primary'
                : 'text-muted-foreground',
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
