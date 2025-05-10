'use client';

import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { useAtom } from 'jotai';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { useStepperCancelAppointment } from '.';
import { formRescheduleDataAtom } from './';

interface FooterProps {
  className?: string;
  goBackToStepNumber?: number;
  isLastStep?: boolean;
}

export default function Footer({
  className,
  goBackToStepNumber,
  isLastStep,
}: FooterProps) {
  const { step, gotoPrevStep, gotoStep } = useStepperCancelAppointment();
  const { closeModal } = useModal();

  const [formData] = useAtom(formRescheduleDataAtom);

  function submitRescheduleAppointment() {
    console.log('FormData', formData);
  }

  return (
    <footer
      className={cn(
        'flex w-full items-center justify-between border-t border-gray-300 px-5 py-5 md:px-7',
        className
      )}
    >
      {step > 0 && (
        <Button
          onClick={() =>
            typeof goBackToStepNumber === 'number'
              ? gotoStep(goBackToStepNumber)
              : gotoPrevStep()
          }
          variant="outline"
          className="!w-auto"
          rounded="lg"
        >
          Back
        </Button>
      )}
      {step > 0 && (
        <Button
          className="!w-auto"
          type={isLastStep ? 'button' : 'submit'}
          rounded="lg"
          onClick={submitRescheduleAppointment}
        >
          {isLastStep ? 'Submit' : 'Next'}
        </Button>
      )}
    </footer>
  );
}
