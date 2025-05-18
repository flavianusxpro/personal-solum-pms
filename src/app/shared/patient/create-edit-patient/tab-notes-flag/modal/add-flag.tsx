'use client';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { ActionIcon, Flex, Input, Textarea, Title } from 'rizzui';
import { PiX } from 'react-icons/pi';
import FormFooter from '@/core/components/form-footer';
import { useModal } from '@/app/shared/modal-views/use-modal';
import {
  AddRedFlagPatientForm,
  addRedFlagPatientSchema,
} from '@/validators/add-red-flag-patient.schema';
import { useParams } from 'next/navigation';
import {
  useCreatePatientFLag,
  useGetPatientFlags,
  useUpdatePatientFLag,
} from '@/hooks/usePatientFlag';
import toast from 'react-hot-toast';
import { useGetPatientNotes } from '@/hooks/usePatientNote';
import { useGetPatientById, useUpdatePatient } from '@/hooks/usePatient';
import { IGetPatientFlagResponse } from '@/types/ApiResponse';

export default function FlagForm({
  flagData,
}: {
  flagData?: IGetPatientFlagResponse['data'][number];
}) {
  const { closeModal } = useModal();
  const id = useParams<{ id: string }>().id;

  const { data: dataPatient } = useGetPatientById(id);
  const { refetch } = useGetPatientFlags({
    page: 1,
    perPage: 10,
  });

  const { mutate: mutateCreate, isPending } = useCreatePatientFLag();
  const { mutate: mutateUpdate } = useUpdatePatientFLag();

  const onSubmit: SubmitHandler<AddRedFlagPatientForm> = (data) => {
    if (flagData?.id) {
      return mutateUpdate(
        {
          id: flagData.id,
          patient_id: dataPatient?.id as unknown as string,
          description: data.description,
          category: data.category,
        },
        {
          onSuccess: () => {
            refetch();
            toast.success('Patient red flag updated successfully');
            closeModal();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || 'Something went wrong'
            );
          },
        }
      );
    }
    mutateCreate(
      {
        patient_id: dataPatient?.id as unknown as string,
        description: data.description,
        category: data.category,
      },
      {
        onSuccess: () => {
          refetch();
          toast.success('Patient red flag created successfully');
          closeModal();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Something went wrong');
        },
      }
    );
  };

  return (
    <Form<AddRedFlagPatientForm>
      validationSchema={addRedFlagPatientSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          category: flagData?.category || '',
          description: flagData?.description || '',
        },
      }}
    >
      {({ register, control, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">Add Flag</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>

            <Input
              {...register('category')}
              label="Category"
              placeholder="Category"
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  placeholder="description"
                />
              )}
            />

            <FormFooter
              className="rounded-b-xl"
              isLoading={isPending}
              altBtnText="Cancel"
              submitBtnText="Save"
              isSticky={false}
            />
          </div>
        );
      }}
    </Form>
  );
}
