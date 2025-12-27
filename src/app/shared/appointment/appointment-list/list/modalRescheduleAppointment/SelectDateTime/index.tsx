import React, { useMemo, useState } from 'react'
import { IoNotificationsOutline } from 'react-icons/io5';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import Image from 'next/image';
import { Avatar, Text } from 'rizzui';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import useSelectDateTime from './useSelectDateTime';
import { Value } from 'react-calendar/dist/cjs/shared/types';
import cn from '@/core/utils/class-names';

interface PropTypes {
    data: any;
    formData: any;
    onChange: (key: string, value: any) => void;
    dataCalendarSchedule?: any
    isLoadingDataCalendarSchedule: boolean;
}

const SelectDateTime = (props: PropTypes) => {
    const [seeAll, setSeeAll] = useState(false)
    const {
        data,
        formData,
        onChange,
        dataCalendarSchedule,
        isLoadingDataCalendarSchedule,
    } = props

    const {
        dataDoctors,
        dataAvailability
    } = useSelectDateTime({ data, formData })

    const handleSelectDate = (value: Value) => {
        if (!value) return;

        const selectedDate = Array.isArray(value) ? value[0] : value;
        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
        onChange('appointment_date', formattedDate);
    };

    // Patient Time:
    const patientTimezone = data?.patient?.timezone;
    const patientCreatedAt = data?.patient?.created_at;
    const patientTime =
        patientCreatedAt && patientTimezone
            ? dayjs.utc(patientCreatedAt).tz(patientTimezone).format('hh:mm A')
            : '-';
    const patientGmt =
        patientCreatedAt && patientTimezone
            ? `GMT${dayjs.tz(patientCreatedAt, patientTimezone).format('Z')}`
            : '';

    // Doctor Time:
    const doctorTimezone = data?.doctor?.timezone;
    const doctorCreatedAt = data?.doctor?.created_at;
    const doctorTime =
        doctorCreatedAt && doctorTimezone
            ? dayjs.utc(doctorCreatedAt).tz(doctorTimezone).format('hh:mm A')
            : '-';
    const doctorGmt =
        doctorCreatedAt && doctorTimezone
            ? `GMT${dayjs.tz(doctorCreatedAt, doctorTimezone).format('Z')}`
            : '';

    const timeDifferenceText = (() => {
        if (!patientTimezone || !doctorTimezone) return '-';

        const patientOffset = dayjs.tz(patientCreatedAt, patientTimezone).utcOffset();
        const doctorOffset = dayjs.tz(doctorCreatedAt, doctorTimezone).utcOffset();

        const diffHours = Math.abs(patientOffset - doctorOffset) / 60;

        if (diffHours === 0) return 'Same time';
        if (diffHours >= 3) return `Different ${diffHours}+ hours`;

        return `Different ${diffHours} hours`;
    })();

    const disabledDate: dayjs.Dayjs[] = useMemo(() => {
        if (!dataCalendarSchedule?.data) return [];
        const disabledDates = dataCalendarSchedule?.data.map((item: any) =>
            dayjs(item.date)
        );
        return disabledDates;
    }, [dataCalendarSchedule]);

    const timeList = useMemo(() => {
        if (!dataAvailability?.data) return [];
        return dataAvailability.data.reduce((acc, item) => {
            if (item.available) {
                const timeObj = dayjs.utc(item.time, 'YYYY-MM-DD HH:mm', true);
                acc.push({
                    display: timeObj.format('hh:mm A'), // Format untuk ditampilkan di UI
                    storage: timeObj.format('HH:mm'),   // Format untuk disimpan di state
                });
            }
            return acc;
        }, [] as { display: string; storage: string }[]);
    }, [dataAvailability?.data]);

    return (
        <div className='flex flex-col gap-8'>
            <h1 className='font-medium text-base font-lexend text-center'>
                Select Appointment Date
            </h1>

            <div className='rounded-lg py-4 px-6 gap-4 border border-[#3872F959] bg-[#3872F91A]'>
                <div className='flex gap-6 items-center'>
                    <div>
                        <IoNotificationsOutline className='text-[#3872F9] text-3xl' />
                    </div>
                    <div className='flex gap-8 items-center w-full'>
                        <div className='text-center flex-1'>
                            <h1 className='text-[#3872F9] font-normal text-sm '>
                                Patient Time {''}
                                <span className="font-semibold">
                                    {patientTime}
                                    {/* ({patientGmt}) */}
                                </span>
                            </h1>
                            <p className='text-[#3872F9] text-sm font-normal'>
                                {data?.patient?.timezone ?? '-'}
                            </p>
                        </div>
                        <div className='text-center justify-center flex-1'>
                            <h1 className='text-[#3872F9] font-normal text-sm '>
                                {timeDifferenceText}
                            </h1>
                        </div>
                        <div className='text-center flex-1'>
                            <h1 className='text-[#3872F9] font-normal text-sm '>
                                Doctor Time <span className='font-semibold'>
                                    {doctorTime}
                                    {/* ({doctorGmt}) */}
                                </span>
                            </h1>
                            <p className='text-[#3872F9] text-sm font-normal'>
                                {data?.doctor?.timezone ?? '-'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-between gap-8'>
                <div>
                    <Calendar
                        value={
                            formData.appointment_date
                                ? dayjs(formData.appointment_date).toDate()
                                : null
                        }
                        onChange={handleSelectDate}
                        minDate={new Date()}
                        prev2Label={false}
                        next2Label={false}
                        tileDisabled={({ date, view }) => {
                            if (['year', 'decade', 'century'].includes(view)) {
                                return false;
                            }
                            return !disabledDate.some((disabled) =>
                                disabled.isSame(dayjs(date), 'day')
                            );
                        }}
                        tileClassName={({ date, view }) => {
                            if (view === 'month') {
                                const isDisabled = disabledDate.some((disabled) =>
                                    disabled.isSame(dayjs(date), 'day')
                                );
                                return isDisabled ? 'bg-green-100' : '';
                            }
                        }}
                        className="!border-none !bg-none"
                    />
                </div>
                <div className='flex-1 flex flex-col gap-6'>
                    {dataDoctors?.map((doctor: any, idx: number) => {
                        if (!doctor.id) return null;
                        return (
                            <div key={idx} className='flex flex-col gap-2'>
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-4'>
                                        <Avatar
                                            src={doctor?.url_photo}
                                            name={`${doctor?.first_name} ${doctor?.last_name}`}
                                            className='text-lg text-white font-semibold'
                                        />

                                        <h1 className='font-semibold text-base font-lexend'>
                                            Dr. {doctor?.first_name} {doctor?.last_name}
                                        </h1>
                                    </div>

                                    <div className='cursor-pointer'
                                        onClick={() => setSeeAll(!seeAll)}
                                    >
                                        <span className='flex items-center gap-2'>
                                            {seeAll ? (
                                                <>
                                                    <Text>Hide Appointment</Text>{' '}
                                                    <BiChevronUp size={30} />
                                                </>
                                            ) : (
                                                <>
                                                    <Text>See All Appointment</Text>
                                                    <BiChevronDown size={30} />
                                                </>
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {timeList.length > 0 ? (
                                    <div className='relative'>
                                        <div
                                            className='grid grid-cols-5 gap-2 transition-all delay-200 duration-1000 ease-in-out'
                                        >
                                            {timeList.map((time, index) => (
                                                <button
                                                    key={index}
                                                    type='button'
                                                    className={cn(
                                                        'rounded-md px-3 py-2 text-sm transition-colors',
                                                        formData.doctorTime === time.storage && formData.doctorId === doctor.id
                                                            ? 'bg-green-600 text-white'
                                                            : 'bg-green-200/50 hover:bg-green-300'
                                                    )}
                                                    onClick={() => {
                                                        onChange('doctorTime', time.storage);
                                                        onChange('doctorId', doctor.id as number);
                                                        onChange('fee', doctor.cost.amount);
                                                    }}
                                                >
                                                    {time.display}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className='bg-gray-50 p-4'>
                                        <span className="rounded-md px-2 py-1 text-green-700">
                                            Next available:{' '}
                                            <span className="text-black">Please contact centre</span>
                                        </span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SelectDateTime