'use client';

import { useState } from 'react';
import { Button, Text, Input, Password, Flex } from 'rizzui';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { resetPasswordSchema } from '@/validators/reset-password.schema';
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from '@/validators/change-password.schema';
import FormGroup from '../../ui/form-group';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function TabPassword({ isView = false }: { isView?: boolean }) {
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    console.log(data);
    setReset(initialValues);
  };

  return (
    <div>
      <FormGroup title="Password" className="" />
      <Form<ChangePasswordSchema>
        validationSchema={changePasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
        className="pt-1.5"
      >
        {({ register, formState: { errors } }) => (
          <div className="mt-4">
            <div className="border-b border-dashed border-muted py-10">
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
                  <Button className="mt-2" type="submit">
                    Reset Password
                  </Button>
                )}
              </Flex>
            </div>
          </div>
        )}
      </Form>

      <div className="mx-auto mt-10 w-full max-w-screen-2xl">
        <div className="border-b border-dashed border-muted">
          <h2 className="rizzui-title-h2 mb-3 text-xl font-bold text-gray-900">
            Where you’re logged in
          </h2>
          <p className="rizzui-text-p mb-6 text-sm font-normal text-gray-500">
            We’ll alert you via olivia@untitledui.com if there is any unusual
            activity on your account.
          </p>
        </div>
        <div className="flex items-center gap-6 border-b border-dashed border-muted py-6">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 256 256"
            className="h-7 w-7 text-gray-500"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24h72v16H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V200h72a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40ZM48,56H208a8,8,0,0,1,8,8v80H40V64A8,8,0,0,1,48,56ZM208,184H48a8,8,0,0,1-8-8V160H216v16A8,8,0,0,1,208,184Z"></path>
          </svg>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <h3 className="rizzui-title-h3 text-base font-medium text-gray-900 dark:text-gray-700">
                2018 Macbook Pro 15-inch
              </h3>
              <span className="rizzui-text-span relative hidden rounded-md border border-muted py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:block">
                Active Now
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="rizzui-text-p text-sm font-normal text-gray-500">
                Melbourne, Australia
              </p>
              <span className="h-1 w-1 rounded-full bg-gray-600"></span>
              <p className="rizzui-text-p text-sm font-normal text-gray-500">
                22 Jan at 4:20pm
              </p>
            </div>
            <span className="rizzui-text-span relative mt-2 inline-block rounded-md border border-muted py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:hidden">
              Active Now
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6 py-6">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 256 256"
            className="h-7 w-7 text-gray-500"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M208,40H48A24,24,0,0,0,24,64V176a24,24,0,0,0,24,24h72v16H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V200h72a24,24,0,0,0,24-24V64A24,24,0,0,0,208,40ZM48,56H208a8,8,0,0,1,8,8v80H40V64A8,8,0,0,1,48,56ZM208,184H48a8,8,0,0,1-8-8V160H216v16A8,8,0,0,1,208,184Z"></path>
          </svg>
          <div>
            <h3 className="rizzui-title-h3 mb-2 text-base font-medium text-gray-900 dark:text-gray-700">
              2020 Macbook Air M1
            </h3>
            <div className="flex items-center gap-2">
              <p className="rizzui-text-p text-sm font-normal text-gray-500">
                Melbourne, Australia
              </p>
              <span className="h-1 w-1 rounded-full bg-gray-600"></span>
              <p className="rizzui-text-p text-sm font-normal text-gray-500">
                22 Jan at 4:20pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
