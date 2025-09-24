'use client';
import { useMemo } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { ActionIcon, Flex, Input, Textarea, Title, Select } from 'rizzui';
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
import { useGetPatientById } from '@/hooks/usePatient';
import { IGetPatientFlagResponse } from '@/types/ApiResponse';
import { useGetTypes } from '@/hooks/use-type';

export default function FlagForm({
  flagData,
  modalType,
}: {
  flagData?: IGetPatientFlagResponse['data'][number];
  modalType?: string;
}) {
  const { closeModal } = useModal();
  const id = useParams<{ id: string }>().id;

  const { data: dataPatient } = useGetPatientById(id);
  const { data: dataTypes } = useGetTypes({ page: 1, perPage: 1000 });
  const { refetch } = useGetPatientFlags({
    page: 1,
    perPage: 10,
    patientId: dataPatient?.id as number,
  });

  const { mutate: mutateCreate, isPending } = useCreatePatientFLag();
  const { mutate: mutateUpdate } = useUpdatePatientFLag();
  const categoryOptions = useMemo(() => {
    if (!dataTypes) return [];
    return dataTypes?.data?.map((template) => ({
      label: template.name,
      value: template.name,
    }));
  }, [dataTypes]);

  const onSubmit: SubmitHandler<AddRedFlagPatientForm> = (data) => {
    if (flagData?.id) {
      return mutateUpdate(
        {
          id: flagData.id,
          patient_id: dataPatient?.id as number,
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
        patient_id: dataPatient?.id as number,
        description: data.description,
        category: data.category,
        type: modalType == 'flag' ? 'flag' : 'notes',
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
              <Title className="text-lg">
                Add {modalType == 'flag' ? 'Flag' : 'Notes'}
              </Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>

            {/* <Input
              {...register('category')}
              label="Category"
              placeholder="Category"
            /> */}
            <Controller
              control={control}
              name="category"
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Category"
                  dropdownClassName="!z-10 h-auto"
                  inPortal={false}
                  placeholder="Select Category"
                  options={categoryOptions}
                  onChange={onChange}
                  value={value}
                  getOptionValue={(option) => option.value}
                  displayValue={(selected) =>
                    categoryOptions?.find((cat) => cat.value === selected)
                      ?.label ?? ''
                  }
                />
              )}
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
