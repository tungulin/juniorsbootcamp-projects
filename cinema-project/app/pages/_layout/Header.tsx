import { LogOut } from 'lucide-react';

import { LogoIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { H4 } from '@/components/ui/typography';

export const Header = () => (
  <div className='mx-auto my-6 flex max-w-[75rem] items-center justify-between rounded-full border px-3 py-3'>
    <div className='flex gap-1'>
      <LogoIcon />
      <H4>Delivery</H4>
    </div>
    <div>
      <Button size='sm'>
        Выйти
        <LogOut />
      </Button>
    </div>
  </div>
);
