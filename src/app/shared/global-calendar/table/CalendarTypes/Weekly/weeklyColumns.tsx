'use client';

import { HeaderCell } from '@/app/shared/ui/table';
import { Text } from 'rizzui';
import dayjs from 'dayjs';
import { WeeklyAppointmentCell } from './WeeklyAppointmentCell';
import { WeeklyEmptyCell } from './WeeklyEmptyCell';

type Columns = {
    openModal: (props: any) => void;
    handleDrop?: any;
    closeModal?: (props: any) => void
    weekDates?: string[]
};

export const getColumns = ({ openModal, handleDrop, closeModal, weekDates = [] }: Columns) => {
    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const typeColors: Record<string, string> = {
        "Initial Consult": "#1FA551",
        "Follow Up": "#0078D7",
        "Transfer": "#F4A523",
        "Reschedule": "#E84757",
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
                                    ({formattedDate})
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

                return (
                    <div className="flex flex-col gap-1">
                        {appointments.map((apt: any, idx: number) => {
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
}