'use client';

import { HeaderCell } from '@/app/shared/ui/table';
import { Text } from 'rizzui';
import dayjs from 'dayjs';
import { WeeklyAppointmentCell } from './WeeklyAppointmentCell';
import { WeeklyEmptyCell } from './WeeklyEmptyCell';
import BooingAppointmentCalendar from '../Daily/BookingAppointmentCalendar';

type Columns = {
    openModal: (props: any) => void;
    handleDrop?: any;
    closeModal?: (props: any) => void;
    weekDates?: string[];
    isWithinSchedule?: (date: string, time: string) => boolean;
    doctorSchedule?: any;
    refetch: () => void;
};

export const getColumns = ({ 
    openModal, 
    handleDrop, 
    closeModal, 
    weekDates = [],
    isWithinSchedule,
    doctorSchedule,
    refetch
}: Columns) => {
    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const typeColors: Record<string, string> = {
        "Initial Consult": "#3291B6",
        "Follow Up Appointment": "#BB8ED0",
        "Transfer": "#E0A8A8",
        "Reschedule": "#E0A8A8",
    };

    const baseColumn = {
        title: <HeaderCell title="Time" className="justify-center font-medium text-sm" />,
        dataIndex: 'time',
        key: 'time',
        width: 50,
        render: (time: string) => {
            const [hour, minute] = time.split(':').map(Number);
            const period = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            const displayTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;

            return <Text className="text-center font-medium text-sm">{displayTime}</Text>;
        },
    };

    const dayColumns = dayNames.map((day, index) => {
        const date = weekDates[index];
        const formattedDate = date ? dayjs(date).format('D/M/YYYY') : '';

        return {
            title: (
                <HeaderCell
                    title={
                        <div className="text-center">
                            <div className="font-semibold">{day}</div>
                            {formattedDate && (
                                <div className="text-xs font-normal text-gray-500">
                                    {formattedDate}
                                </div>
                            )}
                        </div>
                    }
                    className="justify-center"
                />
            ),
            dataIndex: day,
            key: day,
            width: 150,
            onCell: (record: any) => {
                const time24 = record.time;
                const shouldHighlight = isWithinSchedule && date && isWithinSchedule(date, time24);
                
                const hasAppointments = record[day] && Array.isArray(record[day]) && record[day].length > 0;
                
                if (shouldHighlight && !hasAppointments) {
                    return {
                        style: {
                            backgroundColor: '#EBF1FE',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        },
                        onClick: () => {
                            if (doctorSchedule?.nearest_doctor_schedule?.doctor) {
                                const [hour24, minute] = time24.split(':').map(Number);
                                const period = hour24 >= 12 ? 'PM' : 'AM';
                                const displayHour = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
                                const time12 = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;

                                const appointmentData = {
                                    clinicId: doctorSchedule.clinic_id || doctorSchedule.clinicId,
                                    date: date,
                                    time: time12,
                                    doctor: {
                                        id: doctorSchedule.nearest_doctor_schedule.doctor.id,
                                        first_name: doctorSchedule.nearest_doctor_schedule.doctor.first_name,
                                        last_name: doctorSchedule.nearest_doctor_schedule.doctor.last_name,
                                    }
                                };

                                openModal({
                                    view: <BooingAppointmentCalendar data={appointmentData} refetch={refetch} />,
                                    customSize: '1100px',
                                });
                            }
                        },
                        onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
                            e.currentTarget.style.backgroundColor = '#D6E4FD';
                        },
                        onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
                            e.currentTarget.style.backgroundColor = '#EBF1FE';
                        }
                    };
                }
                
                return {
                    style: shouldHighlight ? {
                        backgroundColor: '#EBF1FE',
                    } : {}
                };
            },
            render: (appointments: any[], row: any) => {
                if (!appointments || appointments.length === 0) {
                    return (
                        <WeeklyEmptyCell
                            dayKey={day}
                            rowTime={row.time}
                            handleDrop={handleDrop}
                        />
                    );
                }

                const uniqueAppointments = new Map();
                appointments.forEach(apt => {
                    if (!uniqueAppointments.has(apt.id)) {
                        uniqueAppointments.set(apt.id, apt);
                    }
                });

                return (
                    <div className="flex flex-col gap-1 h-full">
                        {Array.from(uniqueAppointments.values()).map((apt: any, idx: number) => {
                            const doctorName = `${apt.doctor?.first_name || ''} ${apt.doctor?.last_name || ''}`.trim();
                            const bgColor = typeColors[apt.type] ?? "#1FA551";

                            return (
                                <WeeklyAppointmentCell
                                    key={apt.id || idx}
                                    apt={apt}
                                    doctorName={doctorName}
                                    bgColor={bgColor}
                                    rowTime={row.time}
                                    dayKey={day}
                                    openModal={openModal}
                                    handleDrop={handleDrop}
                                />
                            );
                        })}
                    </div>
                );
            }
        };
    });

    return [baseColumn, ...dayColumns];
};