'use client';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiSmile } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { ActionIcon, Button, Flex, Input, Password, Text } from 'rizzui';
import { Form } from '@core/ui/form';
import { registerSchema, RegisterSchema } from '@/validators/register.schema';
import CSelect from '../../ui/select';
import genderData from '@/data/gender-data';
import { useRegister } from '@/hooks/useAuth';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';

const DrawerSideBar = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { data, status } = useSession();
  const [open, setOpen] = useState(
    status === 'authenticated' ? 'authenticated' : 'unauthenticated'
  );
  const [loading, setLoading] = useState(false);

  const { mutate, isPending } = useRegister();

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent automatic re-render
    router.push(routes.bookAppointment);
  };

  const onSubmitLogin: SubmitHandler<LoginSchema> = async (data) => {
    setLoading(true);
    const res = await signIn('credentials', {
      ...data,
      redirect: false, // Prevent automatic redirection
    });

    if (res?.ok) {
      toast.success('Login successful');
      onClose();
    }

    if (res?.error) {
      toast.error(res.error || 'Invalid credentials');
    }
    setLoading(false);
  };

  const onSubmitRegister: SubmitHandler<RegisterSchema> = async (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Registration successful');
        setOpen('signin');
      },
      onError: (res: any) => {
        toast.error('Registration failed: ' + res.response.data.message);
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 overflow-auto p-4">
      <div className="w-full">
        <ActionIcon onClick={onClose}>
          <IoClose className="h-6 w-6" />
        </ActionIcon>
      </div>
      <div className="mt-5 flex flex-col items-center gap-2">
        <BiSmile className="h-10 w-10" />
        <Text className="text-center text-2xl text-green-700">Hi there</Text>
      </div>

      {open === 'authenticated' && (
        <div className="flex flex-col items-center gap-2">
          <Text className="text-center text-lg font-semibold">
            You are logged in as {data?.user.name}
          </Text>
          <Button onClick={() => handleSignOut()} className="bg-green-600">
            Logout
          </Button>
        </div>
      )}

      {open === 'unauthenticated' && (
        <div className="">
          <Button onClick={() => setOpen('signin')} className="bg-green-600">
            Sign In or Sign Up
          </Button>
        </div>
      )}

      {open === 'signin' && (
        <div
          className={`w-full transform transition-opacity duration-500 ease-in-out ${
            open === 'signin'
              ? 'translate-y-0 opacity-100'
              : '-translate-y-5 opacity-0'
          }`}
        >
          <Form<LoginSchema>
            validationSchema={loginSchema}
            onSubmit={onSubmitLogin}
            useFormProps={{
              mode: 'onChange',
            }}
          >
            {({ register, control, formState: { errors } }) => (
              <div className="space-y-2">
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  className="[&>label>span]:font-medium"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Password
                  label="Password"
                  placeholder="Enter your password"
                  className="[&>label>span]:font-medium"
                  {...register('password')}
                  error={errors.password?.message}
                />
                <Button className="w-full" type="submit">
                  Sign In
                </Button>
              </div>
            )}
          </Form>
          <Text className="text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <Button
              isLoading={loading}
              onClick={() => setOpen('signup')}
              variant="text"
              className="text-sm"
            >
              Sign Up
            </Button>
          </Text>
        </div>
      )}

      {open === 'signup' && (
        <div
          className={`w-full transform transition-opacity delay-200 duration-500 ease-in-out ${
            open === 'signup'
              ? 'translate-y-0 opacity-100'
              : '-translate-y-5 opacity-0'
          }`}
        >
          <Form<RegisterSchema>
            validationSchema={registerSchema}
            onSubmit={onSubmitRegister}
            useFormProps={{
              mode: 'onChange',
            }}
          >
            {({ register, control, watch, formState: { errors } }) => (
              <div className="max-h-[80vh] space-y-2 overflow-y-auto">
                <Flex justify="between">
                  <Input
                    type="text"
                    label="First Name"
                    placeholder="Enter your first name"
                    className="[&>label>span]:font-medium"
                    {...register('first_name')}
                    error={errors.first_name?.message}
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    placeholder="Enter your last name"
                    className="[&>label>span]:font-medium"
                    {...register('last_name')}
                    error={errors.last_name?.message}
                  />
                </Flex>

                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  className="[&>label>span]:font-medium"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Password
                  label="Password"
                  placeholder="Enter your password"
                  className="[&>label>span]:font-medium"
                  {...register('password')}
                  error={errors.password?.message}
                />
                <Password
                  label="Password Confirmation"
                  placeholder="Enter your password confirmation"
                  className="[&>label>span]:font-medium"
                  {...register('password_confirmation', {
                    validate: (value) => {
                      if (value !== watch('password')) {
                        return 'Passwords do not match';
                      }
                    },
                  })}
                  error={errors.password_confirmation?.message}
                />
                <Flex justify="between">
                  <Input
                    type="text"
                    label="Mobile Number"
                    placeholder="Enter your mobile number"
                    className="[&>label>span]:font-medium"
                    {...register('mobile_number')}
                    error={errors.mobile_number?.message}
                  />
                  <Input
                    type="text"
                    label="Address"
                    placeholder="Enter your address"
                    className="[&>label>span]:font-medium"
                    {...register('address')}
                    error={errors.address?.message}
                  />
                </Flex>

                <Flex justify="between">
                  <Input
                    type="date"
                    label="Date of Birth"
                    placeholder="Enter your Date of Birth"
                    className="w-full [&>label>span]:font-medium"
                    {...register('date_of_birth')}
                    error={errors.date_of_birth?.message}
                  />
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <CSelect
                        {...field}
                        label="Gender"
                        options={genderData}
                        className="[&>label>span]:font-medium"
                        error={errors.gender?.message}
                      />
                    )}
                  />
                </Flex>

                <Flex justify="between">
                  <Input
                    type="text"
                    label="Medicare Card Number"
                    placeholder="Enter your medicare card number"
                    className="w-full [&>label>span]:font-medium"
                    {...register('medicare_card_number')}
                    error={errors.medicare_card_number?.message}
                  />
                  <Input
                    type="date"
                    label="Medicare Expired Date"
                    placeholder="Enter your medicare expired date"
                    className="w-full [&>label>span]:font-medium"
                    {...register('medicare_expired_date')}
                    error={errors.medicare_expired_date?.message}
                  />
                </Flex>
                <div className="w-full py-1">
                  <Button
                    isLoading={isPending}
                    className="w-full"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            )}
          </Form>
          <Text className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Button onClick={() => setOpen('signin')} variant="text">
              Sign In
            </Button>
          </Text>
        </div>
      )}
    </div>
  );
};

export default DrawerSideBar;
