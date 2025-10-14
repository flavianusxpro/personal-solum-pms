import { useModal } from '@/app/shared/modal-views/use-modal';
import FormFooter from '@/core/components/form-footer';
import { Form } from '@/core/ui/form';
import cn from '@/core/utils/class-names';
import { useGetAppointments } from '@/hooks/useAppointment';
import { useCreatePatientFLag } from '@/hooks/usePatientFlag';
import { addEmailSchema, EmailProps } from '@/validators/communication-schema';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuBold, LuItalic, LuLink2, LuUnderline } from 'react-icons/lu';
import { PiX } from 'react-icons/pi';
import { ActionIcon, Flex, Input, Textarea, Title } from 'rizzui';

export default function AddNewEmail({
  user_id,
  onClose,
}: {
  user_id: number;
  onClose: () => void;
}) {
  const { closeModal } = useModal();

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
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">New Messages</Title>
              <ActionIcon variant="text" onClick={onClose} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Input
              label="Recipient"
              placeholder="To"
              type="text"
              {...register('recipient')}
              error={errors?.recipient?.message}
            />
            <Input
              label="Subject"
              placeholder="Enter subject"
              type="text"
              {...register('subject')}
              error={errors?.subject?.message}
            />
            <Textarea
              label="Messages"
              placeholder="Enter messages"
              {...register('messages')}
              error={errors.messages?.message as string}
            />

            <div
              className={cn(
                'sticky bottom-0 left-0 right-0 z-10 flex items-center justify-end gap-4 border-t bg-white px-4 py-4 dark:bg-gray-50 md:px-5 lg:px-6 3xl:px-8 4xl:px-10'
              )}
            >
              <LuBold className="me-2 text-xl" />
              <LuItalic className="me-2 text-xl" />
              <LuUnderline className="me-2 text-xl" />
              <LuLink2 className="me-2 text-xl" />
            </div>
          </div>
        );
      }}
    </Form>
  );
}
