import { useModal } from '@/app/shared/modal-views/use-modal';
import FormFooter from '@/core/components/form-footer';
import { Form } from '@/core/ui/form';
import { useCreatePatientNote } from '@/hooks/usePatientNote';
import {
  AddAppointmentNotesForm,
  addAppointmentNotesSchema,
} from '@/validators/add-appointment-notes.schema';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiX } from 'react-icons/pi';
import { ActionIcon, Flex, Textarea, Title } from 'rizzui';

export default function AddNotesForm({ patient_id }: { patient_id: number }) {
  const { closeModal } = useModal();

  const { mutate } = useCreatePatientNote();

  const onSubmit: SubmitHandler<AddAppointmentNotesForm> = (data) => {
    mutate(
      {
        description: data.notes,
        patient_id,
      },
      {
        onSuccess: () => {
          toast.success('Patient note created successfully');
          closeModal();
        },
        onError: (error: any) => {
          toast.error(
            'Error creating patient note, ',
            error.response?.data.message
          );
        },
      }
    );
  };

  return (
    <Form<AddAppointmentNotesForm>
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
              <Title className="text-lg">Add Notes</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <Textarea {...field} placeholder="Add your notes here..." />
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
