import type { UseStepReturn } from '@siberiacancode/reactuse';

import type { DeliveryOption, DeliveryPackageType, DeliveryPoint } from '@/generated/api';

import { createBareContext } from '@/shared/lib/createBareContext';

import type { ReceiverFormFields } from './components/ReceiverFormStep';
import type { SenderFormFields } from './components/SenderFormStep';

export interface SelectedDeliveryOptions {
  delivery?: DeliveryOption;
  receiver: ReceiverFormFields;
  receiverPoint: DeliveryPoint;
  sender: SenderFormFields;
  senderPoint: DeliveryPoint;

  size: DeliveryPackageType;
}

interface Params {
  selectedOption: SelectedDeliveryOptions;
  stepper: UseStepReturn;
  setSelectedOption: (options: SelectedDeliveryOptions) => void;
}

export const [DeliveryProvider, useDeliveryContext] = createBareContext<Params>();
