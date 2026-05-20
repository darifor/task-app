import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuthStore } from '../../store/useAuthStore';
import { addTask, updateTask } from '../../services/firestore';
import { Task } from '../../types';
import { Timestamp } from 'firebase/firestore';
import { useUIStore } from '../../store/useUIStore';

export const TaskFormModal = () => {
  const { user } = useAuthStore();
  const { isTaskModalOpen, closeTaskModal, taskToEdit } = useUIStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('ninguna');
  const [dueDate, setDueDate] = useState<string>('');

  // Reset or populate fields when modal opens
  useEffect(() => {
    if (isTaskModalOpen) {
      setTitle(taskToEdit?.title || '');
      setDescription(taskToEdit?.description || '');
      setPriority(taskToEdit?.priority || 'ninguna');
      setDueDate(taskToEdit?.dueDate ? taskToEdit.dueDate.toDate().toISOString().split('T')[0] : '');
    }
  }, [isTaskModalOpen, taskToEdit]);

  const handleSave = async () => {
    if (!user || !title.trim()) return;
    
    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      categoryId: taskToEdit?.categoryId || 'inbox',
      status: taskToEdit?.status || 'pending',
      tags: taskToEdit?.tags || [],
      subtasks: taskToEdit?.subtasks || [],
      order: taskToEdit?.order || 0,
      dueDate: dueDate ? Timestamp.fromDate(new Date(dueDate)) : null
    };

    if (taskToEdit) {
      await updateTask(user.uid, taskToEdit.id, taskData as any);
    } else {
      await addTask(user.uid, taskData as any);
    }
    
    setTitle('');
    setDescription('');
    setPriority('ninguna');
    setDueDate('');
    closeTaskModal();
  };

  return (
    <AnimatePresence>
      {isTaskModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTaskModal}
            className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 md:left-1/2 md:-translate-x-1/2 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-[500px] md:rounded-3xl bg-surface-container-lowest z-[60] rounded-t-3xl shadow-xl overflow-hidden"
          >
            <div className="w-12 h-1.5 bg-outline-variant/50 rounded-full mx-auto my-3 md:hidden" />
            
            <div className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
              <h2 className="text-headline-sm font-bold text-on-surface">
                {taskToEdit ? 'Editar Tarea' : 'Nueva Tarea'}
              </h2>
              
              <Input 
                autoFocus
                placeholder="¿Qué quieres lograr?" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
              />
              
              <textarea 
                placeholder="Añade más detalles (opcional)"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="bg-surface-container-low text-on-surface rounded-xl px-4 py-3 outline-none border border-transparent focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/60 resize-none min-h-[100px]"
              />

              <div className="flex gap-4">
                <Input 
                  type="date" 
                  value={dueDate}
                  onChange={e => setDueDate(e.target.value)}
                />
                
                <select 
                  value={priority}
                  onChange={e => setPriority(e.target.value as any)}
                  className="bg-surface-container-low text-on-surface rounded-xl px-4 py-3 outline-none border border-transparent focus:border-primary flex-1"
                >
                  <option value="ninguna">Prioridad: Ninguna</option>
                  <option value="baja">Prioridad: Baja</option>
                  <option value="media">Prioridad: Media</option>
                  <option value="alta">Prioridad: Alta</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button variant="text" onClick={closeTaskModal}>Cancelar</Button>
                <Button onClick={handleSave} disabled={!title.trim()}>
                  {taskToEdit ? 'Guardar' : 'Crear Tarea'}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
