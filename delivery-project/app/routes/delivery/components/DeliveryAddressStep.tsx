import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Form, FormInput, FormTextarea } from '@/shared/form';
import { Button } from '@/shared/ui/button';

import { useDeliveryContext } from '../context';

const deliveryAddressFormSchema = z.object({
  street: z.string().min(2, 'Введите название улицы').max(30, 'Название улицы слишком длинное'),
  house: z.string().min(1, 'Введите номер дома').regex(/^\d+$/, 'Только цифры'),
  apartment: z.string().min(1, 'Введите номер квартиры').regex(/^\d+$/, 'Только цифры'),
  comment: z.string()
});

export type DeliveryAddressFormFields = z.infer<typeof deliveryAddressFormSchema>;

export const DeliveryAddressStep = () => {
  const context = useDeliveryContext();
  const senderAddress = context.deliveryOrder.senderAddress ?? {};

  const form = useForm<DeliveryAddressFormFields>({
    resolver: zodResolver(deliveryAddressFormSchema),
    defaultValues: {
      street: senderAddress.street ?? '',
      house: senderAddress.house ?? '',
      apartment: senderAddress.apartment ?? '',
      comment: senderAddress.comment ?? ''
    }
  });

  const handleSubmitForm = (fields: DeliveryAddressFormFields) => {
    context.setDeliveryOrder({ ...context.deliveryOrder, senderAddress: fields });
    context.stepper.next();
  };

  return (
    <Form key='phone_form' className='w-full' form={form} onSubmit={handleSubmitForm}>
      <div className='flex flex-col gap-4 pr-4'>
        <FormInput label='Улица' name='street' placeholder='Улица' />
        <FormInput inputMode='numeric' label='Дом' name='house' placeholder='Номер дома' />
        <FormInput
          inputMode='numeric'
          label='Квартира'
          name='apartment'
          placeholder='Номер квартиры'
        />
        <FormTextarea
          className='max-h-40'
          label='Заметка для курьера'
          maxLength={200}
          name='comment'
          placeholder='Комментарий для курьера'
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
