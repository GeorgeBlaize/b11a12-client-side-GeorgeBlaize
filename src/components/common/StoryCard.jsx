import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FacebookShareButton } from 'react-share';
import { toast } from 'react-toastify';

function StoryCard({ story, onShare }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShare = () => {
    if (!user) {
      toast.error('Please login to share a story!');
      navigate('/login');
    } else {
      onShare(story._id);
    }
  };

  return (
    <div className="border rounded-lg shadow-md p-4">
      <img src={story.images[0]} alt={story.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{story.title}</h3>
      <p className="text-gray-600">{story.content.slice(0, 100)}...</p>
      <div className="mt-2">
        <FacebookShareButton url={`http://your-site.com/story/${story._id}`} quote={story.title}>
          <button
            onClick={handleShare}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Share
          </button>
        </FacebookShareButton>
      </div>
    </div>
  );
}

export default StoryCard;