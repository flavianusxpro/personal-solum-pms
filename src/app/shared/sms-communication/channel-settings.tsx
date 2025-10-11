import { ActionIcon, Avatar, Flex, Text, Title } from 'rizzui';
import { AvatarWithBadge } from '@/core/ui/avatar';
import cn from '@/core/utils/class-names';
import {
  PiArchiveLight,
  PiArrowArcLeft,
  PiHashStraightBold,
  PiPushPin,
} from 'react-icons/pi';
import { MdOutlineArchive } from 'react-icons/md';

type IChannelSettingProps = {
  channelName: string;
  onClose: () => void;
};
const ChannelSettingsLayout = ({
  channelName,
  onClose,
}: IChannelSettingProps) => {
  const members = [
    {
      id: 1,
      name: 'Dr.Emily',
      avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
      isActive: true,
    },
    {
      id: 2,
      name: 'Isabella',
      avatar: '',
      isActive: false,
    },
  ];
  return (
    <div
      className="flex-1 space-y-4 overflow-y-auto bg-white p-4"
      onClick={onClose}
    >
      <Flex
        justify="center"
        gap="3"
        direction="col"
        className="text-center"
        align="center"
      >
        <div className="w-fit rounded-lg border border-gray-300 bg-[#F2F2F2] p-2">
          <PiHashStraightBold className="h-5 w-5 font-bold text-gray-500" />
        </div>
        <div>
          <Title
            as="h3"
            className={cn('truncate text-lg font-medium capitalize 2xl:px-8')}
          >
            {channelName}
          </Title>
          <span>Channel</span>
        </div>
        <Flex>
          <ActionIcon
            rounded="full"
            className="!border-gray-300 !bg-white !text-gray-400"
          >
            <PiPushPin className="h-4 w-4" />
          </ActionIcon>
          <ActionIcon
            rounded="full"
            className="!border-gray-300 !bg-white !text-gray-400"
          >
            <MdOutlineArchive className="h-4 w-4" />
          </ActionIcon>
          <ActionIcon
            rounded="full"
            className="!border-gray-300 !bg-white !text-gray-400"
          >
            <PiArrowArcLeft className="h-4 w-4" />
          </ActionIcon>
        </Flex>
      </Flex>
    </div>
  );
};

export default ChannelSettingsLayout;
