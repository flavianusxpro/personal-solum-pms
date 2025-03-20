import { gender, patientTitle } from '@/config/constants';
import React, { useState } from 'react';
import { Button, Input, Select, Text } from 'rizzui';
import AdditionalInformation from './additional-information';
import { Controller, useForm } from 'react-hook-form';
import { useModal } from '../shared/modal-views/use-modal';
import ModalEstimationCost from './modal/modal-estimation';

const STEP = {
  REGISTER: 1,
  LOGIN: 2,
  FILL_DATA: 3,
};

const ConfirmBooking = () => {
  const { openModal } = useModal();
  const [currentStep, setCurrentStep] = useState(STEP.REGISTER);

  const {
    register,
    control,
    formState: { errors },
  } = useForm();

  const submitButton = () => {
    if (currentStep == STEP.FILL_DATA) {
      return openModal({
        view: <ModalEstimationCost />,
      });
    }
  };
  return (
    <div className="flex min-h-full min-w-full flex-col items-center">
      <div className="mt-8 w-full max-w-6xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="my-4 text-center text-2xl font-semibold">
          Confirm My Booking
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
              <div className="mt-4 space-y-4">
                <Input
                  label="First Name"
                  placeholder="First Name"
                  {...register('firstName')}
                  error={errors.firstName?.message as string}
                />
                <Input
                  label="Last Name"
                  placeholder="Last Name"
                  {...register('lastName')}
                  error={errors.lastName?.message as string}
                />
                <Input
                  label="Email Address"
                  placeholder="Email Address"
                  {...register('emailAddress')}
                  error={errors.emailAddress?.message as string}
                />
                <Button
                  className="mt-4 w-full bg-green-600 text-white"
                  onClick={() => setCurrentStep(STEP.FILL_DATA)}
                >
                  Next
                </Button>
              </div>
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
              <div className="mt-4 space-y-4">
                <Input
                  label="Email Address"
                  placeholder="Email Address"
                  {...register('emailAddress')}
                  error={errors.emailAddress?.message as string}
                />
                <Input
                  label="Password"
                  placeholder="Password"
                  {...register('password')}
                  error={errors.password?.message as string}
                />
                <Button
                  className="mt-4 w-full bg-green-600 text-white"
                  onClick={() => setCurrentStep(STEP.FILL_DATA)}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : currentStep == STEP.FILL_DATA ? (
            <div className="border-r p-6 sm:w-2/3">
              <h3 className="text-lg font-semibold">Add Patient Information</h3>
              <p className="text-sm text-gray-500">
                Fill in the details of the patient who is attending this
                appointment.
              </p>
              <div className="mt-4 space-y-4">
                <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                  <Controller
                    name="patientTitle"
                    control={control}
                    render={({ field }) => (
                      <Select
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
                      <Select
                        {...field}
                        label="Gender"
                        placeholder="Gender"
                        className="group relative z-0 w-full"
                        options={gender}
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
                    {...register('lastName')}
                    error={errors.lastName?.message as string}
                  />
                </div>
                <div className="grid gap-y-4 md:grid-cols-2 md:gap-6">
                  <Input
                    label="Email Address"
                    placeholder="Email Address"
                    className="group relative z-0 w-full"
                    {...register('patienEmailAddress')}
                    error={errors.patienEmailAddress?.message as string}
                  />
                  <Input
                    label="Mobile Phone"
                    placeholder="Mobile Phone"
                    className="group relative z-0 w-full"
                    type="number"
                    {...register('patienMobilePhone')}
                    error={errors.patienMobilePhone?.message as string}
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
                    {...register('patientRoleName')}
                    error={errors.patientRoleName?.message as string}
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
                    error={errors.patientAddressLine1?.message as string}
                  />
                  <Input
                    label="Address Line 2"
                    placeholder="Address Line 2"
                    className="group relative z-0 w-full"
                    {...register('patientAddressLine2')}
                    error={errors.patientAddressLine2?.message as string}
                  />
                </div>
              </div>

              <AdditionalInformation />

              <Button
                className="mt-4 w-full bg-green-600 text-white"
                onClick={submitButton}
              >
                Next
              </Button>
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
