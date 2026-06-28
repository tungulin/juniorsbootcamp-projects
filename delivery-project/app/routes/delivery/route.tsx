import { useStep } from '@siberiacancode/reactuse';
import { HouseIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';

import { Main } from '@/layout';
import { formatAddress, formatFio } from '@/shared/lib/format';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/shared/ui/breadcrumb';
import { Progress } from '@/shared/ui/progress';
import { H3, Small } from '@/shared/ui/typography';

import type { DeliveryOrder } from './context';

import { DeliveryAddressStep } from './components/DeliveryAddressStep';
import { DeliveryPaymentStep } from './components/DeliveryPaymentStep';
import { DeliveryTypeStep } from './components/DeliveryTypeStep';
import { OrderReviewStep } from './components/OrderReviewStep';
import { PickupAddressStep } from './components/PickupAddressStep';
import { ReceiverFormStep } from './components/ReceiverFormStep';
import { SenderFormStep } from './components/SenderFormStep';
import { DeliveryProvider } from './context';

const STEPPERS = [
  { title: 'Тип доставки', node: DeliveryTypeStep },
  { title: 'Получатель', node: ReceiverFormStep },
  { title: 'Отправитель', node: SenderFormStep },
  { title: 'Откуда забрать', node: PickupAddressStep },
  { title: 'Куда доставить', node: DeliveryAddressStep },
  { title: 'Оплата доставки', node: DeliveryPaymentStep },
  { title: 'Проверка данных', node: OrderReviewStep }
] as const;

const Delivery = () => {
  const stepper = useStep(7);

  const [deliveryOrder, setDeliveryOrder] = useState<DeliveryOrder>({} as DeliveryOrder);

  const Step = STEPPERS[stepper.currentStep - 1].node;

  const { optionType, receiver, sender, senderAddress, receiverAddress, payer } = deliveryOrder;

  return (
    <DeliveryProvider value={{ stepper, deliveryOrder, setDeliveryOrder }}>
      <Main>
        <div className='mt-5'>
          <Breadcrumb className='mb-5'>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={
                    <Link to='/'>
                      <HouseIcon size={16} />
                    </Link>
                  }
                />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {Array.from({ length: stepper.currentStep }).map((_, index) => {
                const title = STEPPERS[index].title;
                return (
                  <Fragment key={title}>
                    <BreadcrumbItem onClick={() => stepper.set(index)}>{title}</BreadcrumbItem>
                    {stepper.counts !== index + 1 && <BreadcrumbSeparator />}
                  </Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
          <div className='grid h-full min-h-[600px] grid-cols-3 gap-4'>
            <div className='col-span-2 h-full'>
              <H3>{STEPPERS[stepper.currentStep - 1].title}</H3>
              <div className='my-5'>
                <Small>Шаг {stepper.currentStep} из 7</Small>
                <Progress className='mt-3' value={(stepper.currentStep / 7) * 100} />
              </div>
              {Step && <Step />}
            </div>
            {stepper.currentStep !== 7 && (
              <div className='bg-secondary flex-1 rounded-2xl p-6'>
                <H3 className='mb-4'>Ваш заказ</H3>
                <div className='flex flex-col gap-6'>
                  <div className='flex flex-col gap-2'>
                    <Small className='text-muted-foreground font-light'>Тип доставки</Small>
                    <Small className='font-light'>
                      {/* TODO: Fix backend type */}
                      {optionType === ('express' as any) ? 'Экспресс-доставка' : 'Обычная доставка'}
                    </Small>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Small className='text-muted-foreground font-light'>Получатель</Small>
                    <Small className='font-light'>{receiver ? formatFio(receiver) : '-'}</Small>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Small className='text-muted-foreground font-light'>Отправитель</Small>
                    <Small className='font-light'>{sender ? formatFio(sender) : '-'}</Small>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Small className='text-muted-foreground font-light'>Куда доставить</Small>
                    <Small className='font-light'>
                      {receiverAddress ? formatAddress(receiverAddress) : '-'}
                    </Small>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Small className='text-muted-foreground font-light'>Откуда забрать</Small>
                    <Small className='font-light'>
                      {senderAddress ? formatAddress(senderAddress) : '-'}
                    </Small>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <Small className='text-muted-foreground font-light'>
                      Кто оплачивает доставку
                    </Small>
                    <Small className='font-light'>
                      {payer ? (payer === 'receiver' ? 'Получатель' : 'Отправитель') : '-'}
                    </Small>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Main>
    </DeliveryProvider>
  );
};

export default Delivery;
