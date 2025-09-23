import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ bookingId, amount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings/create-payment-intent`,
        { amount: amount * 100 }, // Convert to cents
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/bookings/${bookingId}`,
          { status: 'confirmed', transactionId: result.paymentIntent.id },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        toast.success('Payment successful! Booking confirmed.');
        onSuccess();
      }
    } catch (error) {
      toast.error('Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <CardElement className="border p-2 rounded" />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2 disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
}

function MyBookings() {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ['bookings', user.email, page],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/bookings?email=${user.email}&page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        toast.success('Booking cancelled successfully!');
        refetch();
      } catch (error) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  return (
    <div className="container mx-auto py-8">
      {bookings.length > 3 && <Confetti />}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center">My Bookings</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Package</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="border p-2">{booking.packageName}</td>
                  <td className="border p-2">${booking.price}</td>
                  <td className="border p-2">{new Date(booking.tourDate).toLocaleDateString()}</td>
                  <td className="border p-2">{booking.status}</td>
                  <td className="border p-2 flex space-x-2">
                    {booking.status === 'pending' && (
                      <>
                        <Elements stripe={stripePromise}>
                          <CheckoutForm
                            bookingId={booking._id}
                            amount={booking.price}
                            onSuccess={refetch}
                          />
                        </Elements>
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    )}
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

export default MyBookings;