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
import DoctorTime from './DoctorTime';
interface PropTypes {
    data: any;
    formData: any;
    onChange: (key: string, value: any) => void;
    dataCalendarSchedule?: any
    isLoadingDataCalendarSchedule: boolean;
}

const SelectDateTime = (props: PropTypes) => {
    // Change from single boolean to Set of doctor IDs
    const [expandedDoctors, setExpandedDoctors] = useState<Set<number>>(new Set())

    const {
        data,
        formData,
        onChange,
        dataCalendarSchedule,
        isLoadingDataCalendarSchedule,
    } = props

    const {
        dataDoctors,
        isLoadingDataDoctor
    } = useSelectDateTime({ data, formData })

    const handleSelectDate = (value: Value) => {
        if (!value) return;

        const selectedDate = Array.isArray(value) ? value[0] : value;
        const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
        onChange('appointment_date', formattedDate);
    };

    // Toggle function for individual doctor
    const toggleDoctor = (doctorId: number) => {
        setExpandedDoctors(prev => {
            const newSet = new Set(prev);
            if (newSet.has(doctorId)) {
                newSet.delete(doctorId);
            } else {
                newSet.add(doctorId);
            }
            return newSet;
        });
    };

    // Patient Time:
    const patientTimezone = data?.patient?.timezone;
    const patientCreatedAt = data?.patient?.created_at;
    const patientTime =
        patientCreatedAt && patientTimezone
            ? dayjs.utc(patientCreatedAt).tz(patientTimezone).format('hh:mm A')
            : '-';

    // Doctor Time:
    const doctorTimezone = data?.doctor?.timezone;
    const doctorCreatedAt = data?.doctor?.created_at;
    const doctorTime =
        doctorCreatedAt && doctorTimezone
            ? dayjs.utc(doctorCreatedAt).tz(doctorTimezone).format('hh:mm A')
            : '-';

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

    

    return (
        <div className='flex flex-col gap-8 h-[calc(65vh-200px)]'>
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
                <div className='flex-1 overflow-y-auto flex flex-col gap-6'>
                    {isLoadingDataDoctor ?
                        (
                            <>
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className='flex flex-col gap-2 animate-pulse'>
                                        <div className='flex justify-between items-center'>
                                            <div className='flex items-center gap-4'>
                                                <div className='w-12 h-12 bg-gray-300 rounded-full' />
                                                <div className='h-5 bg-gray-300 rounded w-40' />
                                            </div>
                                            <div className='h-8 bg-gray-300 rounded w-32' />
                                        </div>

                                        <div className='grid grid-cols-5 gap-2'>
                                            {[1, 2, 3, 4, 5].map((slot) => (
                                                <div
                                                    key={slot}
                                                    className='h-10 bg-gray-200 rounded-md'
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : dataDoctors && dataDoctors?.length > 0 ? (
                            dataDoctors?.map((doctor: any, idx: number) => {
                                if (!doctor.id) return null;

                                const isExpanded = expandedDoctors.has(doctor.id);
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

                                            <div
                                                className='cursor-pointer'
                                                onClick={() => toggleDoctor(doctor.id)}
                                            >
                                                <span className='flex items-center gap-2'>
                                                    {isExpanded ? (
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

                                        <DoctorTime
                                            key={idx}
                                            data={data}
                                            formData={formData}
                                            doctor={doctor}
                                            onChange={onChange}
                                            isExpanded={isExpanded}
                                        />
                                    </div>
                                )
                            })
                        ) : (
                            <div className='flex items-center justify-center h-40'>
                                <Text className='text-gray-500'>No doctors available</Text>
                            </div>
                        )}
                </div>
            </div >
        </div >
    )
}

export default SelectDateTime