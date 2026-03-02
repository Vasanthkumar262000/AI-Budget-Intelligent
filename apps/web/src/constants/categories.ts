import type { ExpenseCategory } from '@budget-intelligence/shared';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'Housing',
  'Food',
  'Transport',
  'Health',
  'Shopping',
  'Education',
  'Travel',
  'Other',
];

export const INVESTMENT_TYPES = [
  'Stocks',
  'Crypto',
  'Real Estate',
  'Bonds',
  'ETF/Index',
] as const;

export const BILLING_CYCLES = ['Monthly', 'Annual', 'Weekly'] as const;
