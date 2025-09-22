import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key');

function PackageDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tourDate, setTourDate] = useState(new Date());
  const [tourGuide, setTourGuide] = useState('');

  const { data: pkg = {} } = useQuery({
    queryKey: ['package', id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/packages/${id}`);
      return res.data;
    },
  });

  const { data: tourGuides = [] } = useQuery({
    queryKey: ['tourGuides'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/tour-guides`);
      return res.data;
    },
  });

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to book a package!');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        {
          packageId: id,
          packageName: pkg.title,
          touristName: user.displayName,
          touristEmail: user.email,
          touristImage: user.photoURL,
          price: pkg.price,
          tourDate,
          tourGuide,
          status: 'pending',
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      toast.success('Booking confirmed! Check your bookings.', {
        onClick: () => navigate('/dashboard/my-bookings'),
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold">{pkg.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h3 className="text-xl font-bold">Gallery</h3>
          <div className="grid grid-cols-2 gap-2">
            {pkg.images?.map((img, idx) => (
              <img key={idx} src={img} alt="Gallery" className="w-full h-48 object-cover rounded" />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">About the Tour</h3>
          <p>{pkg.description}</p>
          <h3 className="text-xl font-bold mt-4">Tour Plan</h3>
          <ul className="list-disc ml-6">
            {pkg.tourPlan?.map((plan, idx) => (
              <li key={idx}>{plan}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold">Tour Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tourGuides.map((guide) => (
            <Link key={guide._id} to={`/tour-guide/${guide._id}`} className="border p-4 rounded">
              <img src={guide.photoURL} alt={guide.name} className="w-16 h-16 rounded-full mx-auto" />
              <p className="text-center">{guide.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold">Book Now</h3>
        <form onSubmit={handleBooking} className="space-y-4 max-w-lg">
          <div>
            <label>Package Name</label>
            <input type="text" value={pkg.title} readOnly className="w-full p-2 border rounded" />
          </div>
          <div>
            <label>Tourist Name</label>
            <input type="text" value={user?.displayName || ''} readOnly className="w-full p-2 border rounded" />
          </div>
          <div>
            <label>Tourist Email</label>
            <input type="email" value={user?.email || ''} readOnly className="w-full p-2 border rounded" />
          </div>
          <div>
            <label>Tourist Image</label>
            <input type="text" value={user?.photoURL || ''} readOnly className="w-full p-2 border rounded" />
          </div>
          <div>
            <label>Price</label>
            <input type="text" value={pkg.price} readOnly className="w-full p-2 border rounded" />
          </div>
          <div>
            <label>Tour Date</label>
            <DatePicker selected={tourDate} onChange={(date) => setTourDate(date)} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label>Tour Guide</label>
            <select
              value={tourGuide}
              onChange={(e) => setTourGuide(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a tour guide</option>
              {tourGuides.map((guide) => (
                <option key={guide._id} value={guide.name}>{guide.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default PackageDetails;