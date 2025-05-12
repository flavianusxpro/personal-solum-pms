import { Controller, SubmitHandler } from 'react-hook-form';
import { useModal } from '../../modal-views/use-modal';
import { Form } from '@/core/ui/form';
import { ActionIcon, Flex, Input, Textarea, Title } from 'rizzui';
import { PiX } from 'react-icons/pi';
import FormFooter from '@/core/components/form-footer';
import { AddRedFlagPatientForm } from '@/validators/add-red-flag-patient.schema';
import { addAppointmentNotesSchema } from '@/validators/add-appointment-notes.schema';

export default function RedFlagForm() {
  const { closeModal } = useModal();

  const onSubmit: SubmitHandler<AddRedFlagPatientForm> = (data) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    // mutate(
    // {
    //     id: data.id,
    //     note: data.note,
    // },
    // {
    //     onSuccess: () => {
    //     toast.success('Note updated successfully');
    //     closeModal();
    //     },
    //     onError: (error) => {
    //     toast.error('Failed to update note: ' + error.message);
    //     },
    // }
    // );
  };

  return (
    <Form<AddRedFlagPatientForm>
      validationSchema={addAppointmentNotesSchema}
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
              <Title className="text-lg">Add Red Flag</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>

            <Input
              {...register('notes')}
              label="Category"
              placeholder="Category"
            />

            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Description"
                  placeholder="description"
                />
              )}
            />

            <Input {...register('notes')} label="Author" placeholder="Author" />
            <Input
              {...register('notes')}
              label="Date"
              type="date"
              placeholder="Date"
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
