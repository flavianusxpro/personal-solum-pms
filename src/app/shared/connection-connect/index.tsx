'use client';

import { Form } from '@/core/ui/form';
import {
  connectionFormSchema,
  ConnectionFormTypes,
} from '@/validators/create-connection.schema';
import { SubmitHandler } from 'react-hook-form';
import { Button, Flex, Input, Text, Title } from 'rizzui';
import { useAtom } from 'jotai';
import { connectionAtom } from '@/store/connection';
import toast from 'react-hot-toast';
import {
  useGetStatusClinicConnection,
  usePostDisconectClinicConnection,
  useRequesClinicConnection,
} from '@/hooks/useConnection';

export default function Connection() {
  const [connectionValue, setConnectionValue] = useAtom(connectionAtom);

  const { data: connectionStatus, refetch } = useGetStatusClinicConnection();

  const { mutateAsync, isPending } = useRequesClinicConnection();
  const { mutate: mutateDisconnect } = usePostDisconectClinicConnection();

  const onSubmit: SubmitHandler<ConnectionFormTypes> = (data) => {
    mutateAsync(data, {
      onSuccess: (res) => {
        refetch();
        setConnectionValue({
          connection_name: data.name,
          hostname: data.base_url,
          x_token: res.data.access_token,
          x_session_id: res.data.sessionId,
        });
        toast.success('Connection created successfully');
      },
      onError: (error) => {
        const errorMessage =
          (error as any)?.response?.data?.message || 'An error occurred';
        toast.error(errorMessage);
      },
    });
  };

  const handleDisconnect = () => {
    mutateDisconnect(undefined, {
      onSuccess: () => {
        refetch();
        setConnectionValue({
          connection_name: '',
          hostname: '',
          x_token: '',
          x_session_id: '',
        });
        toast.success('Disconnected successfully');
      },
      onError: (error) => {
        const errorMessage =
          (error as any)?.response?.data?.message || 'An error occurred';
        toast.error(errorMessage);
      },
    });
  };

  return (
    <Form<ConnectionFormTypes>
      validationSchema={connectionFormSchema}
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-2xl rounded-xl bg-white py-8 shadow-md @container"
      useFormProps={{
        mode: 'all',
        defaultValues: {
          name: connectionValue.connection_name || '',
          base_url: connectionValue.hostname || '',
          access_token: connectionValue.x_token || '',
        },
      }}
    >
      {({ register, setValue, formState: { errors } }) => {
        if (
          connectionValue.hostname ||
          connectionValue.x_token ||
          connectionValue.connection_name
        ) {
          setValue('base_url', connectionValue.hostname || '');
          setValue('name', connectionValue.connection_name || '');
          setValue('access_token', connectionValue.x_token || '');
        }
        return (
          <div className="flex flex-col gap-6 rounded-lg pt-2 shadow-sm">
            <div className="grid grid-cols-1 gap-x-7 gap-y-4 px-6">
              <Text className="text-xl font-semibold">Create Connection</Text>
              <Input
                label="Connection Name"
                placeholder="Connection Name"
                {...register('name')}
                error={errors.name?.message}
                className="flex-grow"
              />
              <Input
                label="Hostname"
                placeholder="Hostname"
                {...register('base_url')}
                error={errors.base_url?.message}
                className="flex-grow"
              />
              <Input
                label="Access Token"
                placeholder="Access Token"
                {...register('access_token')}
                error={errors.access_token?.message}
                className="flex-grow"
              />
            </div>

            <Flex justify="end" className="px-6 pt-4">
              {connectionStatus?.data?.sessionId ? (
                <Button
                  variant="outline"
                  color="danger"
                  onClick={handleDisconnect}
                  className="mr-2"
                >
                  Disconnect
                </Button>
              ) : (
                <Button isLoading={isPending} type="submit">
                  Connect
                </Button>
              )}
            </Flex>
          </div>
        );
      }}
    </Form>
  );
}
