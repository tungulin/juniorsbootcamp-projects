import { useForm } from 'react-hook-form';
import { withMask } from 'use-mask-input';

import { Form, FormInput } from '@/components/common';
import { LogoIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { H2, H3, P } from '@/components/ui/typography';

import { usePostApiAuthOtpMutation } from '../../generated/api';

const Auth = () => {
  const form = useForm();

  const authOtp = usePostApiAuthOtpMutation();

  const handleSubmit = form.handleSubmit((data) => {
    const phone = data.phone.replace(/\D/g, '');

    authOtp.mutate({ body: { phone } }, { onSuccess: () => {}, onError: () => {} });
  });

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='flex w-[380px] flex-col items-center justify-center'>
        <div className='mb-12 flex items-center justify-center gap-1'>
          <LogoIcon />
          <H3>DELIVARY</H3>
        </div>
        <H2>Авторизация</H2>
        <P className='mb-6'>Введите номер телефона для входа в свой профиль</P>
        <Form className='w-full' form={form} onSubmit={handleSubmit}>
          <FormInput
            ref={withMask('+7 (999) 999-99-99')}
            className='min-w-full'
            label='Телефон'
            name='phone'
            placeholder='+7 (___) ___-__-__'
          />
          <Button className='mt-14 w-full' size='lg' type='submit'>
            Войти
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Auth;
