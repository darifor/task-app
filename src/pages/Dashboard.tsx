import { useTaskStore } from '../store/useTaskStore';
import { useAuthStore } from '../store/useAuthStore';
import { ProgressRing } from '../components/ui/ProgressRing';
import { TaskCard } from '../components/tasks/TaskCard';
import { updateTask } from '../services/firestore';
import { Timestamp } from 'firebase/firestore';
import { useUIStore } from '../store/useUIStore';
import { FAB } from '../components/ui/FAB';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { tasks, loading } = useTaskStore();
  const { openTaskModal } = useUIStore();

  const today = new Date();
  
  const todayTasks = tasks.filter(t => t.dueDate && t.dueDate.toDate().toDateString() === today.toDateString() && t.status !== 'completed');
  const completedToday = tasks.filter(t => t.status === 'completed' && t.completedAt?.toDate().toDateString() === today.toDateString()).length;
  const totalToday = todayTasks.length + completedToday;
  
  const progress = totalToday === 0 ? 0 : (completedToday / totalToday) * 100;

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    if (!user) return;
    await updateTask(user.uid, taskId, {
      status: completed ? 'completed' : 'pending',
      completedAt: completed ? Timestamp.now() : null
    });
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-headline-md font-bold text-on-background">¡Hola, {user?.displayName?.split(' ')[0] || 'Aventurero'}!</h1>
        <p className="text-body-lg text-on-surface-variant">Aquí tienes tu resumen de hoy.</p>
      </header>

      <section className="bg-primary text-on-primary rounded-3xl p-6 shadow-md flex items-center justify-between overflow-hidden relative">
        <div className="z-10">
          <h2 className="text-headline-sm font-bold mb-1">Productividad</h2>
          <p className="text-body-md opacity-80 mb-4">{completedToday} de {totalToday} tareas completadas</p>
          <div className="flex items-center gap-2 bg-on-primary/20 w-fit px-3 py-1.5 rounded-full text-label-sm">
            <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
            Racha de 3 días
          </div>
        </div>
        <div className="z-10">
          <ProgressRing progress={progress} size={80} strokeWidth={8} color="#fff" />
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-headline-sm font-bold text-on-background">Para hoy</h2>
          <button className="text-primary font-label-lg hover:underline">Ver todas</button>
        </div>
        
        {todayTasks.length === 0 ? (
          <div className="bg-surface-container-low rounded-2xl p-8 text-center text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl mb-2">sentiment_satisfied</span>
            <p className="text-body-lg">¡No tienes tareas pendientes para hoy!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {todayTasks.map(task => (
              <TaskCard key={task.id} task={task} onToggleStatus={handleToggleTask} onClick={() => openTaskModal(task)} />
            ))}
          </div>
        )}
      </section>

      <FAB icon="add" onClick={() => openTaskModal()} />
    </div>
  );
};

export default Dashboard;
