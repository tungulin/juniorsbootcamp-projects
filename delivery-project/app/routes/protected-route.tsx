import { useMount } from '@siberiacancode/reactuse';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useAuth } from '@/contexts';
import { Header } from '@/layout/header';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const [mounted, setMounted] = useState(false);

  useMount(() => setMounted(true));

  if (!mounted) return null;

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
