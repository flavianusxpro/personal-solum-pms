import React from 'react'
import { Textarea } from 'rizzui'

interface PropTypes {
    onChange: (key: string, value: any) => void;
     value?: string
}

const ReasonRescheduling = (props: PropTypes) => {
    const {
        onChange,
        value = ''
    } = props
    return (
        <Textarea
            label="Reason for Rescheduling"
            placeholder="Add your reason here ..."
            value={value}
            onChange={(e) => onChange('reasonForRescheduling', e.target.value)}
            className="min-h-[200px]"
        />
    )
}

export default ReasonRescheduling