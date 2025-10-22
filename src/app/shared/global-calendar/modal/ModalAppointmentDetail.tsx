import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Title, Flex, Badge, Text } from 'rizzui';
import { formatDate } from '@core/utils/format-date';
import { getAptStatusBadge } from '../../appointment/appointment-list/list/columns';

export function getPaymentStatusBadge(status: number | string) {
  switch (status) {
    case 3:
      return (
        <Flex gap="1" align="center">
          <Badge color="danger" renderAsDot />
          <Text className="font-medium text-red-500">Cancelled</Text>
        </Flex>
      );
    case 2:
      return (
        <Flex gap="1" align="center">
          <Badge color="success" renderAsDot />
          <Text className="font-medium text-green-600">Paid</Text>
        </Flex>
      );
    case 1:
      return (
        <Flex gap="1" align="center">
          <Badge color="warning" renderAsDot />
          <Text className="font-medium text-yellow-600">Pending</Text>
        </Flex>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="font-medium text-blue-600">{status}</Text>
        </div>
      );
  }
}

function ModalAppointmentDetails({ data }: { data: any }) {
  const { closeModal } = useModal();
  const details = data?.raw ?? data;

  return (
    <div className="m-auto p-4 md:px-7 md:pb-10 md:pt-6">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-xl xl:text-2xl">
          Appointment Details
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
        <div>
          <Title as="h5" className="text-lg xl:text-2xl">
            Appointment with
            {` Dr. ${details.doctor?.first_name} ${details.doctor?.last_name}`}
          </Title>
        </div>
        <ul className="mt-2 flex flex-col gap-3 text-gray-600">
          <li className="flex gap-2">
            <span>Patient Name:</span>
            <span className="font-medium text-gray-1000">{`${details?.patient?.first_name} ${details?.patient?.last_name}`}</span>
          </li>
          <li className="flex gap-2">
            <span>Appointment Date:</span>
            <span className="font-medium text-gray-1000">
              {formatDate(details.date, 'MMMM D, YYYY')} at{' '}
              {formatDate(details.date, 'h:mm A')}
            </span>
          </li>
          <li className="flex gap-2">
            <span>Appointment Type:</span>
            <span className="font-medium text-gray-1000">{details.type}</span>
          </li>

          {/* <li className="flex gap-2">
            <MdOutlineCalendarMonth className="h-5 w-5" />
            <span>details End:</span>
            <span className="font-medium text-gray-1000">
              {formatDate(details.end, 'MMMM D, YYYY')} at{' '}
              {formatDate(details.end, 'h:mm A')}
            </span>
          </li> */}
          <li className="flex gap-2">
            <span>Payment Status:</span>
            <span className="font-medium text-gray-1000">
              {getPaymentStatusBadge(details.payment?.status as number)}
            </span>
          </li>
          <li className="flex gap-2">
            <span>Patient Notes:</span>
            <span className="font-medium text-gray-1000">
              {details.patient?.patient_problem}
            </span>
          </li>
          <li className="flex gap-2">
            <span>Patient Symtom History:</span>
            <span className="font-medium text-gray-1000">
              {details.patient?.patient_problem}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ModalAppointmentDetails;
