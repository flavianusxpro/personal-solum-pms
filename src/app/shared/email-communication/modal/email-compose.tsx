import { useModal } from '@/app/shared/modal-views/use-modal';
import FormFooter from '@/core/components/form-footer';
import { Form } from '@/core/ui/form';
import cn from '@/core/utils/class-names';
import { useGetAppointments } from '@/hooks/useAppointment';
import { useCreatePatientFLag } from '@/hooks/usePatientFlag';
import { addEmailSchema, EmailProps } from '@/validators/communication-schema';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  LuBold,
  LuItalic,
  LuLink2,
  LuSend,
  LuText,
  LuUnderline,
} from 'react-icons/lu';
import { PiX } from 'react-icons/pi';
import {
  ActionIcon,
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  Title,
  Tooltip,
} from 'rizzui';
import Divider from '../../ui/divider';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { BsType } from 'react-icons/bs';
import { MdOutlineAttachFile } from 'react-icons/md';
import { IoLinkOutline } from 'react-icons/io5';
import { GrEmoji } from 'react-icons/gr';
import { LiaGoogleDrive } from 'react-icons/lia';
import { BiImageAlt } from 'react-icons/bi';
import { RiBallPenLine } from 'react-icons/ri';
import { AiOutlineFullscreen } from 'react-icons/ai';
const QuillEditorEmail = dynamic(() => import('@core/ui/quill-editor-email'), {
  ssr: false,
});
export default function AddNewEmail({
  user_id,
  onClose,
  onFullScreen,
  isFullScreen,
}: {
  user_id: number;
  onClose: () => void;
  onFullScreen: () => void;
  isFullScreen?: boolean;
}) {
  const { closeModal } = useModal();
  const [tooltip, setTooltip] = useState('');
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [openCc, setOpenCc] = useState(false);
  const [openBcc, setOpenBcc] = useState(false);
  const { mutate } = useCreatePatientFLag();
  const { refetch } = useGetAppointments({
    page: 1,
    perPage: 10,
  });

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

  const handleOpenTooltipInput = (tooltip: string) => {
    setIsOpenTooltip(!isOpenTooltip);
    setTooltip(tooltip);
  };

  return (
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
          <div className="flex flex-col">
            <Flex
              justify="between"
              align="center"
              gap="4"
              className="mb-4 flex-grow bg-[#3872F91A] px-6 py-2"
            >
              <Title className="text-lg">New Messages</Title>
              <div>
                <ActionIcon variant="text" onClick={onFullScreen} className="">
                  <AiOutlineFullscreen className="h-6 w-6" />
                </ActionIcon>
                <ActionIcon variant="text" onClick={onClose} className="">
                  <PiX className="h-6 w-6" />
                </ActionIcon>
              </div>
            </Flex>
            <div className="px-6 pt-4">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <div className="flex w-full items-center">
                    <label className="w-1/4 text-[#787878]">Recipients</label>
                    <Input
                      size="md"
                      type="text"
                      {...register('recipient')}
                      className="!focus:ring-0 w-full !border-none !shadow-none !ring-0 focus:!shadow-none"
                      inputClassName="!border-none !ring-0 !focus:ring-0 !shadow-none focus:!shadow-none"
                      suffix={
                        !openCc &&
                        !openBcc && (
                          <div className="flex gap-3">
                            <Text
                              onClick={() => {
                                setOpenCc(true);
                              }}
                              className="cursor-pointer"
                            >
                              CC
                            </Text>
                            <Text
                              onClick={() => {
                                setOpenBcc(true);
                              }}
                              className="cursor-pointer"
                            >
                              BCC
                            </Text>
                          </div>
                        )
                      }
                    />
                  </div>
                  {/* 
              {errors && (
                <Text className="text-red-500">
                  {errors?.recipient?.message}
                </Text>
              )} */}
                </div>
                <hr />

                {openCc && (
                  <>
                    <div className="flex flex-col">
                      <div className="flex w-full items-center">
                        <label className="w-1/4 text-[#787878]">CC</label>
                        <Input
                          size="md"
                          type="text"
                          {...register('cc')}
                          className="!focus:ring-0 w-full !border-none !shadow-none !ring-0 focus:!shadow-none"
                          inputClassName="!border-none !ring-0 !focus:ring-0 !shadow-none focus:!shadow-none"
                          suffix={
                            !openBcc && (
                              <div className="flex gap-3">
                                <Text
                                  onClick={() => {
                                    setOpenBcc(true);
                                  }}
                                  className="cursor-pointer"
                                >
                                  BCC
                                </Text>
                              </div>
                            )
                          }
                        />
                      </div>
                    </div>
                    <hr />
                  </>
                )}

                {openBcc && (
                  <>
                    <div className="flex flex-col">
                      <div className="flex w-full items-center">
                        <label className="w-1/4 text-[#787878]">BCC</label>
                        <Input
                          size="md"
                          type="text"
                          {...register('bcc')}
                          className="!focus:ring-0 w-full !border-none !shadow-none !ring-0 focus:!shadow-none"
                          inputClassName="!border-none !ring-0 !focus:ring-0 !shadow-none focus:!shadow-none"
                          suffix={
                            !openCc && (
                              <div className="flex gap-3">
                                <Text
                                  onClick={() => {
                                    setOpenCc(true);
                                  }}
                                  className="cursor-pointer"
                                >
                                  CC
                                </Text>
                              </div>
                            )
                          }
                        />
                      </div>
                    </div>
                    <hr />
                  </>
                )}

                <div className="flex flex-col">
                  <div className="flex items-center">
                    <label className="w-1/4 text-[#787878]">Subject</label>
                    <Input
                      type="text"
                      {...register('subject')}
                      size="md"
                      className="!focus:ring-0 w-full !border-none !shadow-none !ring-0 focus:!shadow-none"
                      inputClassName="!border-none !ring-0 !focus:ring-0 !shadow-none focus:!shadow-none !h-10"
                    />
                  </div>
                  {/* 
              {errors && (
                <Text className="text-red-500">
                  error={errors?.subject?.message}
                </Text>
              )} */}
                </div>
                <hr />
              </div>

              <div className="flex-grow">
                <Controller
                  name="messages"
                  control={control}
                  render={({ field }) => (
                    <QuillEditorEmail
                      {...field}
                      className="border-none shadow-none @3xl:col-span-12 [&>.ql-container_.ql-editor]:min-h-[50px]"
                      toolbarPosition="bottom"
                      placeholder="Type here to reply"
                      tooltipType={tooltip}
                    />
                  )}
                />
              </div>

              <div
                className={cn(
                  'bottom-0 left-0 right-0 z-10 flex items-center justify-end gap-4 border-t bg-white p-6 dark:bg-gray-50',
                  isFullScreen ? 'relative' : 'fixed'
                )}
              >
                <div className="flex w-full flex-col gap-2">
                  <Flex justify="between" align="center">
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-3">
                        <Tooltip content="Formatting options">
                          <ActionIcon
                            variant="text"
                            onClick={() => handleOpenTooltipInput('bs-type')}
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
                            onClick={() => handleOpenTooltipInput('image-alt')}
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

                        <Tooltip content="Insert signature">
                          <ActionIcon
                            variant="text"
                            onClick={() => handleOpenTooltipInput('pen-line')}
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
                {tooltip == 'link' && (
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
                      <Button variant="outline" className="w-auto">
                        Send
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }}
    </Form>
  );
}
