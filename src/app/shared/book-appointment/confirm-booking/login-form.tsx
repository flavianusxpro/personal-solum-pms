import { Form } from '@core/ui/form';
import { STEP } from './confirm-booking';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import { SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Button, Input, Password } from 'rizzui';
import Link from 'next/link';
import { routes } from '@/config/routes';

interface IProps {
  setCurrentStep: (step: number) => void;
}
export default function LoginForm({ setCurrentStep }: IProps) {
  const [loading, setLoading] = useState(false);

  const onSubmitLogin: SubmitHandler<LoginSchema> = async (data) => {
    setLoading(true);
    const res = await signIn('credentials', {
      ...data,
      redirect: false, // Prevent automatic redirection
    });

    if (res?.ok) {
      toast.success('Login successful');
    }

    if (res?.error) {
      toast.error(res.error || 'Invalid credentials');
    }
    setLoading(false);
  };
  return (
    <div className="w-2/3 border-r p-6">
      <h3 className="text-lg font-semibold">Complete Your Booking</h3>
      <p className="mb-2 text-sm text-gray-500">
        Don’t have an account?{' '}
        <a
          href="#"
          className="text-blue-600"
          onClick={() => setCurrentStep(STEP.REGISTER)}
        >
          Register
        </a>
      </p>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmitLogin}
        useFormProps={{
          mode: 'onChange',
        }}
      >
        {({ register, control, formState: { errors } }) => (
          <div className="grid grid-cols-1 gap-4">
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
            <Link
              href={routes.auth.forgotPassword}
              className="h-auto p-0 text-sm font-semibold text-gray-700 underline transition-colors hover:text-primary hover:no-underline"
            >
              Forgot Password?
            </Link>
            <div className="col-span-full">
              <Button
                isLoading={loading}
                className="w-full bg-green-500"
                type="submit"
              >
                Sign In
              </Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}
