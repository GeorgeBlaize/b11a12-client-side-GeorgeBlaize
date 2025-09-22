import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function JoinTourGuide() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [cvLink, setCvLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/candidates`,
        {
          title,
          reason,
          cvLink,
          applicantEmail: user.email,
          applicantName: user.displayName,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success('Application submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit application');
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-lg">
      <h2 className="text-3xl font-bold">Apply to Become a Tour Guide</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label>Application Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Why do you want to be a Tour Guide?</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 border rounded"
            rows="5"
            required
          ></textarea>
        </div>
        <div>
          <label>CV Link</label>
          <input
            type="url"
            value={cvLink}
            onChange={(e) => setCvLink(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default JoinTourGuide;