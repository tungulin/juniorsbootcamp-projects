import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { withMask } from 'use-mask-input';
import z from 'zod';

import { PHONE_REGEX, SINGLE_WORD_REGEX } from '@/shared/const';
import { Form, FormInput } from '@/shared/form';
import { Button } from '@/shared/ui/button';

import { useDeliveryContext } from '../context';

const senderFormSchema = z.object({
  lastname: z
    .string()
    .min(2, 'Фамилия должна содержать минимум 2 символа')
    .max(20, 'Фамилия слишком длинная')
    .regex(SINGLE_WORD_REGEX, 'Должно быть одним словом без пробелов'),
  firstname: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(20, 'Имя слишком длинное')
    .regex(SINGLE_WORD_REGEX, 'Должно быть одним словом без пробелов'),
  middlename: z
    .string()
    .min(2, 'Отчество должно содержать минимум 2 символа')
    .max(20, 'Отчество слишком длинное')
    .regex(SINGLE_WORD_REGEX, 'Должно быть одним словом без пробелов'),
  phone: z.string().regex(PHONE_REGEX, 'Введите телефон в формате +7 (999) 999-99-99')
});

export type SenderFormFields = z.infer<typeof senderFormSchema>;

export const SenderFormStep = () => {
  const context = useDeliveryContext();
  const sender = context.deliveryOrder.sender ?? {};

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
    const phone = fields.phone.replace(/\D/g, '');
    context.setDeliveryOrder({ ...context.deliveryOrder, sender: { ...fields, phone } });
    context.stepper.next();
  };

  return (
    <Form key='phone_form' className='w-full' form={form} onSubmit={handleSubmitForm}>
      <div className='flex flex-col gap-4 pr-4'>
        <FormInput label='Фамилия' name='lastname' placeholder='Диназавриков' />
        <FormInput label='Имя' name='firstname' placeholder='Динозаврик' />
        <FormInput label='Отчество' name='middlename' placeholder='Динозаврикович' />
        <FormInput
          ref={withMask('+7 (999) 999-99-99')}
          label='Телефон'
          name='phone'
          placeholder='+7 (___) ___-__-__'
        />
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
