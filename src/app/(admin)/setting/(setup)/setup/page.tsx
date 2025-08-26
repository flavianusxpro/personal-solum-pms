'use client';

import { useParams } from 'next/navigation';
import { Controller, SubmitHandler } from 'react-hook-form';
import { useEffect } from 'react';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Input, Loader, Switch, Text, Textarea } from 'rizzui';
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
import { daysOptions } from '@/config/constants';
import CSelect from '@/app/shared/ui/select';
import dayjs from 'dayjs';
import { IGetClinicByIdResponse } from '@/types/ApiResponse';

export default function Setup() {
  const { id } = useParams();
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { data: dataprofile } = useProfile(true);

  const {
    data: clinicSetupData,
    refetch,
    isLoading: isLoadingSetup,
  } = useGetClinicById(dataprofile?.clinics[0].id);

  const { mutate: mutateUpdateSetup, isPending: isPendingUpdate } =
    usePutUpdateClinic();

  // Initialize form data for clinic schedules (24-hour format)
  const defaultSchedules = [
    {
      day: 1, // Monday
      start_hour: new Date('1970-01-01T09:00:00'), // 09:00
      end_hour: new Date('1970-01-01T17:00:00'), // 17:00
      is_open: true,
    },
    {
      day: 2, // Tuesday
      start_hour: new Date('1970-01-01T09:00:00'), // 09:00
      end_hour: new Date('1970-01-01T17:00:00'), // 17:00
      is_open: true,
    },
    {
      day: 3, // Wednesday
      start_hour: new Date('1970-01-01T09:00:00'), // 09:00
      end_hour: new Date('1970-01-01T17:00:00'), // 17:00
      is_open: true,
    },
    {
      day: 4, // Thursday
      start_hour: new Date('1970-01-01T09:00:00'), // 09:00
      end_hour: new Date('1970-01-01T17:00:00'), // 17:00
      is_open: true,
    },
    {
      day: 5, // Friday
      start_hour: new Date('1970-01-01T09:00:00'), // 09:00
      end_hour: new Date('1970-01-01T17:00:00'), // 17:00
      is_open: true,
    },
    {
      day: 6, // Saturday
      start_hour: new Date('1970-01-01T09:00:00'), // 09:00
      end_hour: new Date('1970-01-01T17:00:00'), // 17:00
      is_open: false,
    },
    {
      day: 0, // Sunday
      start_hour: new Date('1970-01-01T09:00:00'), // 09:00
      end_hour: new Date('1970-01-01T17:00:00'), // 17:00
      is_open: false,
    },
  ];

  const onSubmit: SubmitHandler<SettingSetupFormTypes> = (formValues) => {
    const validSchedules = formValues.clinic_schedules
      .filter(
        (schedule) =>
          schedule &&
          schedule.day !== undefined &&
          schedule.start_hour instanceof Date &&
          schedule.end_hour instanceof Date &&
          schedule.is_open !== undefined
      )
      .map((schedule) => ({
        day: schedule.day,
        start_hour: dayjs(schedule.start_hour).format('YYYY-MM-DD HH:mm:ss'),
        end_hour: dayjs(schedule.end_hour).format('YYYY-MM-DD HH:mm:ss'),
        is_open: schedule.is_open,
      }));

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
      clinic_schedules: validSchedules,
      client_timezone: localTimezone,
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

  const setupData = clinicSetupData?.data;

  // Helper function to normalize different time formats
  const normalizeTime = (timeValue: any): Date => {
    if (!timeValue) {
      return new Date();
    }

    if (timeValue instanceof Date) {
      return timeValue;
    }

    if (typeof timeValue === 'string') {
      // Handle different string formats
      const parsed = new Date(timeValue);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }

      // Try to parse time-only strings like "09:00" or "17:00" (24-hour format)
      const timeMatch = timeValue.match(/(\d{1,2}):(\d{2})/);
      if (timeMatch) {
        const hour = parseInt(timeMatch[1]);
        const minute = timeMatch[2];

        // Validate hour and minute ranges
        if (
          hour >= 0 &&
          hour <= 23 &&
          parseInt(minute) >= 0 &&
          parseInt(minute) <= 59
        ) {
          return new Date(
            `1970-01-01T${hour.toString().padStart(2, '0')}:${minute}:00`
          );
        }
      }
    }

    // Fallback to default
    return new Date();
  };

  // Helper function to get available days for selection
  const getAvailableDays = (currentSchedules: any[], excludeIndex?: number) => {
    const usedDays = new Set(
      currentSchedules
        .map((s, i) =>
          excludeIndex !== undefined && i !== excludeIndex ? s.day : null
        )
        .filter(Boolean)
    );
    const availableDays = daysOptions.filter((day) => !usedDays.has(day.value));

    return availableDays;
  };

  // Helper function to validate and fix duplicate days
  const validateAndFixSchedules = (schedules: any[]) => {
    const dayCounts = new Map<number, number>();
    const fixedSchedules = [...schedules];

    // Count occurrences of each day
    fixedSchedules.forEach((schedule: any, index: number) => {
      if (dayCounts.has(schedule.day)) {
        dayCounts.set(schedule.day, (dayCounts.get(schedule.day) || 0) + 1);
      } else {
        dayCounts.set(schedule.day, 1);
      }
    });

    // Fix duplicates by finding next available day
    fixedSchedules.forEach((schedule: any, index: number) => {
      if (dayCounts.get(schedule.day) && dayCounts.get(schedule.day)! > 1) {
        const availableDays = getAvailableDays(fixedSchedules, index);
        if (availableDays.length > 0) {
          schedule.day = availableDays[0].value;
          dayCounts.set(schedule.day, 1);
          const currentCount = dayCounts.get(schedule.day) || 0;
          dayCounts.set(schedule.day, Math.max(0, currentCount - 1));
        }
      }
    });

    return fixedSchedules;
  };

  // Helper function to parse clinic schedules from API response
  const parseClinicSchedules = (apiData?: IGetClinicByIdResponse['data']) => {
    if (
      !apiData?.clinic_schedules ||
      !Array.isArray(apiData.clinic_schedules)
    ) {
      return defaultSchedules;
    }

    const parsedSchedules = apiData.clinic_schedules.map(
      (schedule: any, index: number) => {
        // Use the helper function to normalize time values
        const startHour = normalizeTime(schedule.start_hour);
        const endHour = normalizeTime(schedule.end_hour);

        const parsedSchedule = {
          day: Number(schedule.day),
          start_hour: startHour,
          end_hour: endHour,
          is_open:
            typeof schedule.is_open === 'boolean' ? schedule.is_open : true,
        };

        return parsedSchedule;
      }
    );
    return parsedSchedules;
  };

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
          clinic_schedules: parseClinicSchedules(setupData),
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
              title="Clinic Schedules"
              description="Set your clinic opening and closing hours for each day"
              className="mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <FormGroup
              title="Schedules"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              isLabel
            >
              <div className="mb-10 grid grid-cols-1 gap-7 @2xl:gap-9 @3xl:gap-11">
                <div className="space-y-6">
                  {(() => {
                    const schedules = watch('clinic_schedules') || [];
                    return schedules
                      .filter(
                        (schedule) =>
                          schedule !== null &&
                          schedule !== undefined &&
                          typeof schedule === 'object' &&
                          'day' in schedule &&
                          'start_hour' in schedule &&
                          'end_hour' in schedule &&
                          'is_open' in schedule
                      )
                      .map((schedule, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-gray-200 p-6"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <Text className="text-lg font-semibold">
                              {daysOptions.find(
                                (day) => day.value === schedule.day
                              )?.label || `Day ${schedule.day}`}
                            </Text>
                            <div className="flex items-center gap-2">
                              <Switch
                                checked={schedule.is_open}
                                onChange={(e) =>
                                  setValue(
                                    `clinic_schedules.${index}.is_open`,
                                    e.target.checked
                                  )
                                }
                              />
                              <Text className="text-sm">
                                {schedule.is_open ? 'Open' : 'Closed'}
                              </Text>
                            </div>
                          </div>

                          {schedule.is_open && (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                              <div>
                                <Text className="mb-2 text-sm font-medium">
                                  Day
                                </Text>
                                <Controller
                                  control={control}
                                  name={`clinic_schedules.${index}.day`}
                                  render={({ field: dayField }) => {
                                    const currentSchedules =
                                      watch('clinic_schedules') || [];
                                    const availableDays = getAvailableDays(
                                      currentSchedules,
                                      index
                                    );

                                    return (
                                      <CSelect
                                        options={availableDays}
                                        placeholder="Select Day"
                                        className="w-full"
                                        {...dayField}
                                      />
                                    );
                                  }}
                                />
                              </div>

                              <div>
                                <Text className="mb-2 text-sm font-medium">
                                  Opening Time
                                </Text>
                                <DatePicker
                                  popperPlacement="top-start"
                                  selected={schedule.start_hour}
                                  onChange={(value) =>
                                    setValue(
                                      `clinic_schedules.${index}.start_hour`,
                                      value || new Date('1970-01-01T09:00:00') // 09:00
                                    )
                                  }
                                  showTimeSelect
                                  showTimeSelectOnly
                                  dateFormat="HH:mm"
                                  placeholderText="Start Time"
                                  className="w-full"
                                />
                              </div>

                              <div>
                                <Text className="mb-2 text-sm font-medium">
                                  Closing Time
                                </Text>
                                <DatePicker
                                  popperPlacement="top-start"
                                  selected={schedule.end_hour}
                                  onChange={(value) =>
                                    setValue(
                                      `clinic_schedules.${index}.end_hour`,
                                      value || new Date('1970-01-01T17:00:00') // 17:00
                                    )
                                  }
                                  showTimeSelect
                                  showTimeSelectOnly
                                  dateFormat="HH:mm"
                                  placeholderText="End Time"
                                  className="w-full"
                                />
                              </div>
                            </div>
                          )}

                          {schedules.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newSchedules = schedules.filter(
                                  (_, i) => i !== index
                                );
                                setValue('clinic_schedules', newSchedules);
                              }}
                              className="mt-4 text-sm font-medium text-red-600 hover:text-red-800"
                            >
                              Remove Day
                            </button>
                          )}
                        </div>
                      ));
                  })()}

                  {(() => {
                    const currentSchedules = watch('clinic_schedules') || [];
                    const usedDays = new Set(
                      currentSchedules.map((s) => s.day)
                    );
                    // Check if all 7 days (0-6) are used
                    const allDaysUsed = usedDays.size >= 7;
                    const availableDays = getAvailableDays(currentSchedules);

                    return (
                      <button
                        type="button"
                        disabled={allDaysUsed}
                        onClick={() => {
                          // Only allow adding if there are available days
                          if (availableDays.length > 0) {
                            const nextAvailableDay = availableDays[0]?.value;
                            setValue('clinic_schedules', [
                              ...currentSchedules,
                              {
                                day: nextAvailableDay,
                                start_hour: new Date('1970-01-01T09:00:00'), // 09:00
                                end_hour: new Date('1970-01-01T17:00:00'), // 17:00
                                is_open: true,
                              },
                            ]);
                          }
                        }}
                        className={`w-full rounded-lg border-2 border-dashed px-4 py-3 transition-colors ${
                          allDaysUsed
                            ? 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400'
                            : 'border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800'
                        }`}
                      >
                        {allDaysUsed
                          ? 'All 7 days have been added'
                          : `+ Add Another Day (${availableDays.length} days available)`}
                      </button>
                    );
                  })()}
                </div>
              </div>
            </FormGroup>

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
