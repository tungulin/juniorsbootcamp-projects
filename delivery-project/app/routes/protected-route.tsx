import { Navigate, Outlet, useLocation } from 'react-router';

import { Header } from '../layout/header';

const ProtectedRoute = () => {
  //   const { isAuthenticated } = useAuth();
  const isAuthenticated = true;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate replace state={{ from: location }} to='/auth' />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
