'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/form-group';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/validators/personal-info.schema';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input, Loader, Text, Textarea } from 'rizzui';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';
import CSelect from '@/core/ui/select';
import { genderOption, stateOption } from '@/config/constants';
import {
  patientDetailsFormSchema,
  PatientDetailsFormTypes,
} from '@/validators/patient-details.schema';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
});

export default function PatientDetails({ nextTab }: { nextTab: () => void }) {
  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
    nextTab();
  };

  return (
    <Form<PatientDetailsFormTypes>
      validationSchema={patientDetailsFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        console.log('errors ->', errors);

        return (
          <>
            <div className="mb-10 grid grid-cols-1 gap-7 @2xl:gap-9 @3xl:gap-11 md:grid-cols-2">
              <div className="flex flex-col gap-7">
                <FormGroup
                  title="Personal Info"
                  className="grid-cols-12 gap-4"
                />
                <FormGroup title="First Name">
                  <Input
                    placeholder="First Name"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Last Name">
                  <Input
                    placeholder="Last Name"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Gender">
                  <Controller
                    name="first_name"
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
                <FormGroup title="Birth of Date">
                  <Input
                    placeholder="Birth of Dae"
                    type="date"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Phone Number">
                  <Input
                    placeholder="Phone Number"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Email">
                  <Input
                    placeholder="Email"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup title="Medicare Card">
                  <Input
                    placeholder="Medicare Card"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="">
                  <Flex gap="4" justify="between" align="center">
                    <Input
                      label="Position of Card"
                      placeholder="Position of Card"
                      {...register('first_name')}
                      error={errors.first_name?.message}
                      labelClassName="text-base"
                      className="flex-grow"
                    />
                    <Input
                      label="Expiry Date"
                      type="date"
                      placeholder="Expiry Date"
                      {...register('first_name')}
                      error={errors.first_name?.message}
                      className="flex-grow"
                      labelClassName="text-base"
                    />
                  </Flex>
                </FormGroup>

                <FormGroup title="Your Photo">
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

              <div className="mb-10 flex flex-col gap-7">
                <FormGroup
                  title="Address"
                  className="grid-cols-12 gap-4 pt-4"
                />
                <FormGroup title="Country">
                  <Input
                    placeholder="Country"
                    // {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Street">
                  <Input
                    placeholder="Street"
                    // {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup title="Suburb">
                  <Input
                    placeholder="Suburb"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <FormGroup title="State">
                      <Flex justify="between" align="center" gap="4">
                        <CSelect
                          {...field}
                          label=""
                          placeholder="State"
                          className="group relative z-0"
                          options={stateOption}
                          error={errors.country?.message as string}
                          labelClassName="text-base font-medium"
                        />
                        <Input
                          label="Post Code"
                          placeholder="Post Code"
                          {...register('first_name')}
                          error={errors.first_name?.message}
                          labelClassName="text-base font-bold"
                          className="flex-grow"
                        />
                      </Flex>
                    </FormGroup>
                  )}
                />
              </div>
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
