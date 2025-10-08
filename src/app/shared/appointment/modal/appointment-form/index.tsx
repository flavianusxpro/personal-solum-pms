'use client';

import dynamic from 'next/dynamic';
import { atom, useAtom } from 'jotai';
const SelectClinic = dynamic(
  () =>
    import(
      '@/app/shared/appointment/modal/appointment-form/select-clinic-patient'
    ),
  {
    ssr: false,
  }
);
const SelectDate = dynamic(
  () => import('@/app/shared/appointment/modal/appointment-form/select-date'),
  {
    ssr: false,
  }
);
const Payment = dynamic(
  () =>
    import('@/app/shared/appointment/modal/appointment-form/select-payment'),
  {
    ssr: false,
  }
);
import { atomWithReset, useResetAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ActionIcon, Title } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';

type FormDataType = {
  id?: number | null;
  clinicId?: number;
  patient_id?: number;
  doctorId?: number;
  patient_name?: string;
  patient_address?: string;
  patient_mobile_number?: string;
  doctor_name?: string;
  doctor_tz?: string;
  doctorTime: string;
  date: string;
  note: string;
  appointment_type: string;
  patient_type: string;
  patient_problem: string;
  treatment: string;
  meeting_preference: string;
  followup_fee: string;
  initial_fee: string;
  script_renewal_fee: string;
  fee?: string;
  couponId?: string;
};

export const initialFormData = {
  id: null,
  clinicId: undefined,
  patient_id: undefined,
  patient_name: '',
  patient_address: '',
  patient_mobile_number: '',
  doctor_name: '',
  doctor_tz: '',
  doctorId: undefined,
  doctorTime: '',
  date: '',
  note: '',
  appointment_type: '',
  patient_type: '',
  patient_problem: '',
  meeting_preference: '',
  followup_fee: '',
  initial_fee: '',
  script_renewal_fee: '',
  treatment: '',
  fee: '',
  couponId: '',
};

export const formDataAtom = atom<FormDataType>(initialFormData);

enum Step {
  SelectClinic,
  SelectDate,
  Payment,
}

const firstStep = Step.SelectClinic;
export const stepperAtomAppointment = atomWithReset<Step>(firstStep);

export function useStepperAppointment() {
  const [step, setStep] = useAtom(stepperAtomAppointment);
  function gotoNextStep() {
    setStep(step + 1);
  }
  function gotoPrevStep() {
    setStep(step > firstStep ? step - 1 : step);
  }
  function resetStepper() {
    setStep(firstStep);
  }

  function gotoStep(step: Step) {
    setStep(step);
  }

  return {
    step,
    setStep,
    gotoStep,
    resetStepper,
    gotoNextStep,
    gotoPrevStep,
  };
}

const MAP_STEP_TO_COMPONENT = {
  [Step.SelectClinic]: SelectClinic,
  [Step.SelectDate]: SelectDate,
  [Step.Payment]: Payment,
};

export const stepAppointmentTotalSteps = Object.keys(
  MAP_STEP_TO_COMPONENT
).length;

export default function CreateUpdateAppointmentForm({
  data,
}: {
  data?: IGetAppointmentListResponse['data'][number];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { closeModal } = useModal();
  const isEdit = data?.id;

  const [step] = useAtom(stepperAtomAppointment);
  const [_, setFormData] = useAtom(formDataAtom);
  const Component = MAP_STEP_TO_COMPONENT[isEdit ? 2 : step];
  const resetLocation = useResetAtom(stepperAtomAppointment);

  useEffect(() => {
    resetLocation();
    setFormData(initialFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <div className="relative flex h-[700px] flex-col">
      <div className="flex w-full justify-between border-b border-gray-300 p-5">
        <Title as="h2" className="font-lexend text-lg font-semibold">
          Book an appointment
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => {
            closeModal();
            setFormData(initialFormData);
          }}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>

      <div className="flex-1">
        <Component />
      </div>
    </div>
  );
}
