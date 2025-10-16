import cn from '@/core/utils/class-names';
import {
  LuEllipsisVertical,
  LuInbox,
  LuInfo,
  LuPencilLine,
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
  PiStar,
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
import { useModal } from '../modal-views/use-modal';
import AddNewEmail from './modal/email-compose';
import { AvatarWithBadge } from '@/core/ui/avatar';
import { IoSettingsOutline } from 'react-icons/io5';
import { BsFilter, BsTrash3 } from 'react-icons/bs';
import SimpleBar from 'simplebar-react';
import { TabButton } from '../ui/tab-button';
import DropdownComponent from '../ui/dropdown';
import { sortBy } from 'lodash';
import { HiOutlineInbox } from 'react-icons/hi';
import { CiFolderOn, CiStar } from 'react-icons/ci';
import { VscSend } from 'react-icons/vsc';
import Image from 'next/image';
import { ImportantIcon, DraftsIcon, SpamIcon } from '@public/index';
import PageEmail from './page-email';
import EmailLists from './email-lists';

type IPersonType = {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  avatar: string;
  time: string;
};

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

const sidebarMenuItems = [
  {
    id: 1,
    icon: <LuInbox className="text-xl" />,
    name: 'Inbox',
  },
  {
    id: 2,
    icon: <PiStar className="text-lg" />,
    name: 'Starred',
  },
  {
    id: 3,
    icon: (
      <Image src={ImportantIcon} alt="important-icon" className="h-4 w-4" />
    ),
    name: 'Important',
  },
  {
    id: 4,
    icon: <VscSend className="text-lg" />,
    name: 'Sent',
  },
  {
    id: 5,
    icon: <Image src={DraftsIcon} alt="draft-icon" className="h-4 w-4" />,
    name: 'Drafts',
  },
  {
    id: 6,
    icon: <Image src={SpamIcon} alt="spam-icon" className="h-4 w-4" />,
    name: 'Spam',
  },
  {
    id: 7,
    icon: <BsTrash3 className="text-lg" />,
    name: 'Trash',
  },
  {
    id: 8,
    name: 'Labels',
    type: 'group',
    menuItems: [
      {
        id: 9,
        icon: <CiFolderOn className="text-lg" />,
        name: 'Socials',
      },
      {
        id: 10,
        icon: <CiFolderOn className="text-lg" />,
        name: 'Promotions',
      },
      {
        id: 11,
        icon: <CiFolderOn className="text-lg" />,
        name: 'Updates',
      },
      {
        id: 12,
        icon: <CiFolderOn className="text-lg" />,
        name: 'Business',
      },
      {
        id: 13,
        icon: <CiFolderOn className="text-lg" />,
        name: 'Finance',
      },
    ],
  },
];

const EmailCommunications = () => {
  const { openModal } = useModal();
  const [selectedSidebar, setSelectedSidebar] = useState('');
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
  const [openAddEmail, setOpenAddEmail] = useState(false);
  const [openMessageLayout, setOpenMessageLayout] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

  //   const showModalAddInvitePeople = () => {
  //     openModal({
  //       view: <AddInvitePeople user_id={1} />,
  //       customSize: '600px',
  //     });
  //   };

  const handleSort = (sortBy: string) => {
    setOnSort(sortBy);
  };

  const unreadMessages = persons.filter((person) => person.read_message > 0);

  return (
    <div className="flex w-full rounded-2xl border">
      {/* Sidebar kiri */}
      <aside className="flex w-[360px] flex-col border-r">
        <div className="relative flex h-20 w-full flex-col items-center p-5">
          <Button
            className="w-full"
            onClick={() => setOpenAddEmail(true)}
            size="md"
          >
            <LuPencilLine className="me-2 h-4 w-4" />
            Compose
          </Button>
        </div>

        <div className="z-10 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 px-4 py-2">
            <div>
              <ul className="flex flex-col">
                {sidebarMenuItems.map((item) => {
                  return item.type === 'group' ? (
                    <div key={item.id} className="my-10">
                      <Title
                        as="h4"
                        className="my-2 text-sm font-medium uppercase text-[#787878]"
                      >
                        {item.name}
                      </Title>
                      {item.menuItems?.map((subItem) => (
                        <li
                          key={subItem.id}
                          className={cn(
                            'flex cursor-pointer items-center gap-3 rounded-lg p-2',
                            selectedSidebar === subItem.name
                              ? 'bg-[#3872F91A] text-[#3872F9]'
                              : 'font-medium'
                          )}
                          onClick={() => setSelectedSidebar(subItem.name)}
                        >
                          {subItem.icon}
                          <span className="text-[16px] font-medium">
                            {subItem.name}
                          </span>
                        </li>
                      ))}
                    </div>
                  ) : (
                    <li
                      key={item.id}
                      className={cn(
                        `flex cursor-pointer items-center justify-between rounded-lg px-2 py-3`,
                        selectedSidebar === item.name &&
                          'bg-[#3872F91A] text-[#3872F9]'
                      )}
                      onClick={() => setSelectedSidebar(item.name)}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span className="text-[16px] font-medium">
                          {item.name}
                        </span>
                      </div>
                      {item.name === 'Inbox' && unreadMessages.length > 0 && (
                        <Text className="text-xs font-medium text-[#B4B4B4]">
                          {unreadMessages.length}
                        </Text>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* Kolom chat */}
      <main className="flex flex-1 transform flex-col">
        {/* Header channel */}

        {selectedEmail && Object.keys(selectedEmail).length > 0 ? (
          <PageEmail
            selectedUser={selectedEmail}
            onBack={() => setSelectedEmail(null)}
          />
        ) : (
          <EmailLists
            selectedSidebar={selectedSidebar}
            openAddEmail={openAddEmail}
            setOpenAddEmail={setOpenAddEmail}
            selectedEmail={selectedEmail}
            setSelectedEmail={setSelectedEmail}
          />
        )}
      </main>
    </div>
  );
};

export default EmailCommunications;
