import { LogOut, Moon, Sun } from 'lucide-react';

import { useTheme } from '@/contexts/theme-provider';
import { LogoIcon } from '@/shared/icons';
import { Button } from '@/shared/ui/button';
import { H4 } from '@/shared/ui/typography';

export const Header = () => {
  const theme = useTheme();

  const handleChangeMode = () => theme.set(theme.value === 'dark' ? 'light' : 'dark');

  return (
    <div className='mx-auto my-6 flex max-w-[75rem] items-center justify-between rounded-full border px-3 py-3'>
      <div className='flex gap-1'>
        <LogoIcon />
        <H4>Delivery</H4>
      </div>
      <div className='flex items-center gap-3'>
        <Button size='icon' variant='outline' onClick={handleChangeMode}>
          {theme.value === 'dark' ? <Sun /> : <Moon />}
        </Button>
        <Button size='sm'>
          Выйти
          <LogOut />
        </Button>
      </div>
    </div>
  );
};
