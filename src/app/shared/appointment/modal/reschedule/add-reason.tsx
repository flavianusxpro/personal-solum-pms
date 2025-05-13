import { useModal } from '@/app/shared/modal-views/use-modal';
import { Form } from '@/core/ui/form';
import { Controller, SubmitHandler } from 'react-hook-form';
import Footer from './footer';
import { Text, Textarea } from 'rizzui';
import { z } from 'zod';
import { rescheduleAppointmentSchema } from '@/validators/reschedule-appointment.schema';
import { useAtom } from 'jotai';
import { formRescheduleDataAtom, useStepperCancelAppointment } from '.';

const FormSchema = rescheduleAppointmentSchema['reasons'];

type FormSchemaType = z.infer<typeof FormSchema>;

export default function AddReason() {
  const [formData, setFormData] = useAtom(formRescheduleDataAtom);
  const { gotoNextStep } = useStepperCancelAppointment();

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setFormData((prev) => ({
      ...prev,
      reason: data.reason,
    }));
    gotoNextStep();
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
                  <Textarea {...field} placeholder="Add your reason here..." />
                )}
              />
            </div>
            <Footer goBackToStepNumber={1} />
          </>
        );
      }}
    </Form>
  );
}
