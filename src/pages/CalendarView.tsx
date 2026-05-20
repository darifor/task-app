import { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { TaskCard } from '../components/tasks/TaskCard';
import { useUIStore } from '../store/useUIStore';

const CalendarView = () => {
  const { tasks } = useTaskStore();
  const { openTaskModal } = useUIStore();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

  const dayTasks = tasks.filter(t => t.dueDate && isSameDay(t.dueDate.toDate(), selectedDate));

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-headline-md font-bold text-on-background">Calendario</h1>
      </header>

      <div className="bg-surface-container-low rounded-2xl p-4 flex justify-between overflow-x-auto gap-2 no-scrollbar">
        {weekDays.map(day => {
          const isSelected = isSameDay(day, selectedDate);
          return (
            <button
              key={day.toString()}
              onClick={() => setSelectedDate(day)}
              className={`flex-shrink-0 min-w-[3rem] flex flex-col items-center p-2 rounded-xl transition-colors ${isSelected ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-variant'}`}
            >
              <span className="text-label-sm uppercase mb-1">{format(day, 'EEE', { locale: es })}</span>
              <span className="font-headline-sm">{format(day, 'd')}</span>
            </button>
          );
        })}
      </div>

      <section>
        <h2 className="text-headline-sm font-bold text-on-background mb-4">
          Tareas para el {format(selectedDate, "d 'de' MMMM", { locale: es })}
        </h2>
        <div className="flex flex-col gap-3">
          {dayTasks.length === 0 ? (
            <div className="text-center text-on-surface-variant py-8">No hay tareas programadas.</div>
          ) : (
            dayTasks.map(task => (
              <TaskCard key={task.id} task={task} onToggleStatus={() => {}} onClick={() => openTaskModal(task)} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};
export default CalendarView;
