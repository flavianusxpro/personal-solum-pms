import React, { useEffect, useState } from 'react';
import { Button, Flex, Text } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';
import { useSession } from 'next-auth/react';
import StepBackButton from '../step-back-button';
import Image from 'next/image';
import bookAppointmentAtom from '@/store/book-appointment';
import { useAtom } from 'jotai';
import dayjs from 'dayjs';
import PatientSelection from './patient-selection';
import LoginForm from './login-form';
import RegisterForm from './register-form';

export const STEP = {
  REGISTER: 1,
  LOGIN: 2,
  PATIENT_SELECTION: 3,
};

const ConfirmBooking = ({ onPrevStep }: { onPrevStep: () => void }) => {
  const { status } = useSession();
  const [bookAppointmentValue, setBookAppointment] =
    useAtom(bookAppointmentAtom);

  const [currentStep, setCurrentStep] = useState(STEP.REGISTER);

  // Use Effect
  useEffect(() => {
    if (status === 'authenticated') {
      setCurrentStep(STEP.PATIENT_SELECTION);
    } else {
      setCurrentStep(STEP.LOGIN);
    }
  }, [status]);

  return (
    <div className="flex min-h-full min-w-full flex-col items-center">
      <div className="w-full max-w-6xl rounded-lg bg-white p-6 shadow-lg">
        <Flex justify="center" className="">
          <StepBackButton backButton={onPrevStep} />
        </Flex>
        <div className="relative mt-4 flex flex-col justify-center gap-4 text-center sm:flex-row sm:gap-0">
          <h2 className="text-2xl font-semibold">Confirm My Booking</h2>
        </div>
        <div className="sm:flex">
          {/* Left: Booking Form */}
          {currentStep == STEP.REGISTER ? (
            <RegisterForm setCurrentStep={setCurrentStep} />
          ) : currentStep == STEP.LOGIN ? (
            <LoginForm setCurrentStep={setCurrentStep} />
          ) : currentStep == STEP.PATIENT_SELECTION ? (
            <PatientSelection />
          ) : null}

          {/* Right: Appointment Details */}
          <div className="p-6 sm:w-2/6">
            <div className="flex items-center gap-4">
              <Image
                width={100}
                height={100}
                src={
                  bookAppointmentValue?.doctor?.url_photo ||
                  'https://solumclinic.zedmed-appointments.systems/images/doctor_default.png'
                }
                alt="Doctor"
                className="h-14 w-14 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {bookAppointmentValue.doctor?.first_name}{' '}
                  {bookAppointmentValue.doctor?.last_name}
                </h3>
                <p className="text-sm text-gray-600">
                  {bookAppointmentValue.doctor?.specialist}
                </p>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <Text className="mt-3">
                <strong>Centre:</strong> {bookAppointmentValue.clinic?.name}
              </Text>
              <Text className="mt-3">
                <strong>Your local time (WIT):</strong>
              </Text>
              <Text className="mt-3">
                <strong>Date: </strong>
                {dayjs(bookAppointmentValue.appointmentDate).format(
                  'dddd DD MMMM YYYY'
                )}
              </Text>
              <Text className="mt-3">
                <strong>Time:</strong> {bookAppointmentValue.doctor?.doctorTime}
              </Text>
              <Text className="mt-3">
                <strong>Type:</strong> {bookAppointmentValue.step3}
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
