import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { forgotPassword } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
    } catch (error) {
      toast.error('Failed to send reset email');
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-md">
      <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Send Reset Email
        </button>
      </form>
      <p className="text-center mt-4">
        Back to <Link to="/login" className="text-blue-600">Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;