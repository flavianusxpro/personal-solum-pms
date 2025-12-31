import dayjs from 'dayjs';
import React from 'react'

interface PropTypes {
    data: any;
    formData: any;
}

const RescheduleConfirmation = (props: PropTypes) => {
    const {
        data,
        formData
    } = props
    
    const formatTime = (time: string) => {
        if (!time) return '-';

        const hour = parseInt(time.split(':')[0]);
        const period = hour >= 12 ? 'PM' : 'AM';
        return `${time} ${period}`;
    };

    return (
        <div className='flex flex-col'>
            <h1 className='font-medium text-base font-lexend text-center mb-5'>
                Reschedule Confirmation
            </h1>

            <div className='p-4 rounded-lg flex gap-4 border border-[#E4E4E4]'>
                <div className='flex-1 flex flex-col gap-4'>
                    <h1
                        className='font-semibold text-sm font-inter text-[#525252]'
                    >
                        Last Schedule
                    </h1>

                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center'>
                            <span className='basis-[30%]'>Date & Time:</span>
                            <span className='basis-[70%]'>
                                {data?.date ? dayjs(data?.date).format('MMM DD, YYYY') : '-'} - {data?.date ? (dayjs(data?.date).utc()).format('HH:mm A') : '-'}
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <span className='basis-[30%]'>Doctor:</span>
                            <span className='basis-[70%]'>
                                {data?.doctor?.first_name ?? ''} {data?.doctor?.last_name ?? ''}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex-1 flex flex-col gap-4'>
                    <h1
                        className='font-semibold text-sm font-inter text-[#525252]'
                    >
                        New Schedule
                    </h1>

                    <div className='flex flex-col gap-2'>
                        <div className='flex items-center'>
                            <span className='basis-[30%]'>Date & Time:</span>
                            <span className='basis-[70%]'>
                                {formData?.appointment_date ? dayjs(formData?.appointment_date).format('MMM DD, YYYY') : '-'} - {formatTime(formData?.doctorTime)}
                            </span>
                        </div>
                        <div className='flex items-center'>
                            <span className='basis-[30%]'>Doctor:</span>
                            <span className='basis-[70%]'>{formData?.doctorFirstName} {formData?.doctorLastName}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RescheduleConfirmation