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
import { Text } from 'rizzui';
import dayjs from 'dayjs';

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
    },
  });

  const lastAppointment = useMemo(() => {
    if (!formData.patient_id) return null;
    return dataAppointment?.data[0];
  }, [dataAppointment, formData.patient_id]);

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

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setFormData((prev) => ({
      ...prev,
      clinicId: data.clinicId,
      patient_id: data.patient_id,
    }));
    gotoNextStep();
  };

  useEffect(() => {
    if (lastClinic && formData.patient_id) {
      refetch();
      setValue('clinicId', lastClinic.id);
      setFormData((prev) => ({
        ...prev,
        clinicId: lastClinic.id,
      }));
    }
  }, [lastClinic, formData.patient_id, refetch, setFormData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
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

        {lastAppointment && (
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
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </form>
  );
}
