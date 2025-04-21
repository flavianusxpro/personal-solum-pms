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

export default function TabTreatment() {
  const id = useParams<{ id: string }>().id;

  const { data: dataDoctor } = useGetDoctorById(id);
  const { mutate: mutateUpdatePatient } = useUpdateDoctor();

  const onSubmit: SubmitHandler<DoctorDetailsFormTypes> = (data) => {
    const payload: IPayloadCreateEditDoctor = {
      doctor_id: id ?? undefined,
      first_name: data.first_name,
      last_name: data.last_name as string,
      email: data.email,
      date_of_birth: data.date_of_birth as string,
      gender: data.date_of_birth as string,
      mobile_number: data.mobile_number as string,
      status: 1,
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
        return (
          <>
            <div className="grid grid-cols-1 gap-7 border-b border-dashed pb-10 @2xl:gap-9 @3xl:gap-11 md:grid-cols-2">
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
                <FormGroup title="Street Number" isLabel>
                  <Input
                    placeholder="Street"
                    {...register('street_number')}
                    error={errors.street_number?.message}
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
                <FormGroup title="Address Line 2" isLabel>
                  <Input
                    placeholder="Address Line 2"
                    {...register('address_line_2')}
                    error={errors.address_line_2?.message}
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
                        />
                      </Flex>
                    </FormGroup>
                  )}
                />
              </div>
            </div>

            <div className="mb-10 mt-5 flex flex-col gap-7">
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
                    />
                  )}
                />
                <Input
                  placeholder="Language"
                  {...register('language')}
                  error={errors.language?.message}
                  className="flex-grow"
                />
              </FormGroup>

              <FormGroup title="Your Photo" isLabel>
                <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                  <AvatarUpload
                    name="avatar"
                    setValue={setValue}
                    getValues={getValues}
                    error={errors?.avatar?.message as string}
                  />
                </div>
              </FormGroup>
            </div>
            <FormFooter
              // isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </>
        );
      }}
    </Form>
  );
}
