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
import { BiImageAlt } from 'react-icons/bi';
import { useState } from 'react';
import { RiStarFill } from 'react-icons/ri';

type IPageEmailProps = {
  selectedUser: {
    first_name: string;
    last_name: string;
    sender: string;
    time: string;
    avatar?: string;
    message: string;
  };
};

const PageEmail = ({ selectedUser }: IPageEmailProps) => {
  const [starredEmail, setStarredEmail] = useState(false);
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
        <Flex align="center" className="h-5">
          <Avatar
            // name={`${selectedUser.first_name} ${selectedUser.last_name}` || ''}
            name={selectedUser?.sender || ''}
            src={selectedUser?.avatar}
            size="md"
          />
          <div className="flex flex-col">
            <Text>
              {/* {selectedUser?.first_name} {selectedUser?.last_name} */}
              {selectedUser?.sender}
            </Text>
            <Text className="text-xs text-gray-500">{selectedUser?.time}</Text>
          </div>
        </Flex>
        <div className="flex gap-8">
          <div className="flex gap-2">
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
        <div>{selectedUser?.message}</div>
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
                <Flex justify="between" align="center">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3">
                      <LuBold className="text-xl" />
                      <LuItalic className="text-xl" />
                      <LuUnderline className="text-xl" />
                    </div>

                    <div className="flex items-center gap-3">
                      <LuLink2 className="text-xl" />
                      <BiImageAlt className="text-xl" />
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
                <div className="flex items-end gap-3 rounded-lg border p-4 text-[#787878] shadow-lg">
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
                  <Text>Apply</Text>
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
