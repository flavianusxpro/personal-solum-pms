'use client';

import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/appointment-list/appointment-form';
import { useAtom } from 'jotai';
import { usePostCreateAppointment } from '@/hooks/useAppointment';
import { IPayloadPostAppoinment } from '@/types/paramTypes';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const { step, gotoPrevStep } = useStepperAppointment();
  const { closeModal } = useModal();

  const [formData] = useAtom(formDataAtom);
  const { mutate: mutateCreate } = usePostCreateAppointment();

  const saveAppoinment = () => {
    if (formData.id) {
      toast.error('You have already booked an appointment');
      return;
    }
    const payload: IPayloadPostAppoinment = {
      appointment_type: formData.appointment_type,
      clinicId: formData.clinicId as number,
      doctorId: formData.doctorId as number,
      date: `${dayjs(formData.date).format('YYYY-MM-DD')} ${formData.doctorTime}`,
      note: formData.note,
      patient_problem: formData.patient_problem,
      patient_type: formData.patient_type,
      meeting_preference: 'ZOOM',
      patient_id: formData.patient_id ? String(formData.patient_id) : '',
    };

    mutateCreate(payload, {
      onSuccess: () => {
        closeModal();
        toast.success('Booking successful!');
      },
      onError: (error: any) => {
        toast.error('Booking failed: ' + error.response.data.message);
      },
    });
  };

  return (
    <footer
      className={cn(
        'flex w-full items-center justify-between border-t border-gray-300 px-5 py-5 md:px-7',
        className
      )}
    >
      <div className="flex shrink-0 gap-1.5">
        {Array.from([0, 1, 2, 3, 4], (x) => (
          <Button
            key={`step-${x}`}
            variant="text"
            className={cn(
              'h-2 p-0',
              x === step ? 'w-4 bg-gray-400' : 'w-3 bg-gray-200'
            )}
          />
        ))}
      </div>

      <div className="flex gap-3">
        {step > 0 && step <= 4 && (
          <Button
            onClick={gotoPrevStep}
            variant="outline"
            className="!w-auto"
            rounded="lg"
          >
            Back
          </Button>
        )}
        {step === 4 && (
          <Button
            className="!w-auto"
            type="button"
            onClick={saveAppoinment}
            rounded="lg"
          >
            Save
          </Button>
        )}
        {step !== 4 && (
          <Button className="!w-auto" type="submit" rounded="lg">
            {step === 3 ? 'Payment' : 'Next'}
          </Button>
        )}
      </div>
    </footer>
  );
}
