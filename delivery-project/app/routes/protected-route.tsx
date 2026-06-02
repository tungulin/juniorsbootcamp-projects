import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/contexts';

import { Header } from '../layout/header';

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
