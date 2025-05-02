'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Loader, Text, Textarea, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { IGetRolesResponse } from '@/types/ApiResponse';
import {
  CreateRoleInput,
  createRoleSchema,
} from '@/validators/create-role.schema';
import {
  useGetPermissions,
  useGetRoles,
  usePostCreateRole,
  usePutUpdateRole,
} from '@/hooks/useRole';
import { useMemo } from 'react';
import {
  CreateTreatmentInput,
  createTreatmentSchema,
} from '@/validators/create-treatment.schema';

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => <Loader />,
  }
);

interface CreateEditSmsTemplateModalProps {
  data?: IGetRolesResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditTreatmentModal({
  data,
  isView,
}: CreateEditSmsTemplateModalProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetRoles({
    page: 1,
    perPage: 10,
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    usePostCreateRole();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    usePutUpdateRole();

  const onSubmit: SubmitHandler<CreateTreatmentInput> = (formValues) => {
    console.log('🚀 ~ formValues:', formValues);
    if (data?.id) {
      // mutateUpdate(
      //   { ...formValues, id: data?.id.toString() },
      //   {
      //     onSuccess: () => {
      //       refetch();
      //       closeModal();
      //       toast.success('Role updated successfully');
      //     },
      //     onError: (error: any) => {
      //       toast.error(
      //         'Failed to update role: ',
      //         error?.response?.data?.message
      //       );
      //     },
      //   }
      // );
      return;
    }
    // mutateCreate(formValues, {
    //   onSuccess: () => {
    //     refetch();
    //     closeModal();
    //     toast.success('Role template created successfully');
    //   },
    //   onError: (error: any) => {
    //     toast.error('Failed to create role: ', error?.response?.data?.message);
    //   },
    // });
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
          // description: data?.description || '',
        },
      }}
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
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

            {/* {isView ? null : (
              <FormFooter
                className="rounded-b-xl"
                isLoading={isPendingCreate || isPendingUpdate}
                altBtnText="Cancel"
                submitBtnText="Save"
                isSticky={false}
              />
            )} */}
          </div>
        );
      }}
    </Form>
  );
}
