'use client';

import FormHeader from '@/core/components/form-header';
import { Form } from '@/core/ui/form';
import {
  connectionFormSchema,
  ConnectionFormTypes,
} from '@/validators/create-connection.schema';
import { SubmitHandler } from 'react-hook-form';
import { Input } from 'rizzui';
import FormFooter from '@/core/components/form-footer';
import { useAtom } from 'jotai';
import { connectionAtom } from '@/store/connection';

export default function Connection() {
  const [connectionValue, setConnectionValue] = useAtom(connectionAtom);

  const onSubmit: SubmitHandler<ConnectionFormTypes> = (data) => {
    // const payload = {
    //   name: data.connection_name,
    //   access_token: sessionData?.accessToken as string,
    // };
    // mutate(payload, {
    //   onSuccess: () => {
    //     toast.success('Connection created successfully');
    //     closeModal();
    //   },
    //   onError: (error) => {
    //     const errorMessage =
    //       (error as any)?.response?.data?.message || 'An error occurred';
    //     toast.error(errorMessage);
    //   },
    // });
  };

  return (
    <Form<ConnectionFormTypes>
      validationSchema={connectionFormSchema}
      // resetValues={reset}
      onSubmit={onSubmit}
      className="max-h-[90vh] overflow-y-auto rounded-xl bg-white @container"
      useFormProps={{
        mode: 'onChange',
      }}
    >
      {({ register, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-6 pt-2">
            <FormHeader title="Create Connection" />
            <div className="grid grid-cols-1 gap-x-7 gap-y-4 px-6">
              <Input
                label="Hostname"
                placeholder="Hostname"
                {...register('hostname')}
                error={errors.hostname?.message}
                className="flex-grow"
              />
              <Input
                label="Hostname"
                placeholder="Hostname"
                {...register('hostname')}
                error={errors.hostname?.message}
                className="flex-grow"
              />
            </div>

            <FormFooter
              className="rounded-b-xl"
              //   isLoading={isPending}
              altBtnText="Cancel"
              submitBtnText="Save"
            />
          </div>
        );
      }}
    </Form>
  );
}
