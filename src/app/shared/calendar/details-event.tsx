import { useModal } from '@/app/shared/modal-views/use-modal';
import { CalendarEvent } from '@/types';
import { PiMapPin, PiXBold } from 'react-icons/pi';
import { FaPencil, FaUser, FaUserDoctor } from 'react-icons/fa6';
import { ActionIcon, Button, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { formatDate } from '@core/utils/format-date';
import { useDeleteAppointment } from '@/hooks/useAppointment';
import toast from 'react-hot-toast';
import CreateUpdateAppointmentForm from '../appointment/modal/appointment-form';
import { getAptStatusBadge } from '../appointment/appointment-list/list/columns';
import { useEffect } from 'react';

function DetailsEvents({ event }: { event: CalendarEvent }) {
  const { closeModal, openModal } = useModal();

  const {
    mutate: mutateDeleteAppointment,
    isPending: isPendingDeleteAppointment,
  } = useDeleteAppointment();

  function handleEditModal() {
    closeModal(),
      openModal({
        view: <CreateUpdateAppointmentForm data={event.data} />,
        customSize: '700px',
      });
  }

  function handleDelete(eventId: number) {
    mutateDeleteAppointment([eventId], {
      onSuccess: () => {
        toast.success('Event deleted successfully');
        closeModal();
      },
      onError: (error: any) => {
        toast.error('Failed to delete event: ' + error.response.data.message);
      },
    });
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
        <ul className="mt-7 flex flex-col gap-[18px] text-gray-600">
          <li className="flex gap-2">
            <FaUser className="h-5 w-5" />
            <span>Patient:</span>
            <span className="font-medium text-gray-1000">{event.patient}</span>
          </li>
          <li className="flex gap-2">
            <FaUserDoctor className="h-5 w-5" />
            <span>Doctor:</span>
            <span className="font-medium text-gray-1000">{event.doctor}</span>
          </li>
          <li className="flex gap-2">
            <FaPencil className="h-5 w-5" />
            <span>Description:</span>
            <span className="font-medium text-gray-1000">
              {event.description}
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
          {/* <li className="flex gap-2">
            <MdOutlineCalendarMonth className="h-5 w-5" />
            <span>Event End:</span>
            <span className="font-medium text-gray-1000">
              {formatDate(event.end, 'MMMM D, YYYY')} at{' '}
              {formatDate(event.end, 'h:mm A')}
            </span>
          </li> */}
          <li className="flex gap-2">
            <MdOutlineCalendarMonth className="h-5 w-5" />
            <span>Appointment Status:</span>
            <span className="font-medium text-gray-1000">
              {getAptStatusBadge(event.data?.status as number)}
            </span>
          </li>
          <li className="flex gap-2">
            <MdOutlineCalendarMonth className="h-5 w-5" />
            <span>Appointment Type:</span>
            <span className="font-medium text-gray-1000">
              {event.data?.type}
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
            onClick={() => handleDelete(event.id as unknown as number)}
            isLoading={isPendingDeleteAppointment}
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
