import { useModal } from '@/app/shared/modal-views/use-modal';
import React, { useRef, useState } from 'react';
import { PiX } from 'react-icons/pi';
import { Button } from 'rizzui';
import SelectPatient from './SelectPatient';
import StepPayment from './Payment';
import { CardMinimal0Ref } from '@/app/shared/stripe-checkout/0-card-minima';

interface PropTypes {
    data?: any;
    refetch: () => void;
}

const totalSteps = 2;
const BooingAppointmentCalendar = (props: PropTypes) => {
    const { data, refetch } = props;
    const { closeModal } = useModal();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        patientId: null,
        patientName: '',
        treatmentType: null,
        notes: '',
        comments: '',
        clinicId: '',
        date: data?.date ?? '',
        time: data?.time ?? '',
        doctorId: data?.doctor?.id,
        doctorFirstName: data?.doctor?.first_name,
        doctorLastName: data?.doctor?.last_name,
        paymentMethod: 'visa-master-card',
        patientProblem: ''
    })

    const cardRef = useRef<CardMinimal0Ref>(null);

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

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <SelectPatient
                        formData={formData}
                        onChange={handleChange}
                    />
                );

            case 2:
                return (
                    <StepPayment 
                        formData={formData} 
                        onChange={handleChange}
                        cardRef={cardRef}
                        refetch={refetch}
                        closeModal={closeModal}
                    />
                )

            default:
                return null;
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.patientId !== null;
            default:
                return true;
        }
    };

    return (
        <div className="w-full rounded-[24px]">
            <div className="px-10 py-5 border-b border-[#D8D8D8] flex items-center justify-between">
                <h1 className="font-semibold text-lg">
                    Book an appointment
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
                <div className='flex flex-col gap-4 h-[68vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
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
                            disabled={false}
                            isLoading={false}
                        >
                            Back
                        </Button>
                    )}
                    {currentStep < totalSteps && (
                        <Button
                            onClick={handleNext}
                            disabled={!isStepValid()}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BooingAppointmentCalendar;