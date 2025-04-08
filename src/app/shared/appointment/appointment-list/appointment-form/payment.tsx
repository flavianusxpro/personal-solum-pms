'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ActionIcon, Select, Textarea, Title } from 'rizzui';
import Footer from './footer';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/appointment-list/appointment-form';
import { PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import PaymentMethod from '@/app/shared/ecommerce/checkout/payment-method';

export const appointmentBookSchema = z.object({
  appointment_type: z.string({
    required_error: 'Appointment type is required',
  }),
  meeting_type: z.string({ required_error: 'Meeting type is required' }),
  notes: z.string().optional(),
});

const appointmentAppointmentOptions = [
  {
    value: 'Medicine',
    label: 'Medicine',
  },
  {
    value: 'Pharmacy',
    label: 'Pharmacy',
  },
  {
    value: 'Neurology',
    label: 'Neurology',
  },
  {
    value: 'Hematology',
    label: 'Hematology',
  },
];

// generate form types from zod validation schema
export type PropertyTypeSchema = z.infer<typeof appointmentBookSchema>;

const FormSchema = appointmentBookSchema;

type FormSchemaType = z.infer<typeof FormSchema>;

export default function AppointmentPayment() {
  const { gotoNextStep } = useStepperAppointment();
  const { closeModal } = useModal();
  const [formData, setFormData] = useAtom(formDataAtom);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      appointment_type: formData.appointment_type,
      meeting_type: formData.meeting_type,
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log('data', data);
    setFormData((prev) => ({
      ...prev,
      appointment_type: data.appointment_type,
      meeting_type: data.meeting_type,
    }));
    gotoNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between border-b border-gray-200 p-5 md:p-7">
        <Title as="h2" className="font-lexend text-lg font-semibold">
          Book an appointment
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
        <PaymentMethod />
      </div>
      <Footer />
    </form>
  );
}
