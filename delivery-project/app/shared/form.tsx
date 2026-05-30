import type { ComponentProps, FormHTMLAttributes, ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { Controller, FormProvider, useFormContext } from 'react-hook-form';

import { Field, FieldDescription, FieldLabel } from './ui/field';
import { Input } from './ui/input';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn;
}

export const Form = ({ form, ...other }: FormProps) => (
  <FormProvider {...form}>
    <form {...other} />
  </FormProvider>
);

interface FormInputProps extends ComponentProps<'input'> {
  description?: ReactNode;
  label?: ReactNode;
  name: string;
}

export const FormInput = ({ label, description, name, ...other }: FormInputProps) => {
  const form = useFormContext();

  return (
    <Controller
      render={({ field, fieldState }) => (
        <Field>
          {label && <FieldLabel data-invalid={fieldState.invalid}>{label}</FieldLabel>}
          <Input {...field} {...other} />
          {description && (
            <FieldDescription>Your API key is encrypted and stored securely.</FieldDescription>
          )}
        </Field>
      )}
      control={form.control}
      name={name}
      rules={{ required: true }}
    />
  );
};
