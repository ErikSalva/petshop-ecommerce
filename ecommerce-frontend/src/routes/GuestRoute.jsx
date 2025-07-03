import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';

const GuestRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return  <Outlet />;;
};

export default GuestRoute