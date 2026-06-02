import { useMemo, useState } from 'react';

import type { DeliveryPoint } from '@/generated/api';

import { useGetApiDeliveryPointsQuery } from '@/generated/api';
import { EllipseIcon } from '@/shared/icons/EllipseIcon';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/shared/ui/combobox';
import { InputGroupAddon } from '@/shared/ui/input-group';
import { Small } from '@/shared/ui/typography';

const mapPointToComboboxItems = (points: DeliveryPoint[]) => points.map((point) => point.name);

interface Props {
  colorPoint?: string;
  label?: string;
  placeholder?: string;
}

export const CityCombobox = (props: Props) => {
  const { label, colorPoint, placeholder } = props;

  const getDeliveryPointsQuery = useGetApiDeliveryPointsQuery();
  const [value, setValue] = useState<string | null>('');

  const cities = getDeliveryPointsQuery.data?.data?.points ?? ([] as DeliveryPoint[]);

  const suggestedCities = useMemo(() => cities.slice(0, 3), [cities]);

  const handleClickSuggestedCity = (city: string) => setValue(city);

  return (
    <div>
      <Combobox
        disabled={getDeliveryPointsQuery.isError || getDeliveryPointsQuery.isLoading}
        items={mapPointToComboboxItems(cities)}
        onValueChange={setValue}
      >
        {label && <Small className='text-muted-foreground mb-3'>{label}</Small>}
        <ComboboxInput className='h-[48px] rounded-full' placeholder={placeholder} value={value!}>
          <InputGroupAddon>
            <EllipseIcon className='mr-1' color={colorPoint} />
          </InputGroupAddon>
        </ComboboxInput>
        {suggestedCities.length > 0 && (
          <button className='mt-3 flex cursor-pointer gap-3'>
            {suggestedCities.map((city) => (
              <Small
                key={city.id}
                className='text-muted-foreground underline'
                onClick={() => handleClickSuggestedCity(city.name)}
              >
                {city.name}
              </Small>
            ))}
          </button>
        )}
        <ComboboxContent alignOffset={-15}>
          <ComboboxEmpty>Такого города нету...</ComboboxEmpty>
          <ComboboxList>
            {(city) => (
              <ComboboxItem key={city} value={city}>
                {city}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
};
