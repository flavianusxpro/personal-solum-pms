import { Avatar, Flex, Text, Title } from 'rizzui';
import { AvatarWithBadge } from '@/core/ui/avatar';
import cn from '@/core/utils/class-names';
import { MdOutlineArrowBack } from 'react-icons/md';
import Image from 'next/image';

const FileHistoryLayout = ({
  onCloseFileHistory,
  onBack,
}: {
  onCloseFileHistory?: () => void;
  onBack?: () => void;
}) => {
  const images = [
    {
      id: 1,
      file_name: 'Image 1',
      image: 'https://randomuser.me/api/portraits/women/41.jpg',
      date: '13 October, 2025',
      time: '09:42 AM',
      upload_by: 'Budi Setiadi',
    },
    {
      id: 2,
      file_name: 'Image 2',
      image: 'https://randomuser.me/api/portraits/women/40.jpg',
      date: '13 October, 2025',
      time: '09:42 AM',
      upload_by: 'Alicia',
    },
  ];
  return (
    <div
      className="flex-1 space-y-4 overflow-y-auto bg-white p-4"
      onClick={onCloseFileHistory}
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
          Files
        </Title>
      </div>
      <div className="flex flex-col gap-3">
        {images.map((image, index) => (
          <div
            className="flex items-start gap-3 rounded-lg border border-gray-300 p-2"
            key={index}
          >
            <Image
              src={image.image}
              alt="file"
              width={100}
              height={70}
              className="rounded-lg"
            />
            <div className="flex flex-col gap-4">
              <div>
                <Text>{image.file_name}</Text>
                <Text className="text-gray-400">{image.date}</Text>
                <Text className="text-gray-400">{image.time}</Text>
              </div>
              <div className="flex gap-2">
                <Text className="text-gray-400">upload by</Text>
                <Text className="text-black">{image.upload_by}</Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileHistoryLayout;
