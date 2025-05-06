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
import ScheduleForm from './schedule-form';
import {
  useGetDoctorById,
  useUpdateSettingAppointmentDoctor,
} from '@/hooks/useDoctor';
import { Appointmentschedule } from '@/types/ApiResponse';
import dayjs from 'dayjs';
import { IPayloadSettingAppointmentDoctor } from '@/types/paramTypes';

interface DetailsScheduleProps {
  event: CalendarEvent;
  schedule?: Appointmentschedule;
}

function DetailsSchedule({ event, schedule }: DetailsScheduleProps) {
  const { closeModal, openModal } = useModal();

  const { data: dataDoctor } = useGetDoctorById(event.doctor ?? '');

  const {
    mutate: mutateUpdateAppointment,
    isPending: isPendingUpdateAppointment,
  } = useUpdateSettingAppointmentDoctor();

  const days = schedule?.week.map((day) => {
    return dayjs().day(day.day).format('dddd');
  });

  const dailyBreaks = schedule?.dailyBreakTimes.map((breakTime) => {
    return {
      start: breakTime.startTime,
      end: breakTime.endTime,
    };
  });

  function handleEditModal() {
    closeModal(),
      openModal({
        view: <ScheduleForm isEdit doctorId={event?.doctor} />,
        customSize: '700px',
      });
  }

  function handleDelete(eventId: string) {
    const payloadSettingAppointment: IPayloadSettingAppointmentDoctor = {
      doctor_id: event.doctor,
      schedule: {
        interval: '',
        week: [],
        dailyBreakTimes: [],
      },
    };

    mutateUpdateAppointment(payloadSettingAppointment, {
      onSuccess: () => {
        toast.success('Schedule deleted successfully');
        closeModal();
      },
      onError: (error: any) => {
        toast.error(
          'Failed to delete Schedule: ' + error.response.data.message
        );
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
            <FaUserDoctor className="h-5 w-5" />
            <span>Doctor:</span>
            <span className="font-medium text-gray-1000">{`${dataDoctor?.first_name} ${dataDoctor?.last_name}`}</span>
          </li>
          {/* <li className="flex gap-2">
            <FaPencil className="h-5 w-5" />
            <span>Description:</span>
            <span className="font-medium text-gray-1000">
              {event.description}
            </span>
          </li> */}
          <li className="flex gap-2">
            <MdOutlineCalendarMonth className="h-5 w-5" />
            <span>Event:</span>
            <span className="font-medium text-gray-1000">
              {days?.map((day, index) => (
                <span key={index}>
                  {day}
                  {index < days.length - 1 ? ', ' : ''}
                </span>
              ))}
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
          {dailyBreaks && dailyBreaks.length > 0 && (
            <li className="flex gap-2">
              <PiMapPin className="h-5 w-5" />
              <span>Break Times:</span>
              {dailyBreaks.map((breakTime, index) => (
                <span key={index} className="font-medium text-gray-1000">
                  {formatDate(new Date(breakTime.start), 'h:mm A')} -{' '}
                  {formatDate(new Date(breakTime.end), 'h:mm A')}
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
            isLoading={isPendingUpdateAppointment}
          >
            Delete
          </Button>
          <Button onClick={handleEditModal}>Edit</Button>
        </div>
      </div>
    </div>
  );
}

export default DetailsSchedule;
