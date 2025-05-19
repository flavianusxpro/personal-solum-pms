'use client';

import dynamic from 'next/dynamic';
import { atom, useAtom } from 'jotai';

const SelectOption = dynamic(
  () => import('@/app/shared/appointment/modal/reschedule/options'),
  {
    ssr: false,
  }
);
const SelectDoctorTime = dynamic(
  () => import('@/app/shared/appointment/modal/reschedule/doctor-time'),
  {
    ssr: false,
  }
);
const SelectDate = dynamic(
  () => import('@/app/shared/appointment/modal/reschedule/select-date'),
  {
    ssr: false,
  }
);
const AddReason = dynamic(
  () => import('@/app/shared/appointment/modal/reschedule/add-reason'),
  {
    ssr: false,
  }
);
const RescheduleConfirmation = dynamic(
  () => import('@/app/shared/appointment/modal/reschedule/confirmation'),
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
  patient_problem: string;
  meeting_preference: string;
  followup_fee: string;
  initial_fee: string;
  script_renewal_fee: string;
  rescedule_by?: string;
  oldData?: {
    id?: number | null;
    clinicId?: number;
    patient_id?: number;
    doctorId?: number;
    doctorTime: string;
    date: string;
    note: string;
    appointment_type: string;
    patient_type: string;
    patient_problem: string;
    meeting_preference: string;
    followup_fee: string;
    initial_fee: string;
    script_renewal_fee: string;
  };
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
  patient_problem: '',
  meeting_preference: '',
  followup_fee: '',
  initial_fee: '',
  script_renewal_fee: '',
  rescedule_by: '',
  oldData: {
    id: null,
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
    followup_fee: '',
    initial_fee: '',
    script_renewal_fee: '',
  },
};

export const formRescheduleDataAtom = atom<FormDataType>(initialFormData);

export enum Step {
  SelectOption,
  SelectDate,
  SelectDoctorTime,
  AddReason,
  Confirmation,
}

const firstStep = Step.SelectOption;
export const stepperAtomCancelAppointment = atomWithReset<Step>(firstStep);

export function useStepperCancelAppointment() {
  const [step, setStep] = useAtom(stepperAtomCancelAppointment);

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
    resetStepper,
    gotoStep,
    gotoNextStep,
    gotoPrevStep,
  };
}

const MAP_STEP_TO_COMPONENT = {
  [Step.SelectOption]: SelectOption,
  [Step.SelectDate]: SelectDate,
  [Step.SelectDoctorTime]: SelectDoctorTime,
  [Step.AddReason]: AddReason,
  [Step.Confirmation]: RescheduleConfirmation,
};

export const stepAppointmentTotalSteps = Object.keys(
  MAP_STEP_TO_COMPONENT
).length;

export default function CancelAppointmentForm({
  data,
}: {
  data?: IGetAppointmentListResponse['data'][number];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { closeModal } = useModal();

  const [step] = useAtom(stepperAtomCancelAppointment);
  const [_, setFormData] = useAtom(formRescheduleDataAtom);
  const Component = MAP_STEP_TO_COMPONENT[step];
  const resetLocation = useResetAtom(stepperAtomCancelAppointment);

  useEffect(() => {
    resetLocation();
    if (data) {
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
        patient_problem: data?.patient_problem,
        patient_type: data?.patient_type,
        followup_fee: '',
        initial_fee: '',
        script_renewal_fee: '',
        oldData: {
          id: data?.id,
          appointment_type: data?.type,
          clinicId: data?.clinicId,
          date: data?.date,
          doctorId: data?.doctor?.id,
          doctorTime: dayjs(data?.date).format('HH:mm'),
          meeting_preference: '',
          note: data?.note || '',
          patient_id: data?.patientId,
          patient_problem: data?.patient_problem,
          patient_type: data?.patient_type,
          followup_fee: '',
          initial_fee: '',
          script_renewal_fee: '',
        },
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
            Reschedule Appointment
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
