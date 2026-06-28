import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';

import { Form, FormInput, FormTextarea } from '@/shared/form';
import { Button } from '@/shared/ui/button';

import { useDeliveryContext } from '../context';

const receiveAddressFormSchema = z.object({
  street: z.string().min(2, 'Введите название улицы').max(50, 'Название улицы слишком длинное'),
  house: z.string().min(1, 'Введите номер дома').max(10, 'Номер дома слишком длинный'),
  apartment: z.string().min(1, 'Введите номер квартиры').max(10, 'Номер квартиры слишком длинный'),
  comment: z.string()
});

type ReceiveAddressFormFields = z.infer<typeof receiveAddressFormSchema>;

export const PickupAddressStep = () => {
  const context = useDeliveryContext();
  const receiverAddress = context.deliveryOrder.receiverAddress ?? {};

  const form = useForm<ReceiveAddressFormFields>({
    resolver: zodResolver(receiveAddressFormSchema),
    defaultValues: {
      street: receiverAddress.street ?? '',
      house: receiverAddress.house ?? '',
      apartment: receiverAddress.apartment ?? '',
      comment: receiverAddress.comment ?? ''
    }
  });

  const handleSubmitForm = (fields: ReceiveAddressFormFields) => {
    context.setDeliveryOrder({ ...context.deliveryOrder, receiverAddress: fields });
    context.stepper.next();
  };

  return (
    <Form key='phone_form' className='w-full' form={form} onSubmit={handleSubmitForm}>
      <div className='flex flex-col gap-4 pr-4'>
        <FormInput label='Улица' name='street' placeholder='Улица' />
        <FormInput label='Дом' name='house' placeholder='Номер дома' />
        <FormInput label='Квартира' name='apartment' placeholder='Номер квартиры' />
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
