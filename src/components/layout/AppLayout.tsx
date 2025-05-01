
import { Outlet } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import TopNav from './TopNav';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <TopNav />
      <main className="ml-64 pt-16 px-6 min-h-screen">
        <div className="py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
