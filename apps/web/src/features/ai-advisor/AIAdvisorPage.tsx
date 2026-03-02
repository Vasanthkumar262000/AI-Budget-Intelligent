import { useState } from 'react';
import { useAIAdvisor } from '@/hooks/useAIAdvisor';
import { useUIStore } from '@/store/uiStore';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';

export function AIAdvisorPage() {
  const { selectedMonth, selectedYear } = useUIStore();
  const { analyze, history } = useAIAdvisor();
  const [latestAnalysis, setLatestAnalysis] = useState<string | null>(null);

  const runAnalysis = async () => {
    const result = await analyze.mutateAsync({ month: selectedMonth, year: selectedYear });
    setLatestAnalysis(result.content);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">AI Financial Advisor</h1>
      <button
        onClick={runAnalysis}
        disabled={analyze.isPending}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {analyze.isPending ? 'Analyzing...' : 'Analyze My Finances'}
      </button>
      {analyze.isPending && <LoadingSpinner />}
      {latestAnalysis && (
        <div className="mt-6 p-4 bg-white rounded-lg border whitespace-pre-wrap">{latestAnalysis}</div>
      )}
      {history.data?.length > 0 && !latestAnalysis && (
        <div className="mt-6 space-y-4">
          <h2 className="font-semibold">Past Analyses</h2>
          {history.data.slice(0, 5).map((a: { id: string; content: string; month: number; year: number }) => (
            <div key={a.id} className="p-4 bg-white rounded-lg border">
              <p className="text-sm text-gray-500 mb-2">
                {a.month + 1}/{a.year}
              </p>
              <p className="whitespace-pre-wrap line-clamp-4">{a.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
