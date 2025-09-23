import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddPackage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tourType, setTourType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [tourPlan, setTourPlan] = useState(['']);

  
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls]);
  };

  
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  
  const handleTourPlanChange = (index, value) => {
    const newPlan = [...tourPlan];
    newPlan[index] = value;
    setTourPlan(newPlan);
  };

  
  const addTourPlanField = () => {
    setTourPlan([...tourPlan, '']);
  };

  
  const removeTourPlanField = (index) => {
    setTourPlan((prev) => prev.filter((_, i) => i !== index));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/packages`,
        {
          title,
          tourType,
          price: parseFloat(price),
          description,
          images,
          tourPlan,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success('Package added successfully!');
      navigate('/admin-dashboard');
    } catch (error) {
      toast.error('Failed to add package');
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-lg">
      <h2 className="text-3xl font-bold text-center">Add New Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tour Type</label>
          <input
            type="text"
            value={tourType}
            onChange={(e) => setTourType(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="5"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Images</label>
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
                <img
                  src={img}
                  alt={`Package ${idx}`}
                  className="w-full h-24 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">Tour Plan</label>
          {tourPlan.map((plan, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={plan}
                onChange={(e) => handleTourPlanChange(index, e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder={`Day ${index + 1} plan`}
                required
              />
              {tourPlan.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTourPlanField(index)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTourPlanField}
            className="bg-green-600 text-white px-4 py-2 rounded mt-2"
          >
            Add Tour Plan
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Add Package
        </button>
      </form>
    </div>
  );
}

export default AddPackage;