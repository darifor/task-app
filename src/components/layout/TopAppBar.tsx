import { useAuthStore } from '../../store/useAuthStore';

const TopAppBar = () => {
  const { user } = useAuthStore();
  
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
      <div className="flex items-center justify-between px-4 h-16 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary text-on-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-sm">task_alt</span>
          </div>
          <span className="font-headline-sm text-on-surface">Lumina</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-variant transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-outline-variant" />
          ) : (
            <div className="w-8 h-8 bg-surface-variant rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant">person</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
