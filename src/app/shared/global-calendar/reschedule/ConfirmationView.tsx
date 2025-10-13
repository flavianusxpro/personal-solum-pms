'use client';

import { Title, Text, Button } from 'rizzui';

interface ConfirmationViewProps {
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationView({
  description,
  onConfirm,
  onCancel,
}: ConfirmationViewProps) {
  return (
    <div className="m-auto px-5 pb-8 pt-5 @2xl:py-7 @2xl:px-7">
      <div className="mb-7 flex flex-col items-center">
        <Title as="h3" className="mb-2 text-center text-lg font-semibold">
          Reschedule Confirmation
        </Title>
        <Text className="text-center text-sm text-gray-600">
          {description}
        </Text>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Button variant="outline" onClick={onCancel} className="w-full @xl:w-auto">
          Cancel
        </Button>
        <Button onClick={onConfirm} className="w-full @xl:w-auto">
          Confirm
        </Button>
      </div>
    </div>
  );
}
