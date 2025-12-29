import dayjs from '@/config/dayjs';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { MdOutlineInfo } from 'react-icons/md';
import { PiArrowLeft, PiArrowRight, PiCalendar, PiUser } from 'react-icons/pi';
import { ActionIcon, Button, Input, MultiSelect, Select, Text, Tooltip } from 'rizzui';

interface PropTypes {
    selectedDate: string;
    setSelectedDate: Dispatch<SetStateAction<any>>
    viewType: string;
    setViewType: Dispatch<SetStateAction<"monthly" | "weekly" | "daily">>
    selectedDoctor: string[];
    setSelectedDoctor: Dispatch<SetStateAction<string[]>>
    optionDoctors: any;
}

const CalendarHeader = (props: PropTypes) => {
    const {
        selectedDate,
        setSelectedDate,
        viewType,
        setViewType,
        selectedDoctor,
        setSelectedDoctor,
        optionDoctors
    } = props
    const startOfWeek = dayjs(selectedDate).startOf('week').format('D MMMM');
    const endOfWeek = dayjs(selectedDate).endOf('week').format('D MMMM');
    const startOfMonth = dayjs(selectedDate).startOf('month').format('D MMMM');
    const endOfMonth = dayjs(selectedDate).endOf('month').format('D MMMM');
    const year = dayjs(selectedDate).format('YYYY');
    const shortMonth = dayjs(selectedDate).format('MMM').toUpperCase();

    function previousDate() {
        setSelectedDate((prevDate: any) => {
            const prevDateObj = dayjs(prevDate);
            if (!prevDateObj.isValid()) {
                return viewType === 'monthly'
                    ? dayjs().subtract(1, 'month').format('YYYY-MM')
                    : dayjs().subtract(1, 'day').format('YYYY-MM-DD');
            }

            if (viewType === 'monthly') {
                return prevDateObj.subtract(1, 'month').format('YYYY-MM');
            } else if (viewType === 'weekly') {
                return prevDateObj.subtract(1, 'week').format('YYYY-MM-DD');
            } else {
                return prevDateObj.subtract(1, 'day').format('YYYY-MM-DD');
            }
        });
    }

    function nextDate() {
        setSelectedDate((prevDate: any) => {
            const prevDateObj = dayjs(prevDate);
            if (!prevDateObj.isValid()) {
                return viewType === 'monthly'
                    ? dayjs().add(1, 'month').format('YYYY-MM')
                    : dayjs().add(1, 'day').format('YYYY-MM-DD');
            }

            if (viewType === 'monthly') {
                return prevDateObj.add(1, 'month').format('YYYY-MM');
            } else if (viewType === 'weekly') {
                return prevDateObj.add(1, 'week').format('YYYY-MM-DD');
            } else {
                return prevDateObj.add(1, 'day').format('YYYY-MM-DD');
            }
        });
    }

    const dateToIsoWeek = (date: string): string => {
        let d = dayjs(date);
        if (date.length === 7 && date.match(/^\d{4}-\d{2}$/)) {
            d = dayjs();
        }
        if (!d.isValid()) {
            d = dayjs();
        }
        const year = d.isoWeekYear();
        const week = d.isoWeek();

        return `${year}-W${week.toString().padStart(2, '0')}`;
    };

    const isoWeekToDate = (isoWeek: string): string => {
        const [year, week] = isoWeek.split('-W').map(Number);
        const jan4 = dayjs().year(year).month(0).date(4);
        const monday = jan4.startOf('isoWeek');
        const targetDate = monday.add(week - 1, 'week');

        return targetDate.format('YYYY-MM-DD');
    };

    const optionDoctorsForMultiSelect = useMemo(() => {
        return optionDoctors.map((doc: any) => ({
            label: doc.label,
            value: String(doc.value),
        }));
    }, [optionDoctors]);

    const doctorName = optionDoctors.find((item: any) => {
        return item.value == selectedDoctor;
    });

    return (
        <div
            className='flex flex-wrap justify-between rounded-tl-lg rounded-tr-lg px-6 py-4 border border-[#00000026] gap-4'
        >
            <div className='flex items-center gap-4'>
                <div className="flex w-12 flex-col items-center justify-center rounded-md border border-gray-300">
                    <div className="w-12 rounded-tl-md rounded-tr-md bg-muted">
                        <Text className="w-full text-center text-xs font-medium text-muted-foreground">
                            {year}
                        </Text>
                    </div>
                    <div className="py-2">
                        <Text className="text-md font-semibold">{shortMonth}</Text>
                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <Text className="text-sm text-muted-foreground">
                        {viewType === 'weekly'
                            ? `${startOfWeek} - ${endOfWeek}`
                            : `${startOfMonth} - ${endOfMonth}`}
                    </Text>
                    <Tooltip
                        size="lg"
                        placement="right"
                        color='invert'
                        content={
                            <div className="flex items-center gap-4 p-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#3291B6]"></div>
                                    <span className="text-sm">Initial Consult</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#BB8ED0]"></div>
                                    <span className="text-sm">Follow Up</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#E0A8A8]"></div>
                                    <span className="text-sm">Transfer</span>
                                </div>
                            </div>
                        }
                    >
                        <div className="inline-flex items-center">
                            <MdOutlineInfo className='text-xl cursor-pointer hover:text-blue-500 transition-colors' />
                        </div>
                    </Tooltip>
                </div>
            </div>
            <div className='flex gap-4 items-center'>
                <div className='flex items-center gap-2'>
                    <ActionIcon
                        variant="outline"
                        onClick={previousDate}
                        size='sm'
                    >
                        <PiArrowLeft className="text-muted-foreground" size={20} />
                    </ActionIcon>

                    {viewType === 'monthly' ? (
                        <Input
                            type="month"
                            value={selectedDate}
                            min={dayjs().locale('en').format('YYYY-MM')}
                            onChange={(event) => setSelectedDate(event.target.value)}
                            size="sm"
                        />
                    ) : viewType === 'weekly' ? (
                        <Input
                            type="week"
                            value={dateToIsoWeek(selectedDate)}
                            onChange={(event) => {
                                const normalDate = isoWeekToDate(event.target.value);
                                setSelectedDate(normalDate);
                            }}
                            size="sm"
                        />
                    ) : (
                        <Input
                            type="date"
                            value={selectedDate}
                            onChange={(event) => setSelectedDate(event.target.value)}
                            size="sm"
                        />
                    )}

                    <ActionIcon
                        onClick={nextDate}
                        variant="outline"
                        size='sm'
                    >
                        <PiArrowRight className="text-muted-foreground" size={20} />
                    </ActionIcon>
                </div>
                <Select
                    size="sm"
                    className='w-[200px]'
                    value={viewType}
                    onChange={(e: any) => {
                        setViewType(e.value);
                    }}
                    options={[
                        { label: 'Daily', value: 'daily' },
                        { label: 'Weekly', value: 'weekly' },
                        { label: 'Monthly', value: 'monthly' },
                    ]}
                    prefix={<PiCalendar size={16} />}
                    displayValue={(value: string) =>
                        value
                            ? value.charAt(0).toUpperCase() + value.slice(1)
                            : ''
                    }
                />

                {viewType === 'daily' ? (
                    <MultiSelect
                        size="sm"
                        value={selectedDoctor}
                        placeholder="Select doctors"
                        onChange={setSelectedDoctor}
                        options={optionDoctorsForMultiSelect}
                        searchable
                        prefix={<PiUser size={16} />}
                        className="[&_.rizzui-select-input]:items-center w-[200px]"
                        label=""
                        displayValue={(selected: string[]) => {
                            if (!selected || selected.length === 0) {
                                return 'All Doctors';
                            }
                            if (selected.length === 1) {
                                const item = optionDoctors.find((item: any) => String(item.value) === selected[0]);
                                return item ? item.label : 'All Doctors';
                            }
                            return `${selected.length} Doctors Selected`;
                        }}
                    />
                ) : (
                    <Select
                        size="sm"
                        value={selectedDoctor.length > 0 ? Number(selectedDoctor[0]) : 0}
                        placeholder="Select doctor"
                        onChange={(e: any) => {
                            setSelectedDoctor(e.value === 0 ? [] : [String(e.value)]);
                        }}
                        options={[
                            {
                                label: 'All Doctor',
                                value: 0,
                            },
                            ...optionDoctors,
                        ]}
                        searchable
                        className="[&_.rizzui-select-input]:items-center w-[200px]"
                        prefix={<PiUser size={16} />}
                        displayValue={(value: number) => {
                            if (!value || value === 0) {
                                return 'All Doctors';
                            }
                            const item = optionDoctors.find((item: any) => {
                                return item.value == value;
                            });
                            return item ? item.label : 'All Doctors';
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default CalendarHeader