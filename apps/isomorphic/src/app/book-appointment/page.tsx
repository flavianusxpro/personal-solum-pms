'use client'

import React, { useState } from 'react'
import { BiChevronRight } from 'react-icons/bi';
import { Button, Stepper, Text, Title } from 'rizzui';
import ModalBookAppointment from './book-appointment';
import DoctorTime from './doctor-time';
import ConfirmBooking from './confirm-booking';

const clinics = [
  { id: 1, name: "Solum Clinic", lat: -37.8136, lng: 144.9631, address: 'Po Box 676', suburb: 'Gladesville' },
];

const BookAppointment = () => {
  const [selectedClinic, setSelectedClinic] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [hideStep, setHideStep] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const nextStep = (hideStep = false) => {
    console.log(hideStep)
    setModalOpen(false)
    setCurrentStep(prev => prev + 1)
    setHideStep(hideStep)
  }
  // const { isLoaded } = useLoadScript({ googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" });

  // if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="w-full flex flex-col items-center bg-white">
      <header className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white p-14 text-center">
        <h1 className="text-3xl font-bold">Solum</h1>
        <p className="text-lg font-semibold">Find your nearest Solum Clinic Centre</p>
      </header>
      {!hideStep ? (
        <Stepper currentIndex={currentStep} className="mt-4 p-4 flex-wrap">
          <Stepper.Step size="lg" title={selectedClinic ? selectedClinic.name : 'Select Location'} description="Click to change location" className="cursor-pointer basis-min-content" status={currentStep >= 1 ? 'complete' : 'in-progress'} onClick={() => setCurrentStep(1)} />
          <Stepper.Step size="lg" title={selectedClinic ? 'March 20th 5.15 am' : 'Select Date'} description="Click to change date" className="cursor-pointer basis-min-content" status={currentStep >= 2 ? 'complete' : 'waiting'} onClick={() => setCurrentStep(1)} />
          <Stepper.Step size="lg" title={selectedClinic ? 'Standard Consult' : 'Select Location'} description="Click to change type" className="cursor-pointer basis-min-content" status={currentStep >= 2 ? 'complete' : 'waiting'} onClick={() => setCurrentStep(1)} />
          <Stepper.Step size="lg" title={selectedClinic ? 'Doctor & Time' : 'Doctor & Time'} className="cursor-pointer basis-min-content" status={currentStep >= 2 ? 'complete' : 'waiting'} />
        </Stepper>
      ) : null}
      <div className="w-full bg-white">
        {currentStep == 1 ? (
          <aside className="sm:w-1/3 p-6">
            <h2 className="text-xl font-semibold text-green-700">Solum Clinic Centres</h2>
            {selectedClinic ? (
              <div className="w-full mt-4">
                <Title as="h3">{selectedClinic.name}</Title>
                <Text fontWeight="medium">{selectedClinic?.address}</Text>
                <Text fontWeight="medium">{selectedClinic?.suburb}</Text>
                <Button className=" mb-3 text-green-700 border-green-700" variant="outline">Centre Details</Button>
                <hr />
                <Button className=" mt-3 text-green-700 border-green-700" variant="outline">Select a Date</Button>
                <Button className="mt-3 bg-green-700 border-green-700 block font-bold" variant="solid" onClick={() => setModalOpen(true)}>Next Available: March 20th 5.15 am</Button>
              </div>
            ) : null}
            {clinics.map((clinic) => (
              <div
                key={clinic.id}
                onClick={() => setSelectedClinic(clinics[0])}
                className="shadow-md rounded-lg overflow-hidden mt-4 cursor-pointer bg-slate-100 hover:bg-green-200 transition-all flex justify-between items-center"
              >
                <div className="p-3 flex items-center">
                  <div className="text-green-700 mr-2">
                    <span className="font-medium">{clinic.name}</span>
                  </div>
                </div>
                <BiChevronRight size={30} />
              </div>
            ))}
          </aside>
        ) : currentStep == 2 ? (
          <DoctorTime onNextStep={nextStep} />
        ) : currentStep == 3 ? (
          <ConfirmBooking />
        ) : null}
          {/* <GoogleMap
            zoom={15}
            center={{ lat: selectedClinic.lat, lng: selectedClinic.lng }}
            mapContainerClassName="w-full h-full"
          >
            <Marker position={{ lat: selectedClinic.lat, lng: selectedClinic.lng }} />
          </GoogleMap> */}
      </div>
      <ModalBookAppointment isOpen={modalOpen} onClose={() => setModalOpen(false)} onNextStep={nextStep} />
    </div>
  );
}

export default BookAppointment;