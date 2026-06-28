import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { withMask } from 'use-mask-input';
import { z } from 'zod';

import { useAuth } from '@/contexts';
import { usePatchApiUsersProfileMutation } from '@/generated/api';
import { Main } from '@/layout';
import { PHONE_REGEX } from '@/shared/const';
import { Form, FormInput } from '@/shared/form';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { H2 } from '@/shared/ui/typography';

const profileSchema = z.object({
  lastname: z
    .string()
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(50, 'Фамилия слишком длинная'),
  firstname: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя слишком длинное'),
  middlename: z.string().max(50, 'Отчество слишком длинное').optional().or(z.literal('')),
  phone: z.string().regex(PHONE_REGEX, 'Введите телефон в формате +7 (999) 999-99-99'),
  email: z.email('Некорректный email'),
  city: z.string().min(2, 'Укажите город').max(100, 'Название города слишком длинное')
});

type ProfileFormFields = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user } = useAuth();

  const patchProfileMutation = usePatchApiUsersProfileMutation();

  const form = useForm<ProfileFormFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      lastname: user?.lastname ?? '',
      firstname: user?.firstname ?? '',
      email: user?.email ?? '',
      middlename: user?.middlename ?? '',
      phone: user?.phone ?? '',
      city: user?.city ?? ''
    }
  });

  const handleSubmitForm = (fields: ProfileFormFields) => {
    patchProfileMutation.mutate({ body: { profile: fields, phone: fields.phone } });
  };

  return (
    <Main>
      <H2>Профиль</H2>
      <Form form={form} onSubmit={handleSubmitForm}>
        <div className='mt-8 flex grid-cols-2 flex-col gap-2 md:grid md:gap-4'>
          <FormInput label='Фамилия' name='lastname' placeholder='Диназавриков' />
          <FormInput
            disabled
            ref={withMask('+7 (999) 999-99-99')}
            label='Телефон'
            name='phone'
            placeholder='+7 (___) ___-__-__'
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
