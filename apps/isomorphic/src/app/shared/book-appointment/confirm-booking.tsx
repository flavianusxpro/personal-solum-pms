import { patientTitle } from '@/config/constants';
import React, { useEffect, useState } from 'react';
import {
  ActionIcon,
  Button,
  Flex,
  Input,
  Password,
  Select,
  Text,
} from 'rizzui';
import AdditionalInformation from './additional-information';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useModal } from '../modal-views/use-modal';
import { IoArrowBackCircle } from 'react-icons/io5';
import { signIn, useSession } from 'next-auth/react';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import toast from 'react-hot-toast';
import { Form } from '@core/ui/form';
import { registerSchema, RegisterSchema } from '@/validators/register.schema';
import CSelect from '../ui/select';
import genderData from '@/data/gender-data';
import { useRegister } from '@/hooks/useAuth';
import { patientSchema, PatientSchema } from '@/validators/patient.schema';
import ModalEstimationCost from './modal/modal-estimation';

const STEP = {
  REGISTER: 1,
  LOGIN: 2,
  FILL_DATA: 3,
};

const ConfirmBooking = ({ onPrevStep }: { onPrevStep: () => void }) => {
  const { openModal } = useModal();
  const { status } = useSession();
  const [currentStep, setCurrentStep] = useState(STEP.REGISTER);
  const [loading, setLoading] = useState(false);

  const { mutate, isPending } = useRegister();

  const onSubmitPatient: SubmitHandler<PatientSchema> = async (data) => {
    console.log(
      '🚀 ~ constonSubmitPatient:SubmitHandler<PatientSchema>= ~ data:',
      data
    );
    return openModal({
      view: <ModalEstimationCost />,
    });
  };

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

  // Use Effect
  useEffect(() => {
    if (status === 'authenticated') {
      setCurrentStep(STEP.FILL_DATA);
    }
  }, [status]);

  return (
    <div className="flex min-h-full min-w-full flex-col items-center">
      <div className="mt-8 w-full max-w-6xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="flex items-center justify-center">
          <ActionIcon variant="text" onClick={onPrevStep} className="">
            <IoArrowBackCircle className="h-auto w-6" size={30} />
          </ActionIcon>
          <h2 className="text-2xl font-semibold">Confirm My Booking</h2>
        </h2>
        <div className="sm:flex">
          {/* Left: Booking Form */}
          {currentStep == STEP.REGISTER ? (
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
          ) : currentStep == STEP.LOGIN ? (
            <div className="w-2/3 border-r p-6">
              <h3 className="text-lg font-semibold">Complete Your Booking</h3>
              <p className="text-sm text-gray-500">
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
                    <div className="col-span-full">
                      <Button className="w-full bg-green-500" type="submit">
                        Sign In
                      </Button>
                    </div>
                  </div>
                )}
              </Form>
            </div>
          ) : currentStep == STEP.FILL_DATA ? (
            <div className="border-r p-6 sm:w-2/3">
              <h3 className="text-lg font-semibold">Add Patient Information</h3>
              <p className="text-sm text-gray-500">
                Fill in the details of the patient who is attending this
                appointment.
              </p>

              <Form<PatientSchema>
                validationSchema={patientSchema}
                onSubmit={onSubmitPatient}
                useFormProps={{
                  mode: 'onChange',
                }}
              >
                {({ register, control, formState: { errors } }) => {
                  return (
                    <>
                      <div className="mt-4 space-y-4">
                        <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                          <Controller
                            name="patientTitle"
                            control={control}
                            render={({ field }) => (
                              <CSelect
                                {...field}
                                label="Title"
                                placeholder="Title"
                                className="group relative z-0 w-full"
                                options={patientTitle}
                                error={errors.patientTitle?.message as string}
                              />
                            )}
                          />
                          <Controller
                            name="patientGender"
                            control={control}
                            render={({ field }) => (
                              <CSelect
                                {...field}
                                label="Gender"
                                placeholder="Gender"
                                className="group relative z-0 w-full"
                                options={genderData}
                                error={errors.patientGender?.message as string}
                              />
                            )}
                          />
                        </div>
                        <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                          <Input
                            label="First Name"
                            placeholder="First Name"
                            className="group relative z-0 w-full"
                            aria-required={true}
                            {...register('patientFirstName')}
                            error={errors.patientFirstName?.message as string}
                          />
                          <Input
                            label="Last Name"
                            placeholder="Last Name"
                            className="group relative z-0 w-full"
                            {...register('patientLastName')}
                            error={errors.patientLastName?.message as string}
                          />
                        </div>
                        <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                          <Input
                            label="Email Address"
                            placeholder="Email Address"
                            className="group relative z-0 w-full"
                            {...register('patientEmailAddress')}
                            error={
                              errors.patientEmailAddress?.message as string
                            }
                          />
                          <Input
                            label="Mobile Phone"
                            placeholder="Mobile Phone"
                            className="group relative z-0 w-full"
                            type="number"
                            {...register('patientMobilePhone')}
                            error={errors.patientMobilePhone?.message as string}
                          />
                        </div>
                        <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                          <Input
                            label="Date of Birth"
                            placeholder="Date of Birth"
                            className="group relative z-0 w-full"
                            type="date"
                            {...register('patienDateBirth')}
                            error={errors.patienDateBirth?.message as string}
                          />
                          <Input
                            label="State"
                            placeholder="State"
                            className="group relative z-0 w-full"
                            {...register('patientState')}
                            error={errors.patientState?.message as string}
                          />
                        </div>
                        <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                          <Input
                            label="Suburb"
                            placeholder="Suburb"
                            className="group relative z-0 w-full"
                            {...register('patientSuburb')}
                            error={errors.patientSuburb?.message as string}
                          />
                          <Input
                            label="Postcode"
                            placeholder="Postcode"
                            className="group relative z-0 w-full"
                            {...register('patientPostcode')}
                            error={errors.patientPostcode?.message as string}
                          />
                        </div>
                        <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                          <Input
                            label="Address Line 1"
                            placeholder="Address Line 1"
                            className="group relative z-0 w-full"
                            {...register('patientAddressLine1')}
                            error={
                              errors.patientAddressLine1?.message as string
                            }
                          />
                          <Input
                            label="Address Line 2"
                            placeholder="Address Line 2"
                            className="group relative z-0 w-full"
                            {...register('patientAddressLine2')}
                            error={
                              errors.patientAddressLine2?.message as string
                            }
                          />
                        </div>
                      </div>

                      <AdditionalInformation
                        register={register}
                        control={control}
                        errors={errors}
                      />

                      <Button
                        className="mt-4 w-full bg-green-600 text-white"
                        type="submit"
                      >
                        Next
                      </Button>
                    </>
                  );
                }}
              </Form>
            </div>
          ) : null}

          {/* Right: Appointment Details */}
          <div className="p-6 sm:w-2/6">
            <div className="flex items-center gap-4">
              <img
                src="https://solumclinic.zedmed-appointments.systems/images/doctor_default.png"
                alt="Doctor"
                className="h-14 w-14 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">Dr Hermanus Bosman</h3>
                <p className="text-sm text-gray-600">MBChB</p>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <Text className="mt-3">
                <strong>Centre:</strong> Solum Clinic
              </Text>
              <Text className="mt-3">
                <strong>Your local time (WIT):</strong>
              </Text>
              <Text className="mt-3">
                <strong>Date:</strong> Wednesday 12 March 2025
              </Text>
              <Text className="mt-3">
                <strong>Time:</strong> 6:45 am
              </Text>
              <Text className="mt-3">
                <strong>Type:</strong> Medical certificate
              </Text>
            </div>
            <Button
              className="mt-4 block w-full bg-red-600 text-white"
              onClick={() => {
                window.location.href = '/book-appointment';
              }}
            >
              Cancel Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
