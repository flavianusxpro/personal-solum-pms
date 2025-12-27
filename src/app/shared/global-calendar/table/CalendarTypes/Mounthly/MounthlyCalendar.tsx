import React, { Dispatch, SetStateAction } from 'react'
import { Calendar, dayjsLocalizer, View, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import MounthlyCardEvent from './MounthlyCardEvent';
import MounthlyCustomCell from './MounthlyCustomCell';
import dayjs from '@/config/dayjs';
import { useModal } from '@/app/shared/modal-views/use-modal';
import AppointmentDetailsCalendar from '../../AppointmentDetailsCalendar';

interface PropTypes {
    data: any;
    events: any;
    selectedDate: string;
    handleNavigate: (newDate: Date, view: View, action: string) => void;
    setSelectedDate: Dispatch<SetStateAction<string>>
    setViewType: Dispatch<SetStateAction<"daily" | "weekly" | "monthly">>
    rescheduleModal: (row: any, newDate: string, newDoctorName?: string | undefined, newTime?: string | undefined) => void
}

const MounthlyCalendar = (props: PropTypes) => {
    const {
        events,
        selectedDate,
        handleNavigate,
        setSelectedDate,
        setViewType,
        rescheduleModal
    } = props

    const localizer = dayjsLocalizer(dayjs);
    const DnDCalendar = withDragAndDrop<any, any>(Calendar);
    const { openModal } = useModal();

    const openModalDetail = (data: any) => {
        openModal({
            view: <AppointmentDetailsCalendar data={data?.appointment} />,
            customSize: '1100px',
        });
    };

    const CustomDateCellHeader = ({ label, date }: any) => {
        const handleDateClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            const clickedDate = dayjs(date).format('YYYY-MM-DD');
            setSelectedDate(clickedDate);
            setViewType('daily');
        };

        return (
            <div className="rbc-date-cell">
                <button
                    onClick={handleDateClick}
                    className="cursor-pointer"
                >
                    {label}
                </button>
            </div>
        );
    };

    return (
        <DnDCalendar
            localizer={localizer}
            events={events}
            selectable={false}
            startAccessor="start"
            endAccessor="end"
            toolbar={false}
            date={new Date(selectedDate)}
            onNavigate={handleNavigate}
            resizable={false}
            onSelectEvent={openModalDetail}
            onEventDrop={({ event, start }: any) => {
                rescheduleModal(event.raw, dayjs(start).format('YYYY-MM-DD'));
            }}
            popup
            components={{
                month: {
                    event: MounthlyCardEvent,
                    dateHeader: CustomDateCellHeader,
                },
                dateCellWrapper: (props) => (
                        <MounthlyCustomCell {...props} events={events} />
                    ),
            }}
            views={['month']}
            defaultView={Views.MONTH}
        />
    )
}

export default MounthlyCalendar