import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { H3, P } from '@/shared/ui/typography';

import { CityCombobox } from './components/city-combobox';
import { PackageSizeCombobox } from './components/package-size-combobox';

const Home = () => (
  <div className='flex grid-cols-2 flex-col gap-4 px-5 md:grid lg:mx-auto lg:max-w-[75rem]'>
    <div className='rounded-3xl border p-8'>
      <H3 className='mb-6'>Рассчитать доставку</H3>
      <div className='flex grid-cols-2 flex-col gap-10'>
        <CityCombobox
          colorPoint='green'
          label='Город отправки'
          placeholder='Укажи город отправления'
        />
        <CityCombobox label='Город назначения' placeholder='Укажи город назначения' />
        <PackageSizeCombobox />
      </div>
    </div>

    <div className='hidden rounded-3xl border md:block'>
      <img alt='' className='rounded-3xl' src='/home-deliver.png' />
    </div>

    <div className='relative h-[10rem] rounded-3xl border bg-[#6AC66A] p-8'>
      <H3 className='text-white'>Бесплатная доставка</H3>
      <P className='font-normal text-white'>за приведенного друга</P>
      <img alt='' className='absolute top-0 right-0' src='/home-handshake.png' />
    </div>

    <div className='h-[10rem] rounded-3xl border p-8'>
      <H3 className='mb-6'>Отследить поссылку</H3>
      <div className='flex items-center gap-2'>
        <Input placeholder='Номер заказа' />
        <Button className='w-[5rem]' size='lg'>
          Найти
        </Button>
      </div>
    </div>
  </div>
);

export default Home;
