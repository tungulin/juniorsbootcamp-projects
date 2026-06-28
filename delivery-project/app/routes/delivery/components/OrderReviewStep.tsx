import { useDisclosure } from '@siberiacancode/reactuse';
import { toast } from 'sonner';

import { usePostApiDeliveryOrderMutation } from '@/generated/api';
import { formatAddress, formatFio } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/shared/ui/dialog';
import { H2, H3, Small } from '@/shared/ui/typography';

import { useDeliveryContext } from '../context';

export const OrderReviewStep = () => {
  const context = useDeliveryContext();
  const deliveryOrderMutation = usePostApiDeliveryOrderMutation();

  const {
    packageId,
    payer,
    price,
    optionType,
    senderAddress,
    senderPointId,
    receiverPointId,
    receiverAddress,
    sender,
    receiver
  } = context.deliveryOrder;

  const successDisclosure = useDisclosure();

  const handleCreateDelivery = () => {
    deliveryOrderMutation.mutate(
      {
        body: {
          packageId,
          optionType: optionType as any,
          payer: payer as any,
          receiver,
          receiverAddress,
          receiverPointId,
          sender,
          senderAddress,
          senderPointId
        }
      },
      {
        onSuccess: () => successDisclosure.open(),
        onError: () => toast.error('Не удалось создать заявку')
      }
    );
  };

  return (
    <>
      <div>
        <H3 className='mt-6'>Ваш заказ</H3>
        <div className='mt-8 grid grid-cols-2 gap-8'>
          <div className='col-span-1 flex flex-col gap-2'>
            <Small className='text-muted-foreground font-light'>Тип доставки</Small>
            <Small className='font-light'>
              {/* TODO: Fix backend type */}
              {optionType === ('default' as any) ? 'Обычная доставка' : 'Экспресс доставка'}
            </Small>
          </div>
          <div className='col-span-1 flex flex-col gap-2'>
            <Small className='text-muted-foreground font-light'>Откуда забрать</Small>
            <Small className='font-light'>{formatAddress(receiverAddress)}</Small>
          </div>
          <div className='col-span-1 flex flex-col gap-2'>
            <Small className='text-muted-foreground font-light'>Получатель</Small>
            <Small className='font-light'>{formatFio(receiver)}</Small>
          </div>
          <div className='col-span-1 flex flex-col gap-2'>
            <Small className='text-muted-foreground font-light'>Куда доставить</Small>
            <Small className='font-light'>{formatAddress(senderAddress)}</Small>
          </div>
          <div className='col-span-1 flex flex-col gap-2'>
            <Small className='text-muted-foreground font-light'>Отправитель</Small>
            <Small className='font-light'>{formatFio(sender)}</Small>
          </div>
          <div className='col-span-1 flex flex-col gap-2'>
            <Small className='text-muted-foreground font-light'>Кто оплачивает доставку</Small>
            <Small className='font-light'>
              {payer === 'sender' ? 'Отправитель' : 'Получатель'}
            </Small>
          </div>
          <div className='col-span-1 flex flex-col gap-2'>
            <H2>Итого: {price}₽</H2>
          </div>
        </div>
        <div className='mt-10 flex gap-2'>
          <Button
            className='flex-1'
            disabled={deliveryOrderMutation.isPending}
            size='lg'
            variant='secondary'
            onClick={context.stepper.back}
          >
            Назад
          </Button>
          <Button
            className='flex-1'
            disabled={deliveryOrderMutation.isPending}
            size='lg'
            onClick={handleCreateDelivery}
          >
            Продолжить
          </Button>
        </div>
      </div>
      <Dialog open={successDisclosure.opened}>
        <DialogContent className='rounded-3xl sm:max-w-lg' showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Посылка уже в пути!</DialogTitle>
            <DialogDescription>
              Мы приняли заявку и скоро передадим её курьеру. Отслеживать статус доставки можно в
              разделе «Мои заказы».
            </DialogDescription>
          </DialogHeader>
          <img alt='success-feedback' className='mx-auto my-8 w-48' src='/success-feedback.png' />
          <div className='flex gap-2'>
            <Button className='flex-1' size='lg'>
              На главную
            </Button>
            <Button className='bg-brand flex-1' size='lg'>
              Статус заявки
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
