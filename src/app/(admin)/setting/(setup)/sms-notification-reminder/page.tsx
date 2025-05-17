'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Loader, Text, Textarea } from 'rizzui';
import {
  settingNotificationReminderFormSchema,
  SettingNotificationReminderFormTypes,
} from '@/validators/setting-notification-reminder.schema';
import FormGroup from '@/app/shared/ui/form-group';
import StatusCard from '@/app/shared/ui/status-card';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import {
  useGetEmailNotificationSettings,
  useGetSmsNotificationSettings,
  useUpdateEmailNotificationSettings,
  useUpdateSmsNotificationSettings,
} from '@/hooks/useNotification';
import { IPayloadUpdateSmsNotificationSettings } from '@/types/paramTypes';
import { useGetSmsTemplates } from '@/hooks/useTemplate';
import { useMemo, useState } from 'react';
import CSelect from '@/app/shared/ui/select';

export default function Setup() {
  const { data: dataSmsTemplates } = useGetSmsTemplates({
    page: 1,
    perPage: 100,
  });
  const {
    data: dataSmsNotificationSettings,
    isLoading: isLoadingGetSmsNotification,
  } = useGetSmsNotificationSettings();

  const { mutate: mutateUpdateSmsNotification } =
    useUpdateSmsNotificationSettings();

  const smsTemplateOptions = useMemo(() => {
    if (!dataSmsTemplates) return [];
    return dataSmsTemplates.map((template) => ({
      label: template.name,
      value: template.text,
    }));
  }, [dataSmsTemplates]);

  const onSubmit: SubmitHandler<SettingNotificationReminderFormTypes> = (
    data
  ) => {
    const smsPayload: IPayloadUpdateSmsNotificationSettings = {
      booking_confirmation_sms_status:
        data?.booking_confirmation_sms_status || false,
      booking_confirmation_sms_text: data?.booking_confirmation_sms_text || '',
      reschedule_sms_status: data.reschedule_sms_status || false,
      reschedule_sms_text: data.reschedule_sms_text || '',
      account_created_sms_status: data.account_created_sms_status || false,
      account_created_sms_text: data.account_created_sms_text || '',
      payment_confirmation_sms_status:
        data.payment_confirmation_sms_status || false,
      payment_confirmation_sms_text: data?.payment_confirmation_sms_text || '',
      reminder_sms_status: data.reminder_sms_status || false,
      reminder_sms_text: data.reminder_sms_text || '',
    };

    mutateUpdateSmsNotification(smsPayload, {
      onSuccess: () => {
        toast.success('SMS notification settings updated successfully');
      },
      onError: (error: any) => {
        toast.error(
          `Error updating SMS notification settings: ${error?.response?.data?.message}`
        );
      },
    });
  };

  if (isLoadingGetSmsNotification) {
    return <Loader />;
  }

  return (
    <Form<SettingNotificationReminderFormTypes>
      validationSchema={settingNotificationReminderFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          booking_confirmation_sms_text:
            dataSmsNotificationSettings?.booking_confirmation_sms_text || '',
          reschedule_email_status:
            dataSmsNotificationSettings?.account_created_sms_status || false,
          account_created_sms_text:
            dataSmsNotificationSettings?.account_created_sms_text || '',
          booking_confirmation_sms_status:
            dataSmsNotificationSettings?.booking_confirmation_sms_status ||
            false,
          reminder_sms_status:
            dataSmsNotificationSettings?.reminder_sms_status || false,
          reminder_sms_text:
            dataSmsNotificationSettings?.reminder_sms_text || '',
        },
      }}
    >
      {({ register, control, setValue, watch, formState: { errors } }) => {
        return (
          <>
            <FormGroup
              title="Sms Notification"
              description="Notification provider is used to send sms notifications"
              className="mb-10 pt-7 @2xl:pt-9 @3xl:pt-11"
            />

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Booking Confirmation"
              content="Notification for booking confirmation"
              onSwitchChange={(checked) => {
                setValue('booking_confirmation_sms_status', checked);
              }}
              switchValue={watch('booking_confirmation_sms_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={smsTemplateOptions}
                  onChange={(value: string) =>
                    setValue('booking_confirmation_sms_text', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="booking_confirmation_sms_text"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="SMS Template"
                    className="mt-4"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    helperText={
                      <Text className="text-sm text-gray-500">
                        min. 50 / max. 65, Characters:{' '}
                        {watch('booking_confirmation_sms_text')?.length || 0}
                      </Text>
                    }
                  />
                )}
              />
            </StatusCard>

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Sms Reschedule"
              content="Sms Notification for reschedule"
              onSwitchChange={(checked) => {
                setValue('reschedule_sms_status', checked);
              }}
              switchValue={watch('reschedule_sms_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={smsTemplateOptions}
                  onChange={(value: string) =>
                    setValue('reschedule_sms_text', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="reschedule_sms_text"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="SMS Template"
                    className="mt-4"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    helperText={
                      <Text className="text-sm text-gray-500">
                        min. 50 / max. 65, Characters:{' '}
                        {watch('reschedule_sms_text')?.length || 0}
                      </Text>
                    }
                  />
                )}
              />
            </StatusCard>

            <FormGroup
              title="Sms Reminder"
              description="Notification provider is used to send sms notifications"
              className="mb-10 mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Reminder"
              content="Notification for reminder before the meeting"
              onSwitchChange={(checked) => {
                setValue('reminder_sms_status', checked);
              }}
              switchValue={watch('reminder_sms_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={smsTemplateOptions}
                  onChange={(value: string) =>
                    setValue('reminder_sms_text', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="reminder_sms_text"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="SMS Template"
                    className="mt-4"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    helperText={
                      <Text className="text-sm text-gray-500">
                        min. 50 / max. 65, Characters:{' '}
                        {watch('booking_confirmation_sms_text')?.length || 0}
                      </Text>
                    }
                  />
                )}
              />
            </StatusCard>

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
