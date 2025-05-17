'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Loader } from 'rizzui';
import {
  settingNotificationReminderFormSchema,
  SettingNotificationReminderFormTypes,
} from '@/validators/setting-notification-reminder.schema';
import FormGroup from '@/app/shared/ui/form-group';
import StatusCard from '@/app/shared/ui/status-card';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import {
  useGetEmailNotificationSettings,
  useUpdateEmailNotificationSettings,
} from '@/hooks/useNotification';
import { IPayloadUpdateEmailNotificationSettings } from '@/types/paramTypes';
import { useGetEmailTemplates } from '@/hooks/useTemplate';
import { useMemo, useState } from 'react';
import CSelect from '@/app/shared/ui/select';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
});

export default function Setup() {
  const { data: dataEmailTemplates } = useGetEmailTemplates({
    page: 1,
    perPage: 100,
  });

  const {
    data: dataEmailNotificationSettings,
    isLoading: isLoadingGetEmailNotification,
  } = useGetEmailNotificationSettings();

  const {
    mutate: mutateUpdateEmailNotification,
    isPending: isPendingEmailNotification,
  } = useUpdateEmailNotificationSettings();

  const emailTemplateOptions = useMemo(() => {
    if (!dataEmailTemplates) return [];
    return dataEmailTemplates.map((template) => ({
      label: template.name,
      value: template.html,
    }));
  }, [dataEmailTemplates]);

  const onSubmit: SubmitHandler<SettingNotificationReminderFormTypes> = (
    data
  ) => {
    const emailPayload: IPayloadUpdateEmailNotificationSettings = {
      booking_confirmation_email_status:
        data.booking_confirmation_email_status || false,
      booking_confirmation_email_html:
        data.booking_confirmation_email_html || '',
      account_created_email_status: data.account_created_email_status || false,
      account_created_email_html: data.account_created_email_html || '',
      account_verification_email_status:
        data.account_verification_email_status || false,
      account_verification_email_html:
        data?.account_verification_email_html || '',
      birthday_email_status: data.birthday_email_status || false,
      birthday_email_html: data.birthday_email_html || '',
      forgot_password_email_status: data?.forgot_password_email_status || false,
      forgot_password_email_html: data.forgot_password_email_html || '',
      payment_confirmation_email_status:
        data.payment_confirmation_email_status || false,
      payment_confirmation_email_html:
        data.payment_confirmation_email_html || '',
      reschedule_email_status: data.reschedule_email_status || false,
      reschedule_email_html: data.reschedule_email_html || '',
      reminder_email_html: data.reminder_email_html || '',
      reminder_email_status: data.reminder_email_status || false,
    };

    mutateUpdateEmailNotification(emailPayload, {
      onSuccess: () => {
        toast.success('Email notification settings updated successfully');
      },
      onError: (error: any) => {
        toast.error(
          `Error updating email notification settings: ${error?.response?.data?.message}`
        );
      },
    });
  };

  if (isLoadingGetEmailNotification) {
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
          booking_confirmation_email_html:
            dataEmailNotificationSettings?.booking_confirmation_email_html ||
            '',

          reschedule_email_status:
            dataEmailNotificationSettings?.reschedule_email_status || false,
          reschedule_email_html:
            dataEmailNotificationSettings?.reschedule_email_html || '',

          account_created_email_html:
            dataEmailNotificationSettings?.account_created_email_html || '',

          booking_confirmation_email_status:
            dataEmailNotificationSettings?.booking_confirmation_email_status ||
            false,

          account_verification_email_status:
            dataEmailNotificationSettings?.account_verification_email_status ||
            false,
          forgot_password_email_html:
            dataEmailNotificationSettings?.forgot_password_email_html || '',

          account_verification_email_html:
            dataEmailNotificationSettings?.account_verification_email_html ||
            '',
          birthday_email_html:
            dataEmailNotificationSettings?.birthday_email_html || '',
          birthday_email_status:
            dataEmailNotificationSettings?.birthday_email_status || false,
          reminder_email_html:
            dataEmailNotificationSettings?.reminder_email_html || '',
          reminder_email_status:
            dataEmailNotificationSettings?.reminder_email_status || false,
        },
      }}
    >
      {({ register, control, setValue, watch, formState: { errors } }) => {
        return (
          <>
            <FormGroup
              title="Email Notification"
              description="Notification provider is used to send email notifications"
              className="mb-10 pt-7 @2xl:pt-9 @3xl:pt-11"
            />

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Booking Confirmation"
              content="Notification for booking confirmation"
              onSwitchChange={(checked) => {
                setValue('booking_confirmation_email_status', checked);
              }}
              switchValue={watch('booking_confirmation_email_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={emailTemplateOptions}
                  onChange={(value: string) =>
                    setValue('booking_confirmation_email_html', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="booking_confirmation_email_html"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    {...field}
                    label="Email Template"
                    className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  />
                )}
              />
            </StatusCard>

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Email Reschedule"
              content="Email notification for reschedule"
              onSwitchChange={(checked) => {
                setValue('reschedule_email_status', checked);
              }}
              switchValue={watch('reschedule_email_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={emailTemplateOptions}
                  onChange={(value: string) =>
                    setValue('reschedule_email_html', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="reschedule_email_html"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    {...field}
                    label="Email Template"
                    className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  />
                )}
              />
            </StatusCard>

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Payment Confirmation"
              content="Email notification for payment confirmation"
              onSwitchChange={(checked) => {
                setValue('payment_confirmation_email_status', checked);
              }}
              switchValue={watch('payment_confirmation_email_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={emailTemplateOptions}
                  onChange={(value: string) =>
                    setValue('payment_confirmation_email_html', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="payment_confirmation_email_html"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    {...field}
                    label="Email Template"
                    className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  />
                )}
              />
            </StatusCard>

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Account Verification"
              content="Email notification for account verification"
              onSwitchChange={(checked) => {
                setValue('account_verification_email_status', checked);
              }}
              switchValue={watch('account_verification_email_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={emailTemplateOptions}
                  onChange={(value: string) =>
                    setValue('account_verification_email_html', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="account_verification_email_html"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    {...field}
                    label="Email Template"
                    className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  />
                )}
              />
            </StatusCard>

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Forgot Password"
              content="Email notification for forgot password"
              onSwitchChange={(checked) => {
                setValue('forgot_password_email_status', checked);
              }}
              switchValue={watch('forgot_password_email_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={emailTemplateOptions}
                  onChange={(value: string) =>
                    setValue('forgot_password_email_html', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="forgot_password_email_html"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    {...field}
                    label="Email Template"
                    className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  />
                )}
              />
            </StatusCard>

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Birthday"
              content="Birthday notification for forgot password"
              onSwitchChange={(checked) => {
                setValue('birthday_email_status', checked);
              }}
              switchValue={watch('birthday_email_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={emailTemplateOptions}
                  onChange={(value: string) =>
                    setValue('birthday_email_html', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="birthday_email_html"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    {...field}
                    label="Email Template"
                    className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  />
                )}
              />
            </StatusCard>

            <FormGroup
              title="Email Reminder"
              description="Notification provider is used to send email notifications"
              className="mb-10 mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Reminder"
              content="Reminder for upcoming appointments"
              onSwitchChange={(checked) => {
                setValue('reminder_email_status', checked);
              }}
              switchValue={watch('reminder_email_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={emailTemplateOptions}
                  onChange={(value: string) =>
                    setValue('reminder_email_html', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="reminder_email_html"
                control={control}
                render={({ field }) => (
                  <QuillEditor
                    {...field}
                    label="Email Template"
                    className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                    labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                  />
                )}
              />
            </StatusCard>
            <FormFooter
              isLoading={isPendingEmailNotification}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </>
        );
      }}
    </Form>
  );
}
