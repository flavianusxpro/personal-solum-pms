'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Loader } from 'rizzui';
import { useParams } from 'next/navigation';
import { usePostAssignDoctorToClinic } from '@/hooks/useDoctor';
import { useMemo } from 'react';
import { useGetAllClinics } from '@/hooks/useClinic';
import {
  assignClinicSchema,
  AssignClinicTypes,
} from '@/validators/assign-clinic.schema';

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => <Loader variant="spinner" />,
  }
);

export default function TabAssign({ isView = false }: { isView?: boolean }) {
  const id = useParams().id as string;

  const { data: dataClinics } = useGetAllClinics({
    page: 1,
    perPage: 50,
    role: 'admin',
  });

  const { mutate, isPending } = usePostAssignDoctorToClinic();

  const clinicsOptions = useMemo(() => {
    if (!dataClinics) return [];
    return dataClinics.data.map((clinic) => ({
      label: clinic.name,
      value: clinic.id.toString(),
    }));
  }, [dataClinics]);

  const onSubmit: SubmitHandler<AssignClinicTypes> = (data) => {
    mutate(
      {
        id,
        clinic_ids: data.clinic.map((item) => parseInt(item)),
      },
      {
        onSuccess: (data) => {
          toast.success('Doctor assigned to clinic successfully');
        },
        onError: (error: any) => {
          toast.error(error.response?.data?.message || 'Something went wrong');
        },
      }
    );
  };

  return (
    <Form<AssignClinicTypes>
      validationSchema={assignClinicSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'all',
      }}
    >
      {({ control, watch, formState: { errors } }) => {
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
              </div>
            </Flex>
            {!isView && (
              <FormFooter
                isLoading={isPending}
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
