import { Timestamp } from 'firebase/firestore';

export type Priority = 'alta' | 'media' | 'baja' | 'ninguna';
export type Status = 'pending' | 'completed';

export interface Subtask {
    id: string;
    title: string;
    completed: boolean;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: Timestamp | null;
    priority: Priority;
    categoryId: string;
    status: Status;
    tags: string[];
    subtasks: Subtask[];
    order: number;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    completedAt?: Timestamp | null;
}

export interface UserSettings {
    theme: 'light' | 'dark' | 'system';
    streakCount: number;
    lastActiveDate: string;
}
