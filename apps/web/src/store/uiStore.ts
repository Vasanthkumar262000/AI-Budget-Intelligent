import { create } from 'zustand';

interface UIState {
  selectedMonth: number;
  selectedYear: number;
  setSelectedMonth: (m: number) => void;
  setSelectedYear: (y: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  selectedMonth: new Date().getMonth(),
  selectedYear: new Date().getFullYear(),
  setSelectedMonth: (m) => set({ selectedMonth: m }),
  setSelectedYear: (y) => set({ selectedYear: y }),
}));
