import { Navigate, Outlet } from 'react-router';

import { Header } from '../layout/header';
import { useAuth } from '../shared/hooks/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate replace to='/auth' />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
