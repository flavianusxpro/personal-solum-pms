import { useAtom } from 'jotai';
import { formDataAtom, useStepperAppointment } from '.';
import Footer from './footer';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentBookSchema } from '@/validators/admin-appointment.schema';
import CSelect from '@/core/ui/select';
import { useGetAllPatients } from '@/hooks/usePatient';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { useGetAppointments } from '@/hooks/useAppointment';
import { useProfile } from '@/hooks/useProfile';
import { PiHospital } from 'react-icons/pi';
import { Text, Textarea } from 'rizzui';
import dayjs from 'dayjs';
import { useGetTreatments } from '@/hooks/useDoctor';
const FormSchema = appointmentBookSchema['selectPatientAndClinic'];

type FormSchemaType = z.infer<typeof FormSchema>;

export default function SelectClinic() {
  const { gotoNextStep } = useStepperAppointment();
  const [formData, setFormData] = useAtom(formDataAtom);
  const { data: dataProfile } = useProfile(true);
  const { data: dataPatients, isLoading: isLoadingPatients } =
    useGetAllPatients({
      page: 1,
      perPage: 100,
      clinicId: dataProfile?.clinics[0].id,
    });

  const { data: dataAppointment, refetch } = useGetAppointments({
    patientId: formData?.patient_id,
    page: 1,
    perPage: 100,
    clinicId: dataProfile?.clinics[0].id,
  });

  const { data: dataTreatments } = useGetTreatments({
    page: 1,
    perPage: 100,
    sort: 'DESC',
  });

  const lastAppointment = useMemo(() => {
    if (!formData.patient_id) return null;
    return dataAppointment?.data[0];
  }, [dataAppointment, formData.patient_id]);

  const patientsOptions = useMemo(() => {
    if (!dataPatients) return [];
    return dataPatients.data.map((patient) => ({
      label: `${patient.first_name} ${patient.last_name} - ${patient.email} - ${patient?.clinics?.[0]?.name}`,
      value: patient.id,
      name: `${patient.first_name} ${patient.last_name}`,
      address: patient?.address_line_1,
      mobile_number: patient?.mobile_number,
    }));
  }, [dataPatients]);

  const treatmentOptions = useMemo(() => {
    if (!dataTreatments?.data) return [];

    if (dataAppointment?.data.length === 0) {
      return dataTreatments.data
        .filter((item) => item.id !== 2)
        .map((item) => ({
          label: item.name,
          value: item.name,
        }));
    }

    return dataTreatments.data.map((item) => ({
      label: item.name,
      value: item.name,
    }));
  }, [dataTreatments, dataAppointment]);

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      clinicId: formData.clinicId,
      patient_id: formData.patient_id,
      treatment: formData?.treatment || lastAppointment?.patient_type,
      note: formData?.note,
    },
  });

  const lastClinic = useMemo(() => {
    if (!formData.patient_id) return null;

    const selectedPatient = dataPatients?.data.find(
      (patient) => patient.id === formData.patient_id
    );

    const patientLastClinic = selectedPatient?.clinics?.[0];

    if (patientLastClinic) {
      setValue('clinicId', patientLastClinic.id);
      return patientLastClinic;
    }

    return null;
  }, [formData.patient_id, dataPatients?.data, setValue]);

  const lastAppointmentDate = lastAppointment?.date
    ? dayjs(lastAppointment.date).format('YYYY-MM-DD')
    : undefined;

  const lastAppointmentTime = lastAppointment?.date
    ? dayjs(lastAppointment.date).format('HH:mm')
    : undefined;

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setFormData((prev) => ({
      ...prev,
      clinicId: data.clinicId,
      patient_id: data.patient_id,
      treatment: data.treatment,
      note: data.note ?? '',
      doctorId: lastAppointment?.doctorId,
      date: lastAppointmentDate || '',
      doctorTime: lastAppointmentTime || '',
    }));
    gotoNextStep();
  };

  useEffect(() => {
    if (formData.patient_id) {
      refetch();

      const selectedPatient = dataPatients?.data.find(
        (patient) => patient.id === formData.patient_id
      );

      const patientLastClinic = selectedPatient?.clinics?.[0];

      if (patientLastClinic) {
        setValue('clinicId', patientLastClinic.id);
        setFormData((prev) => ({
          ...prev,
          clinicId: patientLastClinic.id,
        }));
      }

      if (!dataAppointment) return;

      const hasAppointments = dataAppointment.data.length >= 1;

      if (hasAppointments) {
        setValue('treatment', 'Follow Up Appointment');
        setFormData((prev) => ({
          ...prev,
          treatment: 'Follow Up Appointment',
        }));
      } else if (
        dataAppointment.data.length !== 0 &&
        lastAppointment?.patient_type
      ) {
        setValue('treatment', lastAppointment?.patient_type);
        setFormData((prev) => ({
          ...prev,
          treatment: lastAppointment?.patient_type,
        }));
      } else {
        setValue('treatment', 'Initial Consult');
        setFormData((prev) => ({
          ...prev,
          treatment: 'Initial Consult',
        }));
      }
    }
  }, [
    formData.patient_id,
    dataPatients?.data,
    refetch,
    setFormData,
    setValue,
    lastAppointment?.patient_type,
    dataAppointment,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 flex h-[549px] flex-col gap-10 overflow-y-auto p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Controller
            control={control}
            name="patient_id"
            render={({ field }) => (
              <CSelect
                className="col-span-2"
                {...field}
                onChange={(value) => {
                  const selectedPatient = patientsOptions.find(
                    (p) => p.value === value
                  );
                  field.onChange(value);
                  setFormData((prev) => ({
                    ...prev,
                    patient_id: value as number,
                    patient_name: `${selectedPatient?.name}`,
                    patient_address: `${selectedPatient?.address ?? ''}`,
                    patient_mobile_number: `${selectedPatient?.mobile_number}`,
                  }));
                }}
                searchable
                isLoading={isLoadingPatients}
                label="Select Patient"
                placeholder="Select Patient"
                error={errors.patient_id?.message}
                options={patientsOptions}
              />
            )}
          />
          <Controller
            control={control}
            name="treatment"
            render={({ field }) => (
              <CSelect
                {...field}
                className="col-span-full md:col-span-1"
                labelClassName="font-medium text-gray-1000 dark:text-white"
                placeholder="Select Appointment Type"
                label="Appointment Type"
                options={treatmentOptions}
                onChange={(value) => {
                  field.onChange(value);
                  setFormData((prev) => ({
                    ...prev,
                    treatment: `${value}`,
                  }));
                }}
                error={errors?.treatment?.message as string}
              />
            )}
          />
        </div>

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

        {
          lastClinic && (
            <div className="flex flex-col gap-4">
              <Text fontWeight="medium" className="text-gray-1000">
                Last Appointment
              </Text>
              {dataAppointment?.data.map((item) => (
                <div key={item.id} className="flex items-center gap-6">
                  <PiHospital className="h-8 w-8" />
                  <div>
                    <h3 className="rizzui-title-h3 text-base font-medium text-gray-900 dark:text-gray-700">
                      {`Dr. ${item.doctor.first_name} ${item.doctor.last_name}`}{' '}
                      : {item?.clinic.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="rizzui-text-p text-sm font-normal text-gray-500">
                        {dayjs(item?.date).format('dddd')}
                      </p>
                      <span className="h-1 w-1 rounded-full bg-gray-600"></span>
                      <p className="rizzui-text-p text-sm font-normal text-gray-500">
                        {dayjs(item?.date).format('DD/MM/YYYY HH:mm')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
          // : (
          //   <p>Please select patient first</p>
          // )
        }
      </div>
      <Footer />
    </form>
  );
}
