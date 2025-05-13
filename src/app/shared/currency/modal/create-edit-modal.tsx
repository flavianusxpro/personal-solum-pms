'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Loader, Text, Textarea, Title } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';

import {
  CreateCurrencyInputForm,
  createCurrencySchema,
} from '@/validators/create-currency.schema';
import { addCurrencyAtom, Currency } from '@/store/currency';
import { useSetAtom } from 'jotai';

interface CreateEditSmsTemplateModalProps {
  data?: Currency;
  isView?: boolean;
}

export default function CreateEditRoleModal({
  data,
  isView,
}: CreateEditSmsTemplateModalProps) {
  const { closeModal } = useModal();
  const setAddCurrency = useSetAtom(addCurrencyAtom);

  const onSubmit: SubmitHandler<CreateCurrencyInputForm> = (formValues) => {
    console.log('🚀 ~ formValues:', formValues);
    if (data?.id) {
      return;
    }

    const newData = {
      ...formValues,
      id: Math.random().toString(36).substring(2, 15),
      symbol_native: '',
      rounding: 0,
      name_plural: '',
      decimal_digits: 0,
    };
    setAddCurrency(newData);

    toast.success('Currency created successfully');
    closeModal();
  };

  return (
    <Form<CreateCurrencyInputForm>
      validationSchema={createCurrencySchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {},
      }}
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">
                {isView ? 'View' : data ? 'Update' : 'Create'} Role
              </Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Input
              label="Currency Code"
              {...register('name')}
              placeholder="Currency Name"
              className="w-full"
              error={errors.name?.message}
              disabled={isView}
            />
            <Input
              label="Currency Name"
              {...register('name')}
              placeholder="Currency Name"
              className="w-full"
              error={errors.name?.message}
              disabled={isView}
            />
            <Input
              label="Currency Symbol"
              {...register('name')}
              placeholder="Currency Name"
              className="w-full"
              error={errors.name?.message}
              disabled={isView}
            />

            {isView ? null : (
              <FormFooter
                className="rounded-b-xl"
                altBtnText="Cancel"
                submitBtnText="Save"
                isSticky={false}
              />
            )}
          </div>
        );
      }}
    </Form>
  );
}
