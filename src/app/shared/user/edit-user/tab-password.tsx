'use client';

import { useState } from 'react';
import { Button, Text, Input, Password, Flex } from 'rizzui';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from '@/validators/change-password.schema';
import FormGroup from '../../ui/form-group';
import toast from 'react-hot-toast';
import { useGetPatientById } from '@/hooks/usePatient';
import { useParams } from 'next/navigation';
import { useUpdateUser } from '@/hooks/useUser';

export default function TabPassword({ isView = false }: { isView?: boolean }) {
  const id = useParams<{ id: string }>().id;

  const { mutate: mutateUpdateUser, isPending } = useUpdateUser();

  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    mutateUpdateUser(
      {
        id,
        password: data.newPassword,
      },
      {
        onSuccess: () => {
          toast.success('Password updated successfully');
        },
        onError: (error: any) => {
          console.error('Error updating password:', error);
          toast.error(
            'Failed to update password: ' + error.response?.data?.message
          );
        },
      }
    );
  };

  return (
    <div>
      <FormGroup title="Password" className="" />
      <Form<ChangePasswordSchema>
        validationSchema={changePasswordSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
        }}
        className="pt-1.5"
      >
        {({ register, formState: { errors } }) => {
          return (
            <div className="mt-4">
              <div className="border-y border-dashed border-muted py-10">
                <FormGroup title="New Password" isLabel>
                  <Password
                    placeholder="Enter your new password"
                    size="lg"
                    className="[&>label>span]:font-medium"
                    inputClassName="text-sm"
                    {...register('newPassword')}
                    error={errors.newPassword?.message}
                    disabled={isView}
                  />
                </FormGroup>
              </div>
              <div className="border-b border-dashed border-muted py-10">
                <FormGroup title="Confirm New Password" isLabel>
                  <Password
                    placeholder="Enter confirm new password"
                    size="lg"
                    className="[&>label>span]:font-medium"
                    inputClassName="text-sm"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    disabled={isView}
                  />
                </FormGroup>
              </div>
              <div className="w-full">
                <Flex gap="3" justify="end" className="mt-6">
                  <Button className="mt-2" variant="outline">
                    Cancel
                  </Button>
                  {!isView && (
                    <Button
                      isLoading={isPending}
                      className="mt-2"
                      type="submit"
                    >
                      Reset Password
                    </Button>
                  )}
                </Flex>
              </div>
            </div>
          );
        }}
      </Form>
    </div>
  );
}
