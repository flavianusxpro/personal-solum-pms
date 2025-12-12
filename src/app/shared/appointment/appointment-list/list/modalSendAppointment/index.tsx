import { useModal } from '@/app/shared/modal-views/use-modal';
import CheckCircleIcon from '@/core/components/icons/check-circle';
import React, { useRef, useState } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { PiX } from 'react-icons/pi';
import { AdvancedRadio, Button, RadioGroup, Select, Text } from 'rizzui';
import TabEmail from './TabEmail';
import TabSms from './TabSms';
import TabEmailSms from './TabEmailSms';

const ModalSendAppointment = () => {
    const { closeModal } = useModal();
    const [value, setValue] = useState("email");
    const emailRef: any = useRef(null);
    const smsRef: any = useRef(null);
    const emailSmsRef: any = useRef(null)

    const handleSave = async () => {
        if (value === "email" && emailRef.current) {
            await emailRef.current.submit(); 
        }

        if (value === "sms" && smsRef.current) {
            await smsRef.current.submit();
        }

        if (value === "email-sms" && emailSmsRef.current) {
            await emailSmsRef.current.submit();
        }
    };

    const options = [
        {
            value: 'email',
            title: 'Email Only',
        },
        {
            value: 'sms',
            title: 'SMS Only',
        },
        {
            value: 'email-sms',
            title: 'Email & SMS',
        },
    ]

    return (
        <div className="w-full rounded-[24px]">
            <div className='p-10'>
                <div className="flex items-center justify-between mb-6">
                    <h1 className="font-semibold text-lg">
                        Send Appointment
                    </h1>

                    <button
                        onClick={closeModal}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    >
                        <PiX className="h-5 w-5" />
                    </button>
                </div>

                <div className='flex flex-col gap-4'>
                    <RadioGroup
                        value={value}
                        setValue={setValue}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                    >
                        {options.map((item: any) => (
                            <AdvancedRadio
                                key={item.value}
                                name="send"
                                value={item.value}
                                inputClassName="[&:checked~span_.icon]:block"
                            >
                                <span className="flex justify-between py-6 px-4">
                                    <Text as="b" className='text-sm text-[#484848] font-medium'>{item.title}</Text>
                                    <IoIosCheckmarkCircle className="icon hidden h-5 w-5 text-[#3872F9]" />
                                </span>
                            </AdvancedRadio>
                        ))}
                    </RadioGroup>

                    {value === 'email' && <TabEmail ref={emailRef} />}
                    {value === 'sms' && <TabSms ref={smsRef} />}
                    {value === 'email-sms' && <TabEmailSms ref={emailSmsRef} />}
                </div>
            </div>

            <div className='flex justify-end px-10 py-5 border-t border-[#D8D8D8]'>
                <Button onClick={handleSave} isLoading={emailRef.current?.isLoading}>
                    Save
                </Button>
            </div>
        </div>
    )
}

export default ModalSendAppointment