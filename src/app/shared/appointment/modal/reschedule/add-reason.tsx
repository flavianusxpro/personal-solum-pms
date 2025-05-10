import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/core/ui/form';
import { Controller, SubmitHandler } from 'react-hook-form';
import Footer from './footer';
import { Text } from 'rizzui';
import { z } from 'zod';
import { rescheduleAppointmentSchema } from '@/validators/reschedule-appointment.schema';
import { useAtom } from 'jotai';
import { formRescheduleDataAtom } from '.';

const FormSchema = rescheduleAppointmentSchema['reasons'];

type FormSchemaType = z.infer<typeof FormSchema>;

export default function AddReason() {
  const [formData, setFormData] = useAtom(formRescheduleDataAtom);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setFormData((prev) => ({
      ...prev,
      reason: data.reason,
    }));
  };

  return (
    <Form<FormSchemaType>
      validationSchema={FormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, formState: { errors } }) => {
        return (
          <>
            <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
              <Text className="text-base font-semibold">
                Add Reason for Rescheduling:
              </Text>

              <Controller
                name="reason"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Add your reason here..."
                    className="h-32 w-full rounded border p-2"
                  />
                )}
              />
            </div>
            <Footer isLastStep />
          </>
        );
      }}
    </Form>
  );
}
