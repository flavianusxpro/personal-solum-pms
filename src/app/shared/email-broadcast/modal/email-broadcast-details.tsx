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

function EmailBroadcastDetails({ data }: { data: any }) {
  const { closeModal } = useModal();
  const details = data?.raw ?? data;

  return (
    <div className="m-auto p-4 md:px-7 md:pb-10 md:pt-6">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-xl xl:text-2xl">
          Email Broadcast Details
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
        <ul className="mt-2 flex flex-col gap-3 text-gray-600">
          <li className="flex gap-2">
            <span className="text-[#787878]">Recipient Group:</span>
            <span className="font-medium text-gray-1000">All Patient</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#787878]">Email Subject:</span>
            <span className="font-medium text-gray-1000">
              Appointment Reminder – Tomorrow at 9:00 AM
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#787878]">Template:</span>
            <span className="font-medium text-gray-1000">
              Appointment Reminder
            </span>
          </li>
          <li className="flex flex-col gap-2">
            <span className="text-[#787878]">Email Body:</span>
            <span className="font-medium text-gray-1000">
              Hi Alexandra, His is a friendly reminder for your upcoming
              appointment at 9:00 AM on Friday, 10 October 2025 with Dr. Emily
              Turner. Please arrive 10 minutes early and bring your ID or
              patient card. Thank you,Solum Clinic
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#787878]">Scheduled Send:</span>
            <span className="font-medium text-gray-1000">
              {/* {formatDate(details.date, 'MMMM D, YYYY')} at{' '}
              {formatDate(details.date, 'h:mm A')} */}
              09/10/2025 9:00 AM
            </span>
          </li>

          <li className="flex gap-2">
            <span className="text-[#787878]">Status:</span>
            <span className="font-medium text-gray-1000">
              {getPaymentStatusBadge(details.payment?.status as number)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EmailBroadcastDetails;
