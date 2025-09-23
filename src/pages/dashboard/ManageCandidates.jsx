import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function ManageCandidates() {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const limit = 10;

  
  const { data: candidates = [], refetch } = useQuery({
    queryKey: ['candidates', page],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/candidates?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return res.data;
    },
  });

  
  const handleApprove = async (candidate) => {
    if (window.confirm(`Are you sure you want to approve ${candidate.applicantName} as a tour guide?`)) {
      try {
       
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/users/${candidate.applicantEmail}`,
          { role: 'tour-guide' },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
      
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/candidates/${candidate._id}`,
          { status: 'approved' },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        toast.success(`${candidate.applicantName} approved as a tour guide!`);
        refetch();
      } catch (error) {
        toast.error('Failed to approve candidate');
      }
    }
  };

  
  const handleReject = async (candidateId) => {
    if (window.confirm('Are you sure you want to reject this candidate?')) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/candidates/${candidateId}`,
          { status: 'rejected' },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        toast.success('Candidate rejected successfully!');
        refetch();
      } catch (error) {
        toast.error('Failed to reject candidate');
      }
    }
  };

  
  const handleDelete = async (candidateId) => {
    if (window.confirm('Are you sure you want to delete this candidate application?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/candidates/${candidateId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        toast.success('Candidate application deleted successfully!');
        refetch();
      } catch (error) {
        toast.error('Failed to delete candidate');
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
        <h2 className="text-3xl font-bold text-center">Manage Tour Guide Candidates</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Applicant Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Reason</th>
                <th className="border p-2">CV Link</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate._id} className="hover:bg-gray-50">
                  <td className="border p-2">{candidate.applicantName}</td>
                  <td className="border p-2">{candidate.applicantEmail}</td>
                  <td className="border p-2">{candidate.title}</td>
                  <td className="border p-2">{candidate.reason.slice(0, 50)}...</td>
                  <td className="border p-2">
                    <a
                      href={candidate.cvLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View CV
                    </a>
                  </td>
                  <td className="border p-2">{candidate.status}</td>
                  <td className="border p-2 flex space-x-2">
                    {candidate.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApprove(candidate)}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(candidate._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDelete(candidate._id)}
                      className="bg-gray-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
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

export default ManageCandidates;