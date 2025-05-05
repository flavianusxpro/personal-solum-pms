'use client';

import { Button, Input, Password } from 'rizzui';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import { usePostVerifyAccount } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import {
  verificationAccountSchema,
  VerificationAccountSchemaForm,
} from '@/validators/account-verification.schema';
import { useSearchParams } from 'next/navigation';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function AccountVerification() {
  const query = useSearchParams();
  const token = query.get('token');

  const { mutate } = usePostVerifyAccount();

  const onSubmit: SubmitHandler<VerificationAccountSchemaForm> = (data) => {
    mutate(
      { password: data.password, token: token as string },
      {
        onSuccess: (res) => {
          toast.success(res.message, {
            duration: 10000,
          });
        },
        onError: (error: any) => {
          toast.error(error.response.data.message);
          console.error('Reset password error:', error);
        },
      }
    );
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
        <Form<VerificationAccountSchemaForm>
          validationSchema={verificationAccountSchema}
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
                placeholder="Enter your email"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('password')}
                error={errors.password?.message}
              />
              <Password
                placeholder="Enter your new password"
                size="lg"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('password')}
                error={errors.password?.message}
              />

              <Password
                placeholder="Enter confirm new password"
                size="lg"
                className="[&>label>span]:font-medium"
                inputClassName="text-sm"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
              <Button className="mt-2 w-full" type="submit" size="lg">
                Verify Account
              </Button>
            </div>
          )}
        </Form>
      </div>
    </AuthWrapper>
  );
}
