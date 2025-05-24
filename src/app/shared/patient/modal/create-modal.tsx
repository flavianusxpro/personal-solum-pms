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
  patientDetailsFormSchema,
  PatientDetailsFormTypes,
} from '@/validators/patient-details.schema';
import { useCreatePatient, useGetAllPatients } from '@/hooks/usePatient';
import dayjs from 'dayjs';
import { DatePicker } from '@/core/ui/datepicker';
import { PhoneNumber } from '@/core/ui/phone-input';
import FormHeader from '@/core/components/form-header';

export default function CreatePatienModal() {
  const { closeModal } = useModal();

  const { refetch } = useGetAllPatients({
    page: 1,
    perPage: 10,
  });

  const { mutate: mutateCreatePatient, isPending } = useCreatePatient();

  const onSubmit: SubmitHandler<PatientDetailsFormTypes> = (data) => {
    const payload: IPayloadCreateEditPatient = {
      title: data.title,
      first_name: data.first_name,
      last_name: data.last_name as string,
      email: data.email,
      password: data.password,
      date_of_birth: data.date_of_birth as string,
      gender: data.gender as string,
      mobile_number: ('+' + data.mobile_number) as string,
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
      potition_on_card: data.position_of_card,
      patient_type: 'New Patient',
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
    <Form<PatientDetailsFormTypes>
      validationSchema={patientDetailsFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="max-h-[90vh] overflow-y-auto rounded-xl bg-white @container"
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
                        error={errors?.gender?.message}
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
                  <Controller
                    name="mobile_number"
                    control={control}
                    render={({ field }) => (
                      <PhoneNumber
                        {...field}
                        country="au"
                        preferredCountries={['au']}
                        placeholder="Phone Number"
                        error={errors.mobile_number?.message}
                      />
                    )}
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
                <Input
                  type="number"
                  label="Position of Card"
                  placeholder="Position of Card"
                  {...register('position_of_card')}
                  error={errors.position_of_card?.message}
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
                  placeholderText="MM/YY"
                />
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
                <FormGroup title="Unit Number" isLabel>
                  <Input
                    placeholder="Unit Number"
                    {...register('unit_number')}
                    error={errors.unit_number?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Address Line 1" isLabel>
                  <Input
                    placeholder="Address Line 1"
                    {...register('address_line_1')}
                    error={errors.address_line_1?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Street" isLabel>
                  <Input
                    placeholder="Street"
                    {...register('street_name')}
                    error={errors.street_name?.message}
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
                <Flex
                  justify="between"
                  className="mt-0.5"
                  align="center"
                  gap="4"
                >
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
