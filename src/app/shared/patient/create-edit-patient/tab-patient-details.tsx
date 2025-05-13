'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input, Loader, Textarea } from 'rizzui';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';
import CSelect from '@/core/ui/select';
import { genderOption, stateOption } from '@/config/constants';
import {
  patientDetailsFormSchema,
  PatientDetailsFormTypes,
} from '@/validators/patient-details.schema';
import {
  useGetPatientById,
  useGetPatientProblem,
  useGetPatientTypes,
  useUpdatePatient,
} from '@/hooks/usePatient';
import { IPayloadCreateEditPatient } from '@/types/paramTypes';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { DatePicker } from '@/core/ui/datepicker';

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

  const {
    data: dataPatient,
    refetch: refetchGetDataPatient,
    isLoading: isLoadingGetDataPatient,
  } = useGetPatientById(id);

  const { data: dataPatientProblem } = useGetPatientProblem({
    search: searchPatientProblem,
  });
  const { data: dataPatientTypes } = useGetPatientTypes({
    search: searchPatientType,
  });

  const { mutate: mutateUpdatePatient, isPending } = useUpdatePatient();

  const patientProblemOptions = useMemo(
    () =>
      dataPatientProblem?.map((item) => ({
        label: item.name,
        value: item.name,
      })),
    [dataPatientProblem]
  );

  const patientTypeOptions = useMemo(
    () =>
      dataPatientTypes?.map((item) => ({
        label: item.name,
        value: item.name,
      })),
    [dataPatientTypes]
  );

  const onSubmit: SubmitHandler<PatientDetailsFormTypes> = (data) => {
    const payload: IPayloadCreateEditPatient = {
      patient_id: id ?? undefined,
      title: data.title,
      first_name: data.first_name,
      last_name: data.last_name as string,
      email: data.email,
      password: data.password as string,
      date_of_birth: data.date_of_birth as string,
      gender: data.gender as string,
      medicare_card_number: data.medicare_card as string,
      medicare_expired_date: dayjs(data.medicare_expiry).format(
        'MMMM YYYY'
      ) as string,
      mobile_number: data.mobile_number as string,
      status: 1,
      timezone: data.timezone ?? 'Australia/Sydney',
      country: data.country,
      potition_on_card: data.position_of_card,
      patient_problem: data.patient_problem,
      patient_type: data.patient_type,
      street_name: data.street_name,
      state: data.state,
      suburb: data.suburb,
      postcode: data.post_code,
      unit_number: data.unit_number,
    };

    if (id) {
      return mutateUpdatePatient(payload, {
        onSuccess: () => {
          toast.success('Patient updated successfully');
          refetchGetDataPatient();
        },
        onError: (error) => {
          const errorMessage =
            (error as any)?.response?.data?.message || 'An error occurred';
          toast.error(errorMessage);
        },
      });
    }
  };

  if (isLoadingGetDataPatient) return <Loader size="lg" />;

  return (
    <Form<PatientDetailsFormTypes>
      validationSchema={patientDetailsFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'all',
        defaultValues: {
          title: dataPatient?.title ?? '',
          first_name: dataPatient?.first_name ?? '',
          last_name: dataPatient?.last_name ?? '',
          email: dataPatient?.email ?? '',
          gender: dataPatient?.gender ?? '',
          mobile_number: dataPatient?.mobile_number ?? '',
          date_of_birth: dataPatient?.date_of_birth ?? '',
          medicare_card: dataPatient?.medicare_card_number ?? '',
          medicare_expiry: dataPatient?.medicare_expired_date
            ? dayjs(dataPatient.medicare_expired_date).toDate()
            : undefined,
          patient_problem: dataPatient?.patient_problem || undefined,
          patient_type: dataPatient?.patient_type || undefined,
          position_of_card: dataPatient?.potition_on_card ?? '',
          country: dataPatient?.country ?? '',
          unit_number: dataPatient?.unit_number ?? '',
          street_name: dataPatient?.street_name ?? '',
          // description: dataPatient?.description ?? '',
          suburb: dataPatient?.suburb ?? '',
          state: dataPatient?.state ?? '',
          post_code: dataPatient?.postcode ?? '',
          avatar: {
            name: `${dataPatient?.first_name}`,
            url: dataPatient?.photo || undefined,
          },
        },
      }}
    >
      {({
        register,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors },
      }) => {
        return (
          <>
            <div className="mb-10 grid grid-cols-1 gap-7 @2xl:gap-9 @3xl:gap-11 md:grid-cols-2">
              <div className="flex flex-col gap-7">
                <FormGroup
                  title="Personal Info"
                  className="grid-cols-12 gap-4"
                />
                <FormGroup title="Title" isLabel>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label=""
                        placeholder="Select Title"
                        options={[
                          { label: 'Mr', value: 'Mr' },
                          { label: 'Mrs', value: 'Mrs' },
                          { label: 'Ms', value: 'Ms' },
                        ]}
                        error={errors.title?.message as string}
                        disabled={isView}
                      />
                    )}
                  />
                </FormGroup>
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
                    <DatePicker
                      inputProps={{
                        label: 'Medicare Expiry Date',
                      }}
                      selected={watch('medicare_expiry')}
                      onChange={(date) => {
                        if (!date) return;
                        setValue('medicare_expiry', date);
                      }}
                      showDateSelect={false}
                      showMonthYearPicker
                      minDate={new Date()}
                      dateFormat="MM/YY"
                      error={errors.medicare_expiry?.message}
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
                <FormGroup title="Unit Number" isLabel>
                  <Input
                    placeholder="Unit Number"
                    {...register('unit_number')}
                    error={errors.unit_number?.message}
                    disabled={isView}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Street" isLabel>
                  <Input
                    placeholder="Street"
                    {...register('street_name')}
                    error={errors.street_name?.message}
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
                <FormGroup title="States" isLabel>
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
                          disabled={isView}
                        />
                      )}
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
                <FormGroup title="Description" isLabel>
                  <Input
                    placeholder="Description"
                    {...register('description')}
                    error={errors.description?.message}
                    disabled={isView}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Notes" isLabel>
                  <Textarea
                    placeholder="Notes"
                    {...register('notes')}
                    error={errors.notes?.message}
                    disabled={isView}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
            </div>
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
