import { useModal } from '@/app/shared/modal-views/use-modal';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import dayjs from 'dayjs';
import { PiCalendarCheckLight, PiMapPinLight, PiXBold } from 'react-icons/pi';
import { Text, ActionIcon, Title, Button } from 'rizzui';
import { getPaymentStatusBadge } from './columns';

export default function AppointmentDetails({
  data,
  onDelete,
  onEdit,
}: {
  data?: IGetAppointmentListResponse['data'][number];
  onDelete: () => void;
  onEdit: () => void;
}) {
  const { closeModal } = useModal();

  console.log(data, 'doctor');
  return (
    <div className="block">
      <div className="flex items-center justify-between border-b border-gray-200 p-5 md:p-7">
        <Title
          as="h3"
          className="font-lexend text-xl font-semibold md:text-2xl"
        >
          Appointment Details
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-5 w-5" />
        </ActionIcon>
      </div>
      <div className="p-5 md:px-7 md:pb-7 md:pt-6">
        <Title
          as="h3"
          className="mb-5 font-lexend text-lg font-medium md:text-xl"
        >
          Appointment with {data?.doctor?.first_name} {data?.doctor?.last_name}
        </Title>
        <ul className="mt-7 space-y-4 text-xs sm:text-sm">
          <li className="flex items-center">
            <PiCalendarCheckLight className="me-2 hidden w-5 shrink-0 text-xl" />
            Appointment Date:{' '}
            <span className="ps-2 font-medium text-gray-1000">
              {dayjs(data?.date).format('DD MMM, YYYY h:mm A')}
            </span>
          </li>
          <li className="flex items-center">
            <PiMapPinLight className="me-2 hidden w-5 shrink-0 text-xl" />
            Appointment Type:{' '}
            <span className="ps-2 font-medium text-gray-1000">
              {data?.type}
            </span>
          </li>
          <li className="flex items-center">
            <PiMapPinLight className="me-2 hidden w-5 shrink-0 text-xl" />
            Payment Status:{' '}
            <span className="ps-2 font-medium text-gray-1000">
              {getPaymentStatusBadge(data?.payment.status as number)}
            </span>
          </li>
          <li className="flex items-center">
            Patient Notes:{' '}
            <span className="ps-2 font-medium text-gray-1000">
              {data?.note ?? '-'}
            </span>
          </li>
          <li className="flex items-center">
            Patient Symtom History:{' '}
            <span className="ps-2 font-medium text-gray-1000">
              {data?.patient_problem ?? '-'}
            </span>
          </li>
        </ul>
        <div className="mt-7 flex justify-end gap-3">
          <Button
            variant="solid"
            className="min-w-[80px]"
            onClick={(e) => (onDelete(), closeModal())}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
