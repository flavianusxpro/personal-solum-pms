'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input } from 'rizzui';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';
import CSelect from '@/core/ui/select';
import {
  doctorTypeOption,
  genderOption,
  languageOption,
  stateOption,
} from '@/config/constants';
import { IPayloadCreateEditDoctor } from '@/types/paramTypes';
import { useParams } from 'next/navigation';
import dayjs from 'dayjs';
import {
  doctorDetailsFormSchema,
  DoctorDetailsFormTypes,
} from '@/validators/doctor-details.schema';
import { useGetDoctorById, useUpdateDoctor } from '@/hooks/useDoctor';
import dynamic from 'next/dynamic';
import QuillLoader from '@/core/components/loader/quill-loader';
import SelectLoader from '@/core/components/loader/select-loader';
import Divider from '@/app/shared/ui/divider';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

const MultySelect = dynamic(
  () => import('rizzui').then((mod) => mod.MultiSelect),
  {
    ssr: false,
    loading: () => <SelectLoader />,
  }
);

export default function DoctorDetails({
  nextTab,
  isView,
}: {
  nextTab: () => void;
  isView?: boolean;
}) {
  const id = useParams<{ id: string }>().id;

  const { data: dataDoctor } = useGetDoctorById(id);
  const { mutate: mutateUpdatePatient } = useUpdateDoctor();

  const onSubmit: SubmitHandler<DoctorDetailsFormTypes> = (data) => {
    const payload: IPayloadCreateEditDoctor = {
      doctor_id: id ?? undefined,
      first_name: data.first_name,
      last_name: data.last_name as string,
      email: data.email,
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
    <Form<DoctorDetailsFormTypes>
      validationSchema={doctorDetailsFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        if (dataDoctor) {
          setValue('first_name', dataDoctor.first_name);
          setValue('last_name', dataDoctor.last_name);
          setValue('email', dataDoctor.email);
          setValue('mobile_number', dataDoctor.mobile_number);
          setValue('date_of_birth', dataDoctor.date_of_birth);
          // setValue('medicare_card', dataDoctor.medicare_card_number);
          // setValue(
          //   'medicare_expiry',
          //   dayjs(dataDoctor.medicare_expired_date).format('YYYY-MM-DD')
          // );
          // setValue('position_of_card', dataDoctor.position_of_card);
          // setValue('country', dataDoctor.country);
          // setValue('street', dataDoctor.street);
          // setValue('suburb', dataDoctor.suburb);
          // setValue('state', dataDoctor.state);
          // setValue('post_code', dataDoctor.post_code);
          // setValue('avatar', dataDoctor.avatar);
        }

        return (
          <>
            <div className="grid grid-cols-1 gap-7 @2xl:gap-9 @3xl:gap-11 md:grid-cols-2">
              <div className="section-container">
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
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Phone Number" isLabel>
                  <Input
                    placeholder="Phone Number"
                    {...register('mobile_number')}
                    error={errors.mobile_number?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>

                <FormGroup title="Email" isLabel>
                  <Input
                    placeholder="Email"
                    {...register('email')}
                    error={errors.email?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
              </div>

              <div className="section-container">
                <FormGroup title="Address" className="grid-cols-12" />
                <FormGroup title="Country" isLabel>
                  <Input
                    placeholder="Country"
                    {...register('country')}
                    error={errors.country?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Street Number" isLabel>
                  <Input
                    placeholder="Street"
                    {...register('street_number')}
                    error={errors.street_number?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Address Line 1" isLabel>
                  <Input
                    placeholder="Address Line 1"
                    {...register('address_line_1')}
                    error={errors.address_line_1?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Address Line 2" isLabel>
                  <Input
                    placeholder="Address Line 2"
                    {...register('address_line_2')}
                    error={errors.address_line_2?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <FormGroup title="Suburb" isLabel>
                  <Input
                    placeholder="Suburb"
                    {...register('suburb')}
                    error={errors.suburb?.message}
                    className="flex-grow"
                    disabled={isView}
                  />
                </FormGroup>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <FormGroup title="">
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
                          className="flex-grow"
                          disabled={isView}
                        />
                      </Flex>
                    </FormGroup>
                  )}
                />
              </div>
            </div>

            <Divider />

            <div className="section-container">
              <FormGroup
                title="Doctor Description"
                description="Tell us a little about yourself and what makes you unique as a doctor"
                className="grid-cols-12 gap-4"
              />
              <Controller
                name="about"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    {...field}
                    placeholder="About Doctor"
                    error={errors.about?.message}
                    className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[300px]"
                  />
                )}
              />
            </div>

            <Divider />

            <div className="section-container">
              <FormGroup title="Treatment Type" isLabel>
                <Controller
                  name="treatmentType"
                  control={control}
                  render={({ field }) => (
                    <CSelect
                      searchable
                      {...field}
                      placeholder="Select Doctor Type"
                      options={doctorTypeOption}
                      disabled={isView}
                      error={errors.treatmentType?.message}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup title="Specialist Type" isLabel>
                <Controller
                  name="specialistType"
                  control={control}
                  render={({ field }) => (
                    <CSelect
                      searchable
                      {...field}
                      placeholder="Select Specialist Type"
                      options={doctorTypeOption}
                      disabled={isView}
                      error={errors.specialistType?.message}
                    />
                  )}
                />
              </FormGroup>
              <FormGroup title="Medical Interest" isLabel>
                <Input
                  placeholder="Medical Interest"
                  {...register('medicalInterest')}
                  error={errors.medicalInterest?.message}
                  className="flex-grow"
                  disabled={isView}
                />
              </FormGroup>
              <FormGroup title="Language" isLabel>
                <Controller
                  name="language"
                  control={control}
                  render={({ field }) => (
                    <MultySelect
                      {...field}
                      onClear={() => field.onChange([])}
                      options={languageOption}
                      clearable
                      placeholder="Select Doctor"
                      error={errors.language?.message}
                      className="flex-grow"
                      disabled={isView}
                    />
                  )}
                />
                <Input
                  placeholder="Language"
                  {...register('language')}
                  error={errors.language?.message}
                  className="flex-grow"
                  disabled={isView}
                />
              </FormGroup>
            </div>

            <Divider />
            <div className="section-container">
              <FormGroup title="Your Photo" isLabel>
                <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                  <AvatarUpload
                    name="avatar"
                    setValue={setValue}
                    getValues={getValues}
                    error={errors?.avatar?.message as string}
                    disabled={isView}
                  />
                </div>
              </FormGroup>
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
