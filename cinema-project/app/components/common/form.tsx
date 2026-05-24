import type { FormHTMLAttributes, ReactNode } from 'react';
import type { ControllerProps, UseFormReturn } from 'react-hook-form';

import { Controller, FormProvider, useFormContext } from 'react-hook-form';

import { Field, FieldDescription, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  form: UseFormReturn;
}

export const Form = ({ form, ...other }: FormProps) => (
  <FormProvider {...form}>
    <form {...other} />
  </FormProvider>
);

interface FormInputProps extends Omit<ControllerProps, 'render'> {
  description?: ReactNode;
  label?: ReactNode;
}

export const FormInput = ({ label, description, ...other }: FormInputProps) => {
  const form = useFormContext();

  return (
    <Controller
      {...other}
      render={({ field, fieldState }) => (
        <Field>
          {label && <FieldLabel data-invalid={fieldState.invalid}>{label}</FieldLabel>}
          <Input {...field} />
          {description && (
            <FieldDescription>Your API key is encrypted and stored securely.</FieldDescription>
          )}
        </Field>
      )}
      control={form.control}
      rules={{ required: true }}
    />
  );
};
