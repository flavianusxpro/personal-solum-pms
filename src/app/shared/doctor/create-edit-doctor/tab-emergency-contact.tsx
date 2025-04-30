'use client';

import dynamic from 'next/dynamic';
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
import { useParams } from 'next/navigation';
import { useGetDoctorById, useUpdateDoctor } from '@/hooks/useDoctor';
import { IPayloadCreateEditDoctor } from '@/types/paramTypes';

export default function TabEmergencyContact({
  isView = false,
}: {
  isView?: boolean;
}) {
  const id = useParams<{ id: string }>().id;

  const { data: dataDoctor, refetch } = useGetDoctorById(id);
  const { mutate: mutateUpdateDoctor } = useUpdateDoctor();

  const onSubmit: SubmitHandler<EmergencyContactTypes> = (data) => {
    const payload: IPayloadCreateEditDoctor = {
      doctor_id: id ?? undefined,
      emergency_first_name: data.first_name,
      emergency_last_name: data.last_name,
      emergency_mobile_number: data.phone_number,
      emergency_email: data.email,
      emergency_relationship: data.relationship,
    };

    if (id) {
      return mutateUpdateDoctor(payload, {
        onSuccess: () => {
          toast.success('Doctor updated successfully');
          refetch;
        },
        onError: (error) => {
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
          first_name: dataDoctor?.emergency_first_name || '',
          last_name: dataDoctor?.emergency_last_name || '',
          email: dataDoctor?.emergency_email || '',
          phone_number: dataDoctor?.emergency_mobile_number || '',
          relationship: dataDoctor?.emergency_relationship || '',
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
