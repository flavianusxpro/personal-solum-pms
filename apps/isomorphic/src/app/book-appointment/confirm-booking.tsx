import { gender, patientTitle } from "@/config/constants";
import React, { useState } from "react";
import { Button, Input, Select, Text } from "rizzui";
import AdditionalInformation from "./additional-information";

const STEP = {
  REGISTER: 1,
  LOGIN: 2,
  FILL_DATA: 3,
}

const ConfirmBooking = () => {
  const [currentStep, setCurrentStep] = useState(STEP.REGISTER)

  const submitButton = () => {
    if (currentStep == STEP.FILL_DATA) {
    }
    setCurrentStep(STEP.FILL_DATA)
  }
  return (
    <div className="min-h-full min-w-full flex flex-col items-center">

      <div className="max-w-6xl w-full mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold my-4 text-center">Confirm My Booking</h2>
        <div className="sm:flex">
          {/* Left: Booking Form */}
          {currentStep == STEP.REGISTER ? (
            <div className="w-2/3 p-6 border-r">
              <h3 className="text-lg font-semibold">Complete Your Booking</h3>
              <p className="text-sm text-gray-500">Booked with us before? <a href="#" className="text-blue-600" onClick={() => setCurrentStep(STEP.LOGIN)}>Log in</a></p>
              <div className="mt-4 space-y-4">
                <Input
                  label="First Name"
                  placeholder="First Name"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                />
                <Input
                  label="Last Name"
                  placeholder="Last Name"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                />
                <Input
                  label="Email Address"
                  placeholder="Email Address"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                />
                <Button className="bg-green-600 text-white w-full mt-4" onClick={() => setCurrentStep(STEP.FILL_DATA)}>
                  Next
                </Button>
              </div>
            </div>
          ) : currentStep == STEP.LOGIN ? (
            <div className="w-2/3 p-6 border-r">
              <h3 className="text-lg font-semibold">Complete Your Booking</h3>
              <p className="text-sm text-gray-500">Don’t have an account? <a href="#" className="text-blue-600" onClick={() => setCurrentStep(STEP.REGISTER)}>Register</a></p>
              <div className="mt-4 space-y-4">
                <Input
                  label="Email Address"
                  placeholder="Email Address"
                // {...register('roleName')}
                // error={errors.roleName?.message}
                />
                <Input
                  label="Password"
                  placeholder="Password"
                // {...register('roleName')}
                // error={errors.roleName?.message}
                />
                <Button className="bg-green-600 text-white w-full mt-4" onClick={() => setCurrentStep(STEP.FILL_DATA)}>
                  Next
                </Button>
              </div>
            </div>
          ) : currentStep == STEP.FILL_DATA ? (
            <div className="w-2/3 p-6 border-r">
              <h3 className="text-lg font-semibold">Add Patient Information</h3>
              <p className="text-sm text-gray-500">
                Fill in the details of the patient who is attending this appointment.
              </p>
              <div className="mt-4 space-y-4">
                <div className="grid md:grid-cols-2 md:gap-6">
                  <Select
                    label="Title"
                    placeholder="Title"
                    className="relative z-0 w-full group"
                    options={patientTitle}
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                  <Select
                    label="Gender"
                    placeholder="Gender"
                    className="relative z-0 w-full group"
                    options={gender}
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <Input
                    label="First Name"
                    placeholder="First Name"
                    className="relative z-0 w-full group"
                    aria-required={true}
                        // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Last Name"
                    className="relative z-0 w-full group"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <Input
                    label="Email Address"
                    placeholder="Email Address"
                    className="relative z-0 w-full group"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                  <Input
                    label="Mobile Phone"
                    placeholder="Mobile Phone"
                    className="relative z-0 w-full group"
                    type="number"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <Input
                    label="Date of Birth"
                    placeholder="Date of Birth"
                    className="relative z-0 w-full group"
                    type="date"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                  <Input
                    label="State"
                    placeholder="State"
                    className="relative z-0 w-full group"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <Input
                    label="Suburb"
                    placeholder="Suburb"
                    className="relative z-0 w-full group"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                  <Input
                    label="Postcode"
                    placeholder="Postcode"
                    className="relative z-0 w-full group"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <Input
                    label="Address Line 1"
                    placeholder="Address Line 1"
                    className="relative z-0 w-full group"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                  <Input
                    label="Address Line 2"
                    placeholder="Address Line 2"
                    className="relative z-0 w-full group"
                  // {...register('roleName')}
                  // error={errors.roleName?.message}
                  />
                </div>
              </div>

              <AdditionalInformation />

              <Button className="bg-green-600 text-white w-full mt-4" onClick={submitButton}>
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
                className="w-14 h-14 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">Dr Hermanus Bosman</h3>
                <p className="text-sm text-gray-600">MBChB</p>
              </div>
            </div>
            <div className="mt-4 text-sm">
              <Text className="mt-3"><strong>Centre:</strong> Solum Clinic</Text>
              <Text className="mt-3"><strong>Your local time (WIT):</strong></Text>
              <Text className="mt-3"><strong>Date:</strong> Wednesday 12 March 2025</Text>
              <Text className="mt-3"><strong>Time:</strong> 6:45 am</Text>
              <Text className="mt-3"><strong>Type:</strong> Medical certificate</Text>
            </div>
            <Button className="block bg-red-600 text-white w-full mt-4" onClick={() => {
              window.location.href = '/book-appointment'
            }}>Cancel Appointment</Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
