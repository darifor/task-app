import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';
import { auth } from '../services/firebase';
import { Button } from '../components/ui/Button';
import clsx from 'clsx';

type ThemeMode = 'light' | 'dark' | 'system';

const themeOptions: { value: ThemeMode; icon: string; label: string }[] = [
  { value: 'light', icon: 'light_mode', label: 'Claro' },
  { value: 'dark', icon: 'dark_mode', label: 'Oscuro' },
  { value: 'system', icon: 'desktop_windows', label: 'Sistema' },
];

const SettingsView = () => {
  const { user } = useAuthStore();
  const { mode, setMode } = useThemeStore();
  const [showThemePicker, setShowThemePicker] = useState(false);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-headline-md font-bold text-on-background">Ajustes</h1>
      </header>

      <div className="bg-surface-container-low rounded-3xl p-6 flex items-center gap-4">
        {user?.photoURL ? (
          <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full" />
        ) : (
          <div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-on-surface-variant">person</span>
          </div>
        )}
        <div>
          <h2 className="text-headline-sm font-bold text-on-surface">{user?.displayName || 'Usuario'}</h2>
          <p className="text-body-md text-on-surface-variant">{user?.email}</p>
        </div>
      </div>

      <section className="bg-surface-container-low rounded-3xl p-4 flex flex-col gap-2">
        {/* Apariencia button */}
        <button
          onClick={() => setShowThemePicker(!showThemePicker)}
          className="flex items-center justify-between p-4 hover:bg-surface-variant rounded-xl transition-colors w-full"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">dark_mode</span>
            <span className="font-medium text-on-surface">Apariencia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-body-md text-on-surface-variant">
              {themeOptions.find((o) => o.value === mode)?.label}
            </span>
            <span
              className={clsx(
                "material-symbols-outlined text-on-surface-variant transition-transform duration-200",
                showThemePicker && "rotate-90"
              )}
            >
              chevron_right
            </span>
          </div>
        </button>

        {/* Theme picker */}
        {showThemePicker && (
          <div className="flex gap-2 px-4 pb-2 animate-in">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setMode(option.value)}
                className={clsx(
                  "flex-1 flex flex-col items-center gap-2 py-3 px-2 rounded-xl transition-all duration-200 border-2",
                  mode === option.value
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-surface-container border-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                )}
              >
                <span className={clsx("material-symbols-outlined", mode === option.value && "fill-icon")}>
                  {option.icon}
                </span>
                <span className="text-label-md font-medium">{option.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Notificaciones */}
        <button className="flex items-center justify-between p-4 hover:bg-surface-variant rounded-xl transition-colors w-full">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">notifications</span>
            <span className="font-medium text-on-surface">Notificaciones</span>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
        </button>
      </section>

      <Button variant="outlined" color="error" onClick={handleLogout} className="mt-4" icon="logout">
        Cerrar Sesión
      </Button>
    </div>
  );
};
export default SettingsView;
