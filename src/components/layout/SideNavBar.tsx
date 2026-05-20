import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { path: '/', icon: 'dashboard', label: 'Inicio' },
  { path: '/tasks', icon: 'format_list_bulleted', label: 'Tareas' },
  { path: '/calendar', icon: 'calendar_month', label: 'Calendario' },
  { path: '/stats', icon: 'bar_chart', label: 'Logros' },
  { path: '/settings', icon: 'settings', label: 'Ajustes' },
];

const SideNavBar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface-container-low border-r border-outline-variant/30 h-screen sticky top-0 z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-outline-variant/30">
        <div className="w-8 h-8 bg-primary text-on-primary rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-sm">task_alt</span>
        </div>
        <span className="font-headline-sm text-on-surface">Lumina</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
              isActive
                ? "bg-primary/10 text-primary font-semibold"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            )}
          >
            {({ isActive }) => (
              <>
                <span className={clsx(
                  "material-symbols-outlined text-[22px] transition-transform duration-200 group-hover:scale-110",
                  isActive && "fill-icon"
                )}>
                  {item.icon}
                </span>
                <span className="text-body-md">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default SideNavBar;
