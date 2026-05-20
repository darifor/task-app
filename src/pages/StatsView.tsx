import { useTaskStore } from '../store/useTaskStore';
import { ProgressRing } from '../components/ui/ProgressRing';

const StatsView = () => {
  const { tasks } = useTaskStore();
  
  const completed = tasks.filter(t => t.status === 'completed').length;
  const total = tasks.length;
  const pending = total - completed;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-headline-md font-bold text-on-background">Estadísticas</h1>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-low p-6 rounded-3xl flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-4xl text-primary mb-2">task_alt</span>
          <span className="text-headline-lg font-bold text-on-surface">{completed}</span>
          <span className="text-label-md text-on-surface-variant">Completadas</span>
        </div>
        <div className="bg-surface-container-low p-6 rounded-3xl flex flex-col items-center justify-center text-center">
          <span className="material-symbols-outlined text-4xl text-error mb-2">pending_actions</span>
          <span className="text-headline-lg font-bold text-on-surface">{pending}</span>
          <span className="text-label-md text-on-surface-variant">Pendientes</span>
        </div>
      </div>

      <div className="bg-primary-container text-on-primary-container p-6 rounded-3xl flex items-center justify-between gap-6 overflow-hidden relative">
        <div className="z-10 flex-1">
          <h2 className="text-headline-sm font-bold">Rendimiento Global</h2>
          <p className="text-body-md opacity-80 mt-1">Has completado el {total === 0 ? 0 : Math.round((completed/total)*100)}% de todas tus tareas.</p>
        </div>
        <div className="z-10">
          <ProgressRing progress={total === 0 ? 0 : (completed/total)*100} size={80} strokeWidth={8} color="#fff" />
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
      </div>
    </div>
  );
};
export default StatsView;
