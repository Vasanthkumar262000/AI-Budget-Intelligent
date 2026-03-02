import { NavLink } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { ROUTES } from '@/constants/routes';

const navItems = [
  { to: ROUTES.overview, label: 'Overview' },
  { to: ROUTES.income, label: 'Income' },
  { to: ROUTES.expenses, label: 'Expenses' },
  { to: ROUTES.investments, label: 'Investments' },
  { to: ROUTES.savings, label: 'Savings' },
  { to: ROUTES.subscriptions, label: 'Subscriptions' },
  { to: ROUTES.reports, label: 'Reports' },
  { to: ROUTES.aiAdvisor, label: 'AI Advisor' },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Budget Intelligence</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md text-sm font-medium ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <UserButton afterSignOutUrl="/" />
      </div>
    </aside>
  );
}
