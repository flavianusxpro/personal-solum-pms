'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input, Loader, Text, Textarea } from 'rizzui';
import {
  assignDoctorSchema,
  AssignDoctorTypes,
} from '@/validators/assign-doctor.schema';
import { useGetPatientById, useUpdateAssignDoctor } from '@/hooks/usePatient';
import { useParams } from 'next/navigation';
import { useGetAllDoctors } from '@/hooks/useDoctor';
import { useMemo } from 'react';

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

export default function TabAssignDoctor({
  isView = false,
}: {
  isView?: boolean;
}) {
  const id = useParams().id as string;

  const {
    data: dataPatient,
    refetch: refetchGetDataPatient,
    isLoading: isLoadingGetDataPatient,
  } = useGetPatientById(id);

  const { data: dataDoctor } = useGetAllDoctors({
    page: 1,
    perPage: 50,
  });

  const { mutate } = useUpdateAssignDoctor();

  const doctorOptions = useMemo(() => {
    if (!dataDoctor) return [];

    return dataDoctor?.map((doctor) => ({
      label: doctor.first_name + ' ' + doctor.last_name,
      value: doctor.id.toString(),
    }));
  }, [dataDoctor]);

  const onSubmit: SubmitHandler<AssignDoctorTypes> = (data) => {
    const doctor_ids = data.doctor.map((doctor) => parseInt(doctor));
    mutate(
      {
        patient_id: id,
        doctor_ids,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <Form<AssignDoctorTypes>
      validationSchema={assignDoctorSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'all',
        defaultValues: {
          doctor: dataPatient?.doctors
            ? dataPatient?.doctors.map((doctor) => doctor.id.toString())
            : [],
        },
      }}
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <Flex direction="col" className="" gap="7">
              <FormGroup title="Assign Doctor" className="" />
              <div className="mb-10 grid w-full grid-cols-2 gap-7">
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
                        error={errors.doctor?.message}
                        className="flex-grow"
                        disabled={isView}
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
