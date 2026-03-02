import cors from 'cors';

export function getCorsOptions(origin: string) {
  return {
    origin: origin.split(',').map((o) => o.trim()) || true,
    credentials: true,
  };
}
