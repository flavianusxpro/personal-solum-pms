'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Loader } from 'rizzui';
import Footer from './footer';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/appointment-list/appointment-form';
import dynamic from 'next/dynamic';
import { useGetPatientProblem, useGetPatientTypes } from '@/hooks/usePatient';
import { useMemo } from 'react';
import CSelect from '@/app/shared/ui/select';
import { appointmentBookSchema } from '@/validators/admin-appointment.schema';

const Textarea = dynamic(() => import('rizzui').then((mod) => mod.Textarea), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

const FormSchema = appointmentBookSchema['selectServiceType'];

type FormSchemaType = z.infer<typeof FormSchema>;

export default function AppointmentServices() {
  const { gotoNextStep } = useStepperAppointment();
  const [formData, setFormData] = useAtom(formDataAtom);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchemaType>({
    mode: 'all',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      appointment_type: formData?.appointment_type,
      patient_type: formData?.patient_type,
      patient_problem: formData?.patient_problem,
      note: formData?.note,
    },
  });

  const { data: dataPatientProblem } = useGetPatientProblem({ search: '' });
  const { data: dataPatientTypes } = useGetPatientTypes({
    search: '',
  });

  const patientProblemOptions = useMemo(
    () =>
      dataPatientProblem?.map((item) => ({
        label: item.name,
        value: item.name,
      })) ?? [],
    [dataPatientProblem]
  );

  const patientTypeOptions = useMemo(
    () =>
      dataPatientTypes?.map((item) => ({
        label: item.name,
        value: item.name,
      })) ?? [],
    [dataPatientTypes]
  );

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log('data', data);
    setFormData((prev) => ({
      ...prev,
      appointment_type: data.appointment_type,
      patient_type: data.patient_type,
      patient_problem: data.patient_problem,
      note: data.note ?? '',
    }));
    gotoNextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
        <Controller
          control={control}
          name="appointment_type"
          render={({ field }) => (
            <CSelect
              {...field}
              className="col-span-full md:col-span-1"
              placeholder="select appointment type..."
              label="Appointment Type"
              labelClassName="font-medium text-gray-1000 dark:text-white"
              options={[
                {
                  label: 'Initial',
                  value: 'INITIAL',
                },
                {
                  label: 'Follow up',
                  value: 'FOLLOWUP',
                },
              ]}
              error={errors?.appointment_type?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="patient_type"
          render={({ field }) => (
            <CSelect
              {...field}
              className="col-span-full md:col-span-1"
              placeholder="select patient type..."
              label="Patient Type"
              labelClassName="font-medium text-gray-1000 dark:text-white"
              options={patientTypeOptions}
              error={errors?.patient_type?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="patient_problem"
          render={({ field }) => (
            <CSelect
              {...field}
              className="col-span-full md:col-span-1"
              placeholder="select patient problem..."
              label="Problem Type"
              options={patientProblemOptions}
              error={errors?.patient_problem?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="note"
          render={({ field }) => (
            <Textarea
              {...field}
              placeholder="Notes"
              error={errors.note?.message}
              textareaClassName="h-24"
              className="col-span-2"
            />
          )}
        />
      </div>
      <Footer />
    </form>
  );
}
