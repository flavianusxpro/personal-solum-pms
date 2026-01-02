import React, { useState } from 'react'
import { PiCheckCircleFill } from 'react-icons/pi';
import { AdvancedRadio, RadioGroup } from 'rizzui';

const PaymentLink = () => {
    const [viaClicked, setViaClicked] = useState('');

    const sendVia = [
        { label: 'Email Only', value: 'email' },
        { label: 'SMS Only', value: 'sms' },
        { label: 'Email & SMS', value: 'email-sms' },
    ];
    return (
        <>
            <RadioGroup
                value={viaClicked}
                setValue={setViaClicked}
                className="p-1 flex gap-2"
            >
                {sendVia.map((via: any, index: number) => {
                    return (
                        <AdvancedRadio
                            key={index}
                            value={via.value}
                            className="flex-1"
                            contentClassName="px-4 py-6 flex items-center justify-between w-full"
                            inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-checkbox]:ring-2 [&~span>.icon]:opacity-0 [&:checked~span>.icon]:opacity-100"
                        >
                            <span className="flex w-full items-center justify-center">
                                {via.label}
                            </span>
                            <PiCheckCircleFill className="icon h-5 min-w-[1.25rem] text-primary" />
                        </AdvancedRadio>
                    );
                })}
            </RadioGroup>
        </>
    );
}

export default PaymentLink