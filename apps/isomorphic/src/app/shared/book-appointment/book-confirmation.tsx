import React from 'react';
import { Button, Modal, ModalSize, Text, Title } from 'rizzui';

const step3Button = [
  'Integrative health consult',
  'Follow up appointment',
  'Script renewal',
  'Standard Consult',
  'Medical certificate',
  'Travel medicine',
  'Nicotine Vaping Cessation',
  'Weight Loss',
];

const ModalBookConfirmation = ({
  isOpen,
  size = 'full',
  onClose,
  onNextStep,
}: {
  isOpen: boolean;
  size?: ModalSize | undefined;
  onClose: () => void;
  onNextStep: (hideStep: boolean) => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="content-center">
      <div className="mx-auto flex w-full flex-col items-center justify-center py-6 text-center">
        <div className="flex flex-col items-center justify-center">
          <Title as="h2" className="font-semibold">
            Appointments
          </Title>
          <Text className="mt-5">
            This is a Telehealth consult and not a face to face consult
          </Text>
          <Text className="mt-10">
            Text message will contain forms to complete after booking
          </Text>
          <Text className="mt-5">- Consent form (REQUIRED TO COMPLETE)</Text>
          <Text className="mt-5">
            - Pre-questionnaire (REQUIRED TO COMPLETE)
          </Text>
          <Text className="mt-5">- Link for virtual consult</Text>
          <Text className="mt-10">
            Consultations are private billing. No Bulk billing available
          </Text>
          <div className="mt-4 flex justify-center gap-4">
            <Button
              className="border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white"
              variant="outline"
              onClick={onClose}
            >
              No, Cancel
            </Button>
            <Button
              className="border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white"
              variant="outline"
              onClick={() => onNextStep(true)}
            >
              Yes, Continue
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalBookConfirmation;
