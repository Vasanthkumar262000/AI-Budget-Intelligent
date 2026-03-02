import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';

export function useMonthlyIncome(year?: number) {
  const api = useApi();
  return useQuery({
    queryKey: ['income', year],
    queryFn: async () => {
      const { data } = await api.get('/income');
      return data.data;
    },
  });
}
