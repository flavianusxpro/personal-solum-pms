import { useModal } from '@/app/shared/modal-views/use-modal';
import FormFooter from '@/core/components/form-footer';
import { Form } from '@/core/ui/form';
import { useGetAppointments } from '@/hooks/useAppointment';
import { useCreatePatientFLag } from '@/hooks/usePatientFlag';
import {
  addChannelSchema,
  addInvitePeopleSchema,
  ChannelProps,
  InviteProps,
} from '@/validators/communication-schema';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LuCopy } from 'react-icons/lu';
import { PiX } from 'react-icons/pi';
import {
  ActionIcon,
  Button,
  Flex,
  Input,
  MultiSelect,
  Text,
  Textarea,
  Title,
} from 'rizzui';
import { DividerWithText } from '../../ui/divider';

const options = [
  { label: 'Dr. William Foster', value: '1' },
  { label: 'Alexander', value: '2' },
  { label: 'Zara Niya', value: '3' },
];

export default function AddInvitePeople({ user_id }: { user_id: number }) {
  const { closeModal } = useModal();

  const { mutate } = useCreatePatientFLag();
  const { refetch } = useGetAppointments({
    page: 1,
    perPage: 10,
  });

  const onSubmit: SubmitHandler<InviteProps> = (data) => {
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
    <Form<InviteProps>
      validationSchema={addInvitePeopleSchema}
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
            <div className="flex flex-col">
              <Flex justify="between" align="center" gap="4">
                <Title className="text-lg">Invite People</Title>
                <ActionIcon variant="text" onClick={closeModal} className="">
                  <PiX className="h-6 w-6" />
                </ActionIcon>
              </Flex>
              <Text>
                Share this link to give access and allow others to join this
                channel.
              </Text>
            </div>

            <Flex gap="2">
              <Input
                placeholder="Enter channel name"
                value="https://link.invitepeople/general"
                disabled
                type="text"
                {...register('link')}
                className="w-full"
              />

              <Button className="bg-none" variant="outline">
                <LuCopy className="me-1.5 h-4 w-4" />
                Copy
              </Button>
            </Flex>
            <DividerWithText text="or" className="my-2" />
            <Flex>
              <Controller
                name="peoples"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    {...field}
                    options={options}
                    error={errors.peoples?.message}
                  />
                )}
              />
            </Flex>

            <FormFooter
              className="rounded-b-xl"
              //   isLoading={isPending}
              altBtnText="Cancel"
              submitBtnText="Save"
              isSticky={false}
            />
          </div>
        );
      }}
    </Form>
  );
}
