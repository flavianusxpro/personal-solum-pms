import { Controller, SubmitHandler } from 'react-hook-form';
import { useModal } from '../../modal-views/use-modal';
import { Form } from '@/core/ui/form';
import { ActionIcon, Flex, Input, Textarea, Title, Select } from 'rizzui';
import { PiX } from 'react-icons/pi';
import FormFooter from '@/core/components/form-footer';
import {
  AddRedFlagPatientForm,
  addRedFlagPatientSchema,
} from '@/validators/add-red-flag-patient.schema';
import { useCreatePatientFLag } from '@/hooks/usePatientFlag';
import toast from 'react-hot-toast';
import { useGetTypes } from '@/hooks/use-type';
import { SetStateAction, useMemo } from 'react';

export default function RedFlagForm({
  patient_id,
  modalType,
  setCreateAction
}: {
  patient_id: number;
  modalType?: string;
  setCreateAction?: React.Dispatch<SetStateAction<any>>
}) {
  const { closeModal } = useModal();
  const { mutate } = useCreatePatientFLag();
  const { data: dataTypes } = useGetTypes({ page: 1, perPage: 1000 });
  const categoryOptions = useMemo(() => {
    if (!dataTypes) return [];
    return dataTypes?.data?.map((template) => ({
      label: template.name,
      value: template.name,
    }));
  }, [dataTypes]);
  const onSubmit: SubmitHandler<AddRedFlagPatientForm> = (data) => {
    mutate(
      {
        patient_id,
        description: data.description,
        category: data.category,
        type: modalType == 'flag' ? 'flag' : 'notes',
      },
      {
        onSuccess: () => {
          toast.success(`Patient ${modalType} created successfully`);
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
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">
                Add {modalType == 'flag' ? 'Flag' : 'Notes'}
              </Title>
              <ActionIcon variant="text" onClick={() => {
                setCreateAction?.(null)
                closeModal()
              }} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>

            {/* <Input
              {...register('category')}
              label="Category"
              placeholder="Category"
              error={errors.category?.message}
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
                  error={errors.description?.message}
                />
              )}
            />

            <FormFooter
              className="rounded-b-xl"
              //   isLoading={isPending}
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
