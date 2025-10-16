import { ActionIcon, Flex, Switch, Text, Title } from 'rizzui';
import cn from '@/core/utils/class-names';
import { PiBell, PiHashStraightBold, PiPushPin } from 'react-icons/pi';
import { MdOutlineArchive } from 'react-icons/md';
import { LuChevronRight, LuLogOut } from 'react-icons/lu';
import Image from 'next/image';
import { TrashBlockIcon } from '@public/index';

type IChannelSettingProps = {
  channelName: string;
  onClose: () => void;
};
const ChannelSettingsLayout = ({
  channelName,
  onClose,
}: IChannelSettingProps) => {
  return (
    <div
      className="flex flex-1 flex-col gap-3 space-y-4 overflow-y-auto bg-white p-4"
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
        <Flex gap="2" align="center" justify="center">
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
            <LuLogOut className="h-4 w-4" />
          </ActionIcon>
        </Flex>
      </Flex>
      <hr />
      <Flex direction="col" gap="6">
        <Flex direction="col" gap="2">
          <Title
            as="h6"
            className="text-sm font-medium uppercase text-[#787878]"
          >
            Descriptions
          </Title>
          <p className="text-gray-400">
            Used for internal discussions between clinic staff and system
            notifications.
          </p>
        </Flex>
        <Flex direction="col" gap="2">
          <Title
            as="h6"
            className="text-sm font-medium uppercase text-[#787878]"
          >
            Created By
          </Title>
          <div>
            <p className="text-gray-400">Budi Setiadi (Administrator)</p>
            <p className="text-gray-400">on October 8, 2025, 8:45 AM</p>
          </div>
        </Flex>
        <Flex direction="col" gap="2">
          <Title
            as="h6"
            className="text-sm font-medium uppercase text-[#787878]"
          >
            Files
          </Title>
          <div className="flex w-full gap-2">
            {[1, 2, 3, 4].map((file, index) => (
              <Image
                key={index}
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="file-photo"
                width={60}
                height={50}
                className="rounded-md"
              />
            ))}
          </div>
          <div className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-2 text-gray-400">
            <Text>View all files</Text>
            <LuChevronRight className="inline-block h-4 w-4" />
          </div>
        </Flex>
      </Flex>
      <hr />
      <Flex direction="col" gap="2">
        <Title as="h6" className="text-sm font-medium uppercase text-[#787878]">
          Options
        </Title>
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <PiBell className="h-4 w-4" />
              <span>Notifications</span>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <Switch
                variant="flat"
                labelClassName="font-medium text-sm text-gray-900"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Image src={TrashBlockIcon} alt="trash" />
            <span className="text-[#E20404B2]">Delete Channel</span>
          </div>
          <p className="text-sm text-[#787878]">
            Delete this channel and its messages. This {`can’t`} be undone.
          </p>
        </div>
      </Flex>
    </div>
  );
};

export default ChannelSettingsLayout;
