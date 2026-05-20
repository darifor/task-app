import { create } from 'zustand';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  init: () => void;
}

const applyTheme = (mode: ThemeMode) => {
  const root = document.documentElement;
  if (mode === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', prefersDark);
  } else {
    root.classList.toggle('dark', mode === 'dark');
  }
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: (localStorage.getItem('theme-mode') as ThemeMode) || 'system',

  setMode: (mode) => {
    localStorage.setItem('theme-mode', mode);
    applyTheme(mode);
    set({ mode });
  },

  init: () => {
    const saved = (localStorage.getItem('theme-mode') as ThemeMode) || 'system';
    applyTheme(saved);
    set({ mode: saved });

    // Listen for OS theme changes when in system mode
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', () => {
      const current = localStorage.getItem('theme-mode') as ThemeMode;
      if (current === 'system') {
        applyTheme('system');
      }
    });
  },
}));
