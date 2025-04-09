import { useModal } from '@/app/shared/modal-views/use-modal';
import { CalendarEvent } from '@/types';
import { PiMapPin, PiXBold } from 'react-icons/pi';
import { FaUserDoctor } from 'react-icons/fa6';
import { ActionIcon, Button, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import useEventCalendar from '@core/hooks/use-event-calendar';
import { formatDate } from '@core/utils/format-date';
import EventForm from '@/app/shared/event-calendar/event-form';
import { useGetAllDoctors } from '@/hooks/useDoctor';

function DetailsEvents({ event }: { event: CalendarEvent }) {
  console.log('🚀 ~ DetailsEvents ~ event:', event);
  const { deleteEvent } = useEventCalendar();
  const { openModal, closeModal } = useModal();

  const { data: dataDoctor } = useGetAllDoctors({
    page: 1,
    perPage: 100,
  });

  const doctor = dataDoctor?.find(
    (doc) => doc.id.toString() === event.doctor.toString()
  );

  function handleEditModal() {
    closeModal(),
      openModal({
        view: <EventForm event={event} />,
        customSize: '650px',
      });
  }

  function handleDelete(eventID: string) {
    deleteEvent(eventID);
    closeModal();
  }

  return (
    <div className="m-auto p-4 md:px-7 md:pb-10 md:pt-6">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-xl xl:text-2xl">
          Event Details
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>

      <div>
        <Title as="h4" className="text-lg font-medium xl:text-xl xl:leading-7">
          {event.title}
        </Title>
        {event.description && (
          <Text className="mt-3 xl:leading-6">{event.description}</Text>
        )}
        <ul className="mt-7 flex flex-col gap-[18px] text-gray-600">
          <li className="flex gap-2">
            <FaUserDoctor className="h-5 w-5" />
            <span>Doctor:</span>
            <span className="font-medium text-gray-1000">
              {doctor?.first_name} {doctor?.last_name}
            </span>
          </li>
          <li className="flex gap-2">
            <MdOutlineCalendarMonth className="h-5 w-5" />
            <span>Event Start:</span>
            <span className="font-medium text-gray-1000">
              {formatDate(event.start, 'MMMM D, YYYY')} at{' '}
              {formatDate(event.start, 'h:mm A')}
            </span>
          </li>
          <li className="flex gap-2">
            <MdOutlineCalendarMonth className="h-5 w-5" />
            <span>Event End:</span>
            <span className="font-medium text-gray-1000">
              {formatDate(event.end, 'MMMM D, YYYY')} at{' '}
              {formatDate(event.end, 'h:mm A')}
            </span>
          </li>
          {event.location && (
            <li className="flex gap-2">
              <PiMapPin className="h-5 w-5" />
              <span>Address:</span>
              <span className="font-medium text-gray-1000">
                {event.location}
              </span>
            </li>
          )}
          {event.breakTimes && event.breakTimes.length > 0 && (
            <li className="flex gap-2">
              <PiMapPin className="h-5 w-5" />
              <span>Break Times:</span>
              {event.breakTimes.map((breakTime, index) => (
                <span key={index} className="font-medium text-gray-1000">
                  {formatDate(breakTime.start, 'h:mm A')} -{' '}
                  {formatDate(breakTime.end, 'h:mm A')}
                  {index < (event?.breakTimes?.length ?? 0) - 1 ? ', ' : ''}
                </span>
              ))}
            </li>
          )}
        </ul>
        <div className={cn('grid grid-cols-2 gap-4 pt-5')}>
          <Button
            variant="outline"
            onClick={() => handleDelete(event.id as string)}
          >
            Delete
          </Button>
          <Button onClick={handleEditModal}>Edit</Button>
        </div>
      </div>
    </div>
  );
}

export default DetailsEvents;
