'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input, Loader, Text, Textarea } from 'rizzui';
import { assignSchema, AssignTypes } from '@/validators/assign-doctor.schema';
import {
  useAssignClinicPatient,
  useGetPatientById,
  useUpdateAssignDoctor,
} from '@/hooks/usePatient';
import { useParams } from 'next/navigation';
import { useGetAllDoctors } from '@/hooks/useDoctor';
import { useEffect, useMemo, useState } from 'react';
import { useGetAllClinics } from '@/hooks/useClinic';

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-10 place-content-center">
        <Loader variant="spinner" />
      </div>
    ),
  }
);

export default function TabAssign({ isView = false }: { isView?: boolean }) {
  const id = useParams().id as string;

  const [clinicIds, setClinicIds] = useState<string[]>([]);

  const {
    data: dataPatient,
    refetch: refetchDataPatient,
    isLoading,
  } = useGetPatientById(id);

  const { data: dataClinics } = useGetAllClinics({
    page: 1,
    perPage: 50,
    role: 'admin',
  });

  const {
    data: dataDoctor,
    refetch,
    isLoading: isloadingGetDoctors,
  } = useGetAllDoctors({
    page: 1,
    perPage: 50,
    q: clinicIds.length
      ? JSON.stringify({ clinic_ids: clinicIds.map((id) => parseInt(id)) })
      : undefined,
  });

  const { mutate } = useUpdateAssignDoctor();
  const { mutate: mutatePatientAssignClinic } = useAssignClinicPatient();

  const clinicsOptions = useMemo(() => {
    if (!dataClinics) return [];
    return dataClinics.data.map((clinic) => ({
      label: clinic.name,
      value: clinic.id.toString(),
    }));
  }, [dataClinics]);

  const doctorOptions = useMemo(() => {
    if (!dataDoctor) return [];

    return dataDoctor?.data?.map((doctor) => ({
      label: doctor.first_name + ' ' + doctor.last_name,
      value: doctor.id.toString(),
    }));
  }, [dataDoctor]);

  const onSubmit: SubmitHandler<AssignTypes> = (data) => {
    const doctor_ids = data.doctor.map((doctor) => parseInt(doctor));
    mutate(
      {
        patient_id: id,
        doctor_ids,
      },
      {
        onSuccess: () => {
          toast.success('Doctor assigned successfully');
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || error.message);
        },
      }
    );

    mutatePatientAssignClinic(
      {
        uuid: id,
        clinic_ids: data.clinic.map((clinic) => parseInt(clinic)),
      },
      {
        onSuccess: () => {
          refetchDataPatient();
          toast.success('Clinic assigned successfully');
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || error.message);
        },
      }
    );
  };

  useEffect(() => {
    if (clinicIds.length > 0) {
      refetch();
    }
  }, [clinicIds, refetch]);

  if (isLoading || isloadingGetDoctors) return <Loader />;

  return (
    <Form<AssignTypes>
      validationSchema={assignSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'all',
        defaultValues: {
          doctor: dataPatient?.doctors
            ? dataPatient?.doctors.map((doctor) => doctor.id.toString())
            : [],
          clinic: dataPatient?.clinics
            ? dataPatient?.clinics.map((clinic) => clinic.id.toString())
            : [],
        },
      }}
    >
      {({ register, control, watch, formState: { errors } }) => {
        const { clinic } = watch();
        return (
          <>
            <Flex direction="col" className="" gap="7">
              <FormGroup title="Assign" className="" />
              <div className="mb-10 grid w-full grid-cols-1 gap-7">
                <FormGroup title="Clinic" isLabel>
                  <Controller
                    name="clinic"
                    control={control}
                    render={({ field }) => (
                      <MultySelect
                        {...field}
                        onChange={(value: string[]) => {
                          field.onChange(value);
                          setClinicIds(value);
                        }}
                        onClear={() => field.onChange([])}
                        options={clinicsOptions}
                        clearable
                        placeholder="Select Clinic"
                        error={errors.clinic?.message}
                        className="flex-grow"
                        disabled={isView}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup title="Doctors" isLabel>
                  <Controller
                    name="doctor"
                    control={control}
                    render={({ field }) => (
                      <MultySelect
                        {...field}
                        onClear={() => field.onChange([])}
                        options={doctorOptions}
                        clearable
                        placeholder="Select Doctor"
                        error={
                          errors.doctor?.message || doctorOptions.length === 0
                            ? 'No doctor found'
                            : ''
                        }
                        className="flex-grow"
                        disabled={isView || !clinic || clinic?.length === 0}
                      />
                    )}
                  />
                </FormGroup>
              </div>
            </Flex>
            {!isView && (
              <FormFooter
                // isLoading={isLoading}
                altBtnText="Cancel"
                submitBtnText="Save"
              />
            )}
          </>
        );
      }}
    </Form>
  );
}
