import { useContext, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Menu, Transition, Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Disclosure as="nav" className="bg-blue-600">
      {({ open }) => (
        <>
          
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
            
              <Link to="/" className="flex items-center text-white text-xl font-bold">
                <img src="/logo.png" alt="Logo" className="h-8 mr-2" />
                Tourism Guide
              </Link>

              
              <div className="hidden md:flex space-x-6">
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
                  <Menu as="div" className="relative z-50">
                    <Menu.Button>
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="h-10 w-10 rounded-full border-2 border-white"
                      />
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                        <div className="p-3 border-b border-gray-200">
                          <p className="text-gray-700 font-medium">{user.displayName}</p>
                          <p className="text-gray-500 text-sm">{user.email}</p>
                        </div>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={
                                user.role === 'admin'
                                  ? '/admin-dashboard'
                                  : user.role === 'tour-guide'
                                  ? '/tour-guide-dashboard'
                                  : '/dashboard'
                              }
                              className={`block px-4 py-2 ${
                                active ? 'bg-blue-100' : ''
                              }`}
                            >
                              Dashboard
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`block w-full text-left px-4 py-2 ${
                                active ? 'bg-blue-100' : ''
                              }`}
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

              
              <div className="md:hidden">
                <Disclosure.Button className="text-white focus:outline-none">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          
          <Disclosure.Panel className="md:hidden bg-blue-700">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <Link to="/" className="block text-white hover:underline">
                Home
              </Link>
              <Link to="/community" className="block text-white hover:underline">
                Community
              </Link>
              <Link to="/about" className="block text-white hover:underline">
                About Us
              </Link>
              <Link to="/trips" className="block text-white hover:underline">
                Trips
              </Link>

              {!user ? (
                <>
                  <Link to="/login" className="block text-white hover:underline">
                    Login
                  </Link>
                  <Link to="/register" className="block text-white hover:underline">
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={
                      user.role === 'admin'
                        ? '/admin-dashboard'
                        : user.role === 'tour-guide'
                        ? '/tour-guide-dashboard'
                        : '/dashboard'
                    }
                    className="block text-white hover:underline"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-white hover:underline"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
