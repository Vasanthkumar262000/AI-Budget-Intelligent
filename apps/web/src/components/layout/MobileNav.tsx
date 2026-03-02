import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-gray-100"
        aria-label="Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <nav className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </>
      )}
    </div>
  );
}
