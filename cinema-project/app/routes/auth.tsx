import { useBoolean, useTimer } from '@siberiacancode/reactuse';
import { formatDate } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { withMask } from 'use-mask-input';

import { Form, FormInput } from '@/shared/form';
import { LogoIcon } from '@/shared/icons';
import { useAuthTokenLocalStorage, useUserLocalStorage } from '@/shared/localltorage';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { H2, H3, P } from '@/shared/ui/typography';

import { usePostApiAuthOtpMutation, usePostApiUsersSigninMutation } from '../../generated/api';

const Auth = () => {
  const [isSendingPhone, togglIsSendingPhone] = useBoolean(true);
  const navigate = useNavigate();

  const formPhone = useForm();
  const formOtpCode = useForm();

  const otpTimer = useTimer(120, { immediately: false });

  const authOtp = usePostApiAuthOtpMutation();
  const signInUser = usePostApiUsersSigninMutation();

  const authTokenStorage = useAuthTokenLocalStorage();
  const userTokenStorage = useUserLocalStorage();

  const handleSubmitPhone = formPhone.handleSubmit((data) => {
    const phone = data.phone.replace(/\D/g, '');

    authOtp.mutate(
      { body: { phone } },
      {
        onSuccess: () => {
          togglIsSendingPhone();
          otpTimer.start();
        },
        onError: () => toast.error('Не удалось получить otp код')
      }
    );
  });

  const handleSubmitOtpCode = formOtpCode.handleSubmit((data) => {
    const phone = formPhone.getValues().phone.replace(/\D/g, '');
    signInUser.mutate(
      { body: { phone, code: data.code } },
      {
        onSuccess: (resp) => {
          authTokenStorage.set(resp.data.token);
          userTokenStorage.set(resp.data.user);
          navigate('/');
        },
        onError: () => toast.error('Не удалось авторизоваться')
      }
    );
  });

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='flex w-[380px] flex-col items-center justify-center'>
        <div className='mb-12 flex items-center justify-center gap-1'>
          <LogoIcon />
          <H3>DELIVARY</H3>
        </div>
        {isSendingPhone ? (
          <>
            <H2>Авторизация</H2>
            <P className='mb-6'>Введите номер телефона для входа в свой профиль</P>
            <Form key='phone_form' className='w-full' form={formPhone} onSubmit={handleSubmitPhone}>
              <FormInput
                ref={withMask('+7 (999) 999-99-99')}
                className='min-w-full'
                label='Телефон'
                name='phone'
                placeholder='+7 (___) ___-__-__'
              />
              <Button className='mt-8 w-full' disabled={authOtp.isPending} size='lg' type='submit'>
                {authOtp.isPending && <Spinner data-icon='inline-start' />}
                Войти
              </Button>
            </Form>
          </>
        ) : (
          <>
            <div className='flex w-full items-center justify-between'>
              <ChevronLeft className='cursor-pointer' onClick={() => togglIsSendingPhone()} />
              <H2>Проверочный код</H2>
              <div />
            </div>
            <P className='mb-6'>На указанный вами номер был отправлен проверочный код</P>
            <Form
              key='code_form'
              className='w-full'
              form={formOtpCode}
              onSubmit={handleSubmitOtpCode}
            >
              <FormInput key='code' className='min-w-full' label='Проверочный код' name='code' />
              <div className='mt-8 flex flex-col gap-4'>
                <Button className='w-full' disabled={signInUser.isPending} size='lg' type='submit'>
                  {signInUser.isPending && <Spinner data-icon='inline-start' />}
                  Войти
                </Button>
                <Button
                  className='w-full'
                  disabled={otpTimer.active}
                  size='lg'
                  type='submit'
                  variant='outline'
                >
                  <div className='flex w-full justify-between'>
                    <div />
                    <div>Отправить код повторно</div>
                    <div>
                      {otpTimer.active && formatDate(new Date(otpTimer.count * 1000), 'mm:ss')}
                    </div>
                  </div>
                </Button>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
