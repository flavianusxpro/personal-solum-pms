import cn from '@/core/utils/class-names';
import {
  LuEllipsisVertical,
  LuSend,
  LuUserPlus,
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
  Badge,
  Button,
  Flex,
  Input,
  Textarea,
  Title,
  Tooltip,
} from 'rizzui';
import { DividerWithText } from '../ui/divider';
import { useState } from 'react';
import RepliesLayout from './replies-layout';
import RepliesMessage from './replies-message';

const channels = [
  { label: 'general', value: 'general' },
  { label: 'patient', value: 'patient' },
  { label: 'random', value: 'random' },
];

const SmsCommunication = () => {
  const [selectedChannel, setSelectedChannel] = useState('');
  const [isReplies, setIsReplies] = useState(false);
  return (
    <div className="flex h-screen w-full rounded-2xl border">
      {/* Sidebar kiri */}
      <aside className="flex w-[280px] flex-col border-r border-gray-200">
        <div className="border-b p-5">
          <Input
            type="text"
            placeholder="Search by name"
            size="sm"
            prefix={
              <PiMagnifyingGlassLight className="h-4 w-4 cursor-pointer" />
            }
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-6 px-4 py-6">
            <div>
              <Flex justify="between" align="center">
                <Title
                  as="h6"
                  className={cn(
                    'mb-2 truncate text-xs uppercase tracking-widest text-gray-500 2xl:px-8'
                  )}
                >
                  All Channels
                </Title>
                <Tooltip content="Create Channel">
                  <ActionIcon size="sm" variant="text">
                    <PiPlusCircleLight className="h-4 w-4 cursor-pointer" />
                  </ActionIcon>
                </Tooltip>
              </Flex>

              <ul>
                {channels.map((channel, index) => (
                  <li
                    className="cursor-pointer py-2"
                    key={index}
                    onClick={() => setSelectedChannel(channel.value)}
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
                  'mb-2 truncate text-xs uppercase tracking-widest text-gray-500 2xl:px-8'
                )}
              >
                Direct Messages
              </Title>

              <ul>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
                  <li
                    className="flex cursor-pointer items-center justify-between py-2 hover:bg-gray-100"
                    key={index}
                  >
                    <Flex align="center">
                      <Avatar
                        name="Jane Doe"
                        src="https://randomuser.me/api/portraits/women/40.jpg"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">Dr. Emily Turner</span>
                        <span className="text-xs text-gray-500">
                          50 minute ago
                        </span>
                      </div>
                    </Flex>
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 text-xs text-white">
                      2
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t px-4 py-[1.38rem]">
          <span>Budi Setiadi</span>
          <Tooltip content="User Setting">
            <ActionIcon size="sm" variant="text">
              <PiGear className="h-4 w-4 cursor-pointer" />
            </ActionIcon>
          </Tooltip>
        </div>
      </aside>

      {/* Kolom chat */}
      <main className="flex flex-1 flex-col">
        {/* Header channel */}
        <div className="flex items-center justify-between border-b p-5">
          <span>{selectedChannel ? `#${selectedChannel}` : ''}</span>
          <Flex className="w-full" justify="end" align="center">
            <Input
              type="text"
              placeholder="Search in conversation..."
              size="sm"
              prefix={
                <PiMagnifyingGlassLight className="h-4 w-4 cursor-pointer" />
              }
            />
            <Tooltip content="Invite People">
              <ActionIcon size="sm" variant="text">
                <LuUserRoundPlus className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
            <Tooltip content="Member List">
              <ActionIcon size="sm" variant="text">
                <LuUsersRound className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
            <Tooltip content="Channel Setting">
              <ActionIcon size="sm" variant="text">
                <LuEllipsisVertical className="h-4 w-4" />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </div>

        <div className="relative flex flex-1 overflow-y-hidden bg-[#FAFAFF]">
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <div className="flex flex-col items-start gap-3">
              <DividerWithText text="OCTOBER 08, 2025" />
              <div className="flex items-center gap-2">
                <RepliesMessage
                  name="Auto-generated System"
                  date="  Today 8:45 AM"
                  message="⚠️ Daily Summary: Total 42 appointments today..."
                  isReplies={true}
                  handleReplies={() => setIsReplies(true)}
                />
              </div>
            </div>
          </div>
          <div
            className={`absolute bottom-0 right-0 top-0 h-full w-full max-w-[350px] transform bg-white shadow-lg transition-transform duration-300 ease-in-out ${
              isReplies ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <RepliesLayout onCloseHandleReplies={() => setIsReplies(false)} />
          </div>
        </div>

        {/* Input box */}
        <div className="flex items-center border-t">
          <div className="flex h-full items-center border-r border-gray-200 px-5">
            <PiPlusLight className="h-4 w-4" />
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
