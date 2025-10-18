import { Input, Text, Title } from 'rizzui';
import cn from '@/core/utils/class-names';
import { MdOutlineArrowBack, MdOutlinePhoneMissed } from 'react-icons/md';
import { VscCallIncoming, VscCallOutgoing } from 'react-icons/vsc';
import Image from 'next/image';
import { BsLink45Deg } from 'react-icons/bs';
import { PiMagnifyingGlassLight } from 'react-icons/pi';

const CallHistoryLayout = ({
  onCloseCallHistory,
  onBack,
}: {
  onCloseCallHistory?: () => void;
  onBack?: () => void;
}) => {
  const files = [
    {
      id: 1,
      file_name: 'Image 1',
      link: 'https://example.com/files/alicia-cbc-2025',
      date: '13 October, 2025',
      time: '09:42 AM',
      upload_by: 'Budi Setiadi',
    },
    {
      id: 2,
      file_name: 'Image 2',
      link: 'https://example.com/files/alicia-cbc-2025',
      date: '13 October, 2025',
      time: '09:42 AM',
      upload_by: 'Alicia',
    },
  ];
  return (
    <div
      className="flex-1 space-y-4 overflow-y-auto bg-white p-4"
      onClick={onCloseCallHistory}
    >
      <div className="flex flex-col gap-3">
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
            Links
          </Title>
        </div>

        <Input
          type="text"
          placeholder="Search links"
          size="md"
          prefix={<PiMagnifyingGlassLight className="h-5 w-5 cursor-pointer" />}
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          {files.map((file, index) => (
            <div
              className="flex items-start gap-3 rounded-lg border border-gray-300 p-2"
              key={index}
            >
              <div className="rounded-lg bg-[#F2F2F2] p-6">
                <BsLink45Deg className="text-2xl text-[#787878]" />
              </div>
              <div>
                <Text className="text-ellipsis">{file.link}</Text>
                <Text className="text-gray-400">
                  {file.date} {file.time}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallHistoryLayout;
