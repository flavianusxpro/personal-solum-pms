import React, { useState } from 'react'
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { AdvancedRadio, RadioGroup, Text } from 'rizzui';

interface PropTypes {
    data: any;
    onChange: (key: string, value: any) => void
}

const SelectOption = (props: PropTypes) => {
    const {
        data,
        onChange
    } = props

    const rescheduleOptions = [
        { value: 'same_doctor', title: 'Change Date (Same Doctor)' },
        { value: 'change_doctor', title: 'Change Doctor (Same Clinic)' }
    ];

    return (
        <RadioGroup
            value={data?.rescheduleType}
            setValue={(val) => onChange('rescheduleType', val)}
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
    )
}

export default SelectOption