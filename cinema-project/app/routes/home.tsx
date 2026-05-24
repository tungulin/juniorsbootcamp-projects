import { useForm } from 'react-hook-form';

import { Form, FormInput } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { H3, P } from '@/components/ui/typography';

const Home = () => {
  const form = useForm();

  return (
    <div className='mx-auto grid max-w-[75rem] grid-cols-2 gap-4'>
      <div className='rounded-3xl border p-8'>
        <H3 className='mb-6'>Рассчитать доставку</H3>
        <div className=''>
          <Form className='flex flex-col gap-4' form={form}>
            <FormInput label='Город отправки' name='departure_city' />
            <FormInput label='Город назначения' name='destination city_city' />
            <FormInput label='Размер посылки' name='parcel_size' />
            <Button size='lg'>Рассчитать</Button>
          </Form>
        </div>
      </div>

      <div className='rounded-3xl border'>
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
};

export default Home;
