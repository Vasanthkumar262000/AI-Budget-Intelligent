export function formatCurrency(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function parseCurrency(input: string): number {
  const cleaned = input.replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function getMonthName(month: number): string {
  const names = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return names[month] ?? 'Unknown';
}

export function getMonthsForYear(year: number): { month: number; year: number; label: string }[] {
  return Array.from({ length: 12 }, (_, i) => ({
    month: i,
    year,
    label: `${getMonthName(i)} ${year}`,
  }));
}
