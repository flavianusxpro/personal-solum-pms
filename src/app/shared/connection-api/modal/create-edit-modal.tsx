'use client';

import { SubmitHandler } from 'react-hook-form';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { ActionIcon, Flex, Input, Loader, Text, Textarea, Title } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import { PiX } from 'react-icons/pi';
import toast from 'react-hot-toast';
import { IGetApiKeyConnectionResponse } from '@/types/ApiResponse';

import {
  useCreateApiConnection,
  useGetApiConnection,
  useUpdateApiConnection,
} from '@/hooks/useConnection';
import {
  CreateApiConnectInput,
  createApiConnectSchema,
} from '@/validators/create-api-connection.schema';

interface IProps {
  data?: IGetApiKeyConnectionResponse['data'][number];
  isView?: boolean;
}

export default function CreateEditApiModal({ data, isView }: IProps) {
  const { closeModal } = useModal();

  const { refetch } = useGetApiConnection({
    page: 1,
    perPage: 10,
  });

  const { mutate: mutateCreate, isPending: isPendingCreate } =
    useCreateApiConnection();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateApiConnection();

  const onSubmit: SubmitHandler<CreateApiConnectInput> = (formValues) => {
    if (data?.id) {
      mutateUpdate(
        { ...formValues, id: data?.id },
        {
          onSuccess: () => {
            refetch();
            closeModal();
            toast.success('Api connection updated successfully');
          },
          onError: (error: any) => {
            toast.error(
              'Failed to update api connection: ',
              error?.response?.data?.message
            );
          },
        }
      );
      return;
    }
    mutateCreate(formValues, {
      onSuccess: () => {
        refetch();
        closeModal();
        toast.success('Api connection successfully');
      },
      onError: (error: any) => {
        toast.error(
          'Failed to create api connection: ',
          error?.response?.data?.message
        );
      },
    });
  };

  return (
    <Form<CreateApiConnectInput>
      validationSchema={createApiConnectSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          name: data?.name || '',
          hostname: data?.hostname || '',
        },
      }}
    >
      {({ register, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 px-6 pt-6">
            <Flex justify="between" align="center" gap="4">
              <Title className="text-lg">
                {isView ? 'View' : data ? 'Update' : 'Create'} Api Connection
              </Title>
              <ActionIcon variant="text" onClick={closeModal} className="">
                <PiX className="h-6 w-6" />
              </ActionIcon>
            </Flex>
            <Input
              label="Connection Name"
              {...register('name')}
              placeholder="Connection Name"
              className="w-full"
              error={errors.name?.message}
              disabled={isView}
            />
            <Input
              type="url"
              label="Hostname"
              {...register('hostname')}
              placeholder="Hostname"
              className="w-full"
              error={errors.name?.message}
              disabled={isView}
            />

            {isView ? null : (
              <FormFooter
                className="rounded-b-xl"
                isLoading={isPendingCreate || isPendingUpdate}
                altBtnText="Cancel"
                submitBtnText="Save"
                isSticky={false}
              />
            )}
          </div>
        );
      }}
    </Form>
  );
}
