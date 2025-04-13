'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button, Text, Input, Password } from 'rizzui';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { routes } from '@/config/routes';
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@/validators/reset-password.schema';
import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function ForgetPasswordForm() {
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    console.log(data);
    setReset(initialValues);
  };

  return (
    <AuthWrapper
      title={
        <>
          Having trouble to sign in? <br className="hidden sm:inline-block" />{' '}
          Reset your password.
        </>
      }
    >
      <div className="px-2">
        <Form<ResetPasswordSchema>
          validationSchema={resetPasswordSchema}
          resetValues={reset}
          onSubmit={onSubmit}
          useFormProps={{
            mode: 'onChange',
            defaultValues: initialValues,
          }}
          className="pt-1.5"
        >
          {({ register, formState: { errors } }) => (
            <div className="space-y-6">
              <Input
                type="email"
                size="lg"
                label="Email"
                disabled={true}
                value={'account123@klinik.com'}
                placeholder="Enter your email"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('email')}
                error={errors.email?.message}
              />
              <Password
                label="Password"
                placeholder="Enter your password"
                size="lg"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('password')}
                error={errors.password?.message}
              />
              <Password
                label="Confirm Password"
                placeholder="Enter confirm password"
                size="lg"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
              <Button className="mt-2 w-full" type="submit" size="lg">
                Reset Password
              </Button>
            </div>
          )}
        </Form>
      </div>
    </AuthWrapper>
  );
}
