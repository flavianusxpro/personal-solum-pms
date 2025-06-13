'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Textarea, Title } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import { IGetPatientProblemResponse } from '@/types/ApiResponse';
import {
  PatienProblemSchemaType,
  patientProblemSchema,
} from '@/validators/create-problem.schema';
import {
  useCreatePatientProblem,
  useGetPatientProblem,
  useUpdatePatientProblem,
} from '@/hooks/usePatient';
import CSelect from '@/app/shared/ui/select';
import toast from 'react-hot-toast';

interface IProps {
  data?: IGetPatientProblemResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditConditionModal({ data, isView }: IProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetPatientProblem({
    page: 1,
    perPage: 10,
    sort: 'DESC',
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    useCreatePatientProblem();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdatePatientProblem();

  const onSubmit: SubmitHandler<PatienProblemSchemaType> = (formValues) => {
    const payload = {
      id: data?.id,
      name: formValues.name,
      is_active: formValues.is_active === 1 ? true : false,
    };
    if (data?.id) {
      mutateUpdate(payload, {
        onSuccess: () => {
          refetch();
          closeModal();
          toast.success('Condition updated successfully');
        },
        onError: (error: any) => {
          toast.error(
            'Failed to update condition: ',
            error?.response?.data?.message
          );
        },
      });
      return;
    }

    mutateCreate(payload, {
      onSuccess: () => {
        refetch();
        closeModal();
        toast.success('Condition created successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to create condition: ',
          error?.response?.data?.message
        );
      },
    });
  };

  return (
    <Form<PatienProblemSchemaType>
      validationSchema={patientProblemSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          name: data?.name || '',
          is_active: data?.is_active ? 1 : 2,
        },
      }}
    >
      {({ register, control, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">
                {isView ? 'View' : data ? 'Update' : 'Create'} Condition
              </Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Input
              label="Condition Name"
              {...register('name')}
              placeholder="Condition Name"
              className="w-full"
              error={errors.name?.message}
              disabled={isView}
            />

            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <CSelect
                  {...field}
                  label="Status"
                  className="w-full"
                  placeholder="Select Status"
                  options={[
                    { label: 'Active', value: 1 },
                    { label: 'Inactive', value: 2 },
                  ]}
                />
              )}
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
