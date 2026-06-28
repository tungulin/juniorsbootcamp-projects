import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';
import { Small } from '@/shared/ui/typography';

import { useDeliveryContext } from '../context';

export const DeliveryPaymentStep = () => {
  const context = useDeliveryContext();
  const [payer, setPayer] = useState(context.deliveryOrder.payer ?? 'sender');

  const handleClickNext = () => {
    //TODO: Fix backend type
    context.setDeliveryOrder({ ...context.deliveryOrder, payer: payer as any });
    context.stepper.next();
  };

  return (
    <div className='flex h-full flex-col'>
      <Small className='mb-6'>Кто оплачивает доставку</Small>
      <RadioGroup
        className='flex w-fit flex-col gap-5'
        defaultValue={payer}
        onValueChange={setPayer}
      >
        <div className='flex items-center gap-3'>
          <RadioGroupItem id='r1' value='receiver' />
          <Label htmlFor='r1'>Получатель</Label>
        </div>
        <div className='flex items-center gap-3'>
          <RadioGroupItem id='r2' value='sender' />
          <Label htmlFor='r2'>Отправитель</Label>
        </div>
      </RadioGroup>
      <div className='mt-20 flex gap-2'>
        <Button className='flex-1' size='lg' variant='secondary' onClick={context.stepper.back}>
          Назад
        </Button>
        <Button className='flex-1' size='lg' onClick={handleClickNext}>
          Вперед
        </Button>
      </div>
    </div>
  );
};
