'use client';

import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { useAtom } from 'jotai';

import { useModal } from '@/app/shared/modal-views/use-modal';
import { useStepperCancelAppointment } from '.';
import { formRescheduleDataAtom } from './';
import { usePostRescheduleAppointmentByDate } from '@/hooks/useAppointment';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

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

  const { mutate: mutateRescheduleByDate } =
    usePostRescheduleAppointmentByDate();

  function submitRescheduleAppointment() {
    console.log('formData', formData);

    if (formData.rescedule_by === 'date') {
      mutateRescheduleByDate(
        {
          id: formData.id as number,
          date: `${dayjs(formData.date).format('YYYY-MM-DD')} ${formData.doctorTime}`,
        },
        {
          onSuccess: () => {
            toast.success('Appointment rescheduled successfully');
            closeModal();
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || 'Error rescheduling appointment'
            );
            console.error('Error rescheduling appointment:', error);
          },
        }
      );
    } else {
      // Handle other reschedule methods if needed
    }
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
      {step > 0 && !isLastStep && (
        <Button className="!w-auto" type={'submit'} rounded="lg">
          {'Next'}
        </Button>
      )}

      {isLastStep && (
        <Button
          className="!w-auto"
          variant="outline"
          rounded="lg"
          onClick={submitRescheduleAppointment}
        >
          Submit
        </Button>
      )}
    </footer>
  );
}
