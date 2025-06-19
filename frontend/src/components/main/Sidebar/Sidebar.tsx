import { Home, BarChart, Settings, ShoppingCart, Percent } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../../lib/utils.ts';

const navItems = [
  { label: 'Главная', icon: Home, href: '/dashboard/main' },
  { label: 'Категории', icon: BarChart, href: '/dashboard/categories' },
  { label: 'Продукты', icon: ShoppingCart, href: '/dashboard/products' },
  { label: 'Скидки', icon: Percent, href: '/dashboard/discount' },
  { label: 'Настройки', icon: Settings, href: '/dashboard/settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r p-4 bg-white hidden md:block">
      <nav className="space-y-2">
        {navItems.map(({ label, icon: Icon, href }) => (
          <NavLink
            key={label}
            to={href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted',
                isActive ? 'bg-muted text-primary' : 'text-muted-foreground',
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
