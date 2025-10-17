import { useModal } from '@/app/shared/modal-views/use-modal';
import FormFooter from '@/core/components/form-footer';
import { Form } from '@/core/ui/form';
import { useState } from 'react';
import {
  addChannelSchema,
  ChannelProps,
} from '@/validators/communication-schema';
import axios from 'axios';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiX } from 'react-icons/pi';
import { ActionIcon, Flex, Input, Textarea, Title } from 'rizzui';
import { postCreateNewChannel } from '@/service/appointment';

export default function AddChannel({ onChannelCreated }: { onChannelCreated: () => void }) {
  const { closeModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<ChannelProps> = async (data) => {
    setIsLoading(true);
    try {
      await postCreateNewChannel(data);
      toast.success('Channel created successfully');
      onChannelCreated(); // Refresh the channel list in the parent component
      closeModal();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || 'Error creating channel'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form<ChannelProps>
      validationSchema={addChannelSchema}
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
            <Textarea
              label="Description (Optional)"
              placeholder="Enter a short description"
              {...register('description')}
              error={errors?.description?.message}
            />

            <FormFooter
              className="rounded-b-xl"
              isLoading={isLoading}
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
