import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/core/ui/form';
import {
  AddAppointmentNotesForm,
  addAppointmentNotesSchema,
} from '@/validators/add-appointment-notes.schema';
import { Controller } from 'react-hook-form';
import { PiX } from 'react-icons/pi';
import { ActionIcon, Flex, Textarea, Title } from 'rizzui';

export default function ShowNote({ notes }: { notes: string }) {
  const { closeModal } = useModal();

  return (
    <Form<AddAppointmentNotesForm>
      validationSchema={addAppointmentNotesSchema}
      // resetValues={reset}
      onSubmit={() => {}}
      className="@container"
      useFormProps={{
        defaultValues: {
          notes: notes || '',
        },
      }}
    >
      {({ control }) => {
        return (
          <div className="flex flex-col gap-6 px-6 py-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">Appointment Note</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Controller
              name="notes"
              control={control}
              disabled
              render={({ field }) => (
                <Textarea {...field} placeholder="Notes here..." />
              )}
            />
          </div>
        );
      }}
    </Form>
  );
}
