import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StoryCard from '../components/common/StoryCard';

function Community() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: stories = [] } = useQuery({
    queryKey: ['allStories'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stories`);
      return res.data;
    },
  });

  const handleShare = (storyId) => {
    if (!user) {
      toast.error('Please login to share a story!');
      navigate('/login');
    } else {
      toast.success('Story shared successfully!');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center">Community Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {stories.map((story) => (
          <StoryCard key={story._id} story={story} onShare={handleShare} />
        ))}
      </div>
    </div>
  );
}

export default Community;