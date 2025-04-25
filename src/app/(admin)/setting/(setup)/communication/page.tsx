'use client';

import dynamic from 'next/dynamic';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import {
  Input,
  Loader,
  Text,
  Textarea,
  Switch,
  SelectOption,
  Flex,
} from 'rizzui';
import {
  settingCommunicationFormSchema,
  SettingCommunicationFormTypes,
} from '@/validators/setting-communication.schema';
import CSelect from '@/core/ui/select';
import cn from '@/core/utils/class-names';
import StatusCard from '@/app/shared/ui/status-card';
import { IoChevronDownCircleOutline } from 'react-icons/io5';

const types: SelectOption[] = [
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
  const onSubmit: SubmitHandler<SettingCommunicationFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  return (
    <Form<SettingCommunicationFormTypes>
      validationSchema={settingCommunicationFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {},
      }}
    >
      {({ register, control, setValue, watch, formState: { errors } }) => {
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
                  title="Email Server"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Email Server"
                    {...register('email_server')}
                    error={errors.email_server?.message}
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
                    {...register('email_address')}
                    error={errors.email_address?.message}
                    className="flex-grow"
                  />
                </FormGroup>

                <FormGroup
                  title="Email Port"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Email Port"
                    {...register('email_port')}
                    error={errors.email_port?.message}
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
                    name="security_type"
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        placeholder="Select Type"
                        options={types}
                        className="col-span-full"
                        error={errors?.security_type?.message as string}
                      />
                    )}
                  />
                </FormGroup>
                <FormGroup
                  title="Email Password"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                  isLabel
                >
                  <Input
                    placeholder="Email Password"
                    {...register('email_password')}
                    error={errors.email_password?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
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
                        label="Twilio Pass Key"
                        placeholder="Twilio Pass Key"
                        {...register('twillio_pass_key')}
                        error={errors.twillio_pass_key?.message}
                        className="flex-grow"
                      />
                    </Flex>
                  </StatusCard>

                  <StatusCard
                    icon={<IoChevronDownCircleOutline />}
                    meetName="AWS"
                    content="AWS"
                    onSwitchChange={(checked) => {
                      setValue('aws_status', checked);
                    }}
                    switchValue={watch('aws_status')}
                  >
                    <Flex>
                      <Input
                        label="AWS ID Key"
                        placeholder="AWS ID Key"
                        {...register('aws_id_key')}
                        error={errors.aws_id_key?.message}
                        className="flex-grow"
                      />

                      <Input
                        label="AWS Pass Key"
                        placeholder="AWS Pass Key"
                        {...register('aws_pass_key')}
                        error={errors.aws_pass_key?.message}
                        className="flex-grow"
                      />
                    </Flex>
                  </StatusCard>

                  <StatusCard
                    icon={<IoChevronDownCircleOutline />}
                    meetName="Google"
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

              <div className="mb-10 grid grid-cols-2 gap-7">
                <FormGroup
                  isLabel
                  title="API Address"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="API Address"
                    // {...register('first_name')}
                    // error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
                <FormGroup
                  isLabel
                  title="ID"
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    placeholder="ID"
                    // {...register('first_name')}
                    // error={errors.first_name?.message}
                    className="flex-grow"
                  />
                </FormGroup>
              </div>
            </div>

            <FormGroup
              title="Chat Feature"
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

            <FormGroup isLabel title="Facebook Plugin">
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
