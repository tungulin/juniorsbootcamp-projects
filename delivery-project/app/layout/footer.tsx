import { GitHubIcon } from '@/shared/icons';
import { Muted } from '@/shared/ui/typography';

export const Footer = () => (
  <div className='col-span-2 flex items-center justify-between rounded-3xl border px-4 py-4'>
    <Muted>@Your Delivery</Muted>
    <a
      className='flex items-center gap-2'
      href='https://github.com/tungulin/juniorsbootcamp-projects'
      target='_blank'
    >
      <GitHubIcon height={20} width={20} />
      <Muted>Project</Muted>
    </a>
  </div>
);
