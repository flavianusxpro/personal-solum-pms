'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
// import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';
import FormGroup from '@/app/shared/ui/form-group';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/validators/personal-info.schema';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Input, Loader, Text, Textarea, Switch } from 'rizzui';
// import UploadZone from '@core/ui/file-upload/upload-zone';
// import { countries, roles, timezones } from '@/data/forms/my-details';
// import AvatarUpload from '@core/ui/file-upload/avatar-upload';

const types: any = [
  {
    label: 'SSL',
    value: 'SSL',
  },
  {
    label: 'TLS',
    value: 'TLS',
  },
  {
    label: 'STARTTLS',
    value: 'STARTTLS',
  },
  {
    label: 'No Security',
    value: 'No Security',
  },
];

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

export default function Communication() {
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
              title="SMTP Configuration"
              description="Update your photo and personal details here"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <div>
                <FormGroup
                  title="Email Address"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Click Open Hours"
                    // {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup
                  title="Email Server"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Click Open Hours"
                    // {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup
                  title="Email Port"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Click Open Hours"
                    // {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup
                  title="Security Type"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Controller
                    control={control}
                    name="role"
                    render={({ field: { value, onChange } }) => (
                      <Select
                        dropdownClassName="!z-10 h-auto"
                        inPortal={false}
                        placeholder="Select Type"
                        options={types}
                        onChange={onChange}
                        value={value}
                        className="col-span-full"
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          types?.find((t: any) => t.value === selected)
                            ?.label ?? ''
                        }
                        error={errors?.role?.message as string}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup
                  title="Email Password"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Email Password"
                    // {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
            </div>

            <FormGroup
              title="SMS Provider"
              description="Update your photo and personal details here"
              className="mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-6 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <div className="mt-6 flex w-full items-center gap-4">
                <Switch
                  label="Twillio"
                  variant="flat"
                  labelClassName="font-medium text-sm text-gray-900"
                />
                <Switch
                  label="AWS"
                  variant="flat"
                  labelClassName="font-medium text-sm text-gray-900"
                />
                <Switch
                  label="Google"
                  variant="flat"
                  labelClassName="font-medium text-sm text-gray-900"
                />
              </div>
            </div>

            <div className="mb-10 grid grid-cols-2 gap-7">
              <FormGroup
                title="API Address"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder="API Address"
                  // {...register('first_name')}
                  error={errors.first_name?.message}
                  className="flex-grow"
                />
              </FormGroup>
              <FormGroup
                title="ID"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder="ID"
                  // {...register('first_name')}
                  error={errors.first_name?.message}
                  className="flex-grow"
                />
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
