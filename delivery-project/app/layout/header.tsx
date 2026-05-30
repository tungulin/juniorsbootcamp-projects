import { LogOutIcon, MoonIcon, SunIcon, UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

import { useTheme } from '@/contexts/theme-provider';
import { LogoIcon } from '@/shared/icons';
import { Button } from '@/shared/ui/button';
import { H4 } from '@/shared/ui/typography';

export const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleChangeMode = () => theme.set(theme.value === 'dark' ? 'light' : 'dark');
  const handleNavigateToProfile = () => navigate('/profile');
  const handleNavigateToHome = () => navigate('/');

  return (
    <div className='mx-5 my-6 flex items-center justify-between rounded-full border p-3 lg:mx-auto lg:max-w-[75rem]'>
      <button className='flex cursor-pointer gap-1' tabIndex={0} onClick={handleNavigateToHome}>
        <LogoIcon />
        <H4>Delivery</H4>
      </button>
      <div className='flex items-center gap-3'>
        <Button size='icon' variant='secondary' onClick={handleNavigateToProfile}>
          <UserIcon />
        </Button>
        <Button size='icon' variant='secondary' onClick={handleChangeMode}>
          {theme.value === 'dark' ? <SunIcon /> : <MoonIcon />}
        </Button>
        <Button size='sm'>
          Выйти
          <LogOutIcon />
        </Button>
      </div>
    </div>
  );
};
