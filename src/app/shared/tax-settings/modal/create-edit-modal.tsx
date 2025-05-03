'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import {
  ActionIcon,
  Flex,
  Input,
  Loader,
  NumberInput,
  Text,
  Textarea,
  Title,
} from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import toast from 'react-hot-toast';
import { IGetTaxesResponse } from '@/types/ApiResponse';
import { useGetTaxes, usePostCreateTax, usePutUpdateTax } from '@/hooks/useTax';
import { CreateTaxForm, createTaxSchema } from '@/validators/create-tax.schema';

interface CreateEditSmsTemplateModalProps {
  data?: IGetTaxesResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditTaxModal({
  data,
  isView,
}: CreateEditSmsTemplateModalProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetTaxes({
    page: 1,
    perPage: 10,
    sort: 'DESC',
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    usePostCreateTax();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    usePutUpdateTax();

  const onSubmit: SubmitHandler<CreateTaxForm> = (formValues) => {
    if (data?.id) {
      mutateUpdate(
        {
          ...formValues,
          id: data?.id.toString(),
          value: Number(formValues.value),
        },
        {
          onSuccess: () => {
            refetch();
            closeModal();
            toast.success('Tax updated successfully');
          },
          onError: (error: any) => {
            toast.error(
              'Failed to update tax: ',
              error?.response?.data?.message
            );
          },
        }
      );
      return;
    }
    mutateCreate(
      { ...formValues, value: Number(formValues.value) },
      {
        onSuccess: () => {
          refetch();
          closeModal();
          toast.success('Tax template created successfully');
        },
        onError: (error: any) => {
          toast.error('Failed to create tax: ', error?.response?.data?.message);
        },
      }
    );
  };

  return (
    <Form<CreateTaxForm>
      validationSchema={createTaxSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          name: data?.name || '',
          description: data?.description || '',
          value: data?.value.toString() || undefined,
        },
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
              label="Tax Name"
              {...register('name')}
              placeholder="Tax Name"
              className="w-full"
              error={errors.name?.message}
              disabled={isView}
            />

            <Textarea
              label="Description"
              {...register('description')}
              placeholder="Description"
              className="w-full"
              error={errors.description?.message}
              disabled={isView}
            />

            <Input
              type="number"
              label="Value"
              suffix={'%'}
              placeholder="15"
              {...register('value')}
              error={errors.value?.message}
            />

            {isView ? null : (
              <FormFooter
                className="rounded-b-xl"
                isLoading={isPendingCreate || isPendingUpdate}
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
