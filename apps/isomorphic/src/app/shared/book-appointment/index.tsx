'use client';

import React, { useState } from 'react';
import { BiChevronRight, BiMenu } from 'react-icons/bi';
import {
  ActionIcon,
  Button,
  Drawer,
  Flex,
  Loader,
  Stepper,
  Text,
  Title,
} from 'rizzui';
import DoctorTime from './doctor-time';
import ConfirmBooking from './confirm-booking/confirm-booking';
import ModalSelectDate from './modal/modal-select-date';
import { useAtom } from 'jotai';
import bookAppointmentAtom from '@/store/book-appointment';
import ModalCentreDetails from './modal/modal-centre-details';
import StandartConsult from './standart-consult';
import { useModal } from '../modal-views/use-modal';
import dayjs from 'dayjs';
import { useGetAllClinicsForPatient } from '@/hooks/useClinic';
import PatientHeader from '../../../layouts/patient/patient-header';
import patientDrawerAtom from '@/store/drawer';

const BookAppointment = () => {
  const { openModal } = useModal();
  const [bookAppointmentValue, setBookAppointment] =
    useAtom(bookAppointmentAtom);

  const [currentStep, setCurrentStep] = useState(1);
  const [showClinicOptions, setShowClinicOptions] = useState(false);

  const { data: dataClinics, isLoading: isLoadingClinics } =
    useGetAllClinicsForPatient({
      page: 1,
      perPage: 10,
    });

  const nextStep = (hideStep = false) => {
    setCurrentStep((prev) => prev + 1);
  };

  const onPrevStep = () => {
    if (currentStep === 1) return;
    setCurrentStep((prev) => prev - 1);
  };
  // const { isLoaded } = useLoadScript({ googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" });

  // if (!isLoaded) return <p>Loading...</p>;

  const openSelectDateModal = () => {
    return openModal({
      view: <ModalSelectDate onSelectDate={() => nextStep()} />,
    });
  };

  const openCentreDetailsModal = () => {
    return openModal({
      view: <ModalCentreDetails />,
    });
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
        {currentStep == 1 ? (
          <aside className="relative p-6 sm:w-1/3">
            <h2 className="text-xl font-semibold text-green-700">
              Select Clinic Center
            </h2>
            <div
              onClick={() => setShowClinicOptions((p) => !p)}
              className="mt-4 flex cursor-pointer items-center justify-between overflow-hidden rounded-lg bg-slate-100 shadow-md transition-all hover:bg-green-200"
            >
              <div className="flex items-center p-3">
                <div className="mr-2 text-green-700">
                  <span className="font-medium">
                    {bookAppointmentValue.clinic?.name ?? 'Select Clinic'}
                  </span>
                </div>
              </div>
              <BiChevronRight size={30} />
            </div>
            {showClinicOptions && (
              <div className="absolute mt-2 w-5/6 rounded-lg border bg-white">
                {isLoadingClinics && <Loader variant="spinner" size="lg" />}
                {dataClinics?.data.map((clinic, idx) => (
                  <div
                    key={clinic.id}
                    onClick={() => {
                      setBookAppointment((p) => ({
                        ...p,
                        clinic,
                      }));
                      setShowClinicOptions(false);
                    }}
                    className="mt-2 flex cursor-pointer items-center justify-between transition-all hover:bg-green-200"
                  >
                    <div className="flex items-center p-3">
                      <div className="mr-2 text-green-700">
                        <span className="font-medium">{clinic.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {bookAppointmentValue.clinic ? (
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div className="">
                  <Title as="h3">{bookAppointmentValue.clinic.name}</Title>
                  <Text fontWeight="medium">
                    {bookAppointmentValue.clinic?.address}
                  </Text>
                </div>
                <Flex justify="between">
                  <Button
                    onClick={openCentreDetailsModal}
                    className="border-green-700 text-green-700"
                    variant="outline"
                  >
                    Centre Details
                  </Button>
                  <hr />
                  <Button
                    onClick={openSelectDateModal}
                    className="border-green-700 text-green-700"
                    variant="outline"
                  >
                    Select a Date
                  </Button>
                </Flex>

                <Button
                  className="mt-3 block border-green-700 bg-green-700 font-bold"
                  variant="solid"
                  onClick={() => {
                    nextStep();
                    setBookAppointment((p) => ({
                      ...p,
                      appointmentDate: dayjs().format('YYYY-MM-DD'),
                    }));
                  }}
                >
                  Next Available {dayjs().format('MMM DD')}th
                </Button>
              </div>
            ) : null}
          </aside>
        ) : currentStep == 2 ? (
          <StandartConsult onPrevStep={onPrevStep} onNextStep={nextStep} />
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
