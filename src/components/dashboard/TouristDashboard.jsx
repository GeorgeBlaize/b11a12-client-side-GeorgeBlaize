import { Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';

function TouristDashboard() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar role="tourist" />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default TouristDashboard;