import { describe, it, expect } from 'vitest';
import { formatCurrency, parseCurrency } from '@budget-intelligence/shared';

describe('calculations', () => {
  it('formatCurrency formats number as USD', () => {
    expect(formatCurrency(1234.56)).toContain('1,234.56');
  });

  it('parseCurrency parses string to number', () => {
    expect(parseCurrency('$1,234.56')).toBe(1234.56);
    expect(parseCurrency('100')).toBe(100);
  });
});
