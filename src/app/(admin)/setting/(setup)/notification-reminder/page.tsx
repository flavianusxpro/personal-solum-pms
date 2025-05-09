'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
// import { PiClock, PiEnvelopeSimple } from 'react-icons/pi';

import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Flex, Input, Loader, Text, Textarea } from 'rizzui';
import {
  settingNotificationReminderFormSchema,
  SettingNotificationReminderFormTypes,
} from '@/validators/setting-notification-reminder.schema';
import FormGroup from '@/app/shared/ui/form-group';
import StatusCard from '@/app/shared/ui/status-card';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import Divider from '@/app/shared/ui/divider';
import {
  useGetEmailNotificationSettings,
  useGetSmsNotificationSettings,
  useUpdateEmailNotificationSettings,
  useUpdateSmsNotificationSettings,
} from '@/hooks/useNotification';
import {
  IPayloadUpdateEmailNotificationSettings,
  IPayloadUpdateSmsNotificationSettings,
} from '@/types/paramTypes';
import { useGetEmailTemplates, useGetSmsTemplates } from '@/hooks/useTemplate';
import { useMemo, useState } from 'react';
import CSelect from '@/app/shared/ui/select';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
});

export default function Setup() {
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const { data: dataEmailTemplates } = useGetEmailTemplates({
    page: 1,
    perPage: 100,
  });
  const { data: dataSmsTemplates } = useGetSmsTemplates({
    page: 1,
    perPage: 100,
  });
  const {
    data: dataEmailNotificationSettings,
    isLoading: isLoadingGetEmailNotification,
  } = useGetEmailNotificationSettings();
  const {
    data: dataSmsNotificationSettings,
    isLoading: isLoadingGetSmsNotification,
  } = useGetSmsNotificationSettings();

  const { mutate: mutateUpdateEmailNotification } =
    useUpdateEmailNotificationSettings();
  const { mutate: mutateUpdateSmsNotification } =
    useUpdateSmsNotificationSettings();

  const emailTemplateOptions = useMemo(() => {
    if (!dataEmailTemplates) return [];
    return dataEmailTemplates.map((template) => ({
      label: template.name,
      value: template.html,
    }));
  }, [dataEmailTemplates]);

  const smsTemplateOptions = useMemo(() => {
    if (!dataSmsTemplates) return [];
    return dataSmsTemplates.map((template) => ({
      label: template.name,
      value: template.text,
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
    };

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

  if (isLoadingGetEmailNotification || isLoadingGetSmsNotification) {
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
          booking_confirmation_sms_text:
            dataSmsNotificationSettings?.booking_confirmation_sms_text || '',
          reschedule_email_status:
            dataEmailNotificationSettings?.reschedule_email_status || false,
          reschedule_email_html:
            dataEmailNotificationSettings?.reschedule_email_html || '',
          account_created_sms_status:
            dataSmsNotificationSettings?.account_created_sms_status || false,
          account_created_email_html:
            dataEmailNotificationSettings?.account_created_email_html || '',
          account_created_sms_text:
            dataSmsNotificationSettings?.account_created_sms_text || '',
          booking_confirmation_email_status:
            dataEmailNotificationSettings?.booking_confirmation_email_status ||
            false,
          booking_confirmation_sms_status:
            dataSmsNotificationSettings?.booking_confirmation_sms_status ||
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
        },
      }}
    >
      {({ register, control, setValue, watch, formState: { errors } }) => {
        return (
          <>
            <FormGroup
              title="Notification"
              description="Notification provider is used to send email and SMS notifications"
              className="mb-10 pt-7 @2xl:pt-9 @3xl:pt-11"
            />

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Booking Confirmation"
              content="notification for booking confirmation"
              className="mb-10"
              onSwitchChange={(checked) => {
                setShowBookingConfirmation(checked);
              }}
              switchValue={showBookingConfirmation}
            >
              <StatusCard
                icon={<IoChevronDownCircleOutline />}
                meetName="Email Booking Confirmation"
                content="Email notification for booking confirmation"
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
                meetName="Sms Booking Confirmation"
                content="Sms Notification for booking confirmation"
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
            </StatusCard>

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Reschedule"
              content="notification for reschedule"
              className="mb-10"
              onSwitchChange={(checked) => {
                setShowReschedule(checked);
              }}
              switchValue={showReschedule}
            >
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
            </StatusCard>

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Email Account Created"
              content="Email notification for account created"
              onSwitchChange={(checked) => {
                setValue('account_created_email_status', checked);
              }}
              switchValue={watch('account_created_email_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={emailTemplateOptions}
                  onChange={(value: string) =>
                    setValue('account_created_email_html', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="account_created_email_html"
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
              title="Reminder"
              description="Notification provider is used to send email and SMS notifications"
              className="mb-10 mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Coming Soon"
              className="mb-10"
              disabled
            >
              <></>
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
