import { useModal } from '@/app/shared/modal-views/use-modal';
import FormFooter from '@/core/components/form-footer';
import { Form } from '@/core/ui/form';
import { useGetAppointments } from '@/hooks/useAppointment';
import { useCreatePatientFLag } from '@/hooks/usePatientFlag';
import {
  EmailSettingsSchema,
  emailSettingsSchema,
} from '@/validators/email-settings.schema';
import {
  addNewPlatformSchema,
  NewPlatformFormTypes,
} from '@/validators/setting-communication.schema';
import { SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiX } from 'react-icons/pi';
import { ActionIcon, Flex, Input, Textarea, Title } from 'rizzui';

export default function AddPlatform() {
  const { closeModal } = useModal();

  const { mutate } = useCreatePatientFLag();
  const { refetch } = useGetAppointments({
    page: 1,
    perPage: 10,
  });

  const onSubmit: SubmitHandler<NewPlatformFormTypes> = (data) => {
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
    <Form<NewPlatformFormTypes>
      validationSchema={addNewPlatformSchema}
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
              <Title className="text-lg">Create Platform</Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Input
              label="Platform Name"
              placeholder="Enter platform name"
              type="text"
              {...register('platform_name')}
            />
            <Input
              label="Secret Key"
              placeholder="Enter secret key (e.g. sk_fb_3f4a9b7c2d1e...)"
              type="text"
              {...register('secret_key')}
            />
            <Input
              label="Client ID"
              placeholder="Enter client ID (e.g. fb-client-6f8a9b7c-...)"
              type="text"
              {...register('client_id')}
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
