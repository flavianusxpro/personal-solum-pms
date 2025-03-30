import { Form } from '@core/ui/form';
import { STEP } from './confirm-booking';
import { registerSchema, RegisterSchema } from '@/validators/register.schema';
import { Button, Flex, Input, Password } from 'rizzui';
import { useRegister } from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { Controller, SubmitHandler } from 'react-hook-form';
import CSelect from '../../ui/select';
import { genderOption } from '@/config/constants';

interface IProps {
  setCurrentStep: (step: number) => void;
}
export default function RegisterForm({ setCurrentStep }: IProps) {
  const { mutate, isPending } = useRegister();

  const onSubmitRegister: SubmitHandler<RegisterSchema> = async (data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success('Registration successful');
        setCurrentStep(STEP.LOGIN);
      },
      onError: (res: any) => {
        toast.error('Registration failed: ' + res.response.data.message);
      },
    });
  };
  return (
    <div className="border-r p-6 sm:w-2/3">
      <h3 className="text-lg font-semibold">Complete Your Booking</h3>
      <p className="text-sm text-gray-500">
        Booked with us before?{' '}
        <a
          href="#"
          className="text-blue-600"
          onClick={() => setCurrentStep(STEP.LOGIN)}
        >
          Log in
        </a>
      </p>
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
                className="w-full [&>label>span]:font-medium"
                {...register('first_name')}
                error={errors.first_name?.message}
              />
              <Input
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                className="w-full [&>label>span]:font-medium"
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
                className="w-full [&>label>span]:font-medium"
                {...register('mobile_number')}
                error={errors.mobile_number?.message}
              />
              <Input
                type="text"
                label="Address"
                placeholder="Enter your address"
                className="w-full [&>label>span]:font-medium"
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
                    options={genderOption}
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
                className="w-full bg-green-500"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}
