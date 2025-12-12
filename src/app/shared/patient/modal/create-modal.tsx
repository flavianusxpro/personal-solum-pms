'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input } from 'rizzui';
import CSelect from '@/core/ui/select';
import { genderOption, stateOption } from '@/config/constants';
import { IPayloadCreateEditPatient } from '@/types/paramTypes';
import toast from 'react-hot-toast';
import { useModal } from '../../modal-views/use-modal';
import {
  patientCreateFormSchema,
  PatientCreateFormTypes,
  patientDetailsFormSchema,
  PatientDetailsFormTypes,
} from '@/validators/patient-details.schema';
import { useCreatePatient, useGetAllPatients } from '@/hooks/usePatient';
import dayjs from 'dayjs';
import { DatePicker } from '@/core/ui/datepicker';
import { PhoneNumber } from '@/core/ui/phone-input';
import FormHeader from '@/core/components/form-header';
import { useProfile } from '@/hooks/useProfile';

export default function CreatePatienModal() {
  const { closeModal } = useModal();

  const { data: dataProfile } = useProfile(true);
  const { refetch } = useGetAllPatients({
    page: 1,
    perPage: 10,
  });

  const { mutate: mutateCreatePatient, isPending } = useCreatePatient();

  const onSubmit: SubmitHandler<PatientCreateFormTypes> = (data) => {
    const payload: IPayloadCreateEditPatient = {
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      title: data.title,
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name as string,
      email: data.email,
      password: data.password,
      date_of_birth: data.date_of_birth as string,
      gender: data.gender as string,
      mobile_number: data.mobile_number as string,
      status: 1,
      timezone: data.timezone ?? 'Australia/Sydney',
      medicare_card_number: data.medicare_card as string,
      medicare_expired_date: dayjs(data.medicare_expiry).format('DD MM YYYY'),
      street_name: data.street_name,
      unit_number: data.unit_number,
      suburb: data.suburb,
      postcode: data.post_code,
      state: data.state,
      country: data.country,
      position_on_card: data.position_on_card,
      patient_type: 'New Patient',
      clinicId: dataProfile?.clinics[0].id,
    };

    mutateCreatePatient(payload, {
      onSuccess: () => {
        toast.success('Patient created successfully');
        refetch();
        closeModal();
      },
      onError: (error) => {
        const errorMessage =
          (error as any)?.response?.data?.message || 'An error occurred';
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Form<PatientCreateFormTypes>
      validationSchema={patientCreateFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="max-h-[60vh] overflow-y-auto rounded-xl bg-white @container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, setValue, watch, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 pt-2">
            <FormHeader title="Create Patient" />

            <div className="grid grid-cols-1 gap-x-7 gap-y-4 px-6">
              <div className="flex flex-col gap-7">
                <FormGroup
                  title="Personal Info"
                  className="grid-cols-12 gap-4"
                />

                <div className="flex flex-row items-start gap-2">
                  <FormGroup title="Title" isLabel className="flex-1">
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
                        />
                      )}
                    />
                  </FormGroup>
                  <FormGroup title="Gender" isLabel className="flex-1">
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <CSelect
                          {...field}
                          label=""
                          placeholder="Select Gender"
                          options={genderOption}
                          error={errors?.gender?.message}
                        />
                      )}
                    />
                  </FormGroup>
                </div>

                <div className="flex flex-row items-start gap-2">
                  <FormGroup title="First Name" isLabel className="flex-1">
                    <Input
                      placeholder="First Name"
                      {...register('first_name')}
                      error={errors.first_name?.message}
                      className="flex-grow"
                    />
                  </FormGroup>
                  <FormGroup title="Middle Name" isLabel className="flex-1">
                    <Input
                      placeholder="Middle Name"
                      {...register('middle_name')}
                      error={errors.middle_name?.message}
                      className="flex-grow"
                    />
                  </FormGroup>
                  <FormGroup title="Last Name" isLabel className="flex-1">
                    <Input
                      placeholder="Last Name"
                      {...register('last_name')}
                      error={errors.last_name?.message}
                      className="flex-grow"
                    />
                  </FormGroup>
                </div>

                <div className="flex flex-row items-start gap-2">
                  <FormGroup title="Date of Birth" isLabel className="flex-1">
                    <Input
                      placeholder="Date of Birth"
                      type="date"
                      {...register('date_of_birth')}
                      error={errors.date_of_birth?.message}
                      className="flex-grow"
                    />
                  </FormGroup>
                  <FormGroup title="Mobile Number" isLabel className="flex-1">
                    <Input
                      placeholder="Phone Number"
                      {...register('mobile_number')}
                      error={errors.mobile_number?.message}
                      className="flex-grow"
                    />
                  </FormGroup>
                </div>

                <div className="flex flex-row items-start gap-2">
                  <FormGroup title="Email" isLabel className="flex-1">
                    <Input
                      placeholder="Email"
                      {...register('email')}
                      error={errors.email?.message}
                      className="flex-grow"
                    />
                  </FormGroup>

                  <FormGroup title="Medicare Card" isLabel className="flex-1">
                    <Input
                      placeholder="Medicare Card"
                      {...register('medicare_card')}
                      error={errors.medicare_card?.message}
                      className="flex-grow"
                    />
                  </FormGroup>
                </div>

                <div className="flex flex-row items-start gap-2">
                  <Input
                    type="number"
                    label="Position of Card"
                    placeholder="Position of Card"
                    {...register('position_on_card')}
                    error={errors.position_on_card?.message}
                    className="flex-1 flex-grow"
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
                    placeholderText="MM/YY"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="mb-10 flex flex-col gap-7">
                <FormGroup title="Address" className="grid-cols-12" />

                {/* <div className="flex flex-col gap-2"> */}
                <FormGroup title="Address Line 1" isLabel className="flex-1">
                  <Input
                    placeholder="Address Line 1"
                    {...register('address_line_1')}
                    error={errors.address_line_1?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Address Line 2" isLabel className="flex-1">
                  <Input
                    placeholder="Address Line 2"
                    {...register('address_line_2')}
                    error={errors.address_line_2?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                {/* </div> */}

                <div className="flex flex-row gap-2">
                  <FormGroup title="Street" isLabel className="flex-1">
                    <Input
                      placeholder="Street"
                      {...register('street_name')}
                      error={errors.street_name?.message}
                      className="flex-grow"
                    />
                  </FormGroup>
                </div>

                <div className="mt-0.5 grid grid-cols-3 gap-2">
                  <FormGroup title="Suburb" isLabel className="flex-1">
                    <Input
                      placeholder="Suburb"
                      {...register('suburb')}
                      error={errors.suburb?.message}
                      className="flex-grow"
                    />
                  </FormGroup>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label="State"
                        placeholder="State"
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
                </div>
                <div className="flex flex-row gap-2">
                  <FormGroup title="Country" isLabel className="flex-1">
                    <Input
                      placeholder="Country"
                      {...register('country')}
                      error={errors.country?.message}
                      className="flex-grow"
                    />
                  </FormGroup>
                  <FormGroup title="Unit Number" isLabel className="flex-1">
                    <Input
                      placeholder="Unit Number"
                      {...register('unit_number')}
                      error={errors.unit_number?.message}
                      className="flex-grow"
                    />
                  </FormGroup>
                </div>
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
            />
          </div>
        );
      }}
    </Form>
  );
}
