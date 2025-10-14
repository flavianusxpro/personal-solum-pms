import { Text, Title } from 'rizzui';
import cn from '@/core/utils/class-names';
import { MdOutlineArrowBack, MdOutlinePhoneMissed } from 'react-icons/md';
import { VscCallIncoming, VscCallOutgoing } from 'react-icons/vsc';

const CallHistoryLayout = ({
  onCloseCallHistory,
  onBack,
}: {
  onCloseCallHistory?: () => void;
  onBack?: () => void;
}) => {
  return (
    <div
      className="flex-1 space-y-4 overflow-y-auto bg-white p-4"
      onClick={onCloseCallHistory}
    >
      <div className="flex gap-3">
        <MdOutlineArrowBack
          className="h-5 w-5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onBack?.();
          }}
        />
        <Title
          as="h6"
          className={cn('mb-2 truncate px-2 text-[16px] font-medium')}
        >
          Call History
        </Title>
      </div>
      <div className="flex flex-col gap-3">
        <Text className="text-black">Lates</Text>
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-start gap-2">
            <VscCallIncoming className="h-5 w-5 text-[#787878]" />
            <div className="flex w-full flex-col">
              <span className="text-black">Incoming Call</span>
              <span className="text-[#787878]">13 October, 2025 9:42 AM</span>
            </div>
          </div>
          <div className="flex w-full items-start gap-2">
            <VscCallOutgoing className="h-5 w-5 text-[#787878]" />
            <div className="flex w-full flex-col">
              <span className="text-black">Outgoing Call</span>
              <span className="text-[#787878]">13 October, 2025 9:42 AM</span>
            </div>
          </div>
          <div className="flex w-full items-start gap-2">
            <MdOutlinePhoneMissed className="h-5 w-5 text-[#E90000]" />
            <div className="flex w-full flex-col">
              <span className="text-black">Outgoing Call</span>
              <span className="text-[#787878]">13 October, 2025 9:42 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallHistoryLayout;
