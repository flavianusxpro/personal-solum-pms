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
const SelectDoctorTime = dynamic(
  () => import('@/app/shared/appointment/modal/appointment-form/doctor-time'),
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
const SelectService = dynamic(
  () =>
    import('@/app/shared/appointment/modal/appointment-form/select-services'),
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
import { atomWithReset, atomWithStorage, useResetAtom } from 'jotai/utils';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ActionIcon, Title } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import dayjs from 'dayjs';

type FormDataType = {
  id?: number | null;
  clinicId?: number;
  patient_id?: number;
  doctorId?: number;
  doctorTime: string;
  date: string;
  note: string;
  appointment_type: string;
  patient_type: string;
  patient_problem: string[];
  meeting_preference: string;
  followup_fee: string;
  initial_fee: string;
  script_renewal_fee: string;
};

export const initialFormData = {
  id: null,
  clinicId: undefined,
  patient_id: undefined,
  doctorId: undefined,
  doctorTime: '',
  date: '',
  note: '',
  appointment_type: '',
  patient_type: '',
  patient_problem: [],
  meeting_preference: '',
  followup_fee: '',
  initial_fee: '',
  script_renewal_fee: '',
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
  [Step.SelectDoctorTime]: SelectDoctorTime,
  [Step.SelectService]: SelectService,
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
  const Component = MAP_STEP_TO_COMPONENT[step];
  const resetLocation = useResetAtom(stepperAtomAppointment);

  useEffect(() => {
    resetLocation();
    if (data) {
      const parsedPatientProblem: string[] =
        typeof data?.patient_problem === 'string'
          ? (data.patient_problem as string)
              .slice(1, -1)
              .split('","')
              .map((s) => s.replace(/^"|"$/g, ''))
          : Array.isArray(data?.patient_problem)
            ? data.patient_problem
            : [];

      setFormData({
        id: data?.id,
        appointment_type: data?.type,
        clinicId: data?.clinicId,
        date: data?.date,
        doctorId: data?.doctor?.id,
        doctorTime: dayjs(data?.date).format('HH:mm'),
        meeting_preference: '',
        note: data?.note || '',
        patient_id: data?.patientId,
        patient_problem: parsedPatientProblem,
        patient_type: data?.patient_type,
        followup_fee: '',
        initial_fee: '',
        script_renewal_fee: '',
      });
    } else {
      setFormData(initialFormData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <div className="relative flex justify-center md:items-center">
      <div className="w-full">
        <div className="flex items-center justify-between border-b border-gray-200 p-5 md:p-7">
          <Title as="h2" className="font-lexend text-lg font-semibold">
            {isEdit && 'Update '} Book an appointment
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
