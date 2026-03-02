import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';

export function useSavings() {
  const api = useApi();
  return useQuery({
    queryKey: ['savings'],
    queryFn: async () => {
      const { data } = await api.get('/savings');
      return data.data;
    },
  });
}
