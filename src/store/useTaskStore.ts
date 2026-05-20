import { create } from 'zustand';
import { Task } from '../types';

interface TaskState {
    tasks: Task[];
    loading: boolean;
    setTasks: (tasks: Task[]) => void;
    setLoading: (loading: boolean) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
    tasks: [],
    loading: true,
    setTasks: (tasks) => set({ tasks, loading: false }),
    setLoading: (loading) => set({ loading }),
}));
