import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddStory() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/stories`,
        {
          title,
          content,
          images,
          authorEmail: user.email,
          authorId: user.uid,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success('Story added successfully!');
      navigate('/dashboard/manage-stories');
    } catch (error) {
      toast.error('Failed to add story');
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-lg">
      <h2 className="text-3xl font-bold">Add Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows="5"
            required
          ></textarea>
        </div>
        <div>
          <label>Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
          />
          <div className="grid grid-cols-3 gap-2 mt-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative">
                <img src={img} alt="Story" className="w-full h-24 object-cover rounded" />
                <button
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Story
        </button>
      </form>
    </div>
  );
}

export default AddStory;