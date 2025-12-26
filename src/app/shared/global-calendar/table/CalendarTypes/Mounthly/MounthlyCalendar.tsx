import React, { Dispatch, SetStateAction } from 'react'
import { Calendar, dayjsLocalizer, View } from 'react-big-calendar';
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
                    className="cursor-pointer hover:bg-blue-100 rounded px-2 py-1 transition-colors"
                >
                    {label}
                </button>
            </div>
        );
    };

    return (
        <>
            <style>{`
                .rbc-month-row {
                    min-height: 150px !important;
                    overflow: visible !important;
                }
                .rbc-day-bg {
                    min-height: 150px !important;
                }
                .rbc-row-content {
                    min-height: 150px !important;
                }
                .rbc-addons-dnd .rbc-event {
                    cursor: move !important;
                }
                .rbc-addons-dnd-dragging {
                    opacity: 0.5 !important;
                }
                .rbc-addons-dnd-over {
                    background-color: rgba(59, 130, 246, 0.1) !important;
                }
                .rbc-date-cell {
                    text-align: right;
                    padding: 4px;
                }
            `}</style>

            <DnDCalendar
                localizer={localizer}
                events={events}
                selectable={false}
                startAccessor="start"
                endAccessor="end"
                // className={cn('h-[650px] md:h-[1100px] !z-10')}
                toolbar={false}
                components={{
                    event: (props) => (
                        <MounthlyCardEvent {...props} />
                    ),
                    dateCellWrapper: (props) => (
                        <MounthlyCustomCell {...props} events={events} />
                    ),
                    month: {
                        dateHeader: CustomDateCellHeader,
                    },
                }}
                date={new Date(selectedDate)}
                onNavigate={handleNavigate}
                popup
                resizable={false}
                eventPropGetter={() => ({
                    style: {
                        backgroundColor: 'transparent',
                        padding: 0,
                        marginBottom: '4px',
                        border: 'none',
                        boxShadow: 'none',
                    },
                })}
                onSelectEvent={openModalDetail}
                onEventDrop={({ event, start }: any) => {
                    rescheduleModal(event.raw, dayjs(start).format('YYYY-MM-DD'));
                }}
                draggableAccessor={() => true}
            />
        </>
    )
}

export default MounthlyCalendar