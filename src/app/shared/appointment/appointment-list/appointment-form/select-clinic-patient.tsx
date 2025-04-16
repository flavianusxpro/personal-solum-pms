import { useAtom } from 'jotai';
import { formDataAtom, useStepperAppointment } from '.';
import Footer from './footer';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { appointmentBookSchema } from '@/validators/admin-appointment.schema';
import CSelect from '@/core/ui/select';
import { useGetAllPatients } from '@/hooks/usePatient';
import { useMemo } from 'react';
import { useGetAllClinics } from '@/hooks/useClinic';
import { z } from 'zod';
import { Text } from 'rizzui';
import { ROLES } from '@/config/constants';

const FormSchema = appointmentBookSchema['selectPatientAndClinic'];

type FormSchemaType = z.infer<typeof FormSchema>;

export default function SelectClinic() {
  const { gotoNextStep } = useStepperAppointment();
  const [formData, setFormData] = useAtom(formDataAtom);

  const { data: dataClinics, isLoading: isLoadingClinics } = useGetAllClinics({
    page: 1,
    perPage: 10,
    role: 'admin',
  });
  const { data: dataPatients, isLoading: isLoadingPatients } =
    useGetAllPatients({ page: 1, perPage: 100 });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      clinicId: formData.clinicId,
      patient_id: formData.patient_id,
    },
  });

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
        {/* <Text className="text-base font-semibold">
          Select Clinic and Patient:
        </Text> */}
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
          name="patient_id"
          render={({ field }) => (
            <CSelect
              {...field}
              searchable
              isLoading={isLoadingPatients}
              label="Select Patient"
              placeholder="Select Patient"
              error={errors.patient_id?.message}
              options={patientsOptions}
            />
          )}
        />
      </div>
      <Footer />
    </form>
  );
}
