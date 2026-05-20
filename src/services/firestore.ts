import { db } from './firebase';
import { 
    collection, 
    doc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    orderBy, 
    onSnapshot, 
    serverTimestamp
} from "firebase/firestore";
import { Task } from '../types';

export const getTasksQuery = (userId: string) => {
    const tasksRef = collection(db, `users/${userId}/tasks`);
    return query(tasksRef, orderBy('createdAt', 'desc'));
};

export const subscribeToTasks = (userId: string, callback: (tasks: Task[]) => void) => {
    const q = getTasksQuery(userId);
    return onSnapshot(q, (snapshot) => {
        const tasks: Task[] = [];
        snapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() } as Task);
        });
        callback(tasks);
    });
};

export const addTask = async (userId: string, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const tasksRef = collection(db, `users/${userId}/tasks`);
    return await addDoc(tasksRef, {
        ...task,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    });
};

export const updateTask = async (userId: string, taskId: string, updates: Partial<Task>) => {
    const taskRef = doc(db, `users/${userId}/tasks/${taskId}`);
    return await updateDoc(taskRef, {
        ...updates,
        updatedAt: serverTimestamp()
    });
};

export const deleteTask = async (userId: string, taskId: string) => {
    const taskRef = doc(db, `users/${userId}/tasks/${taskId}`);
    return await deleteDoc(taskRef);
};
