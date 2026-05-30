import clsx from 'clsx';
import { CalculatorIcon, HistoryIcon, LogOutIcon, MoonIcon, SunIcon, UserIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

import { useTheme } from '@/contexts/theme-provider';
import { LogoIcon } from '@/shared/icons';
import { Button } from '@/shared/ui/button';
import { H4 } from '@/shared/ui/typography';

export const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeMode = () => theme.set(theme.value === 'dark' ? 'light' : 'dark');
  const handleNavigateToProfile = () => navigate('/profile');
  const handleNavigateToHome = () => navigate('/');
  const handleNavigateToHistory = () => navigate('/history');

  return (
    <>
      <div className='mx-5 my-6 hidden items-center justify-between rounded-full border p-3 md:flex lg:max-w-[75rem] xl:mx-auto'>
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

      <div className='fixed right-4 bottom-4 left-4 z-10 h-[58px] rounded-full border md:hidden'>
        <div className='bg-background grid h-full grid-cols-3 rounded-full p-1'>
          <Button
            className={clsx(location.pathname === '/' && 'bg-brand text-white', 'h-full w-full')}
            variant='ghost'
            onClick={handleNavigateToHome}
          >
            <CalculatorIcon />
            Расчёт
          </Button>
          <Button
            className={clsx(
              location.pathname === '/history' && 'bg-brand text-white',
              'h-full w-full'
            )}
            variant='ghost'
            onClick={handleNavigateToHistory}
          >
            <HistoryIcon />
            История
          </Button>
          <Button
            className={clsx(
              location.pathname === '/profile' && 'bg-brand text-white',
              'h-full w-full'
            )}
            variant='ghost'
            onClick={handleNavigateToProfile}
          >
            <UserIcon />
            Профиль
          </Button>
        </div>
      </div>
    </>
  );
};
