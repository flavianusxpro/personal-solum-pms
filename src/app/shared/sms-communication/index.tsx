import cn from '@/core/utils/class-names';
import {
  LuEllipsisVertical,
  LuInfo,
  LuPhone,
  LuPhoneCall,
  LuSend,
  LuUserRoundPlus,
  LuUsersRound,
} from 'react-icons/lu';
import {
  PiGear,
  PiMagnifyingGlassLight,
  PiPlusCircleLight,
  PiPlusLight,
  PiSmileyLight,
} from 'react-icons/pi';
import {
  ActionIcon,
  Avatar,
  Button,
  Dropdown,
  Flex,
  Input,
  Text,
  Title,
  Tooltip,
} from 'rizzui';
import { DividerWithText } from '../ui/divider';
import { useState } from 'react';
import RepliesLayout from './replies-layout';
import RepliesMessage from './replies-message';
import AddChannel from './modal/create-channel';
import { useModal } from '../modal-views/use-modal';
import AddInvitePeople from './modal/invite-people';
import MembersLayout from './member-lists';
import ChannelSettingsLayout from './channel-settings';
import UserSettingsLayout from './user-settings/user-settings';
import FileHistoryLayout from './user-settings/file-history';
import CallHistoryLayout from './user-settings/call-history';
import { AvatarWithBadge } from '@/core/ui/avatar';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsFilter } from 'react-icons/bs';
import SimpleBar from 'simplebar-react';
import { TabButton } from '../ui/tab-button';
import DropdownComponent from '../ui/dropdown';
import { sortBy } from 'lodash';

type IPersonType = {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  avatar: string;
  time: string;
};

const channels = [
  { label: 'general', value: 'general' },
  { label: 'patient', value: 'patient' },
  { label: 'random', value: 'random' },
];

const persons = [
  {
    id: 1,
    first_name: 'Isabella',
    last_name: 'Murphin',
    role: 'Specialist',
    avatar: '',
    time: '50 minutes ago',
    read_message: 2,
  },
  {
    id: 2,
    first_name: 'Emily',
    last_name: 'Rose',
    role: 'Specialist',
    avatar: '',
    time: '50 minutes ago',
    read_message: 2,
  },
  {
    id: 3,
    first_name: 'Aqeela',
    last_name: 'Vaughan',
    role: 'Specialist',
    avatar: '',
    time: '50 minutes ago',
    read_message: 0,
  },
];

const SmsCommunication = () => {
  const { openModal } = useModal();
  const [selectedChannel, setSelectedChannel] = useState('');
  const [isReplies, setIsReplies] = useState(false);
  const [openMembers, setOpenMembers] = useState(false);
  const [openChannelSetting, setOpenChannelSetting] = useState(false);
  const [openUserSetting, setOpenUserSetting] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IPersonType>(
    {} as IPersonType
  );
  const [openFileLayout, setOpenFileLayout] = useState(false);
  const [openCallHistory, setOpenCallHistory] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const tabItems = [
    { label: 'All Messages', value: 'all-messages' },
    { label: 'Unread (20)', value: 'unread' },
    { label: 'Channel', value: 'channel' },
  ];
  const [tabActive, setTabActive] = useState(tabItems[0].value);
  const [onSort, setOnSort] = useState('');

  const showModalAddChannel = () => {
    openModal({
      view: <AddChannel user_id={1} />,
      customSize: '600px',
    });
  };

  const showModalAddInvitePeople = () => {
    openModal({
      view: <AddInvitePeople user_id={1} />,
      customSize: '600px',
    });
  };

  const handleSort = (sortBy: string) => {
    setOnSort(sortBy);
  };

  const unreadMessages = persons.filter((person) => person.read_message > 0);

  return (
    <div className="flex h-screen w-full rounded-2xl border">
      {/* Sidebar kiri */}
      <aside className="flex w-[280px] flex-col border-r border-gray-200">
        <div className="relative flex h-20 w-full flex-col items-center border-b p-5">
          <Input
            type="text"
            placeholder="Search by name"
            size="sm"
            prefix={
              <PiMagnifyingGlassLight className="h-5 w-5 cursor-pointer" />
            }
            // suffix={
            //   <DropdownComponent
            //     actionComponent={
            //       <BsFilter className="h-5 w-5 cursor-pointer" />
            //     }
            //     menuItems={
            //       <div className="w-200 flex gap-3">
            //         <Dropdown.Item>Most Recent</Dropdown.Item>
            //         <Dropdown.Item>Status</Dropdown.Item>
            //         <Dropdown.Item>From </Dropdown.Item>
            //       </div>
            //     }
            //   />
            // }
            suffix={
              <BsFilter
                className="h-5 w-5 cursor-pointer"
                onClick={() => setOpenSort(!openSort)}
              />
            }
            className="w-full"
          />
          {openSort && (
            <div className="absolute left-[4%] top-[80%] z-50 ml-2 flex rounded-lg bg-white p-2 shadow-md">
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-black">Sort by:</span>
                <div className="flex gap-3">
                  <Button
                    rounded="pill"
                    className={` ${onSort == 'most-recent' ? 'bg-[#3872F9] text-white' : '!border !border-gray-300 !bg-white !text-black'} `}
                    size="sm"
                    onClick={() => handleSort('most-recent')}
                  >
                    Most Recent
                  </Button>
                  <Button
                    rounded="pill"
                    className={` ${onSort == 'status' ? 'bg-[#3872F9] text-white' : '!border !border-gray-300 !bg-white !text-black'} `}
                    size="sm"
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </Button>
                  <Button
                    rounded="pill"
                    className={` ${onSort == 'from' ? 'bg-[#3872F9] text-white' : '!border !border-gray-300 !bg-white !text-black'} `}
                    size="sm"
                    onClick={() => handleSort('from')}
                  >
                    From
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="z-10 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 px-4 py-4">
            <nav className="h-15 mb-2 flex w-full items-center gap-5 overflow-x-auto border-b border-gray-300 px-2 md:gap-7 lg:gap-10">
              {tabItems.map((item) => (
                <TabButton
                  key={item.value}
                  item={item}
                  isActive={item.value === tabActive}
                  onClick={() => {
                    setTabActive(item.value);
                  }}
                />
              ))}
            </nav>
            {tabActive == 'all-messages' && (
              <div>
                <Title
                  as="h6"
                  className={cn(
                    'mb-2 truncate px-2 text-sm font-medium uppercase tracking-widest text-[#787878]'
                  )}
                >
                  Patient Contacts
                </Title>

                <ul className="flex flex-col gap-2">
                  {persons.map((item, index) => (
                    <li
                      className={`flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-100 ${selectedUser?.id === item.id && 'rounded-lg bg-[#3872F90D]'} `}
                      key={index}
                      onClick={() => {
                        setSelectedUser(item);
                        setSelectedChannel('');
                      }}
                    >
                      <Flex align="center">
                        <Avatar
                          name="Jane Doe"
                          src="https://randomuser.me/api/portraits/women/40.jpg"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {item.first_name} {item.last_name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.time}
                          </span>
                        </div>
                      </Flex>
                      {item.read_message > 0 && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 text-xs text-white">
                          {item.read_message}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tabActive == 'channel' && (
              <div className="flex flex-col gap-6">
                <div>
                  <Flex justify="between" align="center">
                    <Title
                      as="h6"
                      className={cn(
                        'mb-2 truncate px-2 text-sm font-medium uppercase tracking-widest text-[#787878]'
                      )}
                    >
                      All Channels
                    </Title>
                    <Tooltip content="Create Channel">
                      <ActionIcon
                        size="sm"
                        variant="text"
                        onClick={showModalAddChannel}
                      >
                        <PiPlusCircleLight className="h-5 w-5 cursor-pointer" />
                      </ActionIcon>
                    </Tooltip>
                  </Flex>
                  <ul>
                    {channels.map((channel, index) => (
                      <li
                        className="cursor-pointer py-2"
                        key={index}
                        onClick={() => {
                          setSelectedChannel(channel.value);
                          setSelectedUser({} as IPersonType);
                        }}
                      >
                        <span
                          className={`${channel.value == selectedChannel && 'rounded-md bg-[#3872F91A] font-semibold text-[#3872F9]'} px-2 py-1`}
                        >
                          #{channel.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Title
                    as="h6"
                    className={cn(
                      'mb-2 truncate px-2 text-sm font-medium uppercase tracking-widest text-[#787878]'
                    )}
                  >
                    Direct Messages
                  </Title>

                  <ul className="flex flex-col gap-2">
                    {unreadMessages.map((item, index) => (
                      <li
                        className={`flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-100 ${selectedUser?.id === item.id && 'rounded-lg bg-[#3872F90D]'} `}
                        key={index}
                        onClick={() => {
                          setSelectedUser(item);
                          setSelectedChannel('');
                        }}
                      >
                        <Flex align="center">
                          <Avatar
                            name="Jane Doe"
                            src="https://randomuser.me/api/portraits/women/40.jpg"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {item.first_name} {item.last_name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {item.time}
                            </span>
                          </div>
                        </Flex>
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 text-xs text-white">
                          {item.read_message}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tabActive == 'unread' && (
              <div>
                <Title
                  as="h6"
                  className={cn(
                    'mb-2 truncate px-2 text-sm font-medium uppercase tracking-widest text-[#787878]'
                  )}
                >
                  Patient Contacts
                </Title>

                <ul className="flex flex-col gap-2">
                  {unreadMessages.map((item, index) => (
                    <li
                      className={`flex cursor-pointer items-center justify-between rounded-lg px-2 py-2 hover:bg-gray-100 ${selectedUser?.id === item.id && 'rounded-lg bg-[#3872F90D]'} `}
                      key={index}
                      onClick={() => {
                        setSelectedUser(item);
                        setSelectedChannel('');
                      }}
                    >
                      <Flex align="center">
                        <Avatar
                          name="Jane Doe"
                          src="https://randomuser.me/api/portraits/women/40.jpg"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold">
                            {item.first_name} {item.last_name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.time}
                          </span>
                        </div>
                      </Flex>
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 text-xs text-white">
                        {item.read_message}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t px-4 py-[1.13rem]">
          <Flex align="center" className="h-9">
            {selectedUser ? (
              <AvatarWithBadge data={{ name: 'Budi Setiadi' }} size="md" />
            ) : (
              <Avatar src="" name="Budi Setiadi" size="md" />
            )}
            <div className="flex flex-col">
              <span>Budi Setiadi</span>
              <span className="text-xs text-gray-400">Administrator</span>
            </div>
          </Flex>
          <Tooltip content="User Setting">
            <ActionIcon size="sm" variant="text">
              <PiGear className="h-5 w-5 cursor-pointer" />
            </ActionIcon>
          </Tooltip>
        </div>
      </aside>

      {/* Kolom chat */}
      <main className="flex flex-1 transform flex-col">
        {/* Header channel */}
        <div className="flex h-20 items-center justify-between border-b p-5">
          {(tabActive == 'all-messages' || tabActive == 'status') &&
          selectedUser &&
          selectedUser?.first_name &&
          selectedUser?.last_name ? (
            <Flex align="center" className="h-5">
              <Avatar
                name={
                  `${selectedUser.first_name} ${selectedUser.last_name}` || ''
                }
                src={selectedUser?.role}
                size="md"
              />
              <div className="flex flex-col">
                <Text>
                  {selectedUser?.first_name} {selectedUser?.last_name}
                </Text>
                <Text className="text-xs text-gray-500">
                  {selectedUser?.role}
                </Text>
              </div>
            </Flex>
          ) : (
            tabActive == 'channel' && (
              <Text className="font-medium text-black">
                {selectedChannel ? `#${selectedChannel}` : ''}
              </Text>
            )
          )}

          <Flex className="w-full" justify="end" align="center">
            <Input
              type="text"
              placeholder="Search in conversation..."
              size="sm"
              prefix={
                <PiMagnifyingGlassLight className="h-5 w-5 cursor-pointer" />
              }
            />
            {/* {selectedUser && Object.keys(selectedUser).length > 0 && (
              <>
               
                <Tooltip content="Call User">
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={showModalAddInvitePeople}
                  >
                    <LuPhone className="h-5 w-5 text-gray-400" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip content="User Details">
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={showModalAddInvitePeople}
                  >
                    <LuInfo className="h-5 w-5 text-gray-400" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip content="User Settings">
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={() => setOpenUserSetting(!openUserSetting)}
                  >
                    <IoSettingsOutline className="h-5 w-5 text-gray-400" />
                  </ActionIcon>
                </Tooltip>
              </>
            )} */}

            {tabActive == 'channel' ? (
              <>
                <Tooltip content="Invite People">
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={showModalAddInvitePeople}
                  >
                    <LuUserRoundPlus className="h-5 w-5 text-gray-400" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip content="Member List">
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={() => {
                      setOpenMembers(!openMembers);
                      setIsReplies(false);
                    }}
                  >
                    <div className="relative inline-flex">
                      <LuUsersRound className="h-5 w-5 text-gray-400" />
                      <Text className="absolute right-0 top-0 -translate-y-[40%] translate-x-[100%] text-xs">
                        75
                      </Text>
                    </div>
                  </ActionIcon>
                </Tooltip>
                <Tooltip content="Channel Settings">
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={() => {
                      setOpenChannelSetting(!openChannelSetting);
                    }}
                  >
                    <div className="relative inline-flex">
                      <LuEllipsisVertical className="h-5 w-5 text-gray-400" />
                    </div>
                  </ActionIcon>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip content="Call User">
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={showModalAddInvitePeople}
                  >
                    <LuPhone className="h-5 w-5 text-gray-400" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip content="User Details">
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={showModalAddInvitePeople}
                  >
                    <LuInfo className="h-5 w-5 text-gray-400" />
                  </ActionIcon>
                </Tooltip>
                <Tooltip content="User Settings">
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={() => setOpenUserSetting(!openUserSetting)}
                  >
                    <IoSettingsOutline className="h-5 w-5 text-gray-400" />
                  </ActionIcon>
                </Tooltip>
              </>
            )}
          </Flex>
        </div>

        <div className="relative flex flex-1 overflow-y-hidden bg-[#FAFAFF]">
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <div className="flex flex-col items-start gap-3">
              <DividerWithText text="OCTOBER 08, 2025" />
              <div className="flex flex-col gap-6">
                <RepliesMessage
                  name="Auto Generated System"
                  date="Today 9:05 AM"
                  photo="/bot-sparkle.svg"
                  message="Hi Alicia, this is a reminder from Solum Clinic for your appointment on October 13, 2025 at 11:45 AM.Please reply Y to confirm or N if you can’t make it.Thank you and see you soon!"
                  // isReplies={true}
                  // handleReplies={() => {
                  //   setIsReplies(!isReplies);
                  //   setOpenMembers(false);
                  // }}
                  className="!w-10 !bg-black !text-white"
                  messageClassName="bg-gray-300"
                />
                <RepliesMessage
                  name="Alicia Krawczyk"
                  date="Today at 1:12 PM"
                  message="Y"
                  photo="https://randomuser.me/api/portraits/women/41.jpg"
                  messageClassName="bg-[#DDE7FF] w-10 flex items-center justify-center"
                />
                <RepliesMessage
                  name="Auto Generated System"
                  date="Today 9:05 AM"
                  message="Thank you, Alicia! Your appointment on October 13, 2025, at 11:45 AM has been confirmed.If you need to reschedule, please contact our support team via chat or call."
                  photo="/bot-sparkle.svg"
                  className="!bg-black !text-white"
                  messageClassName="bg-gray-300"
                />
              </div>
            </div>
          </div>
          {isReplies && (
            <div
              className={`absolute bottom-0 right-0 top-0 h-full w-full max-w-[350px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                isReplies ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {isReplies == true && (
                <RepliesLayout
                  onCloseHandleReplies={() => setIsReplies(false)}
                />
              )}
            </div>
          )}

          {openChannelSetting && (
            <div
              className={`absolute bottom-0 right-0 top-0 h-full w-full max-w-[250px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                openChannelSetting ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {openChannelSetting == true && (
                <MembersLayout
                  onCloseMembers={() => setOpenChannelSetting(false)}
                />
              )}
            </div>
          )}

          {openMembers && (
            <div
              className={`absolute bottom-0 right-0 top-0 h-full w-full max-w-[250px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                openMembers ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {openMembers == true && (
                <MembersLayout onCloseMembers={() => setOpenMembers(false)} />
              )}
            </div>
          )}

          {openUserSetting && (
            <div
              className={`absolute bottom-0 right-0 top-0 h-full w-full max-w-[350px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                openUserSetting ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {openUserSetting == true && (
                <UserSettingsLayout
                  onClose={() => setOpenUserSetting(false)}
                  userData={selectedUser}
                  onOpenFilelayout={() => setOpenFileLayout(true)}
                  onOpenCalllayout={() => setOpenCallHistory(true)}
                />
              )}
            </div>
          )}

          {openFileLayout && (
            <div
              className={`absolute bottom-0 right-0 top-0 h-full w-full max-w-[350px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                openFileLayout ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {openFileLayout == true && (
                <FileHistoryLayout
                  onCloseFileHistory={() => setOpenFileLayout(false)}
                  onBack={() => {
                    setOpenFileLayout(false);
                    setOpenUserSetting(true);
                  }}
                />
              )}
            </div>
          )}
          {openCallHistory && (
            <div
              className={`absolute bottom-0 right-0 top-0 h-full w-full max-w-[350px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
                openCallHistory ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {openCallHistory == true && (
                <CallHistoryLayout
                  onCloseCallHistory={() => setOpenCallHistory(false)}
                  onBack={() => {
                    setOpenCallHistory(false);
                    setOpenUserSetting(true);
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="flex items-center border-t">
          <div className="flex h-full items-center border-r border-gray-200 px-5">
            <PiPlusLight className="h-5 w-5" />
          </div>
          <div className="flex w-full items-center gap-2 px-2 py-5">
            <Input
              type="text"
              placeholder="Message type here..."
              size="sm"
              className="!focus:ring-0 w-full !border-none !shadow-none !ring-0 focus:!shadow-none"
              inputClassName="!border-none !ring-0 !focus:ring-0 !shadow-none focus:!shadow-none"
            />
            <PiSmileyLight className="h-5 w-5" />
            <Button className="w-auto text-white" size="sm">
              <LuSend className="me-1.5 h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SmsCommunication;
