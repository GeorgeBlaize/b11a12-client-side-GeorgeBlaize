import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

function MyAssignedTours() {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: tours = [], refetch } = useQuery({
    queryKey: ['assignedTours', user?.email, page],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings?tourGuideEmail=${user.email}&page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return res.data;
    },
  });

  const handleAccept = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/bookings/${id}`,
        { status: 'accepted' },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success('Tour accepted!');
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Are you sure you want to reject this tour?')) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/bookings/${id}`,
          { status: 'rejected' },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        toast.success('Tour rejected!');
        refetch();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold">My Assigned Tours</h2>
      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th className="border p-2">Package</th>
            <th className="border p-2">Tourist</th>
            <th className="border p-2">Tour Date</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id}>
              <td className="border p-2">{tour.packageName}</td>
              <td className="border p-2">{tour.touristName}</td>
              <td className="border p-2">{new Date(tour.tourDate).toLocaleDateString()}</td>
              <td className="border p-2">${tour.price}</td>
              <td className="border p-2">{tour.status}</td>
              <td className="border p-2">
                {tour.status === 'in-review' && (
                  <>
                    <button
                      onClick={() => handleAccept(tour._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(tour._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded ml-2"
                    >
                      Reject
                    </button>
                  </>
                )}
                {tour.status === 'pending' && (
                  <span>Waiting for payment</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default MyAssignedTours;