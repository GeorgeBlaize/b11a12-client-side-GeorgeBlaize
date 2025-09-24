import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Sidebar({ role }) {
  const { user } = useContext(AuthContext);

  const touristLinks = [
    { name: 'Manage Profile', path: '/dashboard/manage-profile' },
    { name: 'My Bookings', path: '/dashboard/my-bookings' },
    { name: 'Manage Stories', path: '/dashboard/manage-stories' },
    { name: 'Add Story', path: '/dashboard/add-story' },
    { name: 'Join as Tour Guide', path: '/dashboard/join-tour-guide' },
  ];

  const tourGuideLinks = [
    { name: 'Manage Profile', path: '/tour-guide-dashboard/manage-profile' },
    { name: 'My Assigned Tours', path: '/tour-guide-dashboard/my-assigned-tours' },
    { name: 'Manage Stories', path: '/tour-guide-dashboard/manage-stories' },
    { name: 'Add Story', path: '/tour-guide-dashboard/add-story' },
  ];

  const adminLinks = [
    { name: 'Manage Profile', path: '/admin-dashboard/manage-profile' },
    { name: 'My Assigned Tours', path: '/admin-dashboard/my-assigned-tours' },
    { name: 'Manage Stories', path: '/admin-dashboard/manage-stories' },
    { name: 'Add Story', path: '/admin-dashboard/add-story' },
    { name: 'Add Package', path: '/admin-dashboard/add-package' },
    { name: 'Manage Users', path: '/admin-dashboard/manage-users' },
    { name: 'Manage Candidates', path: '/admin-dashboard/manage-candidates' },
  ];

  const links = role === 'admin' ? adminLinks : role === 'tour-guide' ? tourGuideLinks : touristLinks;

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4 md:block hidden">
      <div className="mb-8">
        <img src="https://i.ibb.co.com/RGWQD2yp/logo.png" alt="Logo" className="h-12" />
      </div>
      <ul>
        {links.map((link) => (
          <li key={link.name} className="mb-2">
            <Link to={link.path} className="hover:bg-gray-700 p-2 rounded block">{link.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;