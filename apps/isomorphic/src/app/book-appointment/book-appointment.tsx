import React, { useState } from 'react';
import { IoArrowBack, IoClose } from 'react-icons/io5';
import { ActionIcon, Button, Modal, ModalSize, Title } from 'rizzui';

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

const ModalBookAppointment = ({
  isOpen,
  size = 'full',
  onClose,
  onNextStep,
}: {
  isOpen: boolean;
  size?: ModalSize | undefined;
  onClose: () => void;
  onNextStep: () => void;
}) => {
  const [step, setStep] = useState(1);

  return (
    <Modal
      isOpen={isOpen}
      size={size}
      onClose={onClose}
      className="min-h-full content-center"
    >
      <div className="mx-auto flex h-full min-h-screen w-full flex-col items-center justify-center p-6 text-center">
        <div className="absolute left-6 top-6">
          <ActionIcon
            size="xl"
            variant="text"
            onClick={() => setStep((p) => (p == 1 ? 1 : p - 1))}
          >
            <IoArrowBack size={100} />
          </ActionIcon>
        </div>
        <div className="absolute right-6 top-6">
          <ActionIcon size="xl" variant="text" onClick={() => onClose()}>
            <IoClose size={100} />
          </ActionIcon>
        </div>
        <div className="flex flex-col items-center justify-center">
          {step == 1 ? (
            <>
              <Title as="h2" className="font-semibold">
                Are you booking for yourself or for somebody else?
              </Title>
              <div className="mt-4 flex justify-center gap-4">
                <Button
                  className="border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Myself
                </Button>
                <Button
                  className="border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white"
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Somebody else
                </Button>
              </div>
            </>
          ) : step == 2 ? (
            <>
              <Title as="h2" className="font-semibold">
                Have you attended <b>Solum Clinic</b> before?
              </Title>
              <div className="mt-4 flex justify-center gap-4">
                <Button
                  className="border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white"
                  variant="outline"
                  onClick={() => setStep(3)}
                >
                  New Patient
                </Button>
                <Button
                  className="border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white"
                  variant="outline"
                  onClick={() => setStep(3)}
                >
                  Returning Patient
                </Button>
              </div>
            </>
          ) : step == 3 ? (
            <>
              <Title as="h2" className="font-semibold">
                What type of appointment are you booking today?
              </Title>
              <div className="mt-4 grid grid-cols-2 justify-center gap-4">
                {step3Button.map((value: string, key: number) => (
                  <Button
                    className="border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white"
                    variant="outline"
                    onClick={onNextStep}
                    key={key}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Modal>
  );
};

export default ModalBookAppointment;
