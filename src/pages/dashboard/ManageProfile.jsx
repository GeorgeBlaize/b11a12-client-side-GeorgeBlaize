import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ManageProfile() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`,
        { name, photoURL },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-lg">
      <h2 className="text-3xl font-bold">Welcome, {user?.displayName}</h2>
      <div className="mt-4">
        <img src={user?.photoURL} alt="Profile" className="w-24 h-24 rounded-full mx-auto" />
        <p className="text-center mt-2">Role: {user?.role}</p>
        <p className="text-center">Email: {user?.email}</p>
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4 block mx-auto"
        >
          Edit Profile
        </button>
        {user?.role === 'tourist' && (
          <Link
            to="/dashboard/join-tour-guide"
            className="bg-green-600 text-white px-4 py-2 rounded mt-2 block mx-auto text-center"
          >
            Apply for Tour Guide
          </Link>
        )}
      </div>
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold">Edit Profile</h3>
            <div className="mt-4">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mt-4">
              <label>Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mt-4 flex space-x-4">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ManageProfile;