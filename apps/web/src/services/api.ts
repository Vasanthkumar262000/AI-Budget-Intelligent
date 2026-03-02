import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function createApiClient(getToken: () => Promise<string | null>) {
  const client = axios.create({
    baseURL: `${baseURL}/api/v1`,
    headers: { 'Content-Type': 'application/json' },
  });

  client.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return client;
}

let apiClient: ReturnType<typeof createApiClient> | null = null;

export function getApiClient(getToken: () => Promise<string | null>) {
  if (!apiClient) {
    apiClient = createApiClient(getToken);
  }
  return apiClient;
}
