import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import { ActionIcon, Button, Checkbox, Flex } from 'rizzui';
import Image from 'next/image';
import ConfirmInfoBlueIcon from '@public/ConfirmInfoBlueIcon.svg';

export default function ShowConfirm({
  id,
  status,
  onClick,
}: {
  id: number;
  status: string;
  onClick: (value: number) => void;
}) {
  const { closeModal } = useModal();

  return (
    <div className="flex justify-center items-center flex-col gap-6 p-6 h-[350px]">
      <div className="flex justify-center">
        <Image src={ConfirmInfoBlueIcon} alt="info-icon" />
      </div>
      <div className="flex flex-col items-center gap-[16px]">
        <span className="text-[24px] font-bold">Change Status to {status}?</span>
        <span className="max-w-xs text-center text-[16px]">
          Are you sure you want to change the appointment status to {''}
          <span className="text-center font-bold text-gray-400">{status}</span>?
        </span>
        <Checkbox 
          label={
            <span className='ml-1'>Notify patient about this update</span>
          } 
          size="sm" 
        />
      </div>
      <div className="flex justify-center gap-[16px]">
        <Button
          className="border border-black bg-white text-black hover:bg-white hover:text-black"
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button className="bg-[#2847FB]" onClick={() => onClick(id)}>
          Yes, Continued
        </Button>
      </div>
    </div>
  );
}
