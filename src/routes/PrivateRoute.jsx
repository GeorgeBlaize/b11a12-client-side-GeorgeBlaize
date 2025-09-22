import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function PrivateRoute({ element }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return element;
}

export default PrivateRoute;