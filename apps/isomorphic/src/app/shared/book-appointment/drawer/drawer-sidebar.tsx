'use client';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { Fragment, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiSmile } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import {
  ActionIcon,
  Button,
  Collapse,
  Flex,
  Input,
  Password,
  Text,
  Title,
} from 'rizzui';
import { Form } from '@core/ui/form';
import { registerSchema, RegisterSchema } from '@/validators/register.schema';
import CSelect from '../../ui/select';
import genderData from '@/data/gender-data';
import { useRegister } from '@/hooks/useAuth';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { patientMenuItems } from '@/layouts/hydrogen/menu-items';
import cn from '@core/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';
import Link from 'next/link';
import StatusBadge from '@core/components/get-status-badge';

const DrawerSideBar = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { data, status } = useSession();
  const [open, setOpen] = useState(
    status === 'authenticated' ? 'authenticated' : 'unauthenticated'
  );
  const [loadingLogin, setLoadingLogin] = useState(false);

  const { mutate, isPending } = useRegister();

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent automatic re-render
    setOpen('unauthenticated');
    router.push(routes.bookAppointment);
  };

  const onSubmitLogin: SubmitHandler<LoginSchema> = async (data) => {
    setLoadingLogin(true);
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
    setLoadingLogin(false);
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
        <div className="flex w-full flex-col items-center gap-2">
          <Text className="text-center text-lg font-semibold">
            You are logged in as {data?.user.name}
          </Text>
          <div className="mt-4 w-full pb-3 3xl:mt-6">
            {patientMenuItems.map((item: any, index: number) => {
              return (
                <Fragment key={item.name + '-' + index}>
                  {item?.href ? (
                    <>
                      {item?.dropdownItems ? (
                        <Collapse
                          header={({ open, toggle }) => (
                            <div
                              onClick={toggle}
                              className={cn(
                                'group relative flex cursor-pointer items-center justify-between rounded-md px-3 py-2 font-medium lg:my-1 2xl:my-2',
                                'text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-700/90 dark:hover:text-gray-700'
                              )}
                            >
                              <span className="flex items-center">
                                {item?.icon && (
                                  <span
                                    className={cn(
                                      'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',
                                      'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                                    )}
                                  >
                                    {item?.icon}
                                  </span>
                                )}
                                {item.name}
                              </span>

                              <PiCaretDownBold
                                strokeWidth={3}
                                className={cn(
                                  'h-3.5 w-3.5 -rotate-90 text-gray-500 transition-transform duration-200 rtl:rotate-90',
                                  open && 'rotate-0 rtl:rotate-0'
                                )}
                              />
                            </div>
                          )}
                        >
                          {item?.dropdownItems?.map(
                            (dropdownItem: any, index: number) => {
                              return (
                                <Link
                                  href={dropdownItem?.href}
                                  key={dropdownItem?.name + index}
                                  className={cn(
                                    'mb-0.5 flex items-center justify-between rounded-md px-3.5 py-2 font-medium capitalize last-of-type:mb-1 lg:last-of-type:mb-2',
                                    'text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900'
                                  )}
                                >
                                  <div className="flex items-center truncate">
                                    <span
                                      className={cn(
                                        'me-[18px] ms-1 inline-flex h-1 w-1 rounded-full bg-current transition-all duration-200',
                                        'opacity-40'
                                      )}
                                    />{' '}
                                    <span className="truncate">
                                      {dropdownItem?.name}
                                    </span>
                                  </div>
                                  {dropdownItem?.badge?.length ? (
                                    <StatusBadge status={dropdownItem?.badge} />
                                  ) : null}
                                </Link>
                              );
                            }
                          )}
                        </Collapse>
                      ) : (
                        <Link
                          href={item?.href}
                          className={cn(
                            'group relative my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:my-2',
                            'text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                          )}
                        >
                          <div className="flex items-center truncate">
                            {item?.icon && (
                              <span
                                className={cn(
                                  'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',

                                  'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                                )}
                              >
                                {item?.icon}
                              </span>
                            )}
                            <span className="truncate">{item.name}</span>
                          </div>
                        </Link>
                      )}
                    </>
                  ) : item?.isButton ? (
                    <Button
                      variant="text"
                      className={cn(
                        'group relative my-0.5 flex items-center justify-between rounded-md px-3 py-2 font-medium capitalize lg:my-1 2xl:my-2',
                        'w-full text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-700/90'
                      )}
                      onClick={() => handleSignOut()}
                    >
                      <div className="flex items-center truncate">
                        {item?.icon && (
                          <span
                            className={cn(
                              'me-2 inline-flex h-5 w-5 items-center justify-center rounded-md [&>svg]:h-[20px] [&>svg]:w-[20px]',

                              'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700'
                            )}
                          >
                            {item?.icon}
                          </span>
                        )}
                        <span className="truncate">{item.name}</span>
                      </div>
                    </Button>
                  ) : (
                    <Title
                      as="h6"
                      className={cn(
                        'mb-2 truncate px-6 text-xs font-normal uppercase tracking-widest text-gray-500 2xl:px-8',
                        index !== 0 && 'mt-6 3xl:mt-7'
                      )}
                    >
                      {item.name}
                    </Title>
                  )}
                </Fragment>
              );
            })}
          </div>
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
                <Button
                  isLoading={loadingLogin}
                  className="w-full bg-green-500 hover:bg-green-600"
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
            )}
          </Form>
          <Text className="text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <Button
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
                    className="w-full bg-green-500 hover:bg-green-600"
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
