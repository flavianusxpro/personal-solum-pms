'use client';

import React, { useState } from 'react';
import { Stepper } from 'rizzui';
import DoctorTime from './doctor-time';
import ConfirmBooking from './confirm-booking/confirm-booking';
import { useAtom } from 'jotai';
import bookAppointmentAtom from '@/store/book-appointment';
import StandartConsult from './standart-consult';
import dayjs from 'dayjs';
import PatientHeader from '../../../layouts/patient/patient-header';
import SelectClinicDate from './select-clinic-date';

const BookAppointment = () => {
  const [bookAppointmentValue] = useAtom(bookAppointmentAtom);

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const onPrevStep = () => {
    if (currentStep === 0) return;
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="flex w-full flex-col items-center bg-white">
      <PatientHeader />
      <Stepper
        currentIndex={currentStep}
        className="mt-4 w-full max-w-6xl flex-wrap p-4"
      >
        <Stepper.Step
          size="lg"
          title={
            bookAppointmentValue.clinic
              ? bookAppointmentValue.clinic.name
              : 'Select Location'
          }
          description={
            bookAppointmentValue.clinic
              ? bookAppointmentValue.clinic.address
              : ''
          }
          className="basis-min-content cursor-pointer"
          status={bookAppointmentValue.clinic?.name ? '' : 'incomplete'}
          onClick={() => setCurrentStep(1)}
        />

        <Stepper.Step
          title={
            bookAppointmentValue.clinic
              ? 'Standard Consult'
              : 'Standard Consult'
          }
          description="Type of Consult"
          className="basis-min-content cursor-pointer"
          onClick={() => setCurrentStep(1)}
        />

        <Stepper.Step
          title={
            bookAppointmentValue.appointmentDate
              ? dayjs(bookAppointmentValue.appointmentDate).format(
                  'MMM DD, YYYY'
                )
              : 'Select Date'
          }
          description="Date of appointment"
          className="basis-min-content cursor-pointer"
          onClick={() => setCurrentStep(1)}
        />

        <Stepper.Step
          title={
            bookAppointmentValue.doctor?.first_name
              ? `${bookAppointmentValue.doctor?.first_name} ${bookAppointmentValue.doctor?.last_name} & ${bookAppointmentValue.doctor?.doctorTime}`
              : 'Doctor & Time'
          }
          className="basis-min-content cursor-pointer"
        />
        <Stepper.Step
          title={'Confirm My Booking'}
          className="basis-min-content cursor-pointer"
        />
      </Stepper>
      <div className="flex w-full justify-center bg-white">
        {currentStep == 0 ? (
          <SelectClinicDate
            currentStep={currentStep}
            onPrevStep={onPrevStep}
            nextStep={nextStep}
          />
        ) : currentStep == 1 ? (
          <StandartConsult onPrevStep={onPrevStep} onNextStep={nextStep} />
        ) : currentStep == 2 ? (
          <SelectClinicDate
            currentStep={currentStep}
            onPrevStep={onPrevStep}
            nextStep={nextStep}
          />
        ) : currentStep == 3 ? (
          <DoctorTime onPrevStep={onPrevStep} onNextStep={nextStep} />
        ) : currentStep == 4 ? (
          <ConfirmBooking onPrevStep={onPrevStep} />
        ) : null}
      </div>
    </div>
  );
};

export default BookAppointment;
