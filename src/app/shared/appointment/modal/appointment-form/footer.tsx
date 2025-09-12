'use client';

import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import {
  formDataAtom,
  useStepperAppointment,
} from '@/app/shared/appointment/modal/appointment-form';
import { useAtom } from 'jotai';
import {
  // usePostCreateAppointment,
  useUpdateAppointment,
} from '@/hooks/useAppointment';
// import { IPayloadPostAppoinment } from '@/types/paramTypes';
// import dayjs from 'dayjs';
// import toast from 'react-hot-toast';
import { useModal } from '@/app/shared/modal-views/use-modal';

interface FooterProps {
  className?: string;
  showSaveButton?: boolean;
}

export default function Footer({ className, showSaveButton }: FooterProps) {
  const { step, gotoPrevStep } = useStepperAppointment();
  const { closeModal } = useModal();

  const [formData] = useAtom(formDataAtom);
  // const { mutate: mutateCreate } = usePostCreateAppointment();
  const { mutate: mutateUpdate, isPending } = useUpdateAppointment();

  const isEdit = formData.id;

  return (
    <footer
      className={cn(
        'flex w-full items-center justify-between border-t border-gray-300 p-5 absolute bottom-0 left-0 right-0',
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
        {step > 0 && step <= 2 && (
          <Button
            onClick={gotoPrevStep}
            variant="outline"
            className="!w-auto"
            rounded="lg"
          >
            Back
          </Button>
        )}
        {step === 1 && (
          <Button
            className="!w-auto"
            type='submit'
            onClick={undefined}
            isLoading={isPending}
            rounded="lg"
          >
            {isEdit ? 'Save Update' : 'Payment'}
          </Button>
        )}
        {step < 1 && (
          <Button className="!w-auto" type="submit" rounded="lg">
            Next
          </Button>
        )}
      </div>
    </footer>
  );
}
