import { useAtom } from 'jotai';
import { formDataAtom, useStepperAppointment } from '.';
import Footer from './footer';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentBookSchema } from '@/validators/admin-appointment.schema';
import CSelect from '@/core/ui/select';
import { useGetAllPatients } from '@/hooks/usePatient';
import { useEffect, useMemo } from 'react';
import { useGetAllClinics } from '@/hooks/useClinic';
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

  const { data: dataClinics, isLoading: isLoadingClinics } = useGetAllClinics({
    page: 1,
    perPage: 10,
    role: 'admin',
    clinicId: dataProfile?.clinics[0].id,
  });
  const { data: dataPatients, isLoading: isLoadingPatients } =
    useGetAllPatients({
      page: 1,
      perPage: 100,
      clinicId: dataProfile?.clinics[0].id,
    });

  const { data: dataAppointment, refetch } = useGetAppointments({
    patientId: formData?.patient_id,
    page: 1,
    perPage: 1,
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

  const clinicsOptions = useMemo(() => {
    if (!dataClinics) return [];
    return dataClinics.data.map((clinic) => ({
      label: clinic.name,
      value: clinic.id,
    }));
  }, [dataClinics]);

  const patientsOptions = useMemo(() => {
    if (!dataPatients) return [];
    return dataPatients.data.map((patient) => ({
      label: `${patient.first_name} ${patient.last_name}`,
      value: patient.id,
    }));
  }, [dataPatients]);

  const treatmentOptions = useMemo(
    () =>
      dataTreatments?.data.map((item) => ({
        label: item.name,
        value: item.name,
      })) ?? [],
    [dataTreatments]
  );

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
    if (!lastAppointment) return null;
    const clinic = dataClinics?.data.find(
      (clinic) => clinic.id === lastAppointment.clinicId
    );

    if (clinic) {
      setValue('clinicId', clinic.id);
    }
    return clinic;
  }, [lastAppointment, dataClinics?.data, setValue]);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setFormData((prev) => ({
      ...prev,
      clinicId: data.clinicId,
      patient_id: data.patient_id,
      treatment: data.treatment,
      note: data.note ?? '',
      // Auto-select doctor from last appointment if available
      doctorId: lastAppointment?.doctor?.id || prev.doctorId,
    }));
    gotoNextStep();
  };

  useEffect(() => {
    if (lastClinic && formData.patient_id) {
      refetch();
      setValue('clinicId', lastClinic.id);
      setValue('treatment', lastAppointment?.patient_type || '');
      setFormData((prev) => ({
        ...prev,
        clinicId: lastClinic.id,
        treatment: lastAppointment?.patient_type || '',
        // Auto-select doctor from last appointment
        doctorId: lastAppointment?.doctor?.id || undefined,
      }));
    }
  }, [
    lastClinic,
    formData.patient_id,
    refetch,
    setFormData,
    setValue,
    lastAppointment?.patient_type,
    lastAppointment?.doctor?.id,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Controller
            control={control}
            name="patient_id"
            render={({ field }) => (
              <CSelect
                {...field}
                onChange={(value) => {
                  field.onChange(value);
                  setFormData((prev) => ({
                    ...prev,
                    patient_id: value as number,
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
            name="clinicId"
            render={({ field }) => (
              <CSelect
                {...field}
                isLoading={isLoadingClinics}
                searchable
                label="Select Clinic"
                placeholder="Select Clinic"
                error={errors.clinicId?.message}
                options={clinicsOptions}
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

        <div className="space-y-5">
          <Text fontWeight="medium" className="text-gray-1000">
            Last Appointment
          </Text>
          <div className="flex items-center gap-6">
            <PiHospital className="h-8 w-8" />
            <div>
              <h3 className="rizzui-title-h3 mb-2 text-base font-medium text-gray-900 dark:text-gray-700">
                Clinic : {lastClinic?.name}
              </h3>
              <div className="flex items-center gap-2">
                <p className="rizzui-text-p text-sm font-normal text-gray-500">
                  {lastClinic?.address}
                </p>
                <span className="h-1 w-1 rounded-full bg-gray-600"></span>
                <p className="rizzui-text-p text-sm font-normal text-gray-500">
                  {dayjs(lastAppointment?.date).format('DD/MM/YYYY HH:mm')}
                </p>
                {lastAppointment?.doctor && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-gray-600"></span>
                    <p className="rizzui-text-p text-sm font-normal text-gray-500">
                      Dr. {lastAppointment.doctor.first_name} {lastAppointment.doctor.last_name}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </form>
  );
}
