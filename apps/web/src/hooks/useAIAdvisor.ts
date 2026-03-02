import { useMutation, useQuery } from '@tanstack/react-query';
import { useApi } from './useApi';

export function useAIAdvisor() {
  const api = useApi();
  return {
    analyze: useMutation({
      mutationFn: async ({ month, year }: { month: number; year: number }) => {
        const { data } = await api.post('/ai/analyze', { month, year });
        return data.data;
      },
    }),
    history: useQuery({
      queryKey: ['ai', 'history'],
      queryFn: async () => {
        const { data } = await api.get('/ai/history');
        return data.data;
      },
    }),
  };
}
