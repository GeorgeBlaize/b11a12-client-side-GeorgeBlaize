import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Menu, Transition } from '@headlessui/react';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-8 inline mr-2" />
          Tourism Guide
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <Link to="/community" className="text-white hover:underline">Community</Link>
          <Link to="/about" className="text-white hover:underline">About Us</Link>
          <Link to="/trips" className="text-white hover:underline">Trips</Link>
          {!user ? (
            <>
              <Link to="/login" className="text-white hover:underline">Login</Link>
              <Link to="/register" className="text-white hover:underline">Register</Link>
            </>
          ) : (
            <Menu as="div" className="relative">
              <Menu.Button>
                <img src={user.photoURL} alt="Profile" className="h-10 w-10 rounded-full" />
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                  <div className="p-2">
                    <p className="text-gray-700">{user.displayName}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to={user.role === 'admin' ? '/admin-dashboard' : user.role === 'tour-guide' ? '/tour-guide-dashboard' : '/dashboard'}
                        className={`block px-4 py-2 ${active ? 'bg-blue-100' : ''}`}
                      >
                        Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          logout();
                          navigate('/');
                        }}
                        className={`block w-full text-left px-4 py-2 ${active ? 'bg-blue-100' : ''}`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;