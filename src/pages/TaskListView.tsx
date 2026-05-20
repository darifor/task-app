import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { useTaskStore } from '../store/useTaskStore';
import { useAuthStore } from '../store/useAuthStore';
import { TaskCard } from '../components/tasks/TaskCard';
import { FAB } from '../components/ui/FAB';
import { updateTask } from '../services/firestore';
import { Timestamp } from 'firebase/firestore';
import { useUIStore } from '../store/useUIStore';

const TaskListView = () => {
  const { user } = useAuthStore();
  const { tasks } = useTaskStore();
  const { openTaskModal } = useUIStore();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('pending');

  const filteredTasks = tasks
    .filter(t => filter === 'all' ? true : filter === 'pending' ? t.status !== 'completed' : t.status === 'completed')
    .sort((a, b) => a.order - b.order);

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    if (!user) return;
    await updateTask(user.uid, taskId, {
      status: completed ? 'completed' : 'pending',
      completedAt: completed ? Timestamp.now() : null
    });
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination || !user) return;
    
    const items = Array.from(filteredTasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order in state optimistically (zustand) and in firestore
    items.forEach((task, index) => {
      if (task.order !== index) {
        updateTask(user.uid, task.id, { order: index });
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-headline-md font-bold text-on-background">Mis Tareas</h1>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {['pending', 'completed', 'all'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-1.5 rounded-full text-label-sm whitespace-nowrap transition-colors ${filter === f ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-variant'}`}
          >
            {f === 'pending' ? 'Pendientes' : f === 'completed' ? 'Completadas' : 'Todas'}
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks-list">
          {(provided) => (
            <div 
              {...provided.droppableProps} 
              ref={provided.innerRef}
              className="flex flex-col gap-3"
            >
              {filteredTasks.length === 0 ? (
                <div className="text-center text-on-surface-variant py-10">No hay tareas para mostrar.</div>
              ) : (
                filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index} isDragDisabled={filter !== 'pending'}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1}}
                      >
                        <TaskCard task={task} onToggleStatus={handleToggleTask} onClick={() => openTaskModal(task)} />
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <FAB icon="add" onClick={() => openTaskModal()} />
    </div>
  );
};

export default TaskListView;
