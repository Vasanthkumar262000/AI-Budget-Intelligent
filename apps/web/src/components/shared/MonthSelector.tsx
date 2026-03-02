import { getMonthName } from '@budget-intelligence/shared';

interface MonthSelectorProps {
  selectedMonth: number;
  selectedYear: number;
  onSelect: (month: number, year: number) => void;
}

export function MonthSelector({ selectedMonth, selectedYear, onSelect }: MonthSelectorProps) {
  const months = Array.from({ length: 12 }, (_, i) => ({ month: i, label: getMonthName(i) }));
  return (
    <div className="flex flex-wrap gap-2">
      {months.map(({ month, label }) => (
        <button
          key={month}
          onClick={() => onSelect(month, selectedYear)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
            month === selectedMonth
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
