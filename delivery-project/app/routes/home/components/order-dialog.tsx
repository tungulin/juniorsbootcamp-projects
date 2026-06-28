import type { DeliveryOrder } from '@/generated/api';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';

const STATUS_MAP: Record<string, string> = {
  in_processing: 'В обработке',
  waiting_courier: 'Ожидание курьера',
  on_my_way: 'В пути',
  success: 'Доставлен',
  canceled: 'Отменен'
};

interface Props {
  open: boolean;
  order: DeliveryOrder;
  onOpenChange: (open: boolean) => void;
}

export const OrderDialog = (props: Props) => {
  const { order, open, onOpenChange } = props;

  if (!order) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Заказ #{order._id}</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-3 text-sm'>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Статус</span>
            <span>{STATUS_MAP[order.status as unknown as string] ?? order.status}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Тип доставки</span>
            <span>{order.option === 'EXPRESS' ? 'Экспресс' : 'Стандарт'}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Стоимость</span>
            <span>{order.price} ₽</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Плательщик</span>
            <span>{order.payer === 'SENDER' ? 'Отправитель' : 'Получатель'}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Откуда</span>
            <span>{order.senderPoint.name}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Куда</span>
            <span>{order.receiverPoint.name}</span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Отправитель</span>
            <span>
              {order.sender.lastname} {order.sender.firstname}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-muted-foreground'>Получатель</span>
            <span>
              {order.receiver.lastname} {order.receiver.firstname}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
