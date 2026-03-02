import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';

export function useInvestments() {
  const api = useApi();
  return useQuery({
    queryKey: ['investments'],
    queryFn: async () => {
      const { data } = await api.get('/investments');
      return data.data;
    },
  });
}
