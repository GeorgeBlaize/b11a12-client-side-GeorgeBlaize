import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import StoryCard from '../components/common/StoryCard';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function TourGuideProfile() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: guide = {} } = useQuery({
    queryKey: ['tourGuide', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tour-guides/${id}`);
      return res.data;
    },
  });

  const { data: stories = [] } = useQuery({
    queryKey: ['tourGuideStories', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stories?authorId=${id}`);
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
      <h2 className="text-3xl font-bold text-center">{guide.name}</h2>
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="md:w-1/3">
          <img src={guide.photoURL} alt={guide.name} className="w-48 h-48 rounded-full mx-auto" />
          <p className="text-center mt-4">{guide.bio}</p>
        </div>
        <div className="md:w-2/3">
          <h3 className="text-xl font-bold">Stories by {guide.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {stories.map((story) => (
              <StoryCard key={story._id} story={story} onShare={handleShare} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourGuideProfile;