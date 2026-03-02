interface HealthScoreGaugeProps {
  score: number;
}

const getColor = (score: number) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-lime-600';
  if (score >= 40) return 'text-yellow-600';
  return 'text-red-600';
};

export function HealthScoreGauge({ score }: HealthScoreGaugeProps) {
  const clamped = Math.min(100, Math.max(0, score));
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-green-500 opacity-30"
          style={{ clipPath: `inset(0 ${100 - clamped}% 0 0)` }}
        />
        <span className={`relative text-2xl font-bold ${getColor(score)}`}>{Math.round(clamped)}</span>
      </div>
      <p className="mt-2 text-sm text-gray-500">Financial Health</p>
    </div>
  );
}
