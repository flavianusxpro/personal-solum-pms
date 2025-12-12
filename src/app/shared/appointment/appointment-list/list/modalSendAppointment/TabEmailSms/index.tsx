import TextEditor from '@/components/Tiptap';
import { useMutation } from '@tanstack/react-query';
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { Input, Select } from 'rizzui';

export interface EmailSmsFormData {
  smsTemplate: string | null;
  smsEditor: string;
  smsSchedule: string | null;
  smsDate: string | null;
  smsTime: string | null;

  emailTemplate: string | null;
  emailEditor: string;
  emailSchedule: string | null;
  emailDate: string | null;
  emailTime: string | null;
}


// Type yang diexpose ke parent
export interface TabEmailSmsRef {
  submit: () => Promise<void>;
  isLoading: boolean;
}

const TabEmailSms = forwardRef<TabEmailSmsRef>((props, ref) => {
  const [formData, setFormData] = useState<EmailSmsFormData>({
    smsTemplate: null,
    smsEditor: '',
    smsSchedule: null,
    smsDate: null,
    smsTime: null,

    emailTemplate: null,
    emailEditor: '',
    emailSchedule: null,
    emailDate: null,
    emailTime: null,
  });

  const setSelected = (key: keyof EmailSmsFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      console.log("Sending sms:", formData);
      return null;
    },
  });

  useImperativeHandle(ref, () => ({
    submit: async () => {
      await mutateAsync();
    },
    isLoading: isPending,
  }));

  return (
    <div className='flex gap-6'>
      <div className="flex-1 flex flex-col gap-4">
        <Select
          label="Email Template"
          options={[{ label: "Text", value: "text" }]}
          value={formData.emailTemplate}
          onChange={(e: any) => setSelected("emailTemplate", e.value)}
          placeholder="Select email template"
        />

        <TextEditor
          value={formData.emailEditor}
          onChange={(v) => setSelected("emailEditor", v)}
          placeholder="Write email template here"
          label="Editor"
        />

        <div className="flex gap-4">

          <Select
            label="Schedule"
            options={[
              { label: "Send Now", value: "Send Now" },
              { label: "Schedule Send", value: "Schedule Send" },
            ]}
            value={formData.emailSchedule}
            onChange={(e: any) => setSelected("emailSchedule", e.value)}
            className="flex-1"
          />

          <Input
            type="date"
            label="Date"
            value={formData.emailDate ?? ""}
            onChange={(e) => setSelected("emailDate", e.target.value)}
            className="flex-1"
          />

          <Input
            type="time"
            label="Time"
            value={formData.emailTime ?? ""}
            onChange={(e) => setSelected("emailTime", e.target.value)}
            className="flex-1"
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <Select
          label="SMS Template"
          options={[{ label: "Text", value: "text" }]}
          value={formData.smsTemplate}
          onChange={(e: any) => setSelected("smsTemplate", e.value)}
          placeholder="Select SMS template"
        />

        <TextEditor
          value={formData.smsEditor}
          onChange={(v) => setSelected("smsEditor", v)}
          placeholder="Write SMS template here"
          label="Editor"
        />

        <div className="flex gap-4">

          <Select
            label="Schedule"
            options={[
              { label: "Send Now", value: "Send Now" },
              { label: "Schedule Send", value: "Schedule Send" },
            ]}
            value={formData.smsSchedule}
            onChange={(e: any) => setSelected("smsSchedule", e.value)}
            className="flex-1"
          />

          <Input
            type="date"
            label="Date"
            value={formData.smsDate ?? ""}
            onChange={(e) => setSelected("smsDate", e.target.value)}
            className="flex-1"
          />

          <Input
            type="time"
            label="Time"
            value={formData.smsTime ?? ""}
            onChange={(e) => setSelected("smsTime", e.target.value)}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
});

TabEmailSms.displayName = "TabEmailSms";
export default TabEmailSms;