import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function ManageUsers() {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const limit = 10;

  
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users', page],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return res.data;
    },
  });

  
  const handleUpdateRole = async (email, newRole) => {
    if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/${email}`,
          { role: newRole },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        toast.success('User role updated successfully!');
        refetch();
      } catch (error) {
        toast.error('Failed to update user role');
      }
    }
  };

 
  const handleDelete = async (email) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/users/${email}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        toast.success('User deleted successfully!');
        refetch();
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center">Manage Users</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userData) => (
                <tr key={userData.email} className="hover:bg-gray-50">
                  <td className="border p-2">{userData.name}</td>
                  <td className="border p-2">{userData.email}</td>
                  <td className="border p-2">{userData.role}</td>
                  <td className="border p-2 flex space-x-2">
                    {userData.role !== 'admin' && (
                      <>
                        <button
                          onClick={() => handleUpdateRole(userData.email, userData.role === 'tourist' ? 'tour-guide' : 'tourist')}
                          className="bg-blue-600 text-white px-3 py-1 rounded"
                        >
                          Make {userData.role === 'tourist' ? 'Tour Guide' : 'Tourist'}
                        </button>
                        <button
                          onClick={() => handleDelete(userData.email)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ManageUsers;