'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Title } from 'rizzui';
import CSelect from '@/core/ui/select';
import { genderOption, stateOption } from '@/config/constants';
import { IPayloadCreateEditPatient } from '@/types/paramTypes';
import toast from 'react-hot-toast';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import {
  patientDetailsFormSchema,
  PatientDetailsFormTypes,
} from '@/validators/patient-details.schema';
import {
  useCreatePatient,
  useGetPatientProblem,
  useGetPatientTypes,
} from '@/hooks/usePatient';
import { useMemo, useState } from 'react';

export default function CreatePatienModal() {
  const { closeModal } = useModal();

  const [searchPatientProblem, setSearchPatientProblem] = useState('');
  const [searchPatientType, setSearchPatientType] = useState('');

  const { data: dataPatientProblem } = useGetPatientProblem({
    search: searchPatientProblem,
  });
  const { data: dataPatientTypes } = useGetPatientTypes({
    search: searchPatientType,
  });
  const { mutate: mutateCreatePatient, isPending } = useCreatePatient();

  const patientProblemOptions = useMemo(
    () =>
      dataPatientProblem?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [dataPatientProblem]
  );

  const patientTypeOptions = useMemo(
    () =>
      dataPatientTypes?.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [dataPatientTypes]
  );

  const onSubmit: SubmitHandler<PatientDetailsFormTypes> = (data) => {
    const payload: IPayloadCreateEditPatient = {
      first_name: data.first_name,
      last_name: data.last_name as string,
      email: data.email,
      address: '',
      password: data.password,
      date_of_birth: data.date_of_birth as string,
      gender: data.date_of_birth as string,
      mobile_number: data.mobile_number as string,
      status: 1,
      timezone: data.timezone ?? 'Australia/Sydney',
      medicare_card_number: data.medicare_card as string,
      medicare_expired_date: data.medicare_expiry as string,
      // setValue('patient_problem', dataPatient.patient_problem);
      // setValue('patient_type', dataPatient.patient_type);
    };

    mutateCreatePatient(payload, {
      onSuccess: () => {
        toast.success('Patient created successfully');
        closeModal();
      },
      onError: (error) => {
        console.log('🚀 ~ PatientDetails ~ error:', error);
        const errorMessage =
          (error as any)?.response?.data?.message || 'An error occurred';
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Form<PatientDetailsFormTypes>
      validationSchema={patientDetailsFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title>Create Patient</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <div className="mb-10 grid grid-cols-1 gap-7 @2xl:gap-9 @3xl:gap-11 md:grid-cols-2">
              <div className="flex flex-col gap-7">
                <FormGroup
                  title="Personal Info"
                  className="grid-cols-12 gap-4"
                />
                <FormGroup title="First Name" isLabel>
                  <Input
                    placeholder="First Name"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Last Name" isLabel>
                  <Input
                    placeholder="Last Name"
                    {...register('last_name')}
                    error={errors.last_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Gender" isLabel>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label=""
                        placeholder="Select Gender"
                        options={genderOption}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup title="Birth of Date" isLabel>
                  <Input
                    placeholder="Birth of Dae"
                    type="date"
                    {...register('date_of_birth')}
                    error={errors.date_of_birth?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Phone Number" isLabel>
                  <Input
                    placeholder="Phone Number"
                    {...register('mobile_number')}
                    error={errors.mobile_number?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Email" isLabel>
                  <Input
                    placeholder="Email"
                    {...register('email')}
                    error={errors.email?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Medicare Card" isLabel>
                  <Input
                    placeholder="Medicare Card"
                    {...register('medicare_card')}
                    error={errors.medicare_card?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="" isLabel={false}>
                  <Flex gap="4" justify="between" align="center">
                    <Input
                      label="Position of Card"
                      placeholder="Position of Card"
                      {...register('position_of_card')}
                      error={errors.position_of_card?.message}
                      className="flex-grow"
                    />
                    <Input
                      label="Expiry Date"
                      type="date"
                      placeholder="Expiry Date"
                      {...register('medicare_expiry')}
                      error={errors.medicare_expiry?.message}
                      className="flex-grow"
                    />
                  </Flex>
                </FormGroup>
                <FormGroup title="Patient Type" isLabel>
                  <Controller
                    name="patient_type"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label=""
                        placeholder="Select Patient Type"
                        options={patientTypeOptions ?? []}
                        error={errors.patient_type?.message as string}
                      />
                    )}
                  />
                </FormGroup>

                <FormGroup title="Patient Problem" isLabel>
                  <Controller
                    name="patient_problem"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label=""
                        placeholder="Select Patient Type"
                        options={patientProblemOptions ?? []}
                        error={errors.patient_problem?.message as string}
                      />
                    )}
                  />
                </FormGroup>
              </div>

              <div className="mb-10 flex flex-col gap-7">
                <FormGroup title="Address" className="grid-cols-12" />
                <FormGroup title="Country" isLabel>
                  <Input
                    placeholder="Country"
                    {...register('country')}
                    error={errors.country?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Street" isLabel>
                  <Input
                    placeholder="Street"
                    {...register('street')}
                    error={errors.street?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Suburb" isLabel>
                  <Input
                    placeholder="Suburb"
                    {...register('suburb')}
                    error={errors.suburb?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="" isLabel={false}>
                  <Flex justify="between" align="center" gap="4">
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <CSelect
                          {...field}
                          label="State"
                          placeholder="State"
                          className="group relative z-0"
                          options={stateOption}
                          error={errors.state?.message as string}
                        />
                      )}
                    />
                    <Input
                      label="Post Code"
                      placeholder="Post Code"
                      {...register('post_code')}
                      error={errors.post_code?.message}
                      className="flex-grow"
                    />
                  </Flex>
                </FormGroup>
                <FormGroup title="Password" isLabel>
                  <Input
                    placeholder="Password"
                    {...register('password')}
                    error={errors.password?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
            </div>
            <FormFooter
              className="rounded-b-xl"
              isLoading={isPending}
              altBtnText="Cancel"
              submitBtnText="Save"
              isSticky={false}
            />
          </div>
        );
      }}
    </Form>
  );
}
