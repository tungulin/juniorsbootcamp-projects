import { Navigate, Outlet } from 'react-router';

import { Header } from '../layout/header';
import { useAuth } from '../shared/hooks/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate replace to='/auth' />;
  }

  return (
    <div className='relative min-h-screen'>
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
