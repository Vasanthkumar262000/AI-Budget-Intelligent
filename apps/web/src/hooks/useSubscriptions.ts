import { useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';

export function useSubscriptions() {
  const api = useApi();
  return useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const { data } = await api.get('/subscriptions');
      return data.data;
    },
  });
}
