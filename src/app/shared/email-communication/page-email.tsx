import { BsArchive, BsPrinter, BsTrash3 } from 'react-icons/bs';
import { CiFolderOn } from 'react-icons/ci';
import { IoMailUnreadOutline } from 'react-icons/io5';
import { MdBlockFlipped } from 'react-icons/md';
import { PiArchive, PiPrinter, PiStar } from 'react-icons/pi';
import {
  ActionIcon,
  Avatar,
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  Tooltip,
} from 'rizzui';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { addEmailSchema, EmailProps } from '@/validators/communication-schema';
import {
  LuBold,
  LuItalic,
  LuLink2,
  LuSend,
  LuText,
  LuUnderline,
} from 'react-icons/lu';
import { BiArrowBack, BiImageAlt } from 'react-icons/bi';
import { useState } from 'react';
import { RiStarFill } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import dayjs from 'dayjs';

type IPageEmailProps = {
  selectedUser: {
    first_name: string;
    last_name: string;
    sender: string;
    time: string;
    avatar?: string;
    message: string;
    email: string;
    to: string[];
    bcc?: string[];
    cc?: string[];
    date: string;
  };
  onBack?: () => void;
};

const PageEmail = ({ selectedUser, onBack }: IPageEmailProps) => {
  const [starredEmail, setStarredEmail] = useState(false);
  const [isLinkPopupOpen, setLinkPopupOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const onSubmit: SubmitHandler<EmailProps> = (data) => {
    // mutate(
    //   {
    //     channel_name: data.channel_name,
    //     user_id: user_id,
    //   },
    //   {
    //     onSuccess: () => {
    //       refetch();
    //       toast.success('Channel created successfully');
    //       closeModal();
    //     },
    //     onError: (error: any) => {
    //       toast.error(
    //         'Error creating channel, ',
    //         error.response?.data.message
    //       );
    //     },
    //   }
    // );
  };
  console.log(selectedUser);
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-20 items-center justify-between border-b border-l p-5">
        <div className="flex gap-8">
          <div className="flex gap-2">
            <ActionIcon variant="text" size="sm" onClick={onBack}>
              <BiArrowBack className="text-lg" />
            </ActionIcon>
            <Tooltip content="Archive">
              <ActionIcon variant="text" size="sm">
                <BsArchive className="text-lg" />
              </ActionIcon>
            </Tooltip>
            <Tooltip content="Report Spam">
              <ActionIcon variant="text" size="sm">
                <MdBlockFlipped className="text-lg" />
              </ActionIcon>
            </Tooltip>
            <Tooltip content="Mark Unread">
              <ActionIcon variant="text" size="sm">
                <IoMailUnreadOutline className="text-lg" />
              </ActionIcon>
            </Tooltip>
            <Tooltip content="Add Label">
              <ActionIcon variant="text" size="sm">
                <CiFolderOn className="text-lg" />
              </ActionIcon>
            </Tooltip>
          </div>
          <div className="flex gap-2">
            <Tooltip content="Not Starred">
              <ActionIcon
                variant="text"
                size="sm"
                onClick={() => setStarredEmail(!starredEmail)}
              >
                {starredEmail ? (
                  <RiStarFill className="text-lg text-[#FFD735]" />
                ) : (
                  <PiStar className="text-lg" />
                )}
              </ActionIcon>
            </Tooltip>
            <Tooltip content="Trash">
              <ActionIcon variant="text" size="sm">
                <BsTrash3 className="text-lg" />
              </ActionIcon>
            </Tooltip>
            <Tooltip content="Print">
              <ActionIcon variant="text" size="sm">
                <BsPrinter className="text-lg" />
              </ActionIcon>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        <div className="flex flex-col gap-10">
          <Flex align="center" className="z-1000 h-5">
            <Avatar
              // name={`${selectedUser.first_name} ${selectedUser.last_name}` || ''}
              name={selectedUser?.sender || ''}
              src={selectedUser?.avatar}
              size="md"
            />
            <div className="z-1000 flex w-full flex-col">
              <Flex align="center" justify="between" className="w-full">
                <Flex gap="2" className="w-2/2">
                  <Text className="text-[16px] text-black">
                    {/* {selectedUser?.first_name} {selectedUser?.last_name} */}
                    {selectedUser?.sender}
                  </Text>
                  <Text className="text-[#787878]">
                    {`(${selectedUser?.email})`}
                  </Text>
                </Flex>
                <div className="w-100">
                  <Text className="text-xs text-gray-500">
                    {selectedUser?.time}
                  </Text>
                </div>
              </Flex>
              <div className="relative">
                <Flex
                  align="center"
                  gap="1"
                  onClick={() => setIsToOpen(!isToOpen)}
                >
                  <Text className="text-xs text-gray-500">to</Text>
                  <IoIosArrowDown className="text-[#787878]" />
                </Flex>
                {isToOpen && (
                  <div className="absolute z-50 rounded-xl p-4 shadow-xl">
                    <Flex>
                      <Text>From:</Text>
                      <Text>{selectedUser?.email}</Text>
                    </Flex>
                    <Flex>
                      <Text>To:</Text>
                      <Text>
                        {' '}
                        {selectedUser?.to?.map((item) => item).join(', ')}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text>Cc:</Text>
                      <Text>
                        {selectedUser?.cc?.map((item) => item).join(', ')}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text>Bcc:</Text>
                      <Text>
                        {selectedUser?.bcc?.map((item) => item).join(', ')}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text>Date:</Text>
                      <Text>
                        {selectedUser?.date
                          ? dayjs(selectedUser?.date).format('DD MMMM, YYYY')
                          : ''}
                      </Text>
                    </Flex>
                  </div>
                )}
              </div>
            </div>
          </Flex>
          <div>{selectedUser?.message}</div>
        </div>
      </div>
      <div className="border-t bg-white p-6">
        <Form<EmailProps>
          validationSchema={addEmailSchema}
          // resetValues={reset}
          onSubmit={onSubmit}
          className="@container"
          useFormProps={{
            mode: 'onChange',
          }}
        >
          {({ register, control, formState: { errors } }) => {
            return (
              <div className="flex flex-col gap-4">
                <Textarea
                  placeholder="Type here to reply"
                  {...register('messages')}
                />
                <div className="relative z-10">
                  <Flex justify="between" align="center">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3">
                        <ActionIcon variant="text">
                          <LuBold className="text-xl" />
                        </ActionIcon>
                        <ActionIcon variant="text">
                          <LuItalic className="text-xl" />
                        </ActionIcon>
                        <ActionIcon variant="text">
                          <LuUnderline className="text-xl" />
                        </ActionIcon>
                      </div>

                      <div className="flex items-center gap-3">
                        <ActionIcon
                          variant="text"
                          onClick={() => setLinkPopupOpen(!isLinkPopupOpen)}
                        >
                          <LuLink2 className="text-xl" />
                        </ActionIcon>
                        <ActionIcon variant="text">
                          <BiImageAlt className="text-xl" />
                        </ActionIcon>
                      </div>
                    </div>
                    <Button
                      className="w-auto text-white"
                      size="sm"
                      type="submit"
                    >
                      <LuSend className="me-1.5 h-4 w-4" />
                      Reply
                    </Button>
                  </Flex>
                  {isLinkPopupOpen && (
                    <div className="absolute bottom-full z-10 mb-2 w-6/12 rounded-lg border bg-white p-4 text-[#787878] shadow-lg">
                      <div className="flex items-end gap-3">
                        <div className="flex w-full flex-col gap-3">
                          <Input
                            placeholder="Text"
                            prefix={<LuText className="text-lg" />}
                            {...register('text')}
                          />
                          <Input
                            placeholder="Type or paste a link"
                            prefix={<LuLink2 className="text-lg" />}
                            {...register('link')}
                          />
                        </div>
                        <Button
                          variant="outline"
                          className="w-auto"
                          onClick={() => setLinkPopupOpen(false)}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }}
        </Form>
      </div>
    </div>
  );
};

export default PageEmail;
