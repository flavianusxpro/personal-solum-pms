import bookAppointmentAtom from '@/store/book-appointment';
import { useAtom } from 'jotai';
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

const StandartConsult = ({ onNextStep }: { onNextStep: () => void }) => {
  const [bookAppointmentValue, setBookAppointment] =
    useAtom(bookAppointmentAtom);

  const [step, setStep] = useState(1);

  const onSelectOption = (answer: string) => {
    if (step == 1) {
      setBookAppointment((p) => ({
        ...p,
        step1: answer,
      }));
    }

    if (step == 2) {
      setBookAppointment((p) => ({
        ...p,
        step2: answer,
      }));
    }

    if (step == 3) {
      setBookAppointment((p) => ({
        ...p,
        step3: answer,
      }));
      onNextStep();
    }
    setStep((p) => p + 1);
  };

  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center p-6 text-center">
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
                onClick={() => onSelectOption('myself')}
              >
                Myself
              </Button>
              <Button
                className="border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white"
                variant="outline"
                onClick={() => onSelectOption('myself')}
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
                onClick={() => onSelectOption('new patient')}
              >
                New Patient
              </Button>
              <Button
                className="border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white"
                variant="outline"
                onClick={() => onSelectOption('returning patient')}
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
                  onClick={() => onSelectOption(value.toLowerCase())}
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
  );
};

export default StandartConsult;
