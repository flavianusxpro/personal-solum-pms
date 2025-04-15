'use client';

import dynamic from 'next/dynamic';
import { atom, useAtom } from 'jotai';
const SelectClinic = dynamic(
  () =>
    import(
      '@/app/shared/appointment/appointment-list/appointment-form/select-clinic-patient'
    ),
  {
    ssr: false,
  }
);
const SelectDoctorTime = dynamic(
  () =>
    import(
      '@/app/shared/appointment/appointment-list/appointment-form/doctor-time'
    ),
  {
    ssr: false,
  }
);
const SelectDate = dynamic(
  () =>
    import(
      '@/app/shared/appointment/appointment-list/appointment-form/select-date'
    ),
  {
    ssr: false,
  }
);
const SelectService = dynamic(
  () =>
    import(
      '@/app/shared/appointment/appointment-list/appointment-form/select-services'
    ),
  {
    ssr: false,
  }
);
const Payment = dynamic(
  () =>
    import(
      '@/app/shared/appointment/appointment-list/appointment-form/select-payment'
    ),
  {
    ssr: false,
  }
);
import { atomWithReset, atomWithStorage, useResetAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ActionIcon, Title } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';

type FormDataType = {
  clinicId?: number;
  patient_id?: string;
  doctorId?: number;
  doctorTime: string;
  date: string;
  note: string;
  appointment_type: string;
  patient_type: string;
  patient_problem: string;
  meeting_preference: string;
};

export const initialFormData = {
  clinicId: undefined,
  patient_id: undefined,
  doctorId: undefined,
  doctorTime: '',
  date: '',
  note: '',
  appointment_type: '',
  patient_type: '',
  patient_problem: '',
  meeting_preference: '',
};

export const formDataAtom = atom<FormDataType>(initialFormData);

enum Step {
  SelectClinic,
  SelectService,
  SelectDate,
  SelectDoctorTime,
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
  return {
    step,
    setStep,
    // gotoStep,
    resetStepper,
    gotoNextStep,
    gotoPrevStep,
  };
}

const MAP_STEP_TO_COMPONENT = {
  [Step.SelectClinic]: SelectClinic,
  [Step.SelectDate]: SelectDate,
  [Step.SelectDoctorTime]: SelectDoctorTime,
  [Step.SelectService]: SelectService,
  [Step.Payment]: Payment,
};

export const stepAppointmentTotalSteps = Object.keys(
  MAP_STEP_TO_COMPONENT
).length;

export default function CreateUpdateAppointmentForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { closeModal } = useModal();

  const [step] = useAtom(stepperAtomAppointment);
  const [_, setFormData] = useAtom(formDataAtom);
  const Component = MAP_STEP_TO_COMPONENT[step];
  const resetLocation = useResetAtom(stepperAtomAppointment);

  useEffect(() => {
    resetLocation();
    setFormData(initialFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <div className="relative flex justify-center md:items-center">
      <div className="w-full">
        <div className="flex items-center justify-between border-b border-gray-200 p-5 md:p-7">
          <Title as="h2" className="font-lexend text-lg font-semibold">
            Book an appointment
          </Title>
          <ActionIcon
            size="sm"
            variant="text"
            onClick={() => closeModal()}
            className="p-0 text-gray-500 hover:!text-gray-900"
          >
            <PiXBold className="h-5 w-5" />
          </ActionIcon>
        </div>
        <Component />
      </div>
    </div>
  );
}
