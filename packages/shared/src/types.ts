import { z } from 'zod';

export const expenseCategoryEnum = z.enum([
  'Housing',
  'Food',
  'Transport',
  'Health',
  'Shopping',
  'Education',
  'Travel',
  'Other',
]);
export type ExpenseCategory = z.infer<typeof expenseCategoryEnum>;

export const investmentTypeEnum = z.enum([
  'Stocks',
  'Crypto',
  'Real Estate',
  'Bonds',
  'ETF/Index',
]);
export type InvestmentType = z.infer<typeof investmentTypeEnum>;

export const billingCycleEnum = z.enum(['Monthly', 'Annual', 'Weekly']);
export type BillingCycle = z.infer<typeof billingCycleEnum>;

export const expenseCreateSchema = z.object({
  description: z.string().min(1),
  amount: z.number().positive(),
  category: expenseCategoryEnum,
  date: z.union([z.string(), z.date()]).transform((v) => (typeof v === 'string' ? new Date(v) : v)),
  notes: z.string().optional(),
});

export const expenseUpdateSchema = expenseCreateSchema.partial();

export const monthlyIncomeSchema = z.object({
  month: z.number().min(0).max(11),
  year: z.number().int().min(2020),
  amount: z.number().nonnegative(),
});

export const investmentCreateSchema = z.object({
  name: z.string().min(1),
  type: investmentTypeEnum,
  amount: z.number().positive(),
  returnPct: z.number().min(0).max(100).optional(),
  date: z.union([z.string(), z.date()]).transform((v) => (typeof v === 'string' ? new Date(v) : v)),
  notes: z.string().optional(),
});

export const investmentUpdateSchema = investmentCreateSchema.partial();

export const savingsGoalCreateSchema = z.object({
  name: z.string().min(1),
  targetAmount: z.number().positive(),
  savedAmount: z.number().nonnegative().optional().default(0),
  color: z.string().optional().default('#4aab8d'),
  notes: z.string().optional(),
});

export const savingsGoalUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  targetAmount: z.number().positive().optional(),
  savedAmount: z.number().nonnegative().optional(),
  color: z.string().optional(),
  notes: z.string().optional(),
});

export const subscriptionCreateSchema = z.object({
  name: z.string().min(1),
  amount: z.number().nonnegative(),
  billing: billingCycleEnum,
  category: z.string().optional(),
  nextDate: z.union([z.string(), z.coerce.date(), z.null()]).optional().nullable(),
  isActive: z.boolean().optional().default(true),
  notes: z.string().optional(),
});

export const subscriptionUpdateSchema = subscriptionCreateSchema.partial();
