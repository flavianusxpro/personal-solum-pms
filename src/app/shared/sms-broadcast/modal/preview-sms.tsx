import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Title } from 'rizzui';

function PreviewSms({ data }: { data: any }) {
  const { closeModal } = useModal();
  const details = data?.raw ?? data;

  return (
    <div className="m-auto p-4 md:px-7 md:pb-10 md:pt-6">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-xl xl:text-2xl">
          Preview Sms Broadcast
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

      <div className="flex flex-col gap-2">
        <p>
          Reminder!Your appointment with Dr. Emily Turner is on Friday, 10
          October 2025 at 9:00 AM. Please arrive 10 mins early. Thank you,Solum
          Clinic
        </p>
      </div>
    </div>
  );
}

export default PreviewSms;
