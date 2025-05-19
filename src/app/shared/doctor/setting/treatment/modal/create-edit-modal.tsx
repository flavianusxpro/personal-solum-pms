'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Textarea, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiX } from 'react-icons/pi';

import { IGetTreatmentResponse } from '@/types/ApiResponse';

import {
  CreateTreatmentInput,
  createTreatmentSchema,
} from '@/validators/create-treatment.schema';
import {
  useGetTreatments,
  usePostCreateTreatment,
  usePutUpdateTreatment,
} from '@/hooks/useDoctor';
import toast from 'react-hot-toast';
import cn from '@/core/utils/class-names';

interface CreateEditSmsTemplateModalProps {
  data?: IGetTreatmentResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditTreatmentModal({
  data,
  isView,
}: CreateEditSmsTemplateModalProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetTreatments({
    page: 1,
    perPage: 10,
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    usePostCreateTreatment();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    usePutUpdateTreatment();

  const onSubmit: SubmitHandler<CreateTreatmentInput> = (formValues) => {
    console.log('🚀 ~ formValues:', formValues);
    if (data?.id) {
      mutateUpdate(
        { ...formValues, id: data?.id.toString() },
        {
          onSuccess: () => {
            refetch();
            closeModal();
            toast.success('Treatment updated successfully');
          },
          onError: (error: any) => {
            toast.error(
              'Failed to update treatment: ',
              error?.response?.data?.message
            );
          },
        }
      );
      return;
    }
    mutateCreate(formValues, {
      onSuccess: () => {
        refetch();
        closeModal();
        toast.success('Treatment template created successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to create treatment: ',
          error?.response?.data?.message
        );
      },
    });
  };

  return (
    <Form<CreateTreatmentInput>
      validationSchema={createTreatmentSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          name: data?.name || '',
          description: data?.description || '',
        },
      }}
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <div
            className={cn('flex flex-col gap-6 px-6 pt-6', isView && 'pb-6')}
          >
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">
                {isView ? 'View' : data ? 'Update' : 'Create'} Treatment
              </Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Input
              label="Treatment Name"
              {...register('name')}
              placeholder="Treatment Name"
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
