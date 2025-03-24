'use client';

import React, { useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { Button, Flex, Select, Stepper, Text, Title } from 'rizzui';
import DoctorTime from './doctor-time';
import ConfirmBooking from './confirm-booking';
import ModalSelectDate from './modal/modal-select-date';
import { useAtom } from 'jotai';
import bookAppointmentAtom from '@/store/book-appointment';
import ModalCentreDetails from './modal/modal-centre-details';
import StandartConsult from './standart-consult';
import { useModal } from '../modal-views/use-modal';
import dayjs from 'dayjs';

export interface IClinics {
  id: number;
  name: string;
  lat: number;
  lng: number;
  address: string;
  suburb: string;
  image: string;
}

export const clinics: IClinics[] = [
  {
    id: 1,
    name: 'Solum Clinic',
    lat: -37.8136,
    lng: 144.9631,
    address: 'Po Box 676',
    suburb: 'Gladesville',
    image:
      'https://solumclinic.zedmed-appointments.systems/images/doctor_default.png',
  },
  {
    id: 2,
    name: 'Dummy Clinic 1',
    lat: -37.8141,
    lng: 144.9654,
    address: '123 Main St',
    suburb: 'Gladesville',
    image:
      'https://solumclinic.zedmed-appointments.systems/images/doctor_default.png',
  },
  {
    id: 3,
    name: 'Dummy Clinic 2',
    lat: -37.8156,
    lng: 144.9677,
    address: '456 Other St',
    suburb: 'Gladesville',
    image:
      'https://solumclinic.zedmed-appointments.systems/images/doctor_default.png',
  },
  {
    id: 4,
    name: 'Dummy Clinic 3',
    lat: -37.8161,
    lng: 144.9694,
    address: '789 Another St',
    suburb: 'Gladesville',
    image:
      'https://solumclinic.zedmed-appointments.systems/images/doctor_default.png',
  },
];

const BookAppointment = () => {
  const { openModal } = useModal();
  const [bookAppointmentValue, setBookAppointment] =
    useAtom(bookAppointmentAtom);

  const [selectedClinic, setSelectedClinic] = useState<IClinics | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showClinicOptions, setShowClinicOptions] = useState(false);

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
      view: <ModalCentreDetails dataCentre={selectedClinic} />,
    });
  };

  return (
    <div className="flex w-full flex-col items-center bg-white">
      <header className="w-full bg-gradient-to-r from-orange-400 to-orange-600 p-14 text-center text-white">
        <h1 className="text-3xl font-bold">Solum</h1>
        <p className="text-lg font-semibold">
          Find your nearest Solum Clinic Centre
        </p>
      </header>
      <Stepper
        currentIndex={currentStep}
        className="mt-4 w-full max-w-6xl flex-wrap p-4"
      >
        <Stepper.Step
          size="lg"
          title={selectedClinic ? selectedClinic.name : 'Select Location'}
          description={selectedClinic ? selectedClinic.address : ''}
          className="basis-min-content cursor-pointer"
          status={selectedClinic?.name ? '' : 'incomplete'}
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
          title={selectedClinic ? 'Standard Consult' : 'Select Location'}
          description="Type of Consult"
          className="basis-min-content cursor-pointer"
          onClick={() => setCurrentStep(1)}
        />
        <Stepper.Step
          title={selectedClinic ? 'Doctor & Time' : 'Doctor & Time'}
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
                    {selectedClinic?.name ?? 'Select Clinic'}
                  </span>
                </div>
              </div>
              <BiChevronRight size={30} />
            </div>
            {showClinicOptions && (
              <div className="absolute mt-2 w-5/6 rounded-lg border bg-white">
                {clinics.map((clinic, idx) => (
                  <div
                    key={clinic.id}
                    onClick={() => {
                      setBookAppointment((p) => ({
                        ...p,
                        clinic,
                      }));
                      setSelectedClinic(clinics[idx]);
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
            {selectedClinic ? (
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div className="">
                  <Title as="h3">{selectedClinic.name}</Title>
                  <Text fontWeight="medium">{selectedClinic?.address}</Text>
                  <Text fontWeight="medium">{selectedClinic?.suburb}</Text>
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
                  onClick={() => nextStep()}
                >
                  Next Available: March 20th 5.15 am
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
        {/* <GoogleMap
            zoom={15}
            center={{ lat: selectedClinic.lat, lng: selectedClinic.lng }}
            mapContainerClassName="w-full h-full"
          >
            <Marker position={{ lat: selectedClinic.lat, lng: selectedClinic.lng }} />
          </GoogleMap> */}
      </div>
    </div>
  );
};

export default BookAppointment;
