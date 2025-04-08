'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input } from 'rizzui';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';
import CSelect from '@/core/ui/select';
import { genderOption, stateOption } from '@/config/constants';
import {
  patientDetailsFormSchema,
  PatientDetailsFormTypes,
} from '@/validators/patient-details.schema';
import {
  useCreatePatient,
  useGetPatientById,
  useGetPatientProblem,
  useGetPatientTypes,
  useUpdatePatient,
} from '@/hooks/usePatient';
import { IPayloadCreateEditPatient } from '@/types/paramTypes';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

export default function PatientDetails({
  nextTab,
  isView,
}: {
  nextTab: () => void;
  isView?: boolean;
}) {
  const id = useParams<{ id: string }>().id;

  const [searchPatientProblem, setSearchPatientProblem] = useState('');
  const [searchPatientType, setSearchPatientType] = useState('');

  const { data: dataPatient } = useGetPatientById(id);
  const { data: dataPatientProblem } = useGetPatientProblem({
    search: searchPatientProblem,
  });
  const { data: dataPatientTypes } = useGetPatientTypes({
    search: searchPatientType,
  });

  const { mutate: mutateUpdatePatient } = useUpdatePatient();

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
      patient_id: id ?? undefined,
      first_name: data.first_name,
      last_name: data.last_name as string,
      email: data.email,
      password: data.password as string,
      address: '',
      date_of_birth: data.date_of_birth as string,
      gender: data.date_of_birth as string,
      medicare_card_number: data.medicare_card as string,
      medicare_expired_date: dayjs(data.medicare_expiry).format(
        'DD MMMM YYYY'
      ) as string,
      mobile_number: data.mobile_number as string,
      status: 1,
      timezone: data.timezone ?? 'Australia/Sydney',
      // patient_problem: data.patient_problem,
      // patient_type: data.patient_type,
    };

    if (id) {
      return mutateUpdatePatient(payload, {
        onSuccess: () => {
          toast.success('Patient updated successfully');
        },
        onError: (error) => {
          console.log('🚀 ~ PatientDetails ~ error:', error);
          const errorMessage =
            (error as any)?.response?.data?.message || 'An error occurred';
          toast.error(errorMessage);
        },
      });
    }
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
        if (dataPatient) {
          setValue('first_name', dataPatient.first_name);
          setValue('last_name', dataPatient.last_name);
          setValue('email', dataPatient.email);
          setValue('mobile_number', dataPatient.mobile_number);
          setValue('date_of_birth', dataPatient.date_of_birth);
          setValue('medicare_card', dataPatient.medicare_card_number);
          setValue(
            'medicare_expiry',
            dayjs(dataPatient.medicare_expired_date).format('YYYY-MM-DD')
          );
          // setValue('patient_problem', dataPatient.patient_problem);
          // setValue('patient_type', dataPatient.patient_type);
          // setValue('position_of_card', dataPatient.position_of_card);
          // setValue('country', dataPatient.country);
          // setValue('street', dataPatient.street);
          // setValue('suburb', dataPatient.suburb);
          // setValue('state', dataPatient.state);
          // setValue('post_code', dataPatient.post_code);
          // setValue('avatar', dataPatient.avatar);
        }

        return (
          <>
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
                        disabled={isView}
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
                    disabled={isView}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Phone Number" isLabel>
                  <Input
                    placeholder="Phone Number"
                    {...register('mobile_number')}
                    error={errors.mobile_number?.message}
                    disabled={isView}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Email" isLabel>
                  <Input
                    placeholder="Email"
                    {...register('email')}
                    error={errors.email?.message}
                    disabled={isView}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Medicare Card" isLabel>
                  <Input
                    placeholder="Medicare Card"
                    {...register('medicare_card')}
                    error={errors.medicare_card?.message}
                    disabled={isView}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="">
                  <Flex gap="4" justify="between" align="center">
                    <Input
                      label="Position of Card"
                      placeholder="Position of Card"
                      {...register('position_of_card')}
                      error={errors.position_of_card?.message}
                      disabled={isView}
                      className="flex-grow"
                    />
                    <Input
                      label="Expiry Date"
                      type="date"
                      placeholder="Expiry Date"
                      {...register('medicare_expiry')}
                      error={errors.medicare_expiry?.message}
                      className="flex-grow"
                      disabled={isView}
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
                        disabled={isView}
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
                        disabled={isView}
                        error={errors.patient_problem?.message as string}
                      />
                    )}
                  />
                </FormGroup>

                <FormGroup title="Your Photo" isLabel>
                  <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                    <AvatarUpload
                      name="avatar"
                      setValue={setValue}
                      getValues={getValues}
                      disabled={isView}
                      error={errors?.avatar?.message as string}
                    />
                  </div>
                </FormGroup>
              </div>

              <div className="mb-10 flex flex-col gap-7">
                <FormGroup title="Address" className="grid-cols-12" />
                <FormGroup title="Country" isLabel>
                  <Input
                    placeholder="Country"
                    {...register('country')}
                    error={errors.country?.message}
                    disabled={isView}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Street" isLabel>
                  <Input
                    placeholder="Street"
                    {...register('street')}
                    error={errors.street?.message}
                    disabled={isView}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Suburb" isLabel>
                  <Input
                    placeholder="Suburb"
                    {...register('suburb')}
                    error={errors.suburb?.message}
                    disabled={isView}
                    className="flex-grow"
                  />
                </FormGroup>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <FormGroup title="States" isLabel>
                      <Flex justify="between" align="center" gap="4">
                        <CSelect
                          {...field}
                          label="State"
                          placeholder="State"
                          className="group relative z-0"
                          options={stateOption}
                          error={errors.state?.message as string}
                          disabled={isView}
                        />
                        <Input
                          label="Post Code"
                          placeholder="Post Code"
                          {...register('post_code')}
                          error={errors.post_code?.message}
                          disabled={isView}
                          className="flex-grow"
                        />
                      </Flex>
                    </FormGroup>
                  )}
                />
              </div>
            </div>
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
