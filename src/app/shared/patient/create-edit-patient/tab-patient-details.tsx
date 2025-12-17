'use client';

import React from 'react';
import { Controller, SubmitHandler, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Button, Flex, Input, Loader, Password, Textarea } from 'rizzui';
import CSelect from '@/core/ui/select';
import { genderOption, relationshipOption, stateOption } from '@/config/constants';
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
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Divider from '../../ui/divider';
import { FiPlus } from 'react-icons/fi';
import TrashIcon from '@/core/components/icons/trash';

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
      password: data.newPassword as string,
      date_of_birth: data.date_of_birth as string,
      gender: data.gender as string,
      medicare_card_number: data.medicare_card as string,
      medicare_expired_date: dayjs(data.medicare_expiry).format(
        'DD MM YYYY'
      ) as string,
      mobile_number: ('+' + data.mobile_number) as string,
      status: 1,
      timezone: data.timezone ?? 'Australia/Sydney',
      country: data.addresses[0].country,
      position_on_card: data.position_on_card,
      patient_problem: data.patient_problem,
      patient_type: data.patient_type,
      state: data.addresses[0].state,
      suburb: data.addresses[0].suburb,
      postcode: data.addresses[0].post_code,
      unit_number: data.unit_number,
      photo: data.avatar,
      ihi_number: data.ihi_number,
      concession_card_type: data.concession_card_type,
      concession_card_number: data.concession_card_number,
      concession_card_expire_date: dayjs(data.concession_card_expiry).format(
        'DD MM YYYY'
      ),
      address_line_1: data.addresses[0].address_line_1,
      address_line_2: data.addresses[0].address_line_2,
      is_australian_resident: data.is_australian_resident,
      dva_card_number: data.dva_card_number,
      dva_card_type: data.dva_card_type,
      address_type: data.addresses[0].address_type,
      emergency_first_name: data?.first_name_emergency_contact,
      emergency_last_name: data?.last_name_emergency_contact,
      emergency_mobile_number: data?.mobile_number_emergency_contact,
      emergency_email: data?.email_emergency_contact,
      emergency_relationship: data?.relationship_emergency_contact,
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
      onSubmit={(data) => {
        onSubmit(data);
      }}
      className="@container"
      useFormProps={{
        mode: 'all',
        defaultValues: {
          // Personal Detail
          title: dataPatient?.title ?? '',
          gender: dataPatient?.gender ?? '',
          first_name: dataPatient?.first_name ?? '',
          middle_name: dataPatient?.middle_name ?? '',
          last_name: dataPatient?.last_name ?? '',
          date_of_birth:
            dataPatient?.date_of_birth &&
              dayjs(dataPatient.date_of_birth).isValid()
              ? dataPatient.date_of_birth
              : '',
          mobile_number: dataPatient?.mobile_number?.replace('+61', '0') ?? '',
          email: dataPatient?.email ?? '',

          // Emergency Contact
          first_name_emergency_contact: dataPatient?.emergency_first_name || '',
          last_name_emergency_contact: dataPatient?.emergency_last_name || '',
          email_emergency_contact: dataPatient?.emergency_email || '',
          mobile_number_emergency_contact: dataPatient?.emergency_mobile_number || '',
          relationship_emergency_contact: dataPatient?.emergency_relationship || '',

          // Patient Details
          patient_type: dataPatient?.patient_type ?? null,
          patient_problem: parsedPatientProblem,

          // Password
          newPassword: '',
          confirmPassword: '',

          medicare_card: dataPatient?.medicare_card_number ?? '',
          medicare_expiry:
            dataPatient?.medicare_expired_date &&
              dayjs(dataPatient.medicare_expired_date, 'DD MM YYYY').isValid()
              ? dayjs(dataPatient.medicare_expired_date, 'DD MM YYYY').toDate()
              : undefined,
          position_on_card: dataPatient?.position_on_card ?? '',
          unit_number: dataPatient?.unit_number ?? '',
          avatar: dataPatient?.photo || undefined,
          ihi_number: dataPatient?.ihi_number ?? '',
          concession_card_expiry:
            dataPatient?.concession_card_type &&
              dayjs(dataPatient.concession_card_expire_date, 'DD MM YYYY').isValid()
              ? dayjs(dataPatient.concession_card_expire_date, 'DD MM YYYY').toDate()
              : undefined,
          concession_card_number: dataPatient?.concession_card_number ?? '',
          concession_card_type: dataPatient?.concession_card_type ?? '',
          is_australian_resident: (dataPatient as any)?.is_australian_resident ?? false,
          dva_card_number: (dataPatient as any)?.dva_card_number ?? '',
          dva_card_type: (dataPatient as any)?.dva_card_type ?? '',

          // address_type: (dataPatient as any)?.address_type ?? '',
          // address_line_1: dataPatient?.address_line_1 ?? '',
          // address_line_2: dataPatient?.address_line_2 ?? '',
          // suburb: dataPatient?.suburb ?? '',
          // state: dataPatient?.state ?? '',
          // post_code: dataPatient?.postcode ?? '',
          // country: dataPatient?.country ?? '',

          addresses: dataPatient?.addresses && dataPatient.addresses.length > 0
            ? dataPatient.addresses.map((addr, index) => {
              if (index === 0) {
                return {
                  address_type: addr.address_type ?? (dataPatient as any)?.address_type ?? '',
                  address_line_1: addr.address_line_1 ?? dataPatient?.address_line_1 ?? '',
                  address_line_2: addr.address_line_2 ?? dataPatient?.address_line_2 ?? '',
                  suburb: addr.suburb ?? dataPatient?.suburb ?? '',
                  state: addr.state ?? dataPatient?.state ?? '',
                  post_code: addr.post_code ?? dataPatient?.postcode ?? '',
                  country: addr.country ?? dataPatient?.country ?? '',
                };
              }
              return {
                address_type: addr.address_type ?? '',
                address_line_1: addr.address_line_1 ?? '',
                address_line_2: addr.address_line_2 ?? '',
                suburb: addr.suburb ?? '',
                state: addr.state ?? '',
                post_code: addr.post_code ?? '',
                country: addr.country ?? '',
              };
            })
            : [
              {
                address_type: (dataPatient as any)?.address_type ?? '',
                address_line_1: dataPatient?.address_line_1 ?? '',
                address_line_2: dataPatient?.address_line_2 ?? '',
                suburb: dataPatient?.suburb ?? '',
                state: dataPatient?.state ?? '',
                post_code: dataPatient?.postcode ?? '',
                country: dataPatient?.country ?? '',
              }
            ],
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
        const { fields, append, remove } = useFieldArray({
          control,
          name: 'addresses',
        });

        // Watch is_australian_resident to conditionally show required asterisks
        const isAustralianResident = watch('is_australian_resident');
        const relationShipValue = watch('relationship_emergency_contact');
        const isOther =
          relationShipValue === 'other' ||
          !relationshipOption.some(
            (option) => option.value === relationShipValue
          );
        return (
          <>
            {/* Personal Detail Section */}
            <div className="flex gap-6">
              <div className='flex-1 flex flex-col gap-6'>
                <h1 className='font-medium text-base'>
                  Personal Detail
                </h1>

                <div className='flex flex-col gap-4'>
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

                  <FormGroup title={<>Mobile Number{!isView && <span className="text-red-500"> *</span>}</>} isLabel>
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
              </div>

              <div className='flex-1 flex flex-col gap-6'>
                <div className='flex-1 flex flex-col gap-6'>
                  <h1 className='font-medium text-base'>
                    Emergency Contact
                  </h1>

                  <div className='flex flex-col gap-4'>
                    <FormGroup title="First Name" isLabel>
                      <Input
                        placeholder="First Name"
                        {...register('first_name_emergency_contact')}
                        error={errors.first_name_emergency_contact?.message}
                        className="flex-grow"
                        disabled={isView}
                      />
                    </FormGroup>

                    <FormGroup title="Last Name" isLabel>
                      <Input
                        placeholder="Last Name"
                        {...register('last_name_emergency_contact')}
                        error={errors.last_name_emergency_contact?.message}
                        className="flex-grow"
                        disabled={isView}
                      />
                    </FormGroup>

                    <FormGroup title="Mobile Number" isLabel>
                      <Input
                        placeholder="Mobile Number"
                        {...register('mobile_number_emergency_contact')}
                        type="number"
                        error={errors.mobile_number_emergency_contact?.message}
                        className="flex-grow"
                        disabled={isView}
                      />
                    </FormGroup>

                    <FormGroup title="Email" className="w-full" isLabel>
                      <Input
                        placeholder="Email"
                        {...register('email_emergency_contact')}
                        error={errors.email_emergency_contact?.message}
                        className="flex-grow"
                        disabled={isView}
                      />
                    </FormGroup>

                    <FormGroup title="Relationship" className="w-full" isLabel>
                      <Controller
                        name="relationship_emergency_contact"
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
                              error={errors.relationship_emergency_contact?.message}
                              className="flex-grow"
                              disabled={isView}
                            />
                            {isOther && (
                              <Input
                                placeholder="Specify Relationship"
                                {...register('relationship_emergency_contact')}
                                error={errors.relationship_emergency_contact?.message}
                                disabled={isView}
                                className="w-full"
                              />
                            )}
                          </Flex>
                        )}
                      />
                    </FormGroup>
                  </div>
                </div>
                {/* <div className='flex-1 flex flex-col gap-6'>
                  <h1 className='font-medium text-base'>
                    Patient Details
                  </h1>

                  <div className='flex flex-col gap-4'>
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
                </div> */}
              </div>
            </div>

            <Divider />

            <div className='flex-1 flex flex-col gap-6'>
              <h1 className='font-medium text-base'>
                Password
              </h1>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormGroup title="New Password" isLabel>
                  <Password
                    placeholder="Enter your new password"
                    size="lg"
                    className="[&>label>span]:font-medium"
                    inputClassName="text-sm"
                    {...register('newPassword')}
                    error={errors.newPassword?.message}
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Confirm New Password" isLabel>
                  <Password
                    placeholder="Enter confirm new password"
                    size="lg"
                    className="[&>label>span]:font-medium"
                    inputClassName="text-sm"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    disabled={isView}
                  />
                </FormGroup>
              </div>
            </div>

            <Divider />

            <div className='flex-1 flex flex-col gap-6'>
              <h1 className='font-medium text-base'>
                Address
              </h1>

              {fields.map((field, index) => (
                <div key={field.id}>
                  {fields.length > 1 && (
                    <div className="mb-4 flex items-center justify-end">
                      {!isView && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                          Remove
                        </button>
                      )}
                    </div>
                  )}

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-4'>
                      <FormGroup
                        title={
                          <>
                            Address Type {!isView && <span className="text-red-500"> *</span>}
                          </>
                        }
                        isLabel
                      >
                        <Controller
                          name={`addresses.${index}.address_type`}
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
                              error={errors?.addresses?.[index]?.address_type?.message}
                            />
                          )}
                        />
                      </FormGroup>

                      <FormGroup title="Address Line 2" isLabel>
                        <Input
                          placeholder="Address Line 2"
                          {...register(`addresses.${index}.address_line_2`)}
                          error={errors?.addresses?.[index]?.address_line_2?.message}
                          disabled={isView}
                          className="flex-grow"
                        />
                      </FormGroup>

                      <FormGroup
                        title={
                          <>
                            Region
                            {!isView && <span className="text-red-500"> *</span>}
                          </>
                        }
                        isLabel
                      >
                        <Flex justify="between" align="center" gap="4">
                          <Controller
                            name={`addresses.${index}.state`}
                            control={control}
                            render={({ field }) => (
                              <CSelect
                                {...field}
                                label=""
                                placeholder="state"
                                className="group relative z-0 flex-grow"
                                options={stateOption}
                                error={errors?.addresses?.[index]?.state?.message as string}
                                disabled={isView}
                              />
                            )}
                          />
                          <Input
                            placeholder="post code"
                            {...register(`addresses.${index}.post_code`)}
                            error={errors?.addresses?.[index]?.post_code?.message}
                            disabled={isView}
                            className="flex-grow"
                          />
                        </Flex>
                      </FormGroup>
                    </div>

                    <div className='flex flex-col gap-4'>
                      <FormGroup
                        title={
                          <>
                            Street Address
                            {!isView && <span className="text-red-500"> *</span>}
                          </>
                        }
                        isLabel
                      >
                        <Input
                          placeholder="Street Address"
                          {...register(`addresses.${index}.address_line_1`)}
                          error={errors?.addresses?.[index]?.address_line_1?.message}
                          disabled={isView}
                          className="flex-grow"
                        />
                      </FormGroup>

                      <FormGroup
                        title={
                          <>
                            City
                            {!isView && <span className="text-red-500"> *</span>}
                          </>
                        }
                        isLabel
                      >
                        <Input
                          placeholder="City"
                          {...register(`addresses.${index}.suburb`)}
                          error={errors?.addresses?.[index]?.suburb?.message}
                          disabled={isView}
                          className="flex-grow"
                        />
                      </FormGroup>

                      <FormGroup
                        title={
                          <>
                            Country
                            {!isView && <span className="text-red-500"> *</span>}
                          </>
                        }
                        isLabel
                      >
                        <Controller
                          name={`addresses.${index}.country`}
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
                              error={errors?.addresses?.[index]?.country?.message}
                            />
                          )}
                        />
                      </FormGroup>
                    </div>
                  </div>

                  {index < fields.length - 1 && (
                    <hr className="my-6 border-gray-200" />
                  )}
                </div>
              ))}

              {!isView && (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      append({
                        address_type: '',
                        address_line_1: '',
                        address_line_2: '',
                        suburb: '',
                        state: '',
                        post_code: '',
                        country: '',
                      });
                    }}
                  >
                    + Add Another Address
                  </Button>
                </div>
              )}
            </div>

            <Divider />

            <div className='flex-1 flex flex-col gap-6'>
              <h1 className='font-medium text-base'>
                Healthcare Identifiers Section
              </h1>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col gap-4'>
                  <FormGroup title={<>Medicare Card{!isView && isAustralianResident && <span className="text-red-500"> *</span>}</>} isLabel>
                    <Input
                      placeholder="12312323"
                      {...register('medicare_card')}
                      error={errors.medicare_card?.message}
                      disabled={isView}
                      className="flex-grow"
                    />
                  </FormGroup>
                  <FormGroup title="DVA Card Number" isLabel>
                    <Input
                      placeholder="Card Number"
                      {...register('dva_card_number')}
                      disabled={isView}
                      className="flex-grow"
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
                </div>
                <div className='flex flex-col gap-4'>
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
                            { label: 'Gold', value: 'Gold Card' },
                            { label: 'White', value: 'White Card' },
                            { label: 'Orange', value: 'Orange Card' },
                          ]}
                          disabled={isView}
                        />
                      )}
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
              </div>
            </div>

            <Divider />

            <div className='flex-1 flex flex-col gap-6 mb-6'>
              <h1 className='font-medium text-base'>
                Concession Card
              </h1>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='flex flex-col gap-4'>
                  <FormGroup title="Card Type" isLabel>
                    <Input
                      placeholder="Card Type"
                      {...register('concession_card_type')}
                      error={errors.concession_card_type?.message}
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
                <div className='flex flex-col gap-4'>
                  <FormGroup title="Card Number" isLabel>
                    <Input
                      placeholder="Card Number"
                      {...register('concession_card_number')}
                      error={errors.concession_card_number?.message}
                      disabled={isView}
                      className="flex-grow"
                    />
                  </FormGroup>
                </div>
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
