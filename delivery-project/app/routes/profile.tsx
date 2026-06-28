import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@siberiacancode/reactuse';
import { LogOutIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { withMask } from 'use-mask-input';
import { z } from 'zod';

import { useAuth } from '@/contexts';
import { usePatchApiUsersProfileMutation } from '@/generated/api';
import { Main } from '@/layout';
import { Form, FormInput } from '@/shared/form';
import { useAuthTokenLocalStorage, useUserLocalStorage } from '@/shared/localltorage';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { H2 } from '@/shared/ui/typography';

const profileSchema = z.object({
  lastname: z
    .string()
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(20, 'Фамилия слишком длинная'),
  firstname: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(20, 'Имя слишком длинное'),
  middlename: z.string().max(20, 'Отчество слишком длинное').optional().or(z.literal('')),
  email: z.email('Некорректный email'),
  city: z.string().min(2, 'Укажите город').max(100, 'Название города слишком длинное')
});

type ProfileFormFields = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user } = useAuth();
  const userStorage = useUserLocalStorage();
  const navigate = useNavigate();

  const isTablet = useMediaQuery('(max-width: 767px)');

  const patchProfileMutation = usePatchApiUsersProfileMutation();
  const tokenStorage = useAuthTokenLocalStorage();

  const form = useForm<ProfileFormFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      lastname: user?.lastname ?? '',
      firstname: user?.firstname ?? '',
      email: user?.email ?? '',
      middlename: user?.middlename ?? '',
      city: user?.city ?? ''
    }
  });

  const handleSubmitForm = (fields: ProfileFormFields) => {
    patchProfileMutation.mutate(
      { body: { profile: fields, phone: user!.phone } },
      {
        onSuccess: (response) => {
          userStorage.set(response.data.user);
          toast.success('Данные успешно обновлены!');
        },
        onError: () => {
          toast.error('Не удалось обновить данные');
        }
      }
    );
  };

  const handleExit = () => {
    navigate('/auth');
    tokenStorage.remove();
  };

  return (
    <Main className='pt-3'>
      {isTablet ? (
        <div className='flex items-center justify-between'>
          <H2>Профиль</H2>
          <Button className='bg-brand text-white' size='sm' onClick={handleExit}>
            Выйти
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <H2>Профиль</H2>
      )}
      <Form form={form} onSubmit={handleSubmitForm}>
        <div className='mt-8 flex grid-cols-2 flex-col gap-2 md:grid md:gap-4'>
          <FormInput label='Фамилия' name='lastname' placeholder='Диназавриков' />
          <FormInput
            disabled
            ref={withMask('+7 (999) 999-99-99')}
            label='Телефон'
            name='phone'
            placeholder='+7 (___) ___-__-__'
            value={user!.phone}
          />
          <FormInput label='Имя' name='firstname' placeholder='Динозаврик' />
          <FormInput label='Email' name='email' placeholder='ivanov@example.com' />
          <FormInput label='Отчество' name='middlename' placeholder='Динозаврикович' />
          <FormInput label='Город' name='city' placeholder='Москва' />
          <Button
            className='mt-8'
            disabled={patchProfileMutation.isPending}
            size='lg'
            type='submit'
          >
            {patchProfileMutation.isPending && <Spinner data-icon='inline-start' />}
            Обновить данные
          </Button>
        </div>
      </Form>
    </Main>
  );
};

export default Profile;
