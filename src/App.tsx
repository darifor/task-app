import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './services/firebase';
import { useAuthStore } from './store/useAuthStore';
import { useTaskStore } from './store/useTaskStore';
import { useThemeStore } from './store/useThemeStore';
import { subscribeToTasks } from './services/firestore';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import TaskListView from './pages/TaskListView';
import CalendarView from './pages/CalendarView';
import StatsView from './pages/StatsView';
import SettingsView from './pages/SettingsView';
import MainLayout from './components/layout/MainLayout';

function App() {
  const { user, setUser, setLoading, loading } = useAuthStore();
  const { setTasks } = useTaskStore();
  const { init: initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, [setUser, setLoading]);

  useEffect(() => {
    if (user) {
      const unsubscribeTasks = subscribeToTasks(user.uid, (tasks) => {
        setTasks(tasks);
      });
      return () => unsubscribeTasks();
    } else {
      setTasks([]);
    }
  }, [user, setTasks]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="*" element={<Navigate to="/onboarding" replace />} />
          </>
        ) : (
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskListView />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/stats" element={<StatsView />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
