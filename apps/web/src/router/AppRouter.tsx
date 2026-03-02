import { Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { ProtectedRoute } from './ProtectedRoute';
import { OverviewPage } from '@/features/overview/OverviewPage';
import { ExpensesPage } from '@/features/expenses/ExpensesPage';
import { InvestmentsPage } from '@/features/investments/InvestmentsPage';
import { SavingsPage } from '@/features/savings/SavingsPage';
import { SubscriptionsPage } from '@/features/subscriptions/SubscriptionsPage';
import { IncomePage } from '@/features/income/IncomePage';
import { ReportsPage } from '@/features/reports/ReportsPage';
import { AIAdvisorPage } from '@/features/ai-advisor/AIAdvisorPage';

export function AppRouter() {
  return (
    <ProtectedRoute>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/investments" element={<InvestmentsPage />} />
          <Route path="/savings" element={<SavingsPage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/ai-advisor" element={<AIAdvisorPage />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </AppShell>
    </ProtectedRoute>
  );
}
