import { ActionIcon, Avatar, Badge, Flex, Switch, Text, Title } from 'rizzui';
import cn from '@/core/utils/class-names';
import { LuChevronRight, LuPhone } from 'react-icons/lu';
import { RiPushpinLine, RiUnpinLine } from 'react-icons/ri';
import Image from 'next/image';
import { HiOutlineMail, HiOutlinePhoneMissedCall } from 'react-icons/hi';
import { VscCallIncoming, VscCallOutgoing } from 'react-icons/vsc';
import { MdOutlinePhoneMissed } from 'react-icons/md';
import { useState } from 'react';
import { CiImageOff } from 'react-icons/ci';
import { InstagramIcon, LinkedinIcon, FacebookIcon } from '@public/index';
import { BsLink45Deg, BsTrash } from 'react-icons/bs';
import { PiBell } from 'react-icons/pi';
import { TfiUnlink } from 'react-icons/tfi';

type IUserSettingProps = {
  userData: any;
  onClose: () => void;
  onOpenFilelayout?: () => void;
  onOpenCalllayout?: () => void;
};
const UserSettingsLayout = ({
  userData,
  onClose,
  onOpenFilelayout,
  onOpenCalllayout,
}: IUserSettingProps) => {
  const [pin, setPin] = useState(false);
  const images = [1, 2, 3, 4];
  const getIcon = (social: string) => {
    switch (social) {
      case 'instagram':
        return (
          <Image
            src={InstagramIcon}
            alt="instagram-icon"
            width={15}
            height={15}
          />
        );
      case 'linkedin':
        return (
          <Image
            src={LinkedinIcon}
            alt="linkedin-icon"
            width={15}
            height={15}
          />
        );
      case 'facebook':
        return (
          <Image
            src={FacebookIcon}
            alt="facebook-icon"
            width={15}
            height={15}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div
      className="flex h-[80vh] flex-1 flex-col gap-3 space-y-4 overflow-y-auto bg-white p-8"
      onClick={onClose}
    >
      <Flex
        justify="center"
        gap="3"
        direction="col"
        className="text-center"
        align="center"
      >
        <Avatar
          name={`${userData?.first_name} ${userData?.last_name}`}
          src=""
        />
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <Title
              as="h3"
              className={cn('truncate text-lg font-medium capitalize')}
            >
              {userData?.first_name} {userData?.last_name}
            </Title>
            {userData?.social_media && getIcon(userData?.social_media)}
          </div>

          {userData?.isActive && (
            <div className="flex items-center gap-2">
              <Badge renderAsDot color="success" />
              <Text>Online</Text>
            </div>
          )}
        </div>
        <Flex gap="2" align="center" justify="center">
          <ActionIcon
            rounded="full"
            className="!border-gray-300 !bg-white !text-gray-400"
            onClick={(e) => {
              setPin(!pin);
              e.stopPropagation();
            }}
          >
            {pin ? (
              <RiUnpinLine className="h-5 w-5" />
            ) : (
              <RiPushpinLine className="h-5 w-5" />
            )}
          </ActionIcon>
          <ActionIcon
            rounded="full"
            className="!border-gray-300 !bg-white !text-gray-400"
          >
            <LuPhone className="h-5 w-5" />
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
            Contact
          </Title>
          <div className="flex items-center gap-2">
            <HiOutlineMail className="h-5 w-5 text-[#787878]" />
            <p className="text-[#787878]">aliciakrawczyk@mail.com</p>
          </div>
          <div className="flex items-center gap-2">
            <LuPhone className="h-5 w-5 text-[#787878]" />
            <p className="text-[#787878]">0835-2617-0927</p>
          </div>
        </Flex>
        <Flex direction="col" gap="2">
          <Title
            as="h6"
            className="text-sm font-medium uppercase text-[#787878]"
          >
            Files
          </Title>
          <div className="grid w-full grid-cols-4 gap-3">
            {images.map((file, index) => (
              <Image
                key={index}
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="file-photo"
                width={100}
                height={100}
                className="rounded-md"
              />
            ))}
          </div>
          <div
            className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 px-4 py-2 text-gray-400"
            onClick={(e) => {
              e.stopPropagation();
              onOpenFilelayout && onOpenFilelayout();
            }}
          >
            <Text>View all files</Text>
            <LuChevronRight className="inline-block h-4 w-4" />
          </div>
          {/* <div className="col-span-full flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-2">
            <CiImageOff className="h-8 w-8 text-[#787878]" />
            <div className="flex flex-col text-sm text-[#787878]">
              <Text className="font-medium text-xs">No files shared here.</Text>
              <span className="font-normal text-xs">
                New documents will show up once uploaded.
              </span>
            </div>
          </div> */}
        </Flex>
        <Flex direction="col" gap="2">
          <Title
            as="h6"
            className="text-sm font-medium uppercase text-[#787878]"
          >
            Links
          </Title>
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-start gap-2">
              <BsLink45Deg className="h-5 w-5 text-[#787878]" />
              <div className="flex w-full flex-col">
                <span className="truncate text-sm text-black">
                  https://example.com/files/alicia-cbc-2025
                </span>
                <span className="text-[#787878]">13 October, 2025 9:42 AM</span>
              </div>
            </div>

            <div
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 px-4 py-2 text-gray-400"
              onClick={(e) => {
                e.stopPropagation();
                onOpenCalllayout && onOpenCalllayout();
              }}
            >
              <Text>View all links</Text>
              <LuChevronRight className="inline-block h-4 w-4" />
            </div>
          </div>
          {/* <div className="col-span-full flex items-center gap-3 rounded-lg border border-gray-300 px-4 py-2">
            <TfiUnlink className="h-8 w-8 text-[#787878]" />
            <div className="flex flex-col text-sm text-[#787878]">
              <Text className="text-xs font-medium">
                No links available yet.
              </Text>
              <span className="text-xs font-normal">
                Shared links will appear here once uploaded.
              </span>
            </div>
          </div> */}
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
              <PiBell className="h-4 w-4 font-medium text-black" />
              <span className="font-medium text-black">Notifications</span>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <Switch
                variant="flat"
                labelClassName="font-medium text-sm text-gray-900"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <BsTrash className="h-4 w-4 font-medium text-[#E20404B2]" />
            <span className="font-medium text-[#E20404B2]">
              Block / Restrict User
            </span>
          </div>
          <p className="text-sm text-[#787878]">
            Blocking this user will stop all future messages and interactions.
          </p>
        </div>
      </Flex>
    </div>
  );
};

export default UserSettingsLayout;
