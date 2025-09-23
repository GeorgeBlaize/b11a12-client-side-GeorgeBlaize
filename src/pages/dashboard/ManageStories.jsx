import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import StoryCard from '../../components/common/StoryCard';

function ManageStories() {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: stories = [], refetch } = useQuery({
    queryKey: ['userStories', user?.email, page],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/stories?authorEmail=${user.email}&page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/stories/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        toast.success('Story deleted!');
        refetch();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold">Manage Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {stories.map((story) => (
          <div key={story._id} className="border rounded-lg shadow-md p-4">
            <StoryCard story={story} onShare={() => {}} />
            <div className="mt-2 flex space-x-2">
              {/* <Link
                to={`/dashboard/edit-story/${story._id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Edit
              </Link> */}
              <button
                onClick={() => handleDelete(story._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
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
    </div>
  );
}

export default ManageStories;