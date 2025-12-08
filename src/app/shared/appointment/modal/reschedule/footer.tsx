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
  const { mutate: mutateRescheduleByDate, isPending: isPendingReschedule } =
    usePostRescheduleAppointmentByDate();

  function submitRescheduleAppointment() {
    // Format "YYYY-MM-DD hh:mm A" (e.g., "2025-12-09 02:00 PM")
    const dateTimeString = `${formData.date} ${formData.doctorTime}`;

    // Parse string tersebut dan format ke ISO "YYYY-MM-DDTHH:mm:ss"
    // Ini mengabaikan zona waktu lokal browser dan hanya mengambil tanggal dan waktu.
    const isoTimeWithoutOffset = dayjs(
      dateTimeString,
      'YYYY-MM-DD hh:mm A'
    ).format('YYYY-MM-DDTHH:mm:ss');

    // Tambahkan offset +11:00 secara manual untuk membuat string tanggal-waktu yang sepenuhnya memenuhi standar
    // Ini secara eksplisit menyatakan bahwa waktu tersebut berada di zona waktu UTC+11.
    const finalUTC = `${isoTimeWithoutOffset}+11:00`;

    mutateRescheduleByDate(
      {
        id: formData.id as number,
        doctorId: formData.doctorId,
        date: finalUTC,
        note: formData.reason,
      },
      {
        onSuccess: () => {
          toast.success("Appointment rescheduled successfully");
          closeModal();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || "Error rescheduling appointment"
          );
          console.error("Error rescheduling appointment:", error);
        },
      }
    );
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
          disabled={isPendingReschedule}
          isLoading={isPendingReschedule}
          onClick={submitRescheduleAppointment}
        >
          Submit
        </Button>
      )}
    </footer>
  );
}
