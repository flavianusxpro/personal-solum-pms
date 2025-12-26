import { useModal } from '@/app/shared/modal-views/use-modal';
import React, { useState } from 'react';
import { PiX } from 'react-icons/pi';
import { Button } from 'rizzui';
import SelectOption from './SelectOption';
import SelectDateTime from './SelectDateTime';
import { useGetCalendarScheduleByClinicId } from '@/hooks/useClinic';
import dayjs from 'dayjs';

interface PropTypes {
    data?: any
}

const totalSteps = 4;
const ModalRescheduleAppointment = (props: PropTypes) => {
    const { data } = props;
    const { closeModal } = useModal();
    const [currentStep, setCurrentStep] = useState(1);
    const [reason, setReason] = useState('');
    const [formData, setFormData] = useState({
        rescheduleType: '',
        doctorId: data?.doctor?.id ?? '',
        treatment_type: data?.patient?.patient_type ?? '',
        appointment_type: data?.type ?? '',
        appointment_date: data?.date ? dayjs(data?.date).format('YYYY-MM-DD') : '',
        timezone: 'Australia/Sydney',
        clinicId: data?.clinic?.id ?? '',
        doctorTime: '',
        fee: ''
    })

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
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = () => {
        console.log({
            reason
        });
        closeModal();
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
                    <div>
                        <h2 className="font-semibold text-base mb-4">
                            Reason for Rescheduling
                        </h2>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Add your reason here ..."
                            className="w-full min-h-[200px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-[#3872F9]"
                        />
                    </div>
                );

            case 4:
                return (
                    <div>
                        <div className="text-center mb-6">
                            <h2 className="font-semibold text-base mb-2">
                                Reschedule Confirmation
                            </h2>
                            <div className="text-xs bg-[#3872F9] text-white inline-block px-2 py-1 rounded">
                                199 x 20
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="border-r pr-6">
                                <h3 className="font-semibold text-sm mb-4">Last Schedule</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <div className="text-gray-600">Date & Time:</div>
                                        <div className="font-medium">12 December 2025, 09:00 AM</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600">Doctor:</div>
                                        <div className="font-medium">Dr. Emily Turner</div>
                                    </div>
                                </div>
                            </div>

                            <div className="pl-6">
                                <h3 className="font-semibold text-sm mb-4">New Schedule</h3>
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <div className="text-gray-600">Date & Time:</div>
                                        <div className="font-medium">14 December 2025, 10:00 AM</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600">Doctor:</div>
                                        <div className="font-medium">Dr. Emily Turner</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
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
                <div className='flex flex-col gap-4'>
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
                        >
                            Back
                        </Button>
                    )}
                    {currentStep < totalSteps ? (
                        <Button onClick={handleNext}>
                            Next
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit}>
                            Submit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalRescheduleAppointment;