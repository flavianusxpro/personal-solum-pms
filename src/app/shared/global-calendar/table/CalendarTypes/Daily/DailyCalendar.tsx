import ControlledTable from '@/app/shared/ui/controlled-table';
import dayjs from '@/config/dayjs';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { LuCalendarX2 } from 'react-icons/lu';
import { Loader } from 'rizzui';
import { getColumns } from './DailyColumns';
import { useModal } from '@/app/shared/modal-views/use-modal';

interface PropTypes {
    isLoadingGetAppointments: boolean;
    events: any;
    data: any;
    selectedDate: string;
    viewType: string;
    rescheduleModal: (row: any, newDate: string, newDoctorName?: string | undefined, newTime?: string | undefined) => void
}

const DailyCalendar = (props: PropTypes) => {
    const {
        isLoadingGetAppointments,
        events,
        data,
        selectedDate,
        viewType,
        rescheduleModal
    } = props
    const { openModal, closeModal } = useModal();
    const isScheduleOnSelectedDate = useMemo(() => {
        if (!data?.nearest_doctor_schedule?.start_date || !data?.nearest_doctor_schedule?.end_date) {
            return false;
        }

        const scheduleStartDate = dayjs(
            data.nearest_doctor_schedule.start_date,
            'YYYY-MM-DD hh:mm A'
        ).format('YYYY-MM-DD');

        const scheduleEndDate = dayjs(
            data.nearest_doctor_schedule.end_date,
            'YYYY-MM-DD hh:mm A'
        ).format('YYYY-MM-DD');

        return selectedDate === scheduleStartDate || selectedDate === scheduleEndDate;
    }, [data?.nearest_doctor_schedule, selectedDate]);

    const shouldShowEmptyState = useMemo(() => {
        const noEvents = !events || events.length === 0;
        const scheduleNotOnThisDate = !isScheduleOnSelectedDate;

        return noEvents && scheduleNotOnThisDate;
    }, [events, isScheduleOnSelectedDate]);

    const getTimeSlots = () => {
        const slots = [];
        const startHour = 0;
        const endHour = 23;

        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 10) {
                const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

                let displayHour = hour % 12;
                if (displayHour === 0) displayHour = 12;
                const period = hour < 12 ? 'AM' : 'PM';
                const time12 = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;

                slots.push({
                    time24,
                    time12
                });
            }
        }

        return slots;
    };

    const formatAppointments = useCallback(
        (data: IGetAppointmentListResponse['data'], nearestSchedule?: any, selectedDate?: string, viewType?: string) => {
            const timeSlots = getTimeSlots();

            const doctorsFromAppointments = Array.from(
                new Set(
                    data.map((item) =>
                        `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim()
                    )
                )
            );

            const doctors = [...doctorsFromAppointments];
            let nearestDoctorName = '';
            let scheduleStartTime = '';
            let scheduleEndTime = '';
            let shouldShowNearestDoctor = false;

            if (nearestSchedule?.doctor && selectedDate) {
                nearestDoctorName = `${nearestSchedule.doctor.first_name || ''} ${nearestSchedule.doctor.last_name || ''}`.trim();

                const scheduleDateMatch = nearestSchedule.start_date?.match(/(\d{4}-\d{2}-\d{2})/);
                const scheduleDate = scheduleDateMatch ? scheduleDateMatch[1] : '';

                if (scheduleDate) {
                    if (viewType === 'daily') {
                        shouldShowNearestDoctor = scheduleDate === selectedDate;
                    } else if (viewType === 'weekly') {
                        const weekStart = dayjs(selectedDate).startOf('week').format('YYYY-MM-DD');
                        const weekEnd = dayjs(selectedDate).endOf('week').format('YYYY-MM-DD');
                        shouldShowNearestDoctor = scheduleDate >= weekStart && scheduleDate <= weekEnd;
                    } else if (viewType === 'monthly') {
                        const monthStart = dayjs(selectedDate).startOf('month').format('YYYY-MM-DD');
                        const monthEnd = dayjs(selectedDate).endOf('month').format('YYYY-MM-DD');
                        shouldShowNearestDoctor = scheduleDate >= monthStart && scheduleDate <= monthEnd;
                    }
                }

                if (shouldShowNearestDoctor && nearestDoctorName && !doctors.includes(nearestDoctorName)) {
                    doctors.push(nearestDoctorName);

                    if (nearestSchedule.start_date) {
                        const startMatch = nearestSchedule.start_date.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
                        if (startMatch) {
                            let hour = parseInt(startMatch[1]);
                            const minute = startMatch[2];
                            const period = startMatch[3].toUpperCase();

                            if (period === 'PM' && hour !== 12) hour += 12;
                            if (period === 'AM' && hour === 12) hour = 0;

                            scheduleStartTime = `${hour.toString().padStart(2, '0')}:${minute}`;
                        }
                    }

                    if (nearestSchedule.end_date) {
                        const endMatch = nearestSchedule.end_date.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
                        if (endMatch) {
                            let hour = parseInt(endMatch[1]);
                            const minute = endMatch[2];
                            const period = endMatch[3].toUpperCase();

                            if (period === 'PM' && hour !== 12) hour += 12;
                            if (period === 'AM' && hour === 12) hour = 0;

                            scheduleEndTime = `${hour.toString().padStart(2, '0')}:${minute}`;
                        }
                    }
                } else {
                    nearestDoctorName = '';
                }
            }

            type SlotRow = {
                time: string;
                _time24: string;
                _nearestDoctor?: string;
                _scheduleStart?: string;
                _scheduleEnd?: string;
                [key: string]: any;
            };

            const result: SlotRow[] = timeSlots.map((slot: any) => {
                const row: SlotRow = {
                    time: slot.time12,
                    _time24: slot.time24,
                    _nearestDoctor: nearestDoctorName,
                    _scheduleStart: scheduleStartTime,
                    _scheduleEnd: scheduleEndTime
                };
                doctors.forEach((doc) => {
                    row[doc] = '';
                });
                return row;
            });

            const roundToNearest10Min = (hour: number, minute: number): string => {
                const roundedMinute = Math.floor(minute / 10) * 10;
                return `${hour.toString().padStart(2, '0')}:${roundedMinute.toString().padStart(2, '0')}`;
            };

            data.forEach((item: any) => {
                const doctorName =
                    `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim();

                let timeStr: string = '';

                const timeMatch = item.date.match(/T(\d{2}):(\d{2}):(\d{2})/);
                if (timeMatch) {
                    const hour = parseInt(timeMatch[1]);
                    const minute = parseInt(timeMatch[2]);

                    timeStr = roundToNearest10Min(hour, minute);
                }

                const slot = result.find((r) => r._time24 === timeStr);

                if (slot && item.patient) {
                    if (!slot[doctorName]) {
                        slot[doctorName] = item;
                    } else {
                        console.warn(`Multiple appointments at ${timeStr} for Dr. ${doctorName}`);
                    }
                    slot['type'] = item.type || '';
                }
            });

            return result.map(({ _time24, ...rest }) => rest);
        },
        []
    );

    const tableData = useMemo(() => {
        return formatAppointments(
            data?.data ?? [],
            data?.nearest_doctor_schedule,
            selectedDate,
            viewType
        );
    }, [
        data?.data,
        data?.nearest_doctor_schedule,
        formatAppointments,
        selectedDate,
        viewType
    ]);

    const handleDrop = useCallback(
        (appointment: any, newDoctor: string, newTime: string) => {
            rescheduleModal(appointment, selectedDate, newDoctor, newTime);
        },
        [rescheduleModal, selectedDate]
    );

    const columns = React.useMemo(
        () =>
            getColumns({
                data: tableData,
                openModal,
                handleDrop,
                closeModal
            }),

        [openModal, tableData, handleDrop, closeModal]
    );

    const tableContainerRef = useRef<HTMLDivElement>(null);
    const hasScrolledRef = useRef(false);
    const prevSelectedDateRef = useRef<string>('');

    useEffect(() => {
        if (prevSelectedDateRef.current !== selectedDate) {
            hasScrolledRef.current = false;
            prevSelectedDateRef.current = selectedDate;
        }
    }, [selectedDate]);

    useEffect(() => {
        if (viewType === 'daily' && tableData.length > 0 && tableContainerRef.current && !hasScrolledRef.current) {
            const firstAppointmentIndex = tableData.findIndex(row => {
                return Object.keys(row).some(key => {
                    if (key === 'time' || key === 'type') return false;
                    return row[key] && typeof row[key] === 'object' && row[key].patient;
                });
            });

            if (firstAppointmentIndex !== -1) {
                setTimeout(() => {
                    const scrollBody = tableContainerRef.current?.querySelector('.rc-table-body');

                    if (scrollBody) {
                        const rows = scrollBody.querySelectorAll('tr');
                        const targetRow = rows[firstAppointmentIndex];

                        if (targetRow) {
                            const rowOffsetTop = targetRow.offsetTop;

                            scrollBody.scrollTo({
                                top: rowOffsetTop,
                                behavior: 'smooth'
                            });

                            hasScrolledRef.current = true;
                        }
                    }
                }, 100);
            }
        }
    }, [tableData, viewType]);

    return (
        <div ref={tableContainerRef}>
            <DndProvider backend={HTML5Backend}>
                {isLoadingGetAppointments ? (
                    <div className="flex h-[500px] items-center justify-center">
                        <Loader />
                    </div>
                ) : shouldShowEmptyState ? (
                    <div className="flex h-[500px] flex-col items-center justify-center rounded-lg">
                        <LuCalendarX2 className="mb-4 text-6xl text-[#A6A6A6]" />
                        <div className="flex flex-col items-center justify-center gap-2 px-4 text-center">
                            <h1 className="text-2xl font-semibold">
                                No Scheduled Appointments
                            </h1>
                            <p className="max-w-md text-lg text-[#787878]">
                                There are no appointments on this day. View your weekly or
                                monthly calendar to check upcoming schedules.
                            </p>
                        </div>
                    </div>
                ) : (
                    <ControlledTable
                        isLoading={isLoadingGetAppointments}
                        showLoadingText={true}
                        data={tableData ?? []}
                        // @ts-ignore
                        columns={columns}
                        variant="bordered"
                        className="[&_td.rc-table-cell]:overflow-hidden [&_td.rc-table-cell]:p-0 [&_td.rc-table-cell]:align-middle [&_td.rc-table-cell]:leading-none"
                        scroll={{ y: 600 }}
                    />
                )}
            </DndProvider>
        </div>
    )
}

export default DailyCalendar