import { Controller, SubmitHandler } from 'react-hook-form';
import { useModal } from '../../modal-views/use-modal';
import { Form } from '@/core/ui/form';
import { ActionIcon, Flex, Input, Textarea, Title } from 'rizzui';
import { PiX } from 'react-icons/pi';
import FormFooter from '@/core/components/form-footer';
import {
  AddRedFlagPatientForm,
  addRedFlagPatientSchema,
} from '@/validators/add-red-flag-patient.schema';
import { useCreatePatientFLag } from '@/hooks/usePatientFlag';
import toast from 'react-hot-toast';

export default function RedFlagForm({ patient_id }: { patient_id: number }) {
  const { closeModal } = useModal();
  const { mutate } = useCreatePatientFLag();
  const onSubmit: SubmitHandler<AddRedFlagPatientForm> = (data) => {
    mutate(
      {
        patient_id,
        description: data.description,
        category: data.category,
      },
      {
        onSuccess: () => {
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
              <Title className="text-lg">Add Flag</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>

            <Input
              {...register('category')}
              label="Category"
              placeholder="Category"
              error={errors.category?.message}
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
