'use client';

import { Button, Text, Input, Password } from 'rizzui';
import { SubmitHandler } from 'react-hook-form';
import { Form } from '@core/ui/form';
import { routes } from '@/config/routes';
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@/validators/reset-password.schema';
import AuthWrapper from '@/app/shared/auth-layout/auth-wrapper';
import { useForgotPassword } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

export default function ForgetPasswordForm() {
  const { mutate } = useForgotPassword();

  const onSubmit: SubmitHandler<ResetPasswordSchema> = (data) => {
    mutate(
      { ...data },
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
        <Form<ResetPasswordSchema>
          validationSchema={resetPasswordSchema}
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
                {...register('email')}
                error={errors.email?.message}
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
