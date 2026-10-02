import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  activeTahunAjaran: string;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setActiveTahunAjaran: (ta: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: true,
  activeTahunAjaran: '2026/2027',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveTahunAjaran: (activeTahunAjaran) => set({ activeTahunAjaran }),
}));
