import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { path: '/', icon: 'dashboard', label: 'Inicio' },
  { path: '/tasks', icon: 'format_list_bulleted', label: 'Tareas' },
  { path: '/calendar', icon: 'calendar_month', label: 'Calendario' },
  { path: '/stats', icon: 'bar_chart', label: 'Logros' },
  { path: '/settings', icon: 'settings', label: 'Ajustes' },
];

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 w-full z-40 bg-surface/80 backdrop-blur-md border-t border-outline-variant/30 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              "flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
              isActive ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            {({ isActive }) => (
              <>
                <div className={clsx("w-12 h-8 flex items-center justify-center rounded-full transition-colors", isActive && "bg-surface-container-high")}>
                  <span className={clsx("material-symbols-outlined", isActive && "fill-icon")}>{item.icon}</span>
                </div>
                <span className="text-label-sm font-medium">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavBar;
