import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';

export function useExpenseSummary(month?: number, year?: number) {
  const api = useApi();
  return useQuery({
    queryKey: ['expenses', 'summary', month, year],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (month != null) params.set('month', String(month));
      if (year != null) params.set('year', String(year));
      const { data } = await api.get(`/expenses/summary?${params}`);
      return data.data;
    },
  });
}
