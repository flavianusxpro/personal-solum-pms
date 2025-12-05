'use client';

import React from 'react';

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
import { PhoneNumber } from '@/core/ui/phone-input';
import dynamic from 'next/dynamic';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Divider from '../../ui/divider';
import { messages } from '@/config/messages';

dayjs.extend(customParseFormat);

export default function PatientDetails({ isView }: { isView?: boolean }) {
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
    perPage: 100,
    page: 1,
  });
  const { data: dataPatientTypes } = useGetPatientTypes({
    search: searchPatientType,
  });

  const { mutate: mutateUpdatePatient, isPending } = useUpdatePatient();

  const parsedPatientProblem: string[] =
    typeof dataPatient?.patient_problem === 'string'
      ? dataPatient.patient_problem === '{}' ||
        dataPatient.patient_problem === '[]' ||
        dataPatient.patient_problem === ''
        ? []
        : (dataPatient.patient_problem as string)
          .slice(1, -1)
          .split('","')
          .map((s) => s.replace(/^"|"$/g, ''))
      : Array.isArray(dataPatient?.patient_problem)
        ? dataPatient.patient_problem
        : [];

  const patientProblemOptions = useMemo(
    () =>
      dataPatientProblem?.data.map((item) => ({
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
      middle_name: data.middle_name,
      last_name: data.last_name as string,
      email: data.email,
      password: data.password as string,
      date_of_birth: data.date_of_birth as string,
      gender: data.gender as string,
      medicare_card_number: data.medicare_card as string,
      medicare_expired_date: dayjs(data.medicare_expiry).format(
        'DD MM YYYY'
      ) as string,
      mobile_number: ('+' + data.mobile_number) as string,
      status: 1,
      timezone: data.timezone ?? 'Australia/Sydney',
      country: data.country,
      position_on_card: data.position_on_card,
      patient_problem: data.patient_problem,
      patient_type: data.patient_type,
      street_name: data.street_name,
      state: data.state,
      suburb: data.suburb,
      postcode: data.post_code,
      unit_number: data.unit_number,
      photo: data.avatar,
      ihi_number: data.ihi_number,
      concession_card_type: data.concession_card_type,
      concession_card_number: data.concession_card_number,
      concession_card_expire_date: dayjs(data.concession_card_expiry).format(
        'DD MM YYYY'
      ),
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      is_australian_resident: data.is_australian_resident,
      dva_card_number: data.dva_card_number,
      dva_card_type: data.dva_card_type,
      address_type: data.address_type,
    };

    // console.log('payload ----------->', payload);

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
      onSubmit={(data) => {
        // console.log('=== FORM SUBMIT DEBUG ===');
        // console.log('Form data:', data);
        // console.log('is_australian_resident value:', data.is_australian_resident);
        // console.log('is_australian_resident type:', typeof data.is_australian_resident);
        // console.log('========================');
        onSubmit(data);
      }}
      className="@container"
      useFormProps={{
        mode: 'all',
        defaultValues: {
          title: dataPatient?.title ?? '',
          first_name: dataPatient?.first_name ?? '',
          middle_name: dataPatient?.middle_name ?? '',
          last_name: dataPatient?.last_name ?? '',
          email: dataPatient?.email ?? '',
          gender: dataPatient?.gender ?? '',
          mobile_number: dataPatient?.mobile_number?.replace('+', '') ?? '',
          date_of_birth:
            dataPatient?.date_of_birth &&
              dayjs(dataPatient.date_of_birth).isValid()
              ? dataPatient.date_of_birth
              : '',
          medicare_card: dataPatient?.medicare_card_number ?? '',
          medicare_expiry:
            dataPatient?.medicare_expired_date &&
              dayjs(dataPatient.medicare_expired_date, 'DD MM YYYY').isValid()
              ? dayjs(dataPatient.medicare_expired_date, 'DD MM YYYY').toDate()
              : undefined,
          patient_problem: parsedPatientProblem,
          patient_type: dataPatient?.patient_type || undefined,
          position_on_card: dataPatient?.position_on_card ?? '',
          country: dataPatient?.country ?? '',
          unit_number: dataPatient?.unit_number ?? '',
          street_name: dataPatient?.street_name ?? '',
          suburb: dataPatient?.suburb ?? '',
          state: dataPatient?.state ?? '',
          post_code: dataPatient?.postcode ?? '',
          avatar: dataPatient?.photo || undefined,
          ihi_number: dataPatient?.ihi_number ?? '',
          concession_card_expiry:
            dataPatient?.concession_card_type &&
              dayjs(dataPatient.concession_card_expire_date, 'DD MM YYYY').isValid()
              ? dayjs(dataPatient.concession_card_expire_date, 'DD MM YYYY').toDate()
              : undefined,
          concession_card_number: dataPatient?.concession_card_number ?? '',
          concession_card_type: dataPatient?.concession_card_type ?? '',
          address_line_1: dataPatient?.address_line_1 ?? '',
          address_line_2: dataPatient?.address_line_2 ?? '',
          is_australian_resident: (dataPatient as any)?.is_australian_resident ?? false,
          dva_card_number: (dataPatient as any)?.dva_card_number ?? '',
          dva_card_type: (dataPatient as any)?.dva_card_type ?? '',
          address_type: (dataPatient as any)?.address_type ?? '',
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
        // Watch is_australian_resident to conditionally show required asterisks
        const isAustralianResident = watch('is_australian_resident');

        // Log form state for debugging
        // console.log('=== FORM STATE ===');
        console.log('Current errors:', errors);
        // console.log('Has errors:', Object.keys(errors).length > 0);
        // console.log('==================');

        return (
          <>
            {/* Personal Detail Section */}
            <div className="detail-form-container">
              <FormGroup
                title="Personal Detail"
                className="col-span-full gap-4"
              />

              <FormGroup title={<>Title{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      label=""
                      placeholder="Title"
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

              <FormGroup title={<>Gender{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      label=""
                      placeholder="Select Gender"
                      options={genderOption}
                      error={errors.gender?.message as string}
                      disabled={isView}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup title={<>First Name{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                <Input
                  placeholder="First Name"
                  {...register('first_name')}
                  error={errors.first_name?.message}
                  className="flex-grow"
                  disabled={isView}
                />
              </FormGroup>

              <FormGroup title="Middle Name" isLabel>
                <Input
                  placeholder="Middle Name"
                  {...register('middle_name')}
                  error={errors.middle_name?.message}
                  className="flex-grow"
                  disabled={isView}
                />
              </FormGroup>

              <FormGroup title={<>Last Name{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                <Input
                  placeholder="Last Name"
                  {...register('last_name')}
                  error={errors.last_name?.message}
                  className="flex-grow"
                  disabled={isView}
                />
              </FormGroup>

              <FormGroup title={<>Date of Birth{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                <Input
                  placeholder="09/09/1994"
                  type="date"
                  {...register('date_of_birth')}
                  error={errors.date_of_birth?.message}
                  disabled={isView}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup title={<>Phone Number{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                {/* <Controller
                  name="mobile_number"
                  control={control}
                  render={({ field }) => (
                    <PhoneNumber
                      {...field}
                      country="au"
                      preferredCountries={['au']}
                      placeholder="+61 766 5567 2456"
                      error={errors.mobile_number?.message}
                      disabled={isView}
                    />
                  )}
                /> */}
                <Input
                  {...register('mobile_number')}
                  placeholder="0412345678"
                  error={errors.mobile_number?.message}
                  disabled={isView}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup title={<>Email{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                <Input
                  placeholder="savantha.yuli@example.com"
                  {...register('email')}
                  error={errors.email?.message}
                  disabled={isView}
                  className="flex-grow"
                />
              </FormGroup>
            </div>

            <Divider />

            {/* Address Section */}
            <div className="detail-form-container">
              <FormGroup title="Address" className="col-span-full gap-4" />

              <FormGroup title={<>Address Type{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                <Controller
                  name="address_type"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      label=""
                      labelClassName="required"
                      placeholder="Home Address"
                      options={[
                        { label: 'Home Address', value: 'Home Address' },
                        { label: 'Work Address', value: 'Work Address' },
                        { label: 'Other', value: 'Other' },
                      ]}
                      disabled={isView}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup title={<>Street Address{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                <Input
                  placeholder="Street Address"
                  {...register('address_line_1')}
                  error={errors.address_line_1?.message}
                  disabled={isView}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup title="Address Line 2" isLabel>
                <Input
                  placeholder="Address Line 2"
                  {...register('address_line_2')}
                  error={errors.address_line_2?.message}
                  disabled={isView}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup title={<>City{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                <Input
                  placeholder="City"
                  {...register('suburb')}
                  error={errors.suburb?.message}
                  disabled={isView}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup title={<>Region{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                <Flex justify="between" align="center" gap="4">
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label=""
                        placeholder="state"
                        className="group relative z-0 flex-grow"
                        options={stateOption}
                        error={errors.state?.message as string}
                        disabled={isView}
                      />
                    )}
                  />
                  <Input
                    placeholder="post code"
                    {...register('post_code')}
                    error={errors.post_code?.message}
                    disabled={isView}
                    className="flex-grow"
                  />
                </Flex>
              </FormGroup>

              <FormGroup title={<>Country{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      label=""
                      placeholder="select country"
                      options={[
                        { label: 'Australia', value: 'Australia' },
                        { label: 'Other', value: 'Other' },
                      ]}
                      disabled={isView}
                    />
                  )}
                />
              </FormGroup>
            </div>

            <Divider />

            {/* Patient Details Section */}
            <div className="detail-form-container">
              <FormGroup title="Patient Details" className="col-span-full gap-4" />

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

              <FormGroup title="Patient Condition" isLabel>
                <Controller
                  name="patient_problem"
                  control={control}
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      label=""
                      placeholder="Select Patient Condition"
                      options={patientProblemOptions ?? []}
                      disabled={isView}
                      error={errors.patient_problem?.message as string}
                    />
                  )}
                />
              </FormGroup>
            </div>

            <Divider />

            {/* Healthcare Identifiers Section */}
            <div className="detail-form-container">
              <FormGroup title="Healthcare Identifiers Section" className="col-span-full gap-4" />

              <FormGroup title={<>Medicare Card{!isView && isAustralianResident && <span className="text-red-500"> *</span>}</>} isLabel>
                <Input
                  placeholder="12312323"
                  {...register('medicare_card')}
                  error={errors.medicare_card?.message}
                  disabled={isView}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup title={<>Medicare Info{!isView && isAustralianResident && <span className="text-red-500"> *</span>}</>} isLabel>
                <Flex gap="4" justify="between" align="center">
                  <Input
                    placeholder="Position on Card"
                    {...register('position_on_card')}
                    error={errors.position_on_card?.message}
                    disabled={isView}
                    className="flex-grow"
                  />
                  <DatePicker
                    inputProps={{
                      placeholder: '10/28',
                    }}
                    selected={watch('medicare_expiry')}
                    placeholderText="10/28"
                    onChange={(date) => {
                      if (!date) return;
                      setValue('medicare_expiry', date);
                    }}
                    showDateSelect={false}
                    showMonthYearPicker
                    minDate={new Date()}
                    dateFormat="MM/yy"
                    error={errors.medicare_expiry?.message}
                    disabled={isView}
                  />
                </Flex>
              </FormGroup>

              <FormGroup title="DVA Card Number" isLabel>
                <Input
                  placeholder="Card Number"
                  {...register('dva_card_number')}
                  disabled={isView}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup title="DVA Card Type" isLabel>
                <Controller
                  name="dva_card_type"
                  control={control}
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      label=""
                      placeholder="Select DVA Card Type"
                      options={[
                        { label: 'Gold Card', value: 'Gold Card' },
                        { label: 'White Card', value: 'White Card' },
                        { label: 'Orange Card', value: 'Orange Card' },
                      ]}
                      disabled={isView}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup title={<>IHI Number{!isView && isAustralianResident === false && <span className="text-red-500"> *</span>}</>} isLabel>
                <Input
                  placeholder="ihi number"
                  {...register('ihi_number')}
                  error={errors.ihi_number?.message}
                  disabled={isView}
                  className="flex-grow"
                />
              </FormGroup>


              <FormGroup title="Australian Resident" isLabel>
                <Controller
                  name="is_australian_resident"
                  control={control}
                  disabled={isView}
                  render={({ field }) => (
                    <CSelect
                      {...field}
                      placeholder="Select"
                      labelClassName="required"
                      className="group relative z-0 w-full"
                      options={[
                        { label: 'Yes', value: 'true' },
                        { label: 'No', value: 'false' },
                      ]}
                      error={errors.is_australian_resident?.message}
                      onChange={(value: any) => {
                        const boolValue = value === 'true';
                        field.onChange(boolValue);
                        setValue('is_australian_resident', boolValue, {
                          shouldValidate: true,
                          shouldDirty: true
                        });

                      }}
                      value={field.value ? 'true' : 'false'}
                    />
                  )}
                />
              </FormGroup>
            </div>

            <Divider />

            {/* Concession Card Section */}
            <div className="detail-form-container">
              <FormGroup title="Concession Card" className="col-span-full gap-4" />

              <FormGroup title="Card Type" isLabel>
                <Input
                  placeholder="Card Type"
                  {...register('concession_card_type')}
                  error={errors.concession_card_type?.message}
                  disabled={isView}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup title="Card Number" isLabel>
                <Input
                  placeholder="Card Number"
                  {...register('concession_card_number')}
                  error={errors.concession_card_number?.message}
                  disabled={isView}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup title="Expiry Date" isLabel>
                <DatePicker
                  selected={watch('concession_card_expiry')}
                  onChange={(date) => {
                    if (!date) return;
                    setValue('concession_card_expiry', date);
                  }}
                  placeholderText="Expiry Date"
                  showDateSelect={false}
                  showMonthYearPicker
                  minDate={new Date()}
                  dateFormat="MM/yy"
                  error={errors.concession_card_expiry?.message}
                  disabled={isView}
                />
              </FormGroup>
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
