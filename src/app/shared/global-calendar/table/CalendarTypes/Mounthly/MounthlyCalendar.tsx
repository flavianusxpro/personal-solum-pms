import React, { Dispatch, SetStateAction } from 'react'
import { Calendar, dayjsLocalizer, View, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import MounthlyCardEvent from './MounthlyCardEvent';
import MounthlyCustomCell from './MounthlyCustomCell';
import dayjs from '@/config/dayjs';
import { useModal } from '@/app/shared/modal-views/use-modal';
import AppointmentDetailsCalendar from '../../AppointmentDetailsCalendar';
import { PiUser } from 'react-icons/pi';

interface PropTypes {
    data: any;
    events: any;
    selectedDate: string;
    handleNavigate: (newDate: Date, view: View, action: string) => void;
    setSelectedDate: Dispatch<SetStateAction<string>>
    setViewType: Dispatch<SetStateAction<"daily" | "weekly" | "monthly">>
    rescheduleModal: (row: any, newDate: string, newDoctorName?: string | undefined, newTime?: string | undefined) => void
    selectedDoctor?: String[]
}

const MounthlyCalendar = (props: PropTypes) => {
    const {
        events,
        selectedDate,
        handleNavigate,
        setSelectedDate,
        setViewType,
        rescheduleModal,
        selectedDoctor
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

    if (!selectedDoctor || selectedDoctor.length === 0) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <div className="text-center">
                    <PiUser className="mx-auto text-6xl text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">Please select a doctor to view appointments</p>
                </div>
            </div>
        );
    }

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