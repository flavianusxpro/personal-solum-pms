import { BsArchive, BsPrinter, BsTrash3, BsType } from 'react-icons/bs';
import { CiFolderOn } from 'react-icons/ci';
import { IoLinkOutline, IoMailUnreadOutline } from 'react-icons/io5';
import { MdBlockFlipped, MdOutlineAttachFile } from 'react-icons/md';
import { PiCheckBold, PiStar } from 'react-icons/pi';
import { ActionIcon, Avatar, Button, Flex, Input, Text, Tooltip } from 'rizzui';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Form } from '@/core/ui/form';
import { addEmailSchema, EmailProps } from '@/validators/communication-schema';
import { LuLink2, LuSend, LuText } from 'react-icons/lu';
import { BiArrowBack, BiImageAlt } from 'react-icons/bi';
import { useState } from 'react';
import { RiBallPenLine, RiStarFill } from 'react-icons/ri';
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from 'react-icons/io';
import dayjs from 'dayjs';
import { GrEmoji } from 'react-icons/gr';
import { LiaGoogleDrive } from 'react-icons/lia';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useProfile } from '@/hooks/useProfile';
import { routes } from '@/config/routes';
import { useSetAtom } from 'jotai';
import { emailSetupNavigationAtom } from '@/store/user';
import { useRouter } from 'next/navigation';
const QuillEditorEmail = dynamic(() => import('@core/ui/quill-editor-email'), {
  ssr: false,
});

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
  const router = useRouter();
  const [starredEmail, setStarredEmail] = useState(false);
  const [isLinkPopupOpen, setLinkPopupOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [tooltip, setTooltip] = useState('');
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const { data: dataProfile } = useProfile(status == 'authenticated');
  const setNavigationEmailSetup = useSetAtom(emailSetupNavigationAtom);
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

  const handleOpenTooltipInput = (checkedTooltip: string) => {
    setIsOpenTooltip(!isOpenTooltip);
    if (tooltip == checkedTooltip) {
      setTooltip('');
    } else {
      setTooltip(checkedTooltip);
    }
  };

  const handleLinkToEmailSetup = () => {
    dataProfile?.id
      ? router.push(routes.user.edit(`${dataProfile.id.toString()}`))
      : '#';
    setNavigationEmailSetup('email-setup');
  };
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-20 items-center justify-between border-b border-l p-5">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-4">
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
            <div className="inline-block h-auto min-h-[1em] w-0.5 self-stretch bg-[#7878784D]"></div>

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
            </div>
          </div>
          <div className="flex items-center gap-3 text-[#787878]">
            <Text>4 of 35</Text>
            <div>
              <Tooltip content="Newer">
                <ActionIcon variant="text" size="sm">
                  <IoIosArrowBack className="text-lg" />
                </ActionIcon>
              </Tooltip>
              <Tooltip content="Older">
                <ActionIcon variant="text" size="sm">
                  <IoIosArrowForward className="text-lg" />
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
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        <div className="pb-8">
          <div className="flex items-start justify-between">
            <Flex align="center" className="gap-3">
              <Avatar
                name={selectedUser?.sender || ''}
                src={selectedUser?.avatar}
                size="lg"
              />
              <div className="flex flex-col">
                <Flex align="center" className="gap-2">
                  <Text className="text-base font-semibold text-black">
                    {selectedUser?.sender}
                  </Text>
                  <Text className="text-gray-500">{`<${selectedUser?.email}>`}</Text>
                </Flex>
                <div className="relative">
                  <Flex
                    as="button"
                    align="center"
                    className="mt-1 gap-1"
                    onClick={() => setIsToOpen(!isToOpen)}
                  >
                    <Text className="text-xs text-gray-500">to me</Text>
                    <IoIosArrowDown className="text-gray-500" />
                  </Flex>
                  {isToOpen && (
                    <div className="absolute top-full z-10 mt-2 rounded-xl bg-white p-4 shadow-xl">
                      <div className="space-y-2 text-sm">
                        <Flex className="gap-2">
                          <Text className="font-semibold">From:</Text>
                          <Text>{selectedUser?.email}</Text>
                        </Flex>
                        <Flex className="gap-2">
                          <Text className="font-semibold">To:</Text>
                          <Text>
                            {selectedUser?.to?.map((item) => item).join(', ')}
                          </Text>
                        </Flex>
                        {selectedUser?.cc && selectedUser.cc.length > 0 && (
                          <Flex className="gap-2">
                            <Text className="font-semibold">Cc:</Text>
                            <Text>
                              {selectedUser.cc.map((item) => item).join(', ')}
                            </Text>
                          </Flex>
                        )}
                        {selectedUser?.bcc && selectedUser.bcc.length > 0 && (
                          <Flex className="gap-2">
                            <Text className="font-semibold">Bcc:</Text>
                            <Text>
                              {selectedUser.bcc.map((item) => item).join(', ')}
                            </Text>
                          </Flex>
                        )}
                        <Flex className="gap-2">
                          <Text className="font-semibold">Date:</Text>
                          <Text>
                            {selectedUser?.date
                              ? dayjs(selectedUser?.date).format(
                                  'ddd, MMM D, YYYY at h:mm A'
                                )
                              : ''}
                          </Text>
                        </Flex>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Flex>
            <Text className="text-xs text-gray-500">{selectedUser?.time}</Text>
          </div>
        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: selectedUser?.message || '',
          }}
        />
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
                <div className="relative z-10">
                  <div className="rounded-lg border">
                    <div className="flex flex-col gap-2">
                      {/* {tooltip == 'bs-type' ? (
                        <Controller
                          name="messages"
                          control={control}
                          render={({ field }) => (
                            <QuillEditorEmail
                              {...field}
                              className="border-none shadow-none @3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[50px]"
                              toolbarPosition="bottom"
                              placeholder="Type here to reply"
                            />
                          )}
                        />
                      ) : (
                        <Textarea
                          placeholder="Type here to reply"
                          className="!focus:ring-0 !focus:shadow-none w-full !border-none !shadow-none !ring-0"
                          textareaClassName="!focus:ring-0 w-full !border-none !shadow-none !ring-0 !focus:shadow-none"
                          {...register('messages')}
                        />
                      )} */}
                      <Controller
                        name="messages"
                        control={control}
                        render={({ field }) => (
                          <QuillEditorEmail
                            {...field}
                            className="border-none p-2 shadow-none @3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[50px]"
                            toolbarPosition="bottom"
                            placeholder="Type here to reply"
                            tooltipType={tooltip}
                          />
                        )}
                      />
                      <Flex
                        justify="between"
                        align="center"
                        className="px-6 pb-4"
                      >
                        <div className="flex items-center gap-8">
                          <div className="flex items-center gap-3">
                            <Tooltip content="Formatting options">
                              <ActionIcon
                                variant="text"
                                onClick={() =>
                                  handleOpenTooltipInput('bs-type')
                                }
                                className={
                                  tooltip == 'bs-type'
                                    ? 'h-8 w-8 rounded-full bg-[#3872F926]'
                                    : ''
                                }
                              >
                                <BsType
                                  className={`text-xl ${tooltip == 'bs-type' && 'text-[#3872F9]'}`}
                                />
                              </ActionIcon>
                            </Tooltip>
                            <Tooltip content="Attach files">
                              <ActionIcon
                                variant="text"
                                onClick={() =>
                                  handleOpenTooltipInput('archive-file')
                                }
                                className={
                                  tooltip == 'archive-file'
                                    ? 'h-8 w-8 rounded-full bg-[#3872F926]'
                                    : ''
                                }
                              >
                                <MdOutlineAttachFile
                                  className={`text-xl ${tooltip == 'archive-file' && 'text-[#3872F9]'}`}
                                />
                              </ActionIcon>
                            </Tooltip>
                            <div className="relative">
                              <Tooltip content="Insert link">
                                <ActionIcon
                                  variant="text"
                                  onClick={() => handleOpenTooltipInput('link')}
                                  className={
                                    tooltip == 'link'
                                      ? 'h-8 w-8 rounded-full bg-[#3872F926]'
                                      : ''
                                  }
                                >
                                  <IoLinkOutline
                                    className={`text-xl ${tooltip == 'link' && 'text-[#3872F9]'}`}
                                  />
                                </ActionIcon>
                              </Tooltip>

                              {tooltip == 'link' && (
                                <div
                                  className="absolute bottom-full z-10 mb-2 rounded-lg border bg-white p-4 text-[#787878] shadow-lg"
                                  style={{ width: 'max-content' }}
                                >
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
                            <Tooltip content="Insert emoji">
                              <ActionIcon
                                variant="text"
                                onClick={() => handleOpenTooltipInput('emoji')}
                                className={
                                  tooltip == 'emoji'
                                    ? 'h-8 w-8 rounded-full bg-[#3872F926]'
                                    : ''
                                }
                              >
                                <GrEmoji
                                  className={`text-xl ${tooltip == 'emoji' && 'text-[#3872F9]'}`}
                                />
                              </ActionIcon>
                            </Tooltip>

                            <Tooltip content="Insert files using Drive">
                              <ActionIcon
                                variant="text"
                                onClick={() => handleOpenTooltipInput('gdrive')}
                                className={
                                  tooltip == 'gdrive'
                                    ? 'h-8 w-8 rounded-full bg-[#3872F926]'
                                    : ''
                                }
                              >
                                <LiaGoogleDrive
                                  className={`text-xl ${tooltip == 'gdrive' && 'text-[#3872F9]'}`}
                                />
                              </ActionIcon>
                            </Tooltip>

                            <Tooltip content="Insert photo">
                              <ActionIcon
                                variant="text"
                                onClick={() =>
                                  handleOpenTooltipInput('image-alt')
                                }
                                className={
                                  tooltip == 'image-alt'
                                    ? 'h-8 w-8 rounded-full bg-[#3872F926]'
                                    : ''
                                }
                              >
                                <BiImageAlt
                                  className={`text-xl ${tooltip == 'image-alt' && 'text-[#3872F9]'}`}
                                />
                              </ActionIcon>
                            </Tooltip>

                            <div className="relative">
                              <Tooltip content="Insert signature">
                                <ActionIcon
                                  variant="text"
                                  onClick={() =>
                                    handleOpenTooltipInput('pen-line')
                                  }
                                  className={
                                    tooltip == 'pen-line'
                                      ? 'h-8 w-8 rounded-full bg-[#3872F926]'
                                      : ''
                                  }
                                >
                                  <RiBallPenLine
                                    className={`text-xl ${tooltip == 'pen-line' && 'text-[#3872F9]'}`}
                                  />
                                </ActionIcon>
                              </Tooltip>
                              {tooltip == 'pen-line' && (
                                <div
                                  className="absolute bottom-full z-10 mb-2 rounded-lg border bg-white p-4 text-[#787878] shadow-lg"
                                  style={{ width: 'max-content' }}
                                >
                                  <div className="flex gap-3">
                                    <div className="flex w-full flex-col gap-3">
                                      <div>
                                        <Text
                                          className="cursor-pointer text-black"
                                          onClick={handleLinkToEmailSetup}
                                        >
                                          Manage Signatures
                                        </Text>
                                      </div>
                                      <hr />
                                      <div className="flex items-center gap-2">
                                        <PiCheckBold className="text-lg text-black" />
                                        <Text className="text-black">
                                          No Signature
                                        </Text>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
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
                    </div>
                  </div>
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
