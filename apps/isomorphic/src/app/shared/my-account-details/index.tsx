'use client';
import {
  changeMyDetailSchema,
  ChangeMyDetailSchema,
} from '@/validators/change-account-details.schema';
import {
  ChangePasswordSchema,
  changePasswordSchema,
} from '@/validators/change-password.schema';
import { Form } from '@core/ui/form';
import { BiChevronRight } from 'react-icons/bi';
import { PiCalendar, PiCardholder } from 'react-icons/pi';
import { Button, Flex, Grid, Input, Password, Text, Title } from 'rizzui';

export default function MyAccountDetails() {
  return (
    <div className="flex h-screen flex-col gap-4 bg-gray-50 p-5">
      <div className="grid gap-4 sm:grid-cols-1">
        <div className="grid grid-cols-1 gap-2 rounded-md bg-white p-2 px-4">
          <Flex justify="between" align="center" className="">
            <Title className="text-lg font-semibold">
              My Booking Account Details
            </Title>{' '}
            <PiCalendar className="h-6 w-6 text-green-600" />
          </Flex>
          <div className="h-1 w-full bg-gray-50"></div>

          <Text className="text-xs">
            The details below are for your booking account only. If you need to
            update your medical or personal details contact your Solum Clinic
            Centre.
          </Text>

          <Form<ChangeMyDetailSchema>
            validationSchema={changeMyDetailSchema}
            onSubmit={(data) => console.log(data)}
            useFormProps={{
              mode: 'onChange',
            }}
          >
            {({ register, control, formState: { errors } }) => (
              <Grid columns="2" gap="2">
                <Input
                  {...register('firstName')}
                  error={errors.firstName?.message as string}
                  label="First Name"
                  placeholder="First Name"
                />
                <Input
                  {...register('lastName')}
                  error={errors.lastName?.message as string}
                  label="Last Name"
                  placeholder="Last Name"
                />
                <Input
                  {...register('email')}
                  error={errors.email?.message as string}
                  type="email"
                  label="Email"
                  placeholder="Email"
                />
                <Button type="submit" className="mt-6 shrink-0 bg-green-600">
                  Save My Details
                </Button>
              </Grid>
            )}
          </Form>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-md bg-white p-2 px-4">
          <Flex justify="between" align="center" className="">
            <Title className="text-lg font-semibold">Update Password</Title>{' '}
            <PiCalendar className="h-6 w-6 text-green-600" />
          </Flex>
          <div className="h-1 w-full bg-gray-50"></div>

          <Text className="text-xs">
            You can update your password by entering the fields below. You will
            need to log back in after any changes to your booking account
            details.
          </Text>

          <Form<ChangePasswordSchema>
            validationSchema={changePasswordSchema}
            onSubmit={(data) => console.log(data)}
            useFormProps={{
              mode: 'onChange',
            }}
          >
            {({ register, control, formState: { errors } }) => (
              <Grid columns="2" gap="2">
                <Password
                  label="Current Password"
                  placeholder="Current Password"
                  {...register('currentPassword')}
                  error={errors.currentPassword?.message as string}
                />
                <Password
                  label="New Password"
                  placeholder="Enter your new password"
                  {...register('newPassword')}
                  error={errors.newPassword?.message as string}
                />
                <Password
                  label="Confirm Password"
                  placeholder="Enter your confirm password"
                  {...register('confirmPassword')}
                  error={errors.confirmPassword?.message as string}
                />
                <Button type="submit" className="mt-6 shrink-0 bg-green-600">
                  Save My Password
                </Button>
              </Grid>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
