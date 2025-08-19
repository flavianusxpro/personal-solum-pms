import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiCoffee, PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useGetDoctorById } from '@/hooks/useDoctor';
import { DoctorSchedule } from '@/types/ApiResponse';
import { useDeleteSchedule, useGetListSchedule } from '@/hooks/useSchedule';
import dayjs from 'dayjs';
import EditScheduleForm from './edit-schedule-form';

interface DetailsScheduleProps {
  event: DoctorSchedule;
  doctorId?: string;
  isView?: boolean;
}

function DetailsSchedule({ event, doctorId, isView }: DetailsScheduleProps) {
  const { closeModal, openModal } = useModal();

  const { refetch } = useGetListSchedule({
    doctorId: doctorId as string,
    page: 1,
    perPage: 100,
  });

  const { mutate: mutateDeleteSchedule, isPending: isPendingDeleteSchedule } =
    useDeleteSchedule();

  function handleEditModal() {
    closeModal(),
      openModal({
        view: <EditScheduleForm event={event} doctorId={doctorId} />,
        customSize: '700px',
      });
  }

  function handleDelete(eventId: number) {
    mutateDeleteSchedule([eventId], {
      onSuccess: () => {
        refetch();
        toast.success('Schedule deleted successfully');
        closeModal();
      },
      onError: (error: any) => {
        toast.error(
          'Failed to delete Schedule: ' + error.response.data.message
        );
      },
    });
  }

  return (
    <div className="m-auto p-4 md:px-7 md:pb-10 md:pt-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="">
          <Title as="h3" className="text-xl xl:text-2xl">
            Event Details
          </Title>
          <Text className="mt-2 text-xs text-gray-500">
            All schedules follow Australia/Sydney timezone
          </Text>
        </div>
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
          {/* <li className="flex gap-2">
            <FaUserDoctor className="h-5 w-5" />
            <span>Doctor:</span>
            <span className="font-medium text-gray-1000">{`${dataDoctor?.first_name} ${dataDoctor?.last_name}`}</span>
          </li> */}
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
            <span className="font-semibold">
              {dayjs(event.start_date).format('hh:mm a')}
            </span>
            <span className="font-semibold">
              - {dayjs(event.end_date).format('hh:mm a')}
            </span>
          </li>
          {event.break_times && event.break_times.length > 0 && (
            <li className="flex gap-2">
              <PiCoffee className="h-5 w-5" />
              <span>Break Times:</span>
              {event.break_times.map((breakTime, index) => (
                <span key={index} className="font-semibold">
                  {`${dayjs(breakTime.start_date).format('hh:mm a')} - ${dayjs(
                    breakTime.end_date
                  ).format('hh:mm a')}`}
                  {index < event.break_times.length - 1 && ','}
                </span>
              ))}
            </li>
          )}
        </ul>
        {!isView && (
          <div className={cn('grid grid-cols-2 gap-4 pt-5')}>
            <Button
              variant="outline"
              onClick={() => handleDelete(event.id as unknown as number)}
              isLoading={isPendingDeleteSchedule}
            >
              Delete
            </Button>
            <Button onClick={handleEditModal}>Edit</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailsSchedule;
