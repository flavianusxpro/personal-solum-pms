'use client';

import { z } from 'zod';
import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Loader, Text } from 'rizzui';
import Footer from './footer';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/modal/appointment-form';
import dynamic from 'next/dynamic';
import { useGetPatientProblem, useGetPatientTypes } from '@/hooks/usePatient';
import { useEffect, useMemo } from 'react';
import CSelect from '@/app/shared/ui/select';
import { appointmentBookSchema } from '@/validators/admin-appointment.schema';
import { PiHospital } from 'react-icons/pi';
import { useGetAppointments } from '@/hooks/useAppointment';
import { useGetAllClinics } from '@/hooks/useClinic';
import dayjs from 'dayjs';
import { useGetTreatments } from '@/hooks/useDoctor';

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

  const { data: dataPatientProblem } = useGetPatientProblem({
    page: 1,
    perPage: 100,
    sort: 'DESC',
  });

  const { data: dataTreatments } = useGetTreatments({
    page: 1,
    perPage: 100,
    sort: 'DESC',
  });

  const { data: dataPatientTypes } = useGetPatientTypes({
    search: '',
  });
  const { data: dataAppointment } = useGetAppointments({
    patientId: formData?.patient_id,
    page: 1,
    perPage: 1,
  });

  const { data: dataClinics } = useGetAllClinics({
    page: 1,
    perPage: 10,
    role: 'admin',
  });

  const lastAppointment = useMemo(() => {
    return dataAppointment?.data[0];
  }, [dataAppointment]);

  const lastClinic = useMemo(() => {
    if (!lastAppointment) return null;
    const clinic = dataClinics?.data.find(
      (clinic) => clinic.id === lastAppointment.clinicId
    );
    return clinic;
  }, [lastAppointment, dataClinics]);

  const {
    control,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchemaType>({
    mode: 'all',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      // appointment_type: formData?.appointment_type,
      // patient_type: formData?.patient_type,
      // patient_problem: formData?.patient_problem,
      treatment: formData?.patient_type || lastAppointment?.patient_type,
      note: formData?.note,
    },
  });

  const treatmentOptions = useMemo(
    () =>
      dataTreatments?.data.map((item) => ({
        label: item.name,
        value: item.name,
      })) ?? [],
    [dataTreatments]
  );

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setFormData((prev) => ({
      ...prev,
      // appointment_type: data.appointment_type,
      // patient_type: data.patient_type,
      // patient_problem: data.patient_problem,
      treatment: data.treatment,
      note: data.note ?? '',
    }));
    gotoNextStep();
  };

  useEffect(() => {
    if (lastAppointment) {
      // const parsedPatientProblem: string[] =
      //   typeof lastAppointment?.patient_problem === 'string'
      //     ? (lastAppointment.patient_problem as string)
      //         .slice(1, -1)
      //         .split('","')
      //         .map((s) => s.replace(/^"|"$/g, ''))
      //     : Array.isArray(lastAppointment?.patient_problem)
      //       ? lastAppointment.patient_problem
      //       : [];

      // setValue('appointment_type', lastAppointment.type);
      // setValue('patient_type', lastAppointment.patient_type);
      setValue('patient_problem', lastAppointment.patient_type);
      setValue('note', lastAppointment.note || '');
    }
  }, [lastAppointment, setFormData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
        {/* <Controller
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
        /> */}
        {/* <Controller
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
        /> */}
        {/* <Controller
          control={control}
          name="patient_problem"
          render={({ field }) => (
            <Cinp
              {...field}
              className="col-span-full md:col-span-1"
              labelClassName="font-medium text-gray-1000 dark:text-white"
              placeholder="select patient condition..."
              label="Patient Condition"
              options={patientProblemOptions}
              error={errors?.patient_problem?.message as string}
            />
          )}
        /> */}
        <Controller
          control={control}
          name="treatment"
          render={({ field }) => (
            <CSelect
              {...field}
              className="col-span-full md:col-span-1"
              labelClassName="font-medium text-gray-1000 dark:text-white"
              placeholder="select treatment..."
              label="Patient Treatment"
              options={treatmentOptions}
              error={errors?.treatment?.message as string}
            />
          )}
        />
        <Controller
          control={control}
          name="note"
          render={({ field }) => (
            <Textarea
              {...field}
              label="Notes"
              labelClassName="font-medium text-gray-1000 dark:text-white"
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
