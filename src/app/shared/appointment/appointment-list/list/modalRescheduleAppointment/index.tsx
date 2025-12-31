import { useModal } from '@/app/shared/modal-views/use-modal';
import React, { useState } from 'react';
import { PiX } from 'react-icons/pi';
import { Button } from 'rizzui';
import SelectOption from './SelectOption';
import SelectDateTime from './SelectDateTime';
import { useGetCalendarScheduleByClinicId } from '@/hooks/useClinic';
import dayjs from 'dayjs';
import ReasonRescheduling from './ReasonRescheduling';
import RescheduleConfirmation from './RescheduleConfirmation';
import { usePostRescheduleAppointmentByDate } from '@/hooks/useAppointment';
import toast from 'react-hot-toast';

interface PropTypes {
    data?: any;
    setStatusChanged?: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

const totalSteps = 4;
const ModalRescheduleAppointment = (props: PropTypes) => {
    const { data, setStatusChanged } = props;
    const { closeModal } = useModal();
    const [currentStep, setCurrentStep] = useState(1);
    const [reason, setReason] = useState('');
    const [formData, setFormData] = useState({
        id: data?.id,
        rescheduleType: '',
        doctorId: data?.doctor?.id ?? '',
        treatment_type: data?.patient?.patient_type ?? '',
        appointment_type: data?.type ?? '',
        appointment_date: data?.date ? dayjs(data?.date).format('YYYY-MM-DD') : '',
        timezone: 'Australia/Sydney',
        clinicId: data?.clinic?.id ?? '',
        doctorTime: '',
        fee: '',
        reasonForRescheduling: '',
        doctorFirstName: '',
        doctorLastName: '',
    })

    const { 
        mutate: mutateRescheduleByDate, 
        isPending: isPendingReschedule 
    } = usePostRescheduleAppointmentByDate();

    const handleChange = (key: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [key]: value
        }))
    }

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            if (currentStep === 2) {
                setFormData((prev) => ({
                    ...prev,
                    appointment_date: data?.date ? dayjs(data?.date).format('YYYY-MM-DD') : '',
                    doctorTime: '',
                    doctorId: data?.doctor?.id ?? '',
                    fee: '',
                    doctorFirstName: '',
                    doctorLastName: ''
                }));
            } else if (currentStep === 3) {
            } else if (currentStep === 4) {
                // Optional: Reset step 4 values if needed
            }

            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        const dateTimeString = `${formData.appointment_date}T${formData.doctorTime}`
        mutateRescheduleByDate(
      {
        id: formData.id as number,
        doctorId: formData.doctorId,
        date: dateTimeString,
        note: formData.reasonForRescheduling,
      },
      {
        onSuccess: () => {
          toast.success("Appointment rescheduled successfully");
          setStatusChanged?.(true);
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
    };

    const {
        data: dataCalendarSchedule,
        isLoading: isLoadingDataCalendarSchedule
    } = useGetCalendarScheduleByClinicId(data.clinicId as number);

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <SelectOption data={formData} onChange={handleChange} />;

            case 2:
                return <SelectDateTime
                    data={data}
                    formData={formData}
                    onChange={handleChange}
                    dataCalendarSchedule={dataCalendarSchedule}
                    isLoadingDataCalendarSchedule={isLoadingDataCalendarSchedule}
                />;

            case 3:
                return (
                    <ReasonRescheduling
                        onChange={handleChange}
                        value={formData.reasonForRescheduling}
                    />
                );

            case 4:
                return (
                    <RescheduleConfirmation
                        data={data}
                        formData={formData}
                    />
                );

            default:
                return null;
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                // Step 1: Must select reschedule type
                return formData.rescheduleType !== '';

            case 2:
                // Step 2: Must select date, doctor, and time (optional, sesuaikan kebutuhan)
                return formData.appointment_date !== '' &&
                    formData.doctorId !== '' &&
                    formData.doctorTime !== '';

            default:
                return true;
        }
    };

    return (
        <div className="w-full rounded-[24px]">
            <div className="px-10 py-5 border-b border-[#D8D8D8] flex items-center justify-between">
                <h1 className="font-semibold text-lg">
                    Reschedule Appointment
                </h1>
                <button
                    onClick={() => {
                        closeModal();
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                    <PiX className="h-5 w-5" />
                </button>
            </div>

            <div className='p-10'>
                {/* Step Content */}
                <div className='flex flex-col gap-4 h-[65vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
                    {renderStepContent()}
                </div>
            </div>

            {/* Footer Buttons */}
            <div className='flex justify-between items-center px-10 py-5 border-t border-[#D8D8D8] gap-4'>
                <div className="flex items-center justify-center">
                    {Array.from({ length: totalSteps }, (_, index) => (
                        <React.Fragment key={index}>
                            <div className="flex items-center">
                                <div
                                    className={`h-2 rounded-full transition-all ${index + 1 === currentStep
                                        ? 'w-8 bg-gray-800'
                                        : 'w-2 bg-gray-300'
                                        }`}
                                />
                            </div>
                            {index < totalSteps - 1 && (
                                <div className="w-2" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className='flex justify-end gap-4'>
                    {currentStep > 1 && (
                        <Button
                            variant='outline'
                            onClick={handleBack}
                            disabled={isPendingReschedule}
                            isLoading={isPendingReschedule}
                        >
                            Back
                        </Button>
                    )}
                    {currentStep < totalSteps ? (
                        <Button
                            onClick={handleNext}
                            disabled={!isStepValid()}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={!isStepValid() || isPendingReschedule}
                            isLoading={isPendingReschedule}
                        >
                            Submit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalRescheduleAppointment;