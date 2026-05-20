import { create } from 'zustand';
import { Task } from '../types';

interface UIState {
  isTaskModalOpen: boolean;
  taskToEdit: Task | null;
  openTaskModal: (task?: Task) => void;
  closeTaskModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isTaskModalOpen: false,
  taskToEdit: null,
  openTaskModal: (task) => set({ isTaskModalOpen: true, taskToEdit: task || null }),
  closeTaskModal: () => set({ isTaskModalOpen: false, taskToEdit: null }),
}));
