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
import { useMemo } from 'react';
import CSelect from '@/app/shared/ui/select';
import { useProfile } from '@/hooks/useProfile';
import {
  extractBodyContent,
  wrapWithFullStructure,
} from '@/core/utils/email-template-helper';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
});

export default function Setup() {
  const { data: dataEmailTemplates } = useGetEmailTemplates({
    page: 1,
    perPage: 100,
  });

  const { data: dataProfile } = useProfile(true);

  const {
    data: dataEmailNotificationSettings,
    isLoading: isLoadingGetEmailNotification,
  } = useGetEmailNotificationSettings(dataProfile?.clinics[0].id);

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
    const fullHtmlBookingConfirmation = wrapWithFullStructure(
      data.booking_confirmation_email_html || ''
    );

    const fullHtmlReschedule = wrapWithFullStructure(
      data.reschedule_email_html || ''
    );

    const fullHtmlAccountCreated = wrapWithFullStructure(
      data.account_created_email_html || ''
    );

    const fullHtmlAccountVerification = wrapWithFullStructure(
      data.account_verification_email_html || ''
    );

    const fullHtmlBirthday = wrapWithFullStructure(
      data.birthday_email_html || ''
    );

    const fullHtmlForgotPassword = wrapWithFullStructure(
      data.forgot_password_email_html || ''
    );

    const fullHtmlPaymentConfirmation = wrapWithFullStructure(
      data.payment_confirmation_email_html || ''
    );

    const fullHtmlCancelled = wrapWithFullStructure(
      data.cancelled_email_html || ''
    );

    const fullHtmlRefund = wrapWithFullStructure(data.refund_email_html || '');

    const fullHtmlReminder = wrapWithFullStructure(
      data.reminder_email_html || ''
    );

    const emailPayload: IPayloadUpdateEmailNotificationSettings = {
      clinicId: dataProfile?.clinics[0].id,
      booking_confirmation_email_status:
        data.booking_confirmation_email_status || false,
      booking_confirmation_email_html: fullHtmlBookingConfirmation,
      account_created_email_status: data.account_created_email_status || false,
      account_created_email_html: fullHtmlAccountCreated,
      account_verification_email_status:
        data.account_verification_email_status || false,
      account_verification_email_html: fullHtmlAccountVerification,
      birthday_email_status: data.birthday_email_status || false,
      birthday_email_html: fullHtmlBirthday,
      forgot_password_email_status: data?.forgot_password_email_status || false,
      forgot_password_email_html: fullHtmlForgotPassword,
      payment_confirmation_email_status:
        data.payment_confirmation_email_status || false,
      payment_confirmation_email_html: fullHtmlPaymentConfirmation,
      reschedule_email_status: data.reschedule_email_status || false,
      reschedule_email_html: fullHtmlReschedule,
      reminder_email_html: fullHtmlReminder,
      reminder_email_status: data.reminder_email_status || false,
      refund_email_status: data.refund_email_status || false,
      refund_email_html: fullHtmlRefund,
      cancelled_email_status: data.cancelled_email_status || false,
      cancelled_email_html: fullHtmlCancelled,
    };

    mutateUpdateEmailNotification(
      {
        ...emailPayload,
      },
      {
        onSuccess: () => {
          toast.success('Email notification settings updated successfully');
        },
        onError: (error: any) => {
          toast.error(
            `Error updating email notification settings: ${error?.response?.data?.message}`
          );
        },
      }
    );
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
          booking_confirmation_email_html: extractBodyContent(
            dataEmailNotificationSettings?.booking_confirmation_email_html || ''
          ),

          reschedule_email_status:
            dataEmailNotificationSettings?.reschedule_email_status || false,
          reschedule_email_html: extractBodyContent(
            dataEmailNotificationSettings?.reschedule_email_html || ''
          ),

          account_created_email_html: extractBodyContent(
            dataEmailNotificationSettings?.account_created_email_html || ''
          ),

          booking_confirmation_email_status:
            dataEmailNotificationSettings?.booking_confirmation_email_status ||
            false,

          account_verification_email_status:
            dataEmailNotificationSettings?.account_verification_email_status ||
            false,

          payment_confirmation_email_status:
            dataEmailNotificationSettings?.payment_confirmation_email_status ||
            false,
          payment_confirmation_email_html: extractBodyContent(
            dataEmailNotificationSettings?.payment_confirmation_email_html || ''
          ),

          forgot_password_email_status:
            dataEmailNotificationSettings?.forgot_password_email_status ||
            false,
          forgot_password_email_html: extractBodyContent(
            dataEmailNotificationSettings?.forgot_password_email_html || ''
          ),

          account_verification_email_html: extractBodyContent(
            dataEmailNotificationSettings?.account_verification_email_html || ''
          ),
          birthday_email_html: extractBodyContent(
            dataEmailNotificationSettings?.birthday_email_html || ''
          ),
          birthday_email_status:
            dataEmailNotificationSettings?.birthday_email_status || false,
          reminder_email_html: extractBodyContent(
            dataEmailNotificationSettings?.reminder_email_html || ''
          ),
          reminder_email_status:
            dataEmailNotificationSettings?.reminder_email_status || false,

          cancelled_email_status:
            dataEmailNotificationSettings?.cancelled_email_status || false,
          cancelled_email_html: extractBodyContent(
            dataEmailNotificationSettings?.cancelled_email_html || ''
          ),
          refund_email_status:
            dataEmailNotificationSettings?.refund_email_status || false,
          refund_email_html: extractBodyContent(
            dataEmailNotificationSettings?.refund_email_html || ''
          ),
        },
      }}
    >
      {({ control, setValue, watch, formState: { errors } }) => {
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
                  <div>
                    <QuillEditor
                      {...field}
                      label="Email Template"
                      className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                    <div className="">
                      Variables:{' '}
                      {`{{Patient_Name}}, {{Doctor_Name}}, {{Appointment_Date}}, {{Appointment_Time}}, {{Clinic_Name}}, {{Appointment_Type}}, {{Clinic_Email}}, {{Clinic_Number}}, {{Clinic Address}}`}
                    </div>
                  </div>
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
                  <div>
                    <QuillEditor
                      {...field}
                      label="Email Template"
                      className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                    <div className="">
                      Variables:{' '}
                      {`{{Patient_Name}}, {{Doctor_Name}}, {{Appointment_Date}}, {{Appointment_Time}}, {{Clinic_Name}}, {{Appointment_Type}}, {{Clinic_Email}}, {{Clinic_Number}}, {{Clinic Address}}`}
                    </div>
                  </div>
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
                  <div>
                    <QuillEditor
                      {...field}
                      label="Email Template"
                      className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                    <div className="">
                      Variables:{' '}
                      {`{{Patient_Name}}, {{Doctor_Name}}, {{Appointment_Date}}, {{Appointment_Time}}, {{Clinic_Name}}, {{Appointment_Type}}, {{Clinic_Email}}, {{Clinic_Number}}, {{Clinic Address}}`}
                    </div>
                  </div>
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
                  <div>
                    <QuillEditor
                      {...field}
                      label="Email Template"
                      className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                    <div className="">
                      Variables:{' '}
                      {`{{Patient_Name}}, {{Doctor_Name}}, {{Appointment_Date}}, {{Appointment_Time}}, {{Clinic_Name}}, {{Appointment_Type}}, {{Clinic_Email}}, {{Clinic_Number}}, {{Clinic Address}}`}
                    </div>
                  </div>
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
                  <div>
                    <QuillEditor
                      {...field}
                      label="Email Template"
                      className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                    <div className="">
                      Variables:{' '}
                      {`{{Patient_Name}}, {{Doctor_Name}}, {{Appointment_Date}}, {{Appointment_Time}}, {{Clinic_Name}}, {{Appointment_Type}}, {{Clinic_Email}}, {{Clinic_Number}}, {{Clinic Address}}`}
                    </div>
                  </div>
                )}
              />
            </StatusCard>

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Cancelled"
              content="Cancelled notification for forgot password"
              onSwitchChange={(checked) => {
                setValue('cancelled_email_status', checked);
              }}
              switchValue={watch('cancelled_email_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={emailTemplateOptions}
                  onChange={(value: string) =>
                    setValue('cancelled_email_html', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="cancelled_email_html"
                control={control}
                render={({ field }) => (
                  <div>
                    <QuillEditor
                      {...field}
                      label="Email Template"
                      className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                    <div className="">
                      Variables:{' '}
                      {`{{Patient_Name}}, {{Doctor_Name}}, {{Appointment_Date}}, {{Appointment_Time}}, {{Clinic_Name}}, {{Appointment_Type}}, {{Clinic_Email}}, {{Clinic_Number}}, {{Clinic Address}}`}
                    </div>
                  </div>
                )}
              />
            </StatusCard>

            <StatusCard
              icon={<IoChevronDownCircleOutline />}
              meetName="Refund"
              content="Refund notification for forgot password"
              onSwitchChange={(checked) => {
                setValue('refund_email_status', checked);
              }}
              switchValue={watch('refund_email_status')}
              className="mb-10"
            >
              <Flex justify="end" className="">
                <CSelect
                  searchable
                  placeholder="Select Template"
                  options={emailTemplateOptions}
                  onChange={(value: string) =>
                    setValue('refund_email_html', value)
                  }
                  className="w-fit"
                />
              </Flex>
              <Controller
                name="refund_email_html"
                control={control}
                render={({ field }) => (
                  <div>
                    <QuillEditor
                      {...field}
                      label="Email Template"
                      className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                    <div className="">
                      Variables:{' '}
                      {`{{Patient_Name}}, {{Doctor_Name}}, {{Appointment_Date}}, {{Appointment_Time}}, {{Clinic_Name}}, {{Appointment_Type}}, {{Clinic_Email}}, {{Clinic_Number}}, {{Clinic Address}}`}
                    </div>
                  </div>
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
                  <div>
                    <QuillEditor
                      {...field}
                      label="Email Template"
                      className="@3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[400px]"
                      labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
                    />
                    <div className="">
                      Variables:{' '}
                      {`{{Patient_Name}}, {{Doctor_Name}}, {{Appointment_Date}}, {{Appointment_Time}}, {{Clinic_Name}}, {{Appointment_Type}}, {{Clinic_Email}}, {{Clinic_Number}}, {{Clinic Address}}`}
                    </div>
                  </div>
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
