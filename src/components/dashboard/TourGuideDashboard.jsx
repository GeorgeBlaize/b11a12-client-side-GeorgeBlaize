import { Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';

function TourGuideDashboard() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar role="tour-guide" />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default TourGuideDashboard;