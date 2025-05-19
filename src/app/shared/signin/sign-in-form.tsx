'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { useMedia } from '@core/hooks/use-media';
import { Form } from '@core/ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  role: 'admin',
  // rememberMe: true,
};

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl');
  const isMedium = useMedia('(max-width: 1200px)', false);

  const [isLoading, setIsloading] = useState(false);
  const { refetch } = useProfile();

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setIsloading(true);
    const res = await signIn('credentials', {
      ...data,
      role: 'admin',
      redirect: false, // Prevent automatic redirection
    });

    if (res?.ok) {
      toast.success('Login successful');
      if (callbackUrl && callbackUrl !== '/') {
        router.push(callbackUrl);
      } else {
        router.push(routes.appointment.dashboard);
      }
      refetch();
    }

    if (res?.error) {
      toast.error(res.error || 'Invalid credentials');
      setIsloading(false);
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
          defaultValues: initialValues,
        }}
      >
        {({ register, control, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-1">
              {/* <Checkbox
                {...register('rememberMe')}
                label="Remember Me"
                className="[&>label>span]:font-medium"
              /> */}
              <Link
                href={routes.auth.forgotPassword}
                className="h-auto p-0 text-sm font-semibold text-gray-700 underline transition-colors hover:text-primary hover:no-underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signUp}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
