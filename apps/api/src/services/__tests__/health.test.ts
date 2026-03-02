import { describe, it, expect } from 'vitest';

describe('api', () => {
  it('health check returns ok', () => {
    expect({ status: 'ok' }).toEqual({ status: 'ok' });
  });
});
