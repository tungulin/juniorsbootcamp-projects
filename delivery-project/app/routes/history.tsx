import { useQueryClient } from '@tanstack/react-query';
import { RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';

import {
  getApiDeliveryOrdersQueryKey,
  useGetApiDeliveryOrdersQuery,
  usePutApiDeliveryOrdersCancelMutation
} from '@/generated/api';
import { Main } from '@/layout';
import { formatAddress } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { H4, Large, Small } from '@/shared/ui/typography';

const STATUS_MAPA: Record<string, string> = {
  in_processing: 'В процессе',
  waiting_courier: 'Ожидание курьера',
  success: 'Доставлен',
  on_my_way: 'В пути',
  canceled: 'Отменен'
};

const History = () => {
  const deliveryOrderQuery = useGetApiDeliveryOrdersQuery();
  const cancelDeliveryMutation = usePutApiDeliveryOrdersCancelMutation();
  const queryClient = useQueryClient();

  const orders = deliveryOrderQuery.data?.data?.orders ?? [];

  const handleCancelDelivery = (orderId: string) =>
    cancelDeliveryMutation.mutate(
      {
        body: {
          orderId
        }
      },
      {
        onSuccess: () => {
          toast.success('Заказ отменен!');
          queryClient.invalidateQueries({ queryKey: [getApiDeliveryOrdersQueryKey] });
        },
        onError: () => toast.error('Не удалось отменить заказ')
      }
    );

  if (deliveryOrderQuery.isLoading) {
    return (
      <Main>
        <H4 className='mt-5'>История отправлений</H4>
        <div className='flex flex-col items-center justify-center'>
          <img alt='loading' className='mt-20 w-50' src='/deliver-calc.png' />
          <Large>Загружает вашу историю...</Large>
        </div>
      </Main>
    );
  }

  if (deliveryOrderQuery.isError) {
    return (
      <Main>
        <div className='w-full'>
          <H4 className='mt-5'>История отправлений</H4>
          <div className='flex flex-col items-center justify-center gap-5'>
            <img alt='error' className='mt-20 w-50' src='/error-feedback.png' />
            <Large>Не удалось отобразить историю</Large>
            <Button onClick={() => window.location.reload()}>
              <RefreshCwIcon size={20} />
              Обновить страницу
            </Button>
          </div>
        </div>
      </Main>
    );
  }

  return (
    <Main>
      <H4 className='mt-5'>История отправлений</H4>
      <div className='mt-6'>
        {orders.map((order) => (
          <div key={order._id} className='h-[60px]'>
            <div className='grid h-full grid-cols-8 items-center'>
              <Small className='col-span-1'>{STATUS_MAPA[order.status] ?? order.status}</Small>
              <Small className='col-span-3'>{formatAddress(order.receiverAddress)}</Small>
              <Small className='col-span-3'>{order._id}</Small>
              <div className='col-span-1'>
                {/* TODO: Fix type backend */}
                {order.status !== ('canceled' as any) && (
                  <Button variant='outline' onClick={() => handleCancelDelivery(order._id)}>
                    Отменить
                  </Button>
                )}
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </Main>
  );
};

export default History;
