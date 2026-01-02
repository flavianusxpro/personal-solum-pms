import CardMinimal0 from '@/app/shared/stripe-checkout/0-card-minima';
import { usePostCreateAppointment } from '@/hooks/useAppointment';
import { IPayloadPostAppoinment } from '@/types/paramTypes';
import dayjs from 'dayjs';
import React from 'react'
import toast from 'react-hot-toast';
import { CgCreditCard, CgLink } from 'react-icons/cg';
import { MdInfoOutline } from 'react-icons/md';
import { PiMoneyWavy } from 'react-icons/pi';
import { Button, Input } from 'rizzui';
import PaymentLink from './PaymentLink';

interface PropTypes {
    formData: any;
    onChange: (key: string, value: any) => void
    cardRef: any;
    refetch: () => void;
    closeModal: () => void;
}

const StepPayment = (props: PropTypes) => {
    const {
        formData,
        onChange,
        cardRef,
        refetch,
        closeModal,
    } = props;
    const { mutate } = usePostCreateAppointment();

    const successPayment = (payment_method: string) => {
        const formattedDateTime = dayjs(
            `${formData.date} ${formData.time}`,
            'YYYY-MM-DD h:mm A'
        ).format('YYYY-MM-DD HH:mm');

        const payload: IPayloadPostAppoinment = {
            clinicId: formData.clinicId as number,
            doctorId: formData.doctorId as number,
            date: formattedDateTime,
            note: formData.notes,
            patient_problem: formData.patientProblem,
            patient_type: formData.treatmentType,
            payment_method,
            meeting_preference: 'ZOOM',
            patientId: formData.patientId as number,
            additional_information: {
                note: formData.notes,
            },
            ...(formData.couponId ? { couponId: formData.couponId } : {}),
        };

        mutate(payload, {
            onSuccess: () => {
                toast.success('Booking successful!');
                refetch()
                closeModal()
            },
            onError: (error: any) => {
                toast.error('Booking failed: ' + error.response.data.message);
            },
        });
    };


    return (
        <div className='flex justify-between'>
            <div className='flex flex-col gap-6 basis-[30%]'>
                <div className='flex flex-col gap-4'>
                    <h1 className='font-inter font-semibold text-base'>
                        Booking Info
                    </h1>

                    <div className='flex flex-col gap-4'>
                        <span className='flex gap-2 justify-between items-center'>
                            <p className='font-inter text-sm font-normal text-[#525252]'>
                                Patient Name
                            </p>
                            <p className='font-medium font-inter text-sm text-end'>
                                {formData?.patientName}
                            </p>
                        </span>
                        <span className='flex gap-2 justify-between items-center'>
                            <p className='font-inter text-sm font-normal text-[#525252]'>
                                Appointment Type
                            </p>
                            <p className='font-medium font-inter text-sm text-end'>
                                {formData?.treatmentType}
                            </p>
                        </span>
                        <span className='flex gap-2 justify-between items-center'>
                            <p className='font-inter text-sm font-normal text-[#525252]'>
                                Date & Time
                            </p>
                            <p className='font-medium font-inter text-sm text-end'>
                                {formData?.date && formData?.time
                                    ? dayjs(`${formData.date} ${formData.time}`, 'YYYY-MM-DD h:mm A')
                                        .format('DD MMM YYYY, hh:mm A')
                                    : '-'}
                            </p>
                        </span>
                        <span className='flex gap-2 justify-between items-center'>
                            <p className='font-inter text-sm font-normal text-[#525252]'>
                                Doctor Name
                            </p>
                            <p className='font-medium font-inter text-sm text-end'>
                                {formData?.doctorFirstName ?? ''} {formData?.doctorLastName ?? ''}
                            </p>
                        </span>
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <h1 className='font-inter font-semibold text-base'>
                        Payment Info
                    </h1>

                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-4'>
                            <span className='flex gap-2 justify-between items-center'>
                                <p className='font-inter text-sm font-normal text-[#525252]'>
                                    Consultation Fee
                                </p>
                                <p className='font-medium font-inter text-sm text-end'>
                                    $0
                                </p>
                            </span>
                            <span className='flex gap-2 justify-between items-center'>
                                <p className='font-inter text-sm font-normal text-[#525252]'>
                                    Merchant Fee
                                </p>
                                <p className='font-medium font-inter text-sm text-end'>
                                    $0
                                </p>
                            </span>
                            <span className='flex gap-2 justify-between items-center'>
                                <p className='font-inter text-sm font-normal text-[#525252]'>
                                    Domestic Card Fee
                                </p>
                                <p className='font-medium font-inter text-sm text-end'>
                                    $0
                                </p>
                            </span>
                        </div>
                        <div className='py-4 flex justify-between items-center border-t '>
                            <h1 className='font-inter font-semibold text-base'>
                                Total Cost
                            </h1>

                            <p className='font-inter font-semibold text-base'>
                                $0
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2'>
                    <Input
                        placeholder="Enter coupon code"
                    />
                    <Button>Apply</Button>
                </div>

                <div className='bg-[#EBF1FE] p-4 rounded-xl flex items-center'>
                    <p className='text-[#3872F9] text-sm font-normal'>
                        The estimated cost listed above does not include Medicare rebates. Your card will not be charged if you are eligible for bulk billing. Please ensure Medicare has your up-to-date bank account details.
                    </p>

                    <span>
                        <MdInfoOutline className='text-2xl text-[#3872F9]' />
                    </span>
                </div>
            </div>

            <div className='basis-[50%] flex flex-col gap-8'>
                <h1 className='font-inter font-semibold text-base'>
                    Payment Method
                </h1>

                <div className='flex gap-2'>
                    <div
                        className={`flex-1 p-4 cursor-pointer border rounded-md gap-2 flex items-center ${formData?.paymentMethod === 'visa-master-card' && 'border-[#3872F9] bg-[#EBF1FE]'}`}
                        onClick={() => onChange('paymentMethod', 'visa-master-card')}
                    >
                        <span>
                            <CgCreditCard className={`text-2xl ${formData?.paymentMethod === 'visa-master-card' ? 'text-[#3872F9]' : 'text-[#A19F9F]'}`} />
                        </span>
                        <p className={`font-medium text-sm font-inter ${formData?.paymentMethod === 'visa-master-card' ? 'text-[#3872F9]' : 'text-[#A19F9F]'}`}>
                            Visa / Master Card
                        </p>
                    </div>
                    <div
                        className={`flex-1 p-4 cursor-pointer border rounded-md gap-2 flex items-center ${formData?.paymentMethod === 'counter' && 'border-[#3872F9] bg-[#EBF1FE]'}`}
                        onClick={() => onChange('paymentMethod', 'counter')}
                    >
                        <span>
                            <PiMoneyWavy className={`text-2xl ${formData?.paymentMethod === 'counter' ? 'text-[#3872F9]' : 'text-[#A19F9F]'}`} />
                        </span>
                        <p className={`font-medium text-sm font-inter ${formData?.paymentMethod === 'counter' ? 'text-[#3872F9]' : 'text-[#A19F9F]'}`}>
                            Counter
                        </p>
                    </div>
                    <div
                        className={`flex-1 p-4 cursor-pointer border rounded-md gap-2 flex items-center ${formData?.paymentMethod === 'link' && 'border-[#3872F9] bg-[#EBF1FE]'}`}
                        onClick={() => onChange('paymentMethod', 'link')}
                    >
                        <span>
                            <CgLink className={`text-2xl ${formData?.paymentMethod === 'link' ? 'text-[#3872F9]' : 'text-[#A19F9F]'}`} />
                        </span>
                        <p className={`font-medium text-sm font-inter ${formData?.paymentMethod === 'link' ? 'text-[#3872F9]' : 'text-[#A19F9F]'}`}>
                            Link
                        </p>
                    </div>
                </div>

                <div>
                    {formData?.paymentMethod === 'visa-master-card' && (
                        <CardMinimal0 onSuccess={successPayment} ref={cardRef} />
                    )}
                    {formData?.paymentMethod === 'link' && <PaymentLink />}
                </div>

                <Button
                    onClick={() => {
                        if (formData?.paymentMethod === 'counter') {
                            successPayment('COUNTER');
                        } else if (formData?.paymentMethod === 'link') {
                            toast.error('Link payment not implemented yet');
                        } else {
                            cardRef.current?.handleSubmit(formData?.paymentMethod);
                        }
                    }}
                    className="w-full bg-[#3666AA] px-4 py-3 font-semibold text-white"
                >
                    Pay Now
                </Button>
            </div>
        </div>
    )
}

export default StepPayment