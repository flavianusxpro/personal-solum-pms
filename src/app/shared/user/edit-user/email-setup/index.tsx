'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import {
  AdvancedCheckbox,
  Button,
  Checkbox,
  CheckboxGroup,
  Select,
  Switch,
  Text,
} from 'rizzui';
import {
  settingPaymentFormSchema,
  SettingPaymentFormTypes,
} from '@/validators/setting-payment.schema';
import cn from '@/core/utils/class-names';
import CheckCircleIcon from '@/core/components/icons/check-circle';
import { PiPlus } from 'react-icons/pi';
import CreateSignature from './modal/create-signature';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { BsTrash3 } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import {
  EmailSettingsSchema,
  emailSettingsSchema,
} from '@/validators/email-settings.schema';
import CSelect from '@/core/ui/select';

const QuillEditor = dynamic(() => import('@core/ui/quill-editor'), {
  ssr: false,
});

export default function EmailSettings() {
  const { openModal } = useModal();
  const [selectedSignature, setSelectedSignature] = useState<any | null>(null);
  const onSubmit: SubmitHandler<EmailSettingsSchema> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  const showCreateNameSignature = () => {
    openModal({
      view: <CreateSignature user_id={1} />,
      customSize: '600px',
    });
  };

  const signatures = [
    { id: 1, name: 'My Signature' },
    { id: 2, name: 'Test Signature' },
  ];

  return (
    <Form<EmailSettingsSchema>
      validationSchema={emailSettingsSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({
        register,
        control,
        setValue,
        getValues,
        watch,
        formState: { errors },
      }) => {
        return (
          <>
            <div className="mb-6 flex flex-col gap-4">
              <div className="w-full">
                <h4 className="text-base font-medium">Signature</h4>

                <p className="mt-2">
                  Appended at the end of all outgoing messages
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex rounded-xl border border-gray-400">
                  <div className="flex w-3/12 flex-col gap-2 border-r border-gray-400 p-4">
                    {signatures.map((signature) => {
                      const isSelected =
                        selectedSignature?.name == signature.name;
                      return (
                        <div
                          key={signature.id}
                          onClick={() => setSelectedSignature(signature)}
                          className={`p-3 ${isSelected && 'rounded-lg bg-[#3872F91A]'}`}
                        >
                          <div
                            className={`flex items-center ${isSelected ? 'justify-between' : ''}`}
                          >
                            <Text>{signature.name}</Text>
                            {isSelected && (
                              <div className="flex gap-1">
                                <FiEdit2 />
                                <BsTrash3 />
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-9/12">
                    <Controller
                      name="signature_content"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <QuillEditor
                            {...field}
                            className="quill-signature @3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[150px]"
                            placeholder="Type signature content here"
                            toolbarPosition="bottom"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <div className="w-50 flex items-start">
                  <Button onClick={showCreateNameSignature}>
                    <PiPlus className="text-lg" />
                    Add New
                  </Button>
                </div>
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-4 pt-7 @2xl:pt-9 @3xl:pt-11">
              <div className="w-full">
                <h4 className="text-base font-medium">Signature Defaults</h4>

                <p className="mt-2">Manage default signatures for emails.</p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex gap-3">
                  <CSelect
                    label="For New Emails Use"
                    options={[{ label: 'No Signatures', value: 1 }]}
                    onChange={(value: string) =>
                      setValue('for_new_email_use', value)
                    }
                    className="w-full"
                  />
                  <CSelect
                    label="On Reply/Forward Use"
                    options={[{ label: 'No Signatures', value: 1 }]}
                    onChange={(value: string) =>
                      setValue('on_reply_forward_use', value)
                    }
                    className="w-full"
                  />
                </div>
                <Checkbox
                  label={`Insert signature before quoted text in replies and remove the "--" line that precedes it.`}
                  labelClassName="text-md"
                  size="sm"
                />
              </div>
            </div>

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
