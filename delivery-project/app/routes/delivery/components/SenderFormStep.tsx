import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Form, FormInput } from '@/shared/form';
import { Button } from '@/shared/ui/button';

import { useDeliveryContext } from '../context';

const senderFormSchema = z.object({
  lastname: z
    .string()
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(50, 'Фамилия слишком длинная'),
  firstname: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя слишком длинное'),
  middlename: z
    .string()
    .min(2, 'Отчество должно содержать минимум 2 символа')
    .max(50, 'Отчество слишком длинное'),
  phone: z.string()
});

export type SenderFormFields = z.infer<typeof senderFormSchema>;

export const SenderFormStep = () => {
  const context = useDeliveryContext();
  const sender = context.selectedOption.sender ?? {};

  const form = useForm<SenderFormFields>({
    resolver: zodResolver(senderFormSchema),
    defaultValues: {
      lastname: sender.lastname ?? '',
      firstname: sender.firstname ?? '',
      middlename: sender.middlename ?? '',
      phone: sender.phone ?? ''
    }
  });

  const handleSubmitForm = (fields: SenderFormFields) => {
    context.setSelectedOption({ ...context.selectedOption, sender: fields });
    context.stepper.next();
  };

  return (
    <Form key='phone_form' className='w-full' form={form} onSubmit={handleSubmitForm}>
      <div className='flex flex-col gap-4 pr-4'>
        <FormInput label='Фамилия' name='lastname' placeholder='Диназавриков' />
        <FormInput label='Имя' name='firstname' placeholder='Динозаврик' />
        <FormInput label='Отчество' name='middlename' placeholder='Динозаврикович' />
        <FormInput label='Телефон' name='phone' placeholder='+7...' />
      </div>
      <div>
        <div className='mt-5 flex gap-2'>
          <Button className='flex-1' size='lg' variant='secondary' onClick={context.stepper.back}>
            Назад
          </Button>
          <Button className='flex-1' size='lg' type='submit'>
            Вперед
          </Button>
        </div>
      </div>
    </Form>
  );
};
