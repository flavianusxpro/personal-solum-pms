'use client';

import { useParams } from 'next/navigation';
import { Controller, SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input, Loader, Switch, Text, Textarea } from 'rizzui';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import { FiAlertCircle } from 'react-icons/fi';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';
import { DatePicker } from '@/core/ui/datepicker';
import {
  settingSetupFormSchema,
  SettingSetupFormTypes,
} from '@/validators/setting-setup.schema';
import { useGetClinicById, usePutUpdateClinic } from '@/hooks/useClinic';
import { IPayloadCreateUpdateClinic } from '@/types/paramTypes';
import { useProfile } from '@/hooks/useProfile';

export default function Setup() {
  const { id } = useParams();

  const { data: dataprofile } = useProfile(true);

  const {
    data: clinicSetupData,
    refetch,
    isLoading: isLoadingSetup,
  } = useGetClinicById(dataprofile?.clinics[0].id);

  const { mutate: mutateUpdateSetup, isPending: isPendingUpdate } =
    usePutUpdateClinic();

  const onSubmit: SubmitHandler<SettingSetupFormTypes> = (formValues) => {
    const payload: IPayloadCreateUpdateClinic = {
      id: dataprofile?.clinics?.[0]?.id?.toString(),
      name: formValues.clinic_name,
      email: formValues.clinic_email,
      mobile_number: formValues.phone_numbers,
      address: formValues.clinic_address,
      url_logo: formValues.logo,
      status: 1,
      default: true,
      frontend_url: formValues.frontend_url,
    };

    mutateUpdateSetup(
      { ...payload, id: dataprofile?.clinics?.[0]?.id?.toString() },
      {
        onSuccess: () => {
          refetch();
          toast.success('Clinic setup updated successfully');
        },
        onError: (error: any) => {
          toast.error(
            'Failed to update clinic setup: ',
            error?.response?.data?.message
          );
        },
      }
    );
  };

  // Helper function to convert string dates to Date objects
  const parseDate = (dateString?: string): globalThis.Date | undefined => {
    if (!dateString) return undefined;
    const date = new globalThis.Date(dateString);
    return isNaN(date.getTime()) ? undefined : date;
  };

  const setupData = clinicSetupData?.data;

  if (isLoadingSetup) {
    return <Loader />;
  }

  return (
    <Form<SettingSetupFormTypes>
      validationSchema={settingSetupFormSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          logo: setupData?.logo || '',
          clinic_name: setupData?.name || '',
          clinic_address: setupData?.address || '',
          phone_numbers: setupData?.mobile_number || '',
          clinic_email: setupData?.email || '',
          frontend_url: setupData?.frontend_url || '',
        },
      }}
    >
      {({
        register,
        control,
        watch,
        setValue,
        getValues,
        formState: { errors },
      }) => {
        return (
          <div className="flex flex-col gap-6">
            <FormGroup
              title="Clinic Information"
              description="Update your clinic logo, name, and contact details here"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <div>
                <FormGroup
                  title="Logo"
                  isLabel
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                    <AvatarUpload
                      name="logo"
                      setValue={setValue}
                      getValues={getValues}
                      error={errors?.logo?.message as string}
                    />
                  </div>
                </FormGroup>

                <FormGroup
                  isLabel
                  title="Clinic Name"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Clinic Name"
                    {...register('clinic_name')}
                    error={errors.clinic_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup
                  isLabel
                  title="Phone Number"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Phone Number"
                    {...register('phone_numbers')}
                    error={errors.phone_numbers?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup
                  isLabel
                  title="Email"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Email"
                    {...register('clinic_email')}
                    error={errors.clinic_email?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup
                  isLabel
                  title="Frontend URL"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Frontend URL"
                    {...register('frontend_url')}
                    error={errors.frontend_url?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>

              <div>
                <FormGroup
                  title="Logo Favicon"
                  isLabel
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <div className="flex flex-col gap-6 @container @3xl:col-span-2">
                    <AvatarUpload
                      name="favicon"
                      setValue={setValue}
                      getValues={getValues}
                      error={errors?.favicon?.message as string}
                    />
                  </div>
                </FormGroup>

                <FormGroup
                  title="Clinic Address"
                  isLabel
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Textarea
                    placeholder="Clinic Address"
                    {...register('clinic_address')}
                    error={errors.clinic_address?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup
                  title="Contact Details"
                  isLabel
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Contact Details"
                    {...register('contact_details')}
                    error={errors.contact_details?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup
                  title="Maps Location"
                  isLabel
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="Maps Location"
                    {...register('map_location')}
                    error={errors.map_location?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
            </div>

            <FormGroup
              title="Opening Hours"
              description="Set your clinic opening and closing hours"
              className="mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-1 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Clinic Hours"
                isLabel
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Flex className="w-full gap-4">
                  <DatePicker
                    popperPlacement="top-start"
                    selected={watch('clinic_opening_hours')}
                    onChange={(value) =>
                      setValue('clinic_opening_hours', value || undefined)
                    }
                    selectsStart
                    minDate={new Date()}
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="h:mm aa"
                    placeholderText="Start Time"
                    className="w-full"
                  />

                  <DatePicker
                    popperPlacement="top-start"
                    selected={watch('clinic_closing_hours')}
                    onChange={(value) =>
                      setValue('clinic_closing_hours', value || undefined)
                    }
                    selectsEnd
                    showTimeSelect
                    showTimeSelectOnly
                    dateFormat="h:mm aa"
                    placeholderText="End Time"
                    className="w-full"
                  />

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={watch('clinic_opening_status')}
                      onChange={(e) =>
                        setValue('clinic_opening_status', e.target.checked)
                      }
                    />
                    <Text>Open</Text>
                  </div>
                </Flex>
              </FormGroup>
            </div>

            <FormGroup
              title="SEO"
              description="Update your SEO details here"
              className="mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-1 gap-7 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Meta Title"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                isLabel
              >
                <Input
                  className="col-span-full"
                  placeholder="Meta Title"
                  {...register('meta_title')}
                  error={errors.meta_title?.message as string}
                  suffix={
                    <FiAlertCircle
                      color={errors.meta_title?.message ? 'red' : 'green'}
                    />
                  }
                  helperText={
                    <Text className="text-sm text-gray-500">
                      min. 50 / max. 65, Characters:{' '}
                      {watch('meta_title')?.length || 0}
                    </Text>
                  }
                />
              </FormGroup>

              <FormGroup
                title="Meta Description"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                isLabel
              >
                <Textarea
                  className="col-span-full"
                  placeholder="Meta Description"
                  {...register('meta_description')}
                  error={errors.meta_description?.message as string}
                  helperText={
                    <Text className="text-sm text-gray-500">
                      min. 50 / max. 65, Characters:{' '}
                      {watch('meta_description')?.length || 0}
                    </Text>
                  }
                />
              </FormGroup>
            </div>

            <FormGroup
              title="Social Media"
              description="Update your social media links here"
              className="mt-4 grid-cols-2 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-1 gap-7 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Facebook Link"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                isLabel
              >
                <Input
                  className="col-span-full"
                  placeholder="Facebook Link"
                  {...register('facebook_link')}
                  error={errors.facebook_link?.message as string}
                />
              </FormGroup>

              <FormGroup
                title="Instagram Link"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                isLabel
              >
                <Input
                  className="col-span-full"
                  placeholder="Instagram Link"
                  {...register('instagram_link')}
                  error={errors.instagram_link?.message as string}
                />
              </FormGroup>

              <FormGroup
                title="X Link"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                isLabel
              >
                <Input
                  className="col-span-full"
                  placeholder="X Link"
                  {...register('x_link')}
                  error={errors.x_link?.message as string}
                />
              </FormGroup>

              <FormGroup
                title="Tiktok Link"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                isLabel
              >
                <Input
                  className="col-span-full"
                  placeholder="Tiktok Link"
                  {...register('tiktok_link')}
                  error={errors.tiktok_link?.message as string}
                />
              </FormGroup>
            </div>

            <FormGroup
              title="Pop Up Notification"
              description="Update your pop up notification here"
              className="mt-4 grid-cols-2 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-1 gap-7 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Login Page"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                isLabel
              >
                <Switch
                  checked={watch('login_page_notification')}
                  onChange={(e) =>
                    setValue('login_page_notification', e.target.checked)
                  }
                />
              </FormGroup>

              <FormGroup
                title="After Login Page"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                isLabel
              >
                <Switch
                  checked={watch('after_login_notification')}
                  onChange={(e) =>
                    setValue('after_login_notification', e.target.checked)
                  }
                />
              </FormGroup>
            </div>

            <FormFooter
              isLoading={isPendingUpdate}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </div>
        );
      }}
    </Form>
  );
}
