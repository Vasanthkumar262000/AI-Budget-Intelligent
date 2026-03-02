import { useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { getApiClient } from '@/services/api';

export function useApi() {
  const { getToken } = useAuth();
  return useCallback(() => getApiClient(getToken), [getToken])();
}
