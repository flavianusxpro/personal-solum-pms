'use client';

import dynamic from 'next/dynamic';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import { FiAlertCircle } from 'react-icons/fi';

import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import {
  ActionIcon,
  Button,
  Flex,
  Input,
  Loader,
  Switch,
  Text,
  Textarea,
} from 'rizzui';
import AvatarUpload from '@core/ui/file-upload/avatar-upload';
import {
  settingSetupFormSchema,
  SettingSetupFormTypes,
} from '@/validators/setting-setup.schema';
import { PiTrashBold } from 'react-icons/pi';
import { DatePicker } from '@/core/ui/datepicker';

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

export default function Setup() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<SettingSetupFormTypes>();

  const {
    fields: fieldsPhoneNumber,
    append: appendPhoneNumber,
    remove: removePhoneNumber,
  } = useFieldArray({
    control,
    name: 'phone_numbers',
  });

  const {
    fields: fieldsClinicAddress,
    append: appendClinicAddress,
    remove: removeClinicAdress,
  } = useFieldArray({
    control,
    name: 'clinic_address',
  });

  const onSubmit: SubmitHandler<SettingSetupFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  function addPhoneNumber() {
    appendPhoneNumber({
      phone_number: '',
    });
  }

  function addClinicAddress() {
    appendClinicAddress({
      address: '',
    });
  }

  const handleUpdateStartTime = (value: Date | null) => {
    if (!value) return;
    setValue('clinic_opening_hours', value);
  };

  const handleUpdateEndTime = (value: Date | null) => {
    if (!value) return;
    setValue('clinic_closing_hours', value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="@container">
      <FormGroup
        title="Clinic Information (not connected yet)"
        description="Update your photo and personal details here"
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
                name="avatar"
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
            {fieldsPhoneNumber.map((item, index) => (
              <Flex key={item.id} align="end" gap="2">
                <Input
                  placeholder="Phone Number"
                  label={`Phone Number ${index + 1}`}
                  {...register(`phone_numbers.${index}.phone_number`)}
                  error={errors.phone_numbers?.[index]?.phone_number?.message}
                  className="flex-grow"
                />

                <ActionIcon
                  color="secondary"
                  variant="flat"
                  onClick={() => removePhoneNumber(index)}
                >
                  <PiTrashBold className="h-4 w-4" />
                </ActionIcon>
              </Flex>
            ))}
            <Button className="w-fit" onClick={addPhoneNumber}>
              Add Number
            </Button>
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
                name="avatar"
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
            {fieldsClinicAddress.map((item, index) => (
              <Flex key={item.id} align="center" gap="2">
                <Textarea
                  key={item.id}
                  label={`Clinic Address ${index + 1}`}
                  placeholder="Clinic Address"
                  {...register(`clinic_address.${index}.address`)}
                  error={errors.clinic_address?.[index]?.message}
                  className="flex-grow"
                />

                <ActionIcon
                  color="secondary"
                  variant="flat"
                  onClick={() => removeClinicAdress(index)}
                >
                  <PiTrashBold className="h-4 w-4" />
                </ActionIcon>
              </Flex>
            ))}
            <Button className="w-fit" onClick={addClinicAddress}>
              Add Address
            </Button>
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
        description="Update your photo and personal details here"
        className="mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
      />

      <div className="mb-10 grid grid-cols-1 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
        <FormGroup
          title="Click Open Hours"
          isLabel
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Flex className="w-full">
            <DatePicker
              popperPlacement="top-start"
              selected={watch('clinic_opening_hours')}
              onChange={(value) => handleUpdateStartTime(value)}
              selectsStart
              // startDate={value}
              // endDate={endDateValue}
              minDate={new Date()}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="h:mm aa"
              // className="date-picker-event-calendar"
              placeholderText="Start Time"
              className="w-full"
            />

            <DatePicker
              popperPlacement="top-start"
              selected={watch('clinic_closing_hours')}
              onChange={(value) => handleUpdateEndTime(value)}
              selectsEnd
              // minDate={startDate}
              // startDate={startDateValue}
              // endDate={value}
              showTimeSelect
              showTimeSelectOnly
              dateFormat="h:mm aa"
              placeholderText="End Time"
              className="w-full"
            />

            <Switch
              checked={watch('clinic_opening_status')}
              onChange={(e) =>
                setValue('clinic_opening_status', e.target.checked)
              }
            />
          </Flex>
        </FormGroup>
      </div>

      <FormGroup
        title="SEO"
        description="Update your seo details here"
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
        // isLoading={isLoading}
        altBtnText="Cancel"
        submitBtnText="Save"
      />
    </form>
  );
}
