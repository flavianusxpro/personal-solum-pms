import React, { useRef, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { Accordion } from 'rizzui';
import ModalBookConfirmation from './book-confirmation';

const doctors: any = [
  {
    id: 1,
    open: true,
    name: "Dr Hermanus Bosman",
    clinic: "Solum Clinic",
    image: 'https://solumclinic.zedmed-appointments.systems/images/doctor_default.png',
    times: [
      "5:15am", "5:30am", "6:00am", "6:15am", "6:30am", "6:45am",
      "7:00am", "7:15am", "7:30am", "7:45am", "8:00am", "8:15am",
      "8:30am", "8:45am", "9:00am", "9:15am", "9:30am", "9:45am",
      "10:00am", "10:15am", "10:30am", "10:45am"
    ]
  },
  {
    id: 2,
    open: false,
    name: "Dr Geoffrey Cutter",
    clinic: "Solum Clinic",
    image: 'https://solumclinic.zedmed-appointments.systems/images/doctor_default.png',
    nextAvailable: "Please contact centre",
  },
  {
    id: 3,
    open: false,
    name: "Dr Sathya Gandhidasan",
    clinic: "Solum Clinic",
    image: 'https://solumclinic.zedmed-appointments.systems/images/doctor_default.png',
    nextAvailable: "Please contact centre",
  }
];

const DoctorTime = ({ onNextStep }: { onNextStep: (hideStep: boolean) => void }) => {
  const [currentOpen, setCurrentOpen] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const nextStep = (hideStep: boolean) => {
    setModalOpen(false)
    onNextStep(hideStep)
  }

  return (
    <div className="min-w-full">

      {/* Timezone Notification */}
      <div className="text-center mt-6">
        {/* <p className="font-semibold text-lg">Your current time zone is different to the practice.</p> */}
        <button className="bg-green-700 text-white px-4 py-2 mt-2 rounded-lg">
          Showing Local time - Melbourne ▼
        </button>
      </div>

      {/* Doctor List */}
      <div className="max-w-4xl mx-auto mt-8">
        {doctors.map((doctor: any, index: number) => (
          <Accordion key={index} defaultOpen={true} className='mb-5'>
            <Accordion.Header className="bg-gray-50 p-6">
              {({ open }) => (
                <>
                  <div className="flex items-center space-x-4 justify-between" onClick={() => setCurrentOpen(prev => prev == doctor.id ? null : doctor.id)}>
                    <div className="flex items-center space-x-4">
                      {doctor.image ? (
                        <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-full" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                          🏥
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold">{doctor.name}</h3>
                        <p className="text-sm text-gray-500 text-left">{doctor.clinic}</p>
                      </div>
                    </div>
                    <div>
                      {currentOpen == doctor.id ? (
                        <BiChevronUp size={30} />
                      ) : (
                        <BiChevronDown size={30} />
                      )}
                    </div>
                  </div>
                  {!doctor?.times?.length ? (
                    <p className="mt-2 text-sm text-gray-500 p-4 text-left">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
                        Next available: {doctor.nextAvailable}
                      </span>
                    </p>
                  ) : null}
                </>
              )}
            </Accordion.Header>
            <Accordion.Body title={doctor.name} className="border-b">
              <div className="p-4 bg-gray-50 rounded-lg">

                {doctor?.times?.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {doctor?.times?.map((time: string, idx: number) => (
                      <button
                        key={idx}
                        className="px-3 py-2 text-sm border rounded-lg bg-white hover:bg-green-100"
                        onClick={() => setModalOpen(true)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </Accordion.Body>
          </Accordion>
        ))}
      </div>
      <ModalBookConfirmation size="xl" isOpen={modalOpen} onClose={() => setModalOpen(false)} onNextStep={nextStep} />
    </div>
  )
}

export default DoctorTime;