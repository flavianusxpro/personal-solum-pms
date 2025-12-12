import TextEditor from '@/components/Tiptap';
import { useMutation } from '@tanstack/react-query';
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { Input, Select } from 'rizzui';

interface EmailFormData {
  emailTemplate: string | null;
  editor: string;
  schedule: string | null;
  date: string | null;
  time: string | null;
}

// Type yang diexpose ke parent
export interface TabEmailRef {
  submit: () => Promise<void>;
  isLoading: boolean;
}

const TabEmail = forwardRef<TabEmailRef>((props, ref) => {
  const [formData, setFormData] = useState<EmailFormData>({
    emailTemplate: null,
    editor: '',
    schedule: null,
    date: null,
    time: null,
  });

  const setSelected = (key: keyof EmailFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      console.log("Sending email:", formData);
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
    <div className="flex flex-col gap-4">
      <Select
        label="Email Template"
        options={[{ label: "Text", value: "text" }]}
        value={formData.emailTemplate}
        onChange={(e: any) => setSelected("emailTemplate", e.value)}
        placeholder="Select email template"
      />

      <TextEditor
        value={formData.editor}
        onChange={(v) => setSelected("editor", v)}
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
          value={formData.schedule}
          onChange={(e: any) => setSelected("schedule", e.value)}
          className="flex-1"
        />

        <Input
          type="date"
          label="Date"
          value={formData.date ?? ""}
          onChange={(e) => setSelected("date", e.target.value)}
          className="flex-1"
        />

        <Input
          type="time"
          label="Time"
          value={formData.time ?? ""}
          onChange={(e) => setSelected("time", e.target.value)}
          className="flex-1"
        />
      </div>
    </div>
  );
});

TabEmail.displayName = "TabEmail";
export default TabEmail;