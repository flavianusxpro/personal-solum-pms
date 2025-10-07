'use client';

import dynamic from 'next/dynamic';
import { SubmitHandler } from 'react-hook-form';
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
import { Input, Loader, Text, Textarea } from 'rizzui';
// import UploadZone from '@core/ui/file-upload/upload-zone';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';

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
              title="Personal Info"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
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
                <FormGroup
                  title="Date of Birth"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Birth of Dae"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
              <div>
                {localStorage.getItem('role') === 'doctor' ? (
                  <>
                    <FormGroup
                      title="Specialist"
                      className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <Input
                        placeholder="Specialist"
                        {...register('first_name')}
                        error={errors.first_name?.message}
                        className="flex-grow"
                      />
                    </FormGroup>
                    <FormGroup
                      title="Gender"
                      className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <Input
                        placeholder="Gender"
                        {...register('first_name')}
                        error={errors.first_name?.message}
                        className="flex-grow"
                      />
                    </FormGroup>
                  </>
                ) : (
                  <>
                    <FormGroup
                      title="Medicare Card"
                      className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <Input
                        placeholder="Medicare Card"
                        {...register('first_name')}
                        error={errors.first_name?.message}
                        className="flex-grow"
                      />
                    </FormGroup>
                    <FormGroup
                      title="IHI Number"
                      className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                    >
                      <Input
                        placeholder="IHI Number"
                        {...register('first_name')}
                        error={errors.first_name?.message}
                        className="flex-grow"
                      />
                    </FormGroup>
                  </>
                )}
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
                  title="Your Photo"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                    <AvatarUpload
                      name="avatar"
                      setValue={setValue}
                      getValues={getValues}
                      error={errors?.avatar?.message as string}
                      path_name="avatar"
                    />
                  </div>
                </FormGroup>
              </div>
            </div>

            <FormGroup
              title="Adress"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <div>
                <FormGroup
                  title="Street"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Textarea
                    placeholder="Street"
                    // {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup
                  title="Suburb"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Suburb"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup
                  title="State"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="State"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup
                  title="Post Code"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Post Code"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>

              {/* <FormGroup
                title="Email Address"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  className="col-span-full"
                  prefix={
                    <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                  }
                  type="email"
                  placeholder="georgia.young@example.com"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </FormGroup>

              <FormGroup
                title="Your Photo"
                description="This will be displayed on your profile."
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                  <AvatarUpload
                    name="avatar"
                    setValue={setValue}
                    getValues={getValues}
                    error={errors?.avatar?.message as string}
                  />
                </div>
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

              <FormGroup
                title="Country"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="country"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      dropdownClassName="!z-10 h-auto"
                      inPortal={false}
                      placeholder="Select Country"
                      options={countries}
                      onChange={onChange}
                      value={value}
                      className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        countries?.find((con) => con.value === selected)
                          ?.label ?? ''
                      }
                      error={errors?.country?.message as string}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title="Timezone"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="timezone"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      dropdownClassName="!z-10 h-auto"
                      inPortal={false}
                      prefix={<PiClock className="h-6 w-6 text-gray-500" />}
                      placeholder="Select Timezone"
                      options={timezones}
                      onChange={onChange}
                      value={value}
                      className="col-span-full"
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        timezones?.find((tmz) => tmz.value === selected)
                          ?.label ?? ''
                      }
                      error={errors?.timezone?.message as string}
                    />
                  )}
                />
              </FormGroup>

              <FormGroup
                title="Bio"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="bio"
                  render={({ field: { onChange, value } }) => (
                    <QuillEditor
                      value={value}
                      onChange={onChange}
                      className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                  )}
                />
              </FormGroup> */}

              {/* <FormGroup
                title="Portfolio Projects"
                description="Share a few snippets of your work"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="mb-5 @3xl:col-span-2">
                  <UploadZone
                    name="portfolios"
                    getValues={getValues}
                    setValue={setValue}
                    error={errors?.portfolios?.message as string}
                  />
                </div>
              </FormGroup> */}
            </div>

            <FormGroup
              title="About Doctor"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Description"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Textarea
                  placeholder="Description"
                  // {...register('first_name')}
                  error={errors.first_name?.message}
                  className="flex-grow"
                />
              </FormGroup>
            </div>

            {/* <FormGroup
              title="Doctor Type"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Type"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="country"
                  render={({ field: { onChange, value } }) => {
                    const handleCheckboxChange = (selectedValue: string) => {
                      // Logic to add/remove selected country to the value array
                      const newValue = value.includes(selectedValue)
                        ? value.filter((item: string) => item !== selectedValue)
                        : [...value, selectedValue];
                      onChange(newValue);
                    };

                    return (
                      <div className="col-span-full">
                        <div className="dropdown">
                          <button className="dropdown-toggle">
                            Select Type
                          </button>
                          <div className="dropdown-menu">
                            {doctorType.map((country: any) => (
                              <div key={country.value} className="dropdown-item">
                                <Checkbox
                                  checked={value.includes(country.value)}
                                  onChange={() => handleCheckboxChange(country.value)}
                                  label={country.label}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        {errors?.country?.message && (
                          <span className="error-text">{errors?.country?.message}</span>
                        )}
                      </div>
                    );
                  }}
                />
              </FormGroup>
            </div> */}

            {/* <FormGroup
              title="Specialist Type"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Type"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  control={control}
                  name="country"
                  render={({ field: { onChange, value: any } }) => {
                    const handleCheckboxChange = (selectedValue: string) => {
                      // Logic to add/remove selected country to the value array
                      const newValue = value?.includes(selectedValue)
                        ? value?.filter((item: string) => item !== selectedValue)
                        : [...value, selectedValue];
                      onChange(newValue);
                    };

                    return (
                      <div className="col-span-full">
                        <div className="dropdown">
                          <button className="dropdown-toggle">
                            Select Type
                          </button>
                          <div className="dropdown-menu">
                            {specialistType.map((country: any) => (
                              <div key={country.value} className="dropdown-item">
                                <Checkbox
                                  checked={value.includes(country.value)}
                                  onChange={() => handleCheckboxChange(country.value)}
                                  label={country.label}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        {errors?.country?.message && (
                          <span className="error-text">{errors?.country?.message}</span>
                        )}
                      </div>
                    );
                  }}
                />
              </FormGroup>
            </div> */}

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
