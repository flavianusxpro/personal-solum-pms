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
    id: 4,
    first_name: 'Lachlan',
    last_name: 'Reid',
    role: 'Consultant',
    avatar: '',
    time: '32 minutes ago',
    read_message: 1,
  },
  {
    id: 5,
    first_name: 'Chloe',
    last_name: 'Henderson',
    role: 'Therapist',
    avatar: '',
    time: '1 hour ago',
    read_message: 0,
  },
  {
    id: 6,
    first_name: 'Jack',
    last_name: 'Thompson',
    role: 'GP',
    avatar: '',
    time: '2 hours ago',
    read_message: 5,
  },
  {
    id: 7,
    first_name: 'Olivia',
    last_name: 'Campbell',
    role: 'Nurse',
    avatar: '',
    time: '15 minutes ago',
    read_message: 0,
  },
  {
    id: 8,
    first_name: 'Ethan',
    last_name: 'O’Connor',
    role: 'Physiotherapist',
    avatar: '',
    time: '10 minutes ago',
    read_message: 3,
  },
  {
    id: 9,
    first_name: 'Sophie',
    last_name: 'Williams',
    role: 'Dentist',
    avatar: '',
    time: '5 hours ago',
    read_message: 0,
  },
  {
    id: 10,
    first_name: 'Cooper',
    last_name: 'Johnson',
    role: 'Psychologist',
    avatar: '',
    time: '25 minutes ago',
    read_message: 1,
  },
  {
    id: 11,
    first_name: 'Matilda',
    last_name: 'Brown',
    role: 'Specialist',
    avatar: '',
    time: '2 hours ago',
    read_message: 4,
  },
  {
    id: 12,
    first_name: 'Harper',
    last_name: 'Davies',
    role: 'GP',
    avatar: '',
    time: '1 hour ago',
    read_message: 0,
  },
  {
    id: 13,
    first_name: 'Charlie',
    last_name: 'Wilson',
    role: 'Nurse',
    avatar: '',
    time: '8 minutes ago',
    read_message: 2,
  },
  {
    id: 14,
    first_name: 'Ruby',
    last_name: 'Harris',
    role: 'Therapist',
    avatar: '',
    time: '45 minutes ago',
    read_message: 1,
  },
  {
    id: 15,
    first_name: 'Noah',
    last_name: 'Anderson',
    role: 'Consultant',
    avatar: '',
    time: '3 hours ago',
    read_message: 0,
  },
];

const chatMessages = [
  {
    id: 1,
    name: 'Auto-generated System',
    date: 'Today at 8:45 AM',
    message:
      '🔔 Daily Summary: Total 42 appointments today. 7 initial consults and 12 follow-up consultations scheduled before noon.',
    photo: '/bot-sparkle.svg',
    className: '!bg-black !text-white',
  },
  {
    id: 2,
    name: 'Nanda Priani (Patient Coordinator)',
    date: 'Today at 8:47 AM',
    message:
      'Good morning, team! All consultation links for this morning have been sent to patients. Please double-check your session dashboards before the first call.',
    photo: '/avatars/nanda.png',
  },
  {
    id: 3,
    name: 'Dr. Daniel Morgan (GP)',
    date: 'Today at 8:50 AM',
    message:
      'Thanks, Nanda. I’ll start with the 9 AM consult. Could you verify if the patient “Andi S.” has completed the pre-assessment form?',
    photo: '/avatars/daniel.png',
  },
  {
    id: 4,
    name: 'Nanda Priani (Patient Coordinator)',
    date: 'Today at 8:50 AM',
    message:
      'Yes, Doctor. The form was submitted last night — uploaded to the patient file under “Pre-Consult Notes.”',
    photo: '/avatars/nanda.png',
  },
  {
    id: 5,
    name: 'Budi Setiadi (Admin)',
    date: 'Today at 8:52 AM',
    message:
      'Quick note: We’ll run a short system optimization at 10 PM tonight. The platform might go offline for about 10 minutes.',
    photo: '/avatars/budi.png',
  },
  {
    id: 6,
    name: 'Auto-generated System',
    date: 'Today at 9:05 AM',
    message:
      '📅 Schedule Update: Dr. Emily Turner’s 10:30 AM consultation with Alicia K. has been rescheduled to Oct 9, 2025 – 2:00 PM by the administrative team.',
    photo: '/bot-sparkle.svg',
    className: '!bg-black !text-white',
  },
  {
    id: 7,
    name: 'Dr. Emily Turner (Specialist)',
    date: 'Today at 9:10 AM',
    message:
      'Copy that. Thanks for the update — I’ll adjust my consultation notes accordingly.',
    photo: '/avatars/emily.png',
  },
  {
    id: 8,
    name: 'Dr. Jack Thompson (GP)',
    date: 'Today at 9:15 AM',
    message:
      'Morning all — quick reminder: Please review patient feedback before next week’s team meeting.',
    photo: '/avatars/jack.png',
  },
  {
    id: 9,
    name: 'Olivia Campbell (Nurse)',
    date: 'Today at 9:17 AM',
    message:
      'Got it, Jack. I’ve already compiled feedback for the first 10 patients — will send by EOD.',
    photo: '/avatars/olivia.png',
  },
  {
    id: 10,
    name: 'Auto-generated System',
    date: 'Today at 9:20 AM',
    message:
      '✅ Appointment Confirmation: Thank you, Noah! Your consultation with Dr. Harper Davies has been confirmed for October 14, 2025, at 2:30 PM.',
    photo: '/bot-sparkle.svg',
    className: '!bg-black !text-white',
    messageClassName: 'bg-gray-300',
  },
];

const patientMessages = [
  {
    id: 1,
    name: 'Jack Thompson',
    role: 'Patient',
    message:
      'Hi, just wanted to check if my appointment for tomorrow at 8:30 AM is confirmed?',
    timestamp: 'Oct 12 at 9:05 AM',
  },
  {
    id: 2,
    name: 'Chloe Nguyen',
    role: 'Patient',
    message:
      'Good morning, I need to update my contact number before my session today.',
    timestamp: 'Oct 12 at 9:42 AM',
  },
  {
    id: 3,
    name: "Liam O'Connor",
    role: 'Patient',
    message:
      'Hi there, could I please reschedule my consultation from Friday to next Monday?',
    timestamp: 'Oct 12 at 10:17 AM',
  },
  {
    id: 4,
    name: 'Sophie Williams',
    role: 'Patient',
    message:
      "I completed my pre-consultation form but haven't received the video call link yet.",
    timestamp: 'Oct 12 at 10:54 AM',
  },
  {
    id: 5,
    name: 'Noah Patel',
    role: 'Patient',
    message:
      'Just confirming — is Dr. Emily still available for my 2 PM consultation today?',
    timestamp: 'Oct 12 at 11:22 AM',
  },
  {
    id: 6,
    name: 'Isla Brown',
    role: 'Patient',
    message:
      'Hi, I might be running 10 minutes late for my appointment. Is that okay?',
    timestamp: 'Oct 12 at 1:03 PM',
  },
  {
    id: 7,
    name: 'Ethan White',
    role: 'Patient',
    message:
      'Could you please confirm if my blood test results have been uploaded to my profile?',
    timestamp: 'Oct 12 at 2:14 PM',
  },
  {
    id: 8,
    name: 'Olivia Harris',
    role: 'Patient',
    message:
      'Hello, just checking if my consultation link will be sent via email or SMS?',
    timestamp: 'Oct 12 at 2:38 PM',
  },
  {
    id: 9,
    name: 'Mason Taylor',
    role: 'Patient',
    message: 'Hi, I accidentally submitted the wrong form. Can I resend it?',
    timestamp: 'Oct 12 at 3:05 PM',
  },
  {
    id: 10,
    name: 'Harper Martin',
    role: 'Patient',
    message:
      'I’d like to confirm if I can bring my medical documents in person for tomorrow’s appointment.',
    timestamp: 'Oct 12 at 3:47 PM',
  },
];

const randomChannel = [
  {
    id: 1,
    name: 'Auto-generated System',
    date: 'Today at 8:15 AM',
    message:
      '🔔 Daily Summary: Total 38 appointments today. 10 new consultations and 8 follow-ups before noon.',
    photo: '/bot-sparkle.svg',
    className: '!bg-black !text-white',
  },
  {
    id: 2,
    name: '+61 412 889 230',
    date: 'Today at 8:20 AM',
    message:
      'Hi, just wanted to check if my consultation with Dr. Oliver is confirmed for this afternoon?',
    photo: '/avatars/default.png',
  },
  {
    id: 3,
    name: 'Amelia Scott (Patient Coordinator)',
    date: 'Today at 8:23 AM',
    message:
      'Hello! Yes, your consultation with Dr. Oliver Brown is confirmed for 3:00 PM today. Please join 10 minutes early.',
    photo: '/avatars/amelia.png',
  },
  {
    id: 4,
    name: 'Auto-generated System',
    date: 'Today at 8:45 AM',
    message:
      '✅ Match found: Ethan Riley (P-0284) — profile successfully linked with number +61 412 889 230.',
    photo: '/bot-sparkle.svg',
    className: '!bg-black !text-white',
  },
  {
    id: 5,
    name: 'Liam Johnson (Patient)',
    date: 'Today at 9:10 AM',
    message:
      'Good morning, I’d like to request a new appointment for next Tuesday morning if available.',
    photo: '/avatars/liam.png',
  },
  {
    id: 6,
    name: 'Chloe Robinson (Patient Coordinator)',
    date: 'Today at 9:12 AM',
    message:
      'Hi Liam! I’ve checked — Dr. Grace is available on Tuesday at 10:30 AM. Shall I book it for you?',
    photo: '/avatars/chloe.png',
  },
  {
    id: 7,
    name: 'Liam Johnson (Patient)',
    date: 'Today at 9:14 AM',
    message: 'Yes, please go ahead with that slot. Thank you!',
    photo: '/avatars/liam.png',
  },
  {
    id: 8,
    name: 'Auto-generated System',
    date: 'Today at 9:30 AM',
    message:
      '📩 Appointment confirmed: Liam Johnson with Dr. Grace Miller on Oct 15, 10:30 AM.',
    photo: '/bot-sparkle.svg',
    className: '!bg-black !text-white',
  },
  {
    id: 9,
    name: '+61 478 321 660',
    date: 'Today at 10:05 AM',
    message:
      'Hi, I need to reschedule my teleconsultation from Friday to Monday morning.',
    photo: '/avatars/default.png',
  },
  {
    id: 10,
    name: 'Noah Edwards (Patient Coordinator)',
    date: 'Today at 10:10 AM',
    message:
      'Sure! Could you please confirm your full name so I can locate your record?',
    photo: '/avatars/noah.png',
  },
];

const chatWithPatient = [
  {
    id: 1,
    name: 'Auto-generated System',
    date: 'Today at 9:05 AM',
    message:
      'Hi Alicia, this is a reminder from Solum Clinic for your appointment on October 13, 2025 at 11:45 AM.\nPlease reply Y to confirm or N if you can’t make it.\nThank you and see you soon!',
    photo: '/bot-sparkle.svg',
    className: '!bg-black !text-white',
    messageClassName: 'bg-gray-100 text-black',
  },
  {
    id: 2,
    name: 'Alicia Krawczyk',
    date: 'Today at 1:12 PM',
    message: 'Y',
    photo: '/avatars/alicia.png',
    className: '!bg-blue-100 !text-black',
    messageClassName: 'bg-[#DDE7FF] w-10 flex justify-center',
    divClassName: '',
  },
  {
    id: 3,
    name: 'Auto-generated System',
    date: 'Today at 1:13 PM',
    message:
      'Thank you, Alicia! Your appointment on **October 13, 2025, at 11:45 AM** has been confirmed.\nIf you need to reschedule, please contact our support team via chat or call.',
    photo: '/bot-sparkle.svg',
    className: '!bg-black !text-white',
    messageClassName: 'bg-gray-100 text-black',
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
    <div className="flex h-[100vh] w-full rounded-2xl border">
      {/* Sidebar kiri */}
      <aside className="flex w-[360px] flex-col border-r border-gray-200">
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
            <div className="w-100 absolute left-[3%] top-[80%] z-50 ml-2 flex rounded-lg bg-white p-2 shadow-md">
              <div className="flex flex-col gap-3">
                <span className="font-semibold text-black">Sort by:</span>
                <div className="grid w-full grid-cols-3 gap-3">
                  <Button
                    rounded="pill"
                    className={` ${onSort == 'most-recent' ? 'text-white' : '!border !border-gray-300 !bg-white !text-black'} `}
                    size="sm"
                    onClick={() => handleSort('most-recent')}
                  >
                    Most Recent
                  </Button>
                  <Button
                    rounded="pill"
                    className={` ${onSort == 'status' ? 'text-white' : '!border !border-gray-300 !bg-white !text-black'} `}
                    size="sm"
                    onClick={() => handleSort('status')}
                  >
                    Status
                  </Button>
                  <Button
                    rounded="pill"
                    className={` ${onSort == 'from' ? 'text-white' : '!border !border-gray-300 !bg-white !text-black'} `}
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
          <div className="flex flex-col gap-6 px-4 py-2">
            <nav className="flex w-full items-center gap-5 overflow-x-auto border-b border-gray-300 px-2 md:gap-7 lg:gap-10">
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
                      <div className="flex items-center gap-2">
                        <Avatar
                          name={`${item.first_name} ${item.last_name}`}
                          src={item.avatar}
                        />
                        <div className="flex flex-col">
                          <Title className="text-sm font-semibold" as="h4">
                            {item.first_name} {item.last_name}
                          </Title>
                          <span className="text-xs text-gray-500">
                            {item.time}
                          </span>
                        </div>
                      </div>
                      {item.read_message > 0 && (
                        <Button
                          as="span"
                          className="flex h-6 w-6 items-center justify-center rounded-md text-xs text-white"
                        >
                          {item.read_message}
                        </Button>
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
                        'mb-2 truncate px-2 text-sm font-medium uppercase text-[#787878]'
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
                      'mb-2 truncate px-2 text-sm font-medium uppercase text-[#787878]'
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
                        <div className="flex items-center gap-2">
                          <Avatar
                            name={`${item.first_name} ${item.last_name}`}
                            src={item.avatar}
                          />
                          <div className="flex flex-col">
                            <Title className="text-sm font-semibold" as="h4">
                              {item.first_name} {item.last_name}
                            </Title>
                            <span className="text-xs text-gray-500">
                              {item.time}
                            </span>
                          </div>
                        </div>
                        <Button
                          as="span"
                          className="flex h-6 w-6 items-center justify-center rounded-md text-xs text-white"
                        >
                          {item.read_message}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {tabActive == 'unread' && (
              <div>
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
                      <div className="flex items-center gap-2">
                        <Avatar
                          name={`${item.first_name} ${item.last_name}`}
                          src={item.avatar}
                        />
                        <div className="flex flex-col">
                          <Title className="text-sm font-semibold" as="h4">
                            {item.first_name} {item.last_name}
                          </Title>
                          <span className="text-xs text-gray-500">
                            {item.time}
                          </span>
                        </div>
                      </div>
                      <Button
                        as="span"
                        className="flex h-6 w-6 items-center justify-center rounded-md text-xs text-white"
                      >
                        {item.read_message}
                      </Button>
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
              <AvatarWithBadge data={{ name: 'Nanda Priani ' }} size="md" />
            ) : (
              <Avatar src="" name="Nanda Priani " size="md" />
            )}
            <div className="flex flex-col">
              <span>Nanda Priani </span>
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
              <DividerWithText text="OCTOBER 14, 2025" />
              {selectedChannel == 'general' && (
                <div className="flex flex-col gap-6">
                  {chatMessages.map((msg) => (
                    <RepliesMessage
                      key={msg.id}
                      name={msg.name}
                      date={msg.date}
                      message={msg.message}
                      photo={msg.photo}
                      className={msg.className}
                      messageClassName={msg.messageClassName}
                    />
                  ))}
                </div>
              )}

              {selectedChannel == 'patient' && (
                <div className="flex flex-col gap-6">
                  {patientMessages.map((msg) => (
                    <RepliesMessage
                      key={msg.id}
                      name={msg.name}
                      date={msg.timestamp}
                      message={msg.message}
                      photo=""
                    />
                  ))}
                </div>
              )}

              {selectedChannel == 'random' && (
                <div className="flex flex-col gap-6">
                  {randomChannel.map((msg) => (
                    <RepliesMessage
                      key={msg.id}
                      name={msg.name}
                      date={msg.date}
                      message={msg.message}
                      photo={msg.photo}
                      className={msg.className}
                    />
                  ))}
                </div>
              )}

              {selectedUser && Object.keys(selectedUser).length > 0 && (
                <div className="flex flex-col gap-6">
                  {chatWithPatient.map((msg) => (
                    <RepliesMessage
                      key={msg.id}
                      name={msg.name}
                      date={msg.date}
                      message={msg.message}
                      photo={msg.photo}
                      className={msg.className}
                      messageClassName={msg.messageClassName}
                      divMessageClassName={msg.divClassName}
                    />
                  ))}
                </div>
              )}
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
