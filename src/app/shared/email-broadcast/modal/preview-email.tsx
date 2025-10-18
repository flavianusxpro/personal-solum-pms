import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon, Title } from 'rizzui';

function PreviewEmail({ data }: { data: any }) {
  const { closeModal } = useModal();
  const details = data?.raw ?? data;

  return (
    <div className="m-auto p-4 md:px-7 md:pb-10 md:pt-6">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-xl xl:text-2xl">
          Preview Email Broadcast
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
          Hi Alexandra, His is a friendly reminder for your upcoming appointment
          at 9:00 AM on Friday, 10 October 2025 with Dr. Emily Turner. Please
          arrive 10 minutes early and bring your ID or patient card. Thank
          you,Solum Clinic
        </p>
        <hr />
        <span className="text-[#787878]">info@solumclinic.com.au</span>
      </div>
    </div>
  );
}

export default PreviewEmail;
