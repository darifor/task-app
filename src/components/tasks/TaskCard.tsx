import { Task } from '../../types';
import { Checkbox } from '../ui/Checkbox';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (taskId: string, completed: boolean) => void;
  onClick?: () => void;
}

export const TaskCard = ({ task, onToggleStatus, onClick }: TaskCardProps) => {
  const isCompleted = task.status === 'completed';
  const hasDate = task.dueDate != null;
  const isOverdue = hasDate && task.dueDate!.toDate() < new Date() && !isCompleted;

  return (
    <div 
      onClick={onClick}
      className={`bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30 flex gap-4 cursor-pointer hover:shadow-md transition-shadow ${isCompleted ? 'opacity-60' : ''}`}
    >
      <div className="pt-1">
        <Checkbox 
          checked={isCompleted} 
          onChange={(checked) => onToggleStatus(task.id, checked)} 
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-headline-sm text-on-surface truncate ${isCompleted ? 'line-through text-on-surface-variant' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-body-md text-on-surface-variant mt-1 line-clamp-2">
            {task.description}
          </p>
        )}
        <div className="flex items-center gap-3 mt-3 flex-wrap">
          {hasDate && (
            <span className={`text-label-sm flex items-center gap-1 ${isOverdue ? 'text-error' : 'text-on-surface-variant'}`}>
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              {format(task.dueDate!.toDate(), "d MMM", { locale: es })}
            </span>
          )}
          {task.categoryId && (
            <span className="text-label-sm bg-surface-container text-on-surface px-2 py-0.5 rounded-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">label</span>
              {task.categoryId}
            </span>
          )}
          {task.priority !== 'ninguna' && (
            <span className={`text-label-sm flex items-center gap-1 ${task.priority === 'alta' ? 'text-error' : task.priority === 'media' ? 'text-secondary' : 'text-tertiary'}`}>
              <span className="material-symbols-outlined text-[16px]">flag</span>
              Prioridad {task.priority}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
