'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Grid, Input, Loader, Text, Textarea } from 'rizzui';
import CSelect from '@/core/ui/select';
import {
  emergencyContactSchema,
  EmergencyContactTypes,
} from '@/validators/emergency-contact.schema';
import { IPayloadCreateEditPatient } from '@/types/paramTypes';
import { useParams } from 'next/navigation';
import { useGetPatientById, useUpdatePatient } from '@/hooks/usePatient';

export default function TabActivity({ isView = false }: { isView?: boolean }) {
  const id = useParams<{ id: string }>().id;

  const { data: dataPatient, refetch: refetchGetDataPatient } =
    useGetPatientById(id);

  const { mutate: mutateUpdatePatient, isPending: isPendingUpdatePatient } =
    useUpdatePatient();

  const onSubmit: SubmitHandler<EmergencyContactTypes> = (data) => {
    const payload: IPayloadCreateEditPatient = {
      patient_id: id ?? undefined,
      emergency_first_name: data.first_name,
      emergency_last_name: data.last_name,
      emergency_mobile_number: data.phone_number,
      emergency_email: data.email,
      emergency_relationship: data.relationship,
    };

    if (id) {
      return mutateUpdatePatient(payload, {
        onSuccess: () => {
          toast.success('Patient updated successfully');
          refetchGetDataPatient();
        },
        onError: (error: any) => {
          console.log('🚀 ~ PatientDetails ~ error:', error);
          const errorMessage =
            (error as any)?.response?.data?.message || 'An error occurred';
          toast.error(errorMessage);
        },
      });
    }
  };

  return (
    <Form<EmergencyContactTypes>
      validationSchema={emergencyContactSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, watch, formState: { errors } }) => {
        return (
          <>
            <Flex direction="col" className="" gap="7">
              <FormGroup title="Activity" className="" />
            </Flex>
            {!isView && (
              <FormFooter
                isLoading={isPendingUpdatePatient}
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
