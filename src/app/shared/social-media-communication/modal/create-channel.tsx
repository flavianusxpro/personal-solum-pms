import { useModal } from '@/app/shared/modal-views/use-modal';
import FormFooter from '@/core/components/form-footer';
import { Form } from '@/core/ui/form';
import { useGetAppointments } from '@/hooks/useAppointment';
import { useCreatePatientFLag } from '@/hooks/usePatientFlag';
import {
  addChannelSchema,
  ChannelProps,
} from '@/validators/communication-schema';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiX } from 'react-icons/pi';
import { ActionIcon, Flex, Input, Textarea, Title } from 'rizzui';

export default function AddChannel({ user_id }: { user_id: number }) {
  const { closeModal } = useModal();

  const { mutate } = useCreatePatientFLag();
  const { refetch } = useGetAppointments({
    page: 1,
    perPage: 10,
  });

  const onSubmit: SubmitHandler<ChannelProps> = (data) => {
    // mutate(
    //   {
    //     channel_name: data.name,
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
    <Form<ChannelProps>
      validationSchema={addChannelSchema}
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
              <Title className="text-lg">Create Channel</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Input
              label="Channel Name"
              placeholder="Enter channel name"
              type="text"
              {...register('name')}
              error={errors?.name?.message}
            />

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
