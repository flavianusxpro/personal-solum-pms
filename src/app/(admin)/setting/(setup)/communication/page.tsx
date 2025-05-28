'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Input, Loader, Switch, SelectOption, Flex } from 'rizzui';
import {
  settingCommunicationFormSchema,
  SettingCommunicationFormTypes,
} from '@/validators/setting-communication.schema';
import CSelect from '@/core/ui/select';
import cn from '@/core/utils/class-names';
import StatusCard from '@/app/shared/ui/status-card';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import { PhoneNumber } from '@/core/ui/phone-input';
import { useGetTwilioConfig, useUpdateTwilioConfig } from '@/hooks/useTwilio';
import {
  IPayloadUpdateAwsS3Config,
  IPayloadUpdateSmtpConfig,
  IPayloadUpdateTwilioConfig,
} from '@/types/paramTypes';
import { useGetSmtpConfig, useUpdateSmtpConfig } from '@/hooks/useSmpt';
import { useGetAwsS3Config, useUpdateAwsS3Config } from '@/hooks/useAws';

const types: SelectOption[] = [
  {
    label: 'SSL',
    value: 'ssl',
  },
  {
    label: 'TLS',
    value: 'tls',
  },
  {
    label: 'STARTTLS',
    value: 'starttls',
  },
  {
    label: 'No Security',
    value: 'no-security',
  },
];

export default function Communication() {
  const { data: dataSmtp, isLoading: isLoadingGetSmtp } = useGetSmtpConfig();
  const { data: dataTwilio, isLoading: isLoadingGetTwilio } =
    useGetTwilioConfig();
  const { data: dataAwsS3, isLoading: isLoadingGetAwsS3 } = useGetAwsS3Config();

  const { mutate: mutateUpdateSmtp, isPending: isPendingUpdateSmtp } =
    useUpdateSmtpConfig();
  const { mutate: mutateUpdateTwilio, isPending: isPendingUpdateTwilio } =
    useUpdateTwilioConfig();
  const { mutate: mutateUpdateAwsS3, isPending: isPendingUpdateAwsS3 } =
    useUpdateAwsS3Config();

  const onSubmit: SubmitHandler<SettingCommunicationFormTypes> = (data) => {
    const payloadTwilioConfig: IPayloadUpdateTwilioConfig = {
      account_id: data.twillio_id_key || '',
      auth_token: data.twillio_auth_token || '',
      from_number: data.twillio_phone_number || '',
      status: data.twillio_status || false,
    };

    const payloadSmtpConfig: IPayloadUpdateSmtpConfig = {
      smtp_host: data.smtp_host || '',
      mail_from: data.smtp_email_address || '',
      smtp_port: data.smtp_port || '',
      secure_type: data.smtp_security_type || '',
      smtp_username: data.smtp_username || '',
      smtp_password: data.smtp_password || '',
    };

    const payloadAwsS3Config: IPayloadUpdateAwsS3Config = {
      aws_access_id: data.aws_id || '',
      aws_secret_key: data.aws_secret_key || '',
      bucket: data.aws_bucket || '',
      region: data.aws_region || '',
      endpoint: data.aws_endpoint || '',
      status: data.aws_status || false,
    };

    mutateUpdateSmtp(payloadSmtpConfig, {
      onSuccess: () => {
        toast.success('SMTP configuration updated successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to update SMTP configuration: ' + error.response.data.message
        );
      },
    });

    mutateUpdateTwilio(payloadTwilioConfig, {
      onSuccess: () => {
        toast.success('Twilio configuration updated successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to update Twilio configuration: ' +
            error.response.data.message
        );
      },
    });

    mutateUpdateAwsS3(payloadAwsS3Config, {
      onSuccess: () => {
        toast.success('AWS S3 configuration updated successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to update AWS S3 configuration: ' +
            error.response.data.message
        );
      },
    });
  };

  if (isLoadingGetTwilio || isLoadingGetSmtp || isLoadingGetAwsS3) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <Form<SettingCommunicationFormTypes>
      validationSchema={settingCommunicationFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          smtp_host: dataSmtp?.data.smtp_host || '',
          smtp_port: dataSmtp?.data.smtp_port || '',
          smtp_email_address: dataSmtp?.data.mail_from || '',
          smtp_security_type: dataSmtp?.data.secure_type || '',
          smtp_username: dataSmtp?.data.smtp_username || '',
          smtp_password: dataSmtp?.data.smtp_password || '',
          twillio_id_key: dataTwilio?.data.account_id || '',
          twillio_auth_token: dataTwilio?.data.auth_token || '',
          twillio_phone_number: dataTwilio?.data.from_number || '',
          twillio_status: dataTwilio?.data.status || false,
          sms_provider_status: dataTwilio?.data.status || false,
          aws_id: dataAwsS3?.data.aws_access_id || '',
          aws_secret_key: dataAwsS3?.data.aws_secret_key || '',
          aws_bucket: dataAwsS3?.data.bucket || '',
          aws_region: dataAwsS3?.data.region || '',
          aws_endpoint: dataAwsS3?.data.endpoint || '',
          aws_status: dataAwsS3?.data.status || false,
        },
      }}
    >
      {({
        register,
        control,
        setValue,
        watch,
        formState: { errors, dirtyFields },
      }) => {
        return (
          <>
            <FormGroup
              title="SMTP Configuration"
              description="SMTP configuration is used to send email notifications"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />

            <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <div>
                <FormGroup
                  title="Host"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Host"
                    {...register('smtp_host')}
                    error={errors.smtp_host?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup
                  title="Email Address"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Email Address"
                    {...register('smtp_email_address')}
                    error={errors.smtp_email_address?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup
                  title="Email Port"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    type="number"
                    placeholder="Email Port"
                    {...register('smtp_port')}
                    error={errors.smtp_port?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup
                  title="Security Type"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Controller
                    control={control}
                    name="smtp_security_type"
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        placeholder="Select Type"
                        options={types}
                        className="col-span-full"
                        error={errors?.smtp_security_type?.message as string}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup
                  title="Username"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Smtp Username"
                    {...register('smtp_username')}
                    error={errors.smtp_username?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup
                  title="Password"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Smtp Password"
                    {...register('smtp_password')}
                    error={errors.smtp_password?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
            </div>

            <FormGroup
              title="AWS CONFIGURATION"
              description="AWS configuration"
              className="mb-10 mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />
            <div className="mb-10">
              <StatusCard
                icon={<IoChevronDownCircleOutline />}
                meetName="AWS S3 Configuration"
                content="AWS"
                onSwitchChange={(checked) => {
                  setValue('aws_status', checked);
                }}
                switchValue={watch('aws_status')}
                containClassName="grid grid-cols-2 gap-4"
              >
                <Input
                  label="AWS ID"
                  placeholder="AWS ID"
                  {...register('aws_id')}
                  error={errors.aws_id?.message}
                  className="flex-grow"
                />
                <Input
                  label="AWS Secret Key"
                  placeholder="AWS Secret Key"
                  {...register('aws_secret_key')}
                  error={errors.aws_secret_key?.message}
                  className="flex-grow"
                />
                <Input
                  label="Bucket"
                  placeholder="Bucket"
                  {...register('aws_bucket')}
                  error={errors.aws_bucket?.message}
                  className="flex-grow"
                />
                <Input
                  label="Region"
                  placeholder="AWS Pass Key"
                  {...register('aws_region')}
                  error={errors.aws_region?.message}
                  className="flex-grow"
                />
                <Input
                  label="Endpoint"
                  placeholder="Endpoint"
                  {...register('aws_endpoint')}
                  error={errors.aws_endpoint?.message}
                  className="flex-grow"
                />
              </StatusCard>
            </div>

            <FormGroup
              title="SMS Provider"
              description="SMS provider is used to send SMS notifications"
              className="mb-10 mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            >
              <div className="flex w-full justify-end">
                <Switch
                  label="Enable SMS Provider"
                  variant="flat"
                  className=""
                  labelClassName="font-medium text-sm text-gray-900"
                  checked={watch('sms_provider_status')}
                  onChange={(e) => {
                    setValue('sms_provider_status', e.target.checked);
                  }}
                />
              </div>
            </FormGroup>

            <div
              className={cn(
                'transition-all duration-300',
                watch('sms_provider_status')
                  ? 'max-h-screen'
                  : 'max-h-0 overflow-hidden opacity-0'
              )}
            >
              <div
                className={cn(
                  'grid grid-cols-1 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11'
                )}
              >
                <div className="mt-6 grid grid-cols-1 gap-4">
                  <StatusCard
                    icon={<IoChevronDownCircleOutline />}
                    meetName="Twilio"
                    content="Twilio"
                    onSwitchChange={(checked) => {
                      setValue('twillio_status', checked);
                    }}
                    switchValue={watch('twillio_status')}
                  >
                    <Flex>
                      <Input
                        label="Twilio ID Key"
                        placeholder="Twilio ID Key"
                        {...register('twillio_id_key')}
                        error={errors.twillio_id_key?.message}
                        className="flex-grow"
                      />

                      <Input
                        label="Twilio Auth Token"
                        placeholder="Twilio Auth Token"
                        {...register('twillio_auth_token')}
                        error={errors.twillio_auth_token?.message}
                        className="flex-grow"
                      />

                      <Controller
                        name="twillio_phone_number"
                        control={control}
                        render={({ field }) => (
                          <PhoneNumber
                            {...field}
                            label="Twilio Phone Number"
                            country="au"
                            preferredCountries={['au']}
                            placeholder="Phone Number"
                            error={errors.twillio_phone_number?.message}
                          />
                        )}
                      />
                    </Flex>
                  </StatusCard>

                  <StatusCard
                    icon={<IoChevronDownCircleOutline />}
                    meetName="Google (not connected yet)"
                    content="Google"
                    onSwitchChange={(checked) => {
                      setValue('google_status', checked);
                    }}
                    switchValue={watch('google_status')}
                  >
                    <Flex>
                      <Input
                        label="Google ID Key"
                        placeholder="Google ID Key"
                        {...register('google_id_key')}
                        error={errors.google_id_key?.message}
                        className="flex-grow"
                      />

                      <Input
                        label="Google Pass Key"
                        placeholder="Google Pass Key"
                        {...register('google_pass_key')}
                        error={errors.google_pass_key?.message}
                        className="flex-grow"
                      />
                    </Flex>
                  </StatusCard>
                </div>
              </div>
            </div>

            <div className="mb-10 grid grid-cols-2 gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <div>
                <FormGroup
                  title="Access ID"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Access ID"
                    {...register('smtp_host')}
                    error={errors.smtp_host?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup
                  title="Secret Key"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Secret Key"
                    {...register('smtp_email_address')}
                    error={errors.smtp_email_address?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup
                  title="Bucket"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Bucket"
                    {...register('smtp_port')}
                    error={errors.smtp_port?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup
                  title="Region"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Region"
                    {...register('smtp_port')}
                    error={errors.smtp_port?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup
                  title="Endpoint"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Endpoint"
                    {...register('smtp_username')}
                    error={errors.smtp_username?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup
                  title="Status"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Controller
                    name="smtp_password"
                    control={control}
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        placeholder="Status"
                        options={types}
                        className="col-span-full"
                        error={errors?.smtp_password?.message as string}
                      />
                    )}
                  />
                </FormGroup>
              </div>
            </div>

            <FormGroup
              title="Chat Feature (not connected yet)"
              description="Chat feature"
              className="mb-6 mt-4 border-t border-t-slate-300 pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            ></FormGroup>

            <FormGroup isLabel title="Tawk Plugin">
              <Switch
                label="Enable Tawk Plugin"
                variant="flat"
                className=""
                labelClassName="font-medium text-sm text-gray-900"
                checked={watch('tawk_plugin_status')}
                onChange={(e) => {
                  setValue('tawk_plugin_status', e.target.checked);
                }}
              />
            </FormGroup>

            <FormGroup isLabel title="Facebook Plugin (not connected yet)">
              <Switch
                label="Enable Facebook Plugin"
                variant="flat"
                className=""
                labelClassName="font-medium text-sm text-gray-900"
                checked={watch('facebook_plugin_status')}
                onChange={(e) => {
                  setValue('facebook_plugin_status', e.target.checked);
                }}
              />
            </FormGroup>

            <FormFooter
              isLoading={
                isPendingUpdateTwilio ||
                isPendingUpdateSmtp ||
                isPendingUpdateAwsS3
              }
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </>
        );
      }}
    </Form>
  );
}
