import { Outlet } from 'react-router-dom';
import TopAppBar from './TopAppBar';
import BottomNavBar from './BottomNavBar';
import SideNavBar from './SideNavBar';
import { TaskFormModal } from '../tasks/TaskFormModal';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Desktop sidebar */}
      <SideNavBar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* TopAppBar only on mobile */}
        <div className="md:hidden">
          <TopAppBar />
        </div>

        <main className="flex-1 overflow-y-auto pb-24 md:pb-8 pt-4 px-4 @container">
          <div className="max-w-4xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* BottomNavBar only on mobile */}
        <div className="md:hidden">
          <BottomNavBar />
        </div>
      </div>

      <TaskFormModal />
    </div>
  );
};

export default MainLayout;
