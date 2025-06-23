'use client';

import { Controller, SubmitHandler } from 'react-hook-form';
import FormGroup from '@/app/shared/ui/form-group';
import FormFooter from '@core/components/form-footer';
import { Form } from '@core/ui/form';
import { Input } from 'rizzui';

import { useModal } from '../../modal-views/use-modal';

import FormHeader from '@/core/components/form-header';
import {
  connectionFormSchema,
  ConnectionFormTypes,
} from '@/validators/create-connection.schema';
import { useRequesClinicConnection } from '@/hooks/useConnection';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function CreateEditConnectionModal() {
  const { closeModal } = useModal();
  const { data: sessionData } = useSession();

  const { mutate } = useRequesClinicConnection();

  const onSubmit: SubmitHandler<ConnectionFormTypes> = (data) => {
    const payload = {
      name: data.connection_name,
      access_token: sessionData?.accessToken as string,
    };
    mutate(payload, {
      onSuccess: () => {
        toast.success('Connection created successfully');
        closeModal();
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
              <FormGroup title="Connection Name" isLabel>
                <Input
                  placeholder="First Name"
                  {...register('connection_name')}
                  error={errors.connection_name?.message}
                  className="flex-grow"
                />
              </FormGroup>
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
