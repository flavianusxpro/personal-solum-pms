'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Textarea, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import toast from 'react-hot-toast';
import { IGetSpecialistResponse } from '@/types/ApiResponse';
import {
  useGetSpecialists,
  usePostCreateSpecialist,
  usePutUpdateSpecialist,
} from '@/hooks/useDoctor';
import {
  CreateSpecialistInput,
  createSpecialistSchema,
} from '@/validators/create-specialist.schema';

interface CreateEditSmsTemplateModalProps {
  data?: IGetSpecialistResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditSpecialistModal({
  data,
  isView,
}: CreateEditSmsTemplateModalProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetSpecialists({
    page: 1,
    perPage: 10,
    sort: 'DESC',
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    usePostCreateSpecialist();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    usePutUpdateSpecialist();

  const onSubmit: SubmitHandler<CreateSpecialistInput> = (formValues) => {
    console.log('🚀 ~ formValues:', formValues);
    if (data?.id) {
      mutateUpdate(
        { ...formValues, id: data?.id.toString() },
        {
          onSuccess: () => {
            refetch();
            closeModal();
            toast.success('Specialist updated successfully');
          },
          onError: (error: any) => {
            toast.error(
              'Failed to update specialist: ',
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
        toast.success('Specialist created successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to create specialist: ',
          error?.response?.data?.message
        );
      },
    });
  };

  return (
    <Form<CreateSpecialistInput>
      validationSchema={createSpecialistSchema}
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
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">
                {isView ? 'View' : data ? 'Update' : 'Create'} Specialist
              </Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Input
              label="Specialist Name"
              {...register('name')}
              placeholder="Specialist Name"
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
