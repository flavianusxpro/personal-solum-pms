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
import { relationshipOption } from '@/config/constants';
import { IPayloadCreateEditPatient } from '@/types/paramTypes';
import { useParams } from 'next/navigation';
import { useGetPatientById, useUpdatePatient } from '@/hooks/usePatient';

export default function TabEmergencyContact({
  isView = false,
}: {
  isView?: boolean;
}) {
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
        defaultValues: {
          first_name: dataPatient?.emergency_first_name || '',
          last_name: dataPatient?.emergency_last_name || '',
          email: dataPatient?.emergency_email || '',
          phone_number: dataPatient?.emergency_mobile_number || '',
          relationship: dataPatient?.emergency_relationship || '',
        },
      }}
    >
      {({ register, control, watch, formState: { errors } }) => {
        const relationShipValue = watch('relationship');
        const isOther =
          relationShipValue === 'other' ||
          !relationshipOption.some(
            (option) => option.value === relationShipValue
          );
        return (
          <>
            <Flex direction="col" className="" gap="7">
              <FormGroup title="Emergency Contact" className="" />
              <div className="mb-10 grid w-full grid-cols-2 gap-7">
                <Grid gap="7">
                  <FormGroup title="First Name" isLabel>
                    <Input
                      placeholder="First Name"
                      {...register('first_name')}
                      error={errors.first_name?.message}
                      className="flex-grow"
                      disabled={isView}
                    />
                  </FormGroup>

                  <FormGroup title="Last Name" isLabel>
                    <Input
                      placeholder="Last Name"
                      {...register('last_name')}
                      error={errors.last_name?.message}
                      className="flex-grow"
                      disabled={isView}
                    />
                  </FormGroup>

                  <FormGroup title="Phone Number" isLabel>
                    <Input
                      placeholder="Phone Number"
                      {...register('phone_number')}
                      type="number"
                      error={errors.phone_number?.message}
                      className="flex-grow"
                      disabled={isView}
                    />
                  </FormGroup>
                </Grid>

                <Flex direction="col" className="w-full" gap="7">
                  <FormGroup title="Email" className="w-full" isLabel>
                    <Input
                      placeholder="Email"
                      {...register('email')}
                      error={errors.email?.message}
                      className="flex-grow"
                      disabled={isView}
                    />
                  </FormGroup>

                  <FormGroup title="Relationship" className="w-full" isLabel>
                    <Controller
                      name="relationship"
                      control={control}
                      render={({ field }) => (
                        <Flex direction="col" className="w-full" gap="4">
                          <CSelect
                            {...field}
                            value={
                              relationshipOption.find(
                                (option) => option.value === field.value
                              )?.value ?? 'other'
                            }
                            options={relationshipOption}
                            placeholder="Relationship"
                            error={errors.relationship?.message}
                            className="flex-grow"
                            disabled={isView}
                          />
                          {isOther && (
                            <Input
                              placeholder="Specify Relationship"
                              {...register('relationship')}
                              error={errors.relationship?.message}
                              disabled={isView}
                              className="w-full"
                            />
                          )}
                        </Flex>
                      )}
                    />
                  </FormGroup>
                </Flex>
              </div>
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
