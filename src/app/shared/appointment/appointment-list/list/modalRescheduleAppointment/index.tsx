import { useModal } from '@/app/shared/modal-views/use-modal';
import React, { useState } from 'react';
import { PiX } from 'react-icons/pi';
import { Button, RadioGroup, AdvancedRadio, Text } from 'rizzui';
import { IoIosCheckmarkCircle } from 'react-icons/io';

interface PropTypes {
    setSynchronize?: React.Dispatch<React.SetStateAction<string | null>>;
    isPush?: boolean;
}

const ModalRescheduleAppointment = (props: PropTypes) => {
    const { } = props;
    const { closeModal } = useModal();

    const [currentStep, setCurrentStep] = useState(1);
    const [rescheduleType, setRescheduleType] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [reason, setReason] = useState('');

    const totalSteps = 4;

    const rescheduleOptions = [
        { value: 'same_doctor', title: 'Change Date (Same Doctor)' },
        { value: 'change_doctor', title: 'Change Doctor (Same Clinic)' }
    ];

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
            rescheduleType,
            selectedDate,
            selectedTime,
            reason
        });
        closeModal();
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div>
                        <RadioGroup
                            value={rescheduleType}
                            setValue={setRescheduleType}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {rescheduleOptions.map((item: any) => (
                                <AdvancedRadio
                                    key={item.value}
                                    name="reschedule_type"
                                    value={item.value}
                                    inputClassName="[&:checked~span_.icon]:block"
                                >
                                    <span className="flex justify-between py-6 px-4">
                                        <Text as="b" className='text-sm text-[#484848] font-medium'>
                                            {item.title}
                                        </Text>
                                        <IoIosCheckmarkCircle className="icon hidden h-5 w-5 text-[#3872F9]" />
                                    </span>
                                </AdvancedRadio>
                            ))}
                        </RadioGroup>
                    </div>
                );

            case 2:
                return (
                    <div>
                        <h2 className="text-center font-semibold text-base mb-6">
                            Select Appointment Date
                        </h2>

                        <div className="bg-[#EFF6FF] rounded-lg p-4 mb-6 flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-[#3872F9]">🔔</span>
                                <div>
                                    <span className="text-[#3872F9] font-medium">Patient Time</span>
                                    <span className="ml-2">10:30 AM (GMT+7)</span>
                                    <div className="text-gray-500">Indonesia/Jakarta</div>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="text-[#3872F9] font-medium">Different 3+ hours</span>
                            </div>
                            <div>
                                <span className="text-[#3872F9] font-medium">Doctor Time</span>
                                <span className="ml-2">1:30 PM (GMT+10)</span>
                                <div className="text-gray-500">Australia/Sydney</div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                                <button className="p-2 hover:bg-gray-100 rounded">←</button>
                                <h3 className="font-semibold">October 2025</h3>
                                <button className="p-2 hover:bg-gray-100 rounded">→</button>
                            </div>

                            <div className="grid grid-cols-7 gap-2 mb-4">
                                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                    <div key={day} className="text-center text-sm font-medium text-gray-600">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2">
                                {/* Sample calendar dates */}
                                {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 21, 22, 28, 29].map(date => (
                                    <button
                                        key={date}
                                        onClick={() => setSelectedDate(`2025-10-${date}`)}
                                        className={`p-2 rounded-full text-sm ${selectedDate === `2025-10-${date}`
                                            ? 'bg-[#3872F9] text-white'
                                            : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        {date}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="Doctor"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <span className="font-medium">Dr. Emily Turner</span>
                                </div>

                                <div className="grid grid-cols-4 gap-2">
                                    {['9:00 AM', '9:15 AM', '9:30 AM', '9:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM'].map(time => (
                                        <button
                                            key={time}
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-2 px-3 rounded text-sm border ${selectedTime === time
                                                ? 'bg-[#3872F9] text-white border-[#3872F9]'
                                                : 'border-gray-300 hover:border-[#3872F9]'
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );

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
                            <div className="text-xs text-gray-500 bg-[#3872F9] text-white inline-block px-2 py-1 rounded">
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
                {/* Stepper Indicator */}
                {/* <div className="flex items-center justify-center mb-8">
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
                </div> */}

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