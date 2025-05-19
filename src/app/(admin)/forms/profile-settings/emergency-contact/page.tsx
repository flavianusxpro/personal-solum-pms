'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
// import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import { Form } from '@core/ui/form';
import { Loader, Text, Input, Textarea } from 'rizzui';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/validators/personal-info.schema';
import { roles } from '@/data/forms/my-details';
// import UploadZone from '@core/ui/file-upload/upload-zone';
// import { countries, roles, timezones } from '@/data/forms/my-details';
// import AvatarUpload from '@core/ui/file-upload/avatar-upload';

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

export default function PersonalInfoView() {
  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  return (
    <Form<PersonalInfoFormTypes>
      validationSchema={personalInfoFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues,
      }}
    >
      {({ register, control, setValue, getValues, formState: { errors } }) => {
        return (
          <>
            <FormGroup
              title="Emergency Contact"
              description="Update your photo and personal details here"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <div>
                <FormGroup
                  title="First Name"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="First Name"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup
                  title="Last Name"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Last Name"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup
                  title="Phone Number"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Phone Number"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup
                  title="Email"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Email"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup
                  title="Role"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Controller
                    control={control}
                    name="role"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        dropdownClassName="!z-10 h-auto"
                        inPortal={false}
                        placeholder="Select Role"
                        options={roles}
                        onChange={onChange}
                        value={value}
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          roles?.find((r) => r.value === selected)?.label ?? ''
                        }
                        error={errors?.role?.message as string}
                      />
                    )}
                  />
                </FormGroup>
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
