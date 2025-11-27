import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiCoffee, PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Empty, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { MdOutlineCalendarMonth, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useGetDoctorById } from '@/hooks/useDoctor';
import { DoctorSchedule } from '@/types/ApiResponse';
import { useDeleteSchedule, useGetListSchedule } from '@/hooks/useSchedule';
import dayjs from 'dayjs';
import EditScheduleForm from './edit-schedule-form';
import AppointmentDetails from '../appointment/appointment-list/list/appointment-details';

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

      {/* <div>
        <ul className="mt-7 flex flex-col gap-[18px] text-gray-600">
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
      </div> */}

      {event?.appointment?.length === 0 ? (
        <div className='w-full'>
          <Empty text="No Data" textClassName="mt-2" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {event?.appointment?.map((data: any, index: number) => {
            const isLast = index === event.appointment.length - 1;
            const isOdd = event.appointment.length % 2 === 1;

            return (
              <div
                key={index}
                className={cn(
                  "flex gap-2 items-center p-4 rounded-lg border border-[#E4E4E4]",
                  isLast && isOdd ? "col-span-2" : ""
                )}
              >
                <div className="flex flex-col flex-1">
                  <h1 className="text-sm font-medium">
                    {data?.patient?.first_name} {data?.patient?.last_name}
                  </h1>

                  <p className="text-sm text-[#525252]">
                    {data?.date
                      ? `${dayjs(data?.date).utc().format("DD MMM YYYY")}, ${dayjs(data?.date)
                        .utc()
                        .format("hh:mm A")}`
                      : "-"}
                    <span className="mx-2">|</span>
                    {data?.type ?? "-"}
                  </p>
                </div>

                <ActionIcon
                  onClick={() => {
                    openModal({
                      view: (
                        <AppointmentDetails data={data} />
                      ),
                      customSize: '1100px',
                    })
                  }}
                  variant="text"
                >
                  <MdOutlineKeyboardArrowRight className="size-5" />
                </ActionIcon>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default DetailsSchedule;
