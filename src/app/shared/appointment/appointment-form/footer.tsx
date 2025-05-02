'use client';

import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/appointment-form';
import { useAtom } from 'jotai';
import {
  usePostCreateAppointment,
  useUpdateAppointment,
} from '@/hooks/useAppointment';
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
  const { mutate: mutateUpdate, isPending } = useUpdateAppointment();

  const isEdit = formData.id;

  const saveAppoinment = () => {
    if (isEdit) {
      mutateUpdate(
        { ...formData, id: formData.id as number },
        {
          onSuccess: () => {
            closeModal();
            toast.success('Status updated successfully');
          },
          onError: (error: any) => {
            toast.error(
              error?.response?.data?.message || 'Error updating status'
            );
          },
        }
      );
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
      patient_id: formData.patient_id as number,
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
        {step === 3 && (
          <Button
            className="!w-auto"
            type="button"
            onClick={saveAppoinment}
            isLoading={isPending}
            rounded="lg"
          >
            {isEdit ? 'Save Update' : 'Payment'}
          </Button>
        )}
        {step !== 4 && step !== 3 && (
          <Button className="!w-auto" type="submit" rounded="lg">
            Next
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
      </div>
    </footer>
  );
}
