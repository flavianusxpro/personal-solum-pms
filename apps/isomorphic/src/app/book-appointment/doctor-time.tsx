import React, { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import ModalBookConfirmation from './book-confirmation';
import { useAtom } from 'jotai';
import bookAppointmentAtom from '@/store/book-appointment';
import Image from 'next/image';
import { Select, Text } from 'rizzui';
import { useModal } from '../shared/modal-views/use-modal';
import ModalDoctorDetails from './modal/modal-doctor-detail';
import CSelect from '../shared/ui/select';
import ModalCentreDetails from './modal/modal-centre-details';
import { clinics } from './page';

const doctors = [
  {
    id: 1,
    name: 'Dr Hermanus Bosman',
    clinic: 'Solum Clinic',
    image:
      'https://solumclinic.zedmed-appointments.systems/images/doctor_default.png',
    times: [
      '5:15am',
      '5:30am',
      '6:00am',
      '6:15am',
      '6:30am',
      '6:45am',
      '7:00am',
      '7:15am',
      '7:30am',
      '7:45am',
      '8:00am',
      '8:15am',
      '8:30am',
      '8:45am',
      '9:00am',
      '9:15am',
      '9:30am',
      '9:45am',
      '10:00am',
      '10:15am',
      '10:30am',
      '10:45am',
    ],
  },
  {
    id: 2,
    name: 'Dr Geoffrey Cutter',
    clinic: 'Solum Clinic',
    image:
      'https://solumclinic.zedmed-appointments.systems/images/doctor_default.png',
    nextAvailable: 'Please contact centre',
    times: [
      '5:15am',
      '5:30am',
      '6:00am',
      '6:15am',
      '6:30am',
      '6:45am',
      '7:00am',
      '7:15am',
      '7:30am',
      '7:45am',
      '8:00am',
      '8:15am',
      '8:30am',
      '8:45am',
      '9:00am',
      '9:15am',
      '9:30am',
      '9:45am',
      '10:00am',
      '10:15am',
      '10:30am',
      '10:45am',
    ],
  },
  {
    id: 3,
    name: 'Dr Sathya Gandhidasan',
    clinic: 'Solum Clinic',
    image:
      'https://solumclinic.zedmed-appointments.systems/images/doctor_default.png',
    nextAvailable: 'Please contact centre',
  },
];

const timeZoneOptions = [
  {
    value: 'practice-time-sydney',
    label: 'Showing Practice Time - Sydney',
  },
  {
    value: 'local-time-jakarta',
    label: 'Showing Local Time - Jakarta',
  },
];

const DoctorTime = ({
  onNextStep,
}: {
  onNextStep: (hideStep: boolean) => void;
}) => {
  const { openModal } = useModal();
  const [bookAppointmentValue, setBookAppointment] =
    useAtom(bookAppointmentAtom);
  const [currentOpen, setCurrentOpen] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [timeZone, setTimeZone] = useState(timeZoneOptions[0].value);

  const nextStep = (hideStep: boolean) => {
    setModalOpen(false);
    onNextStep(hideStep);
  };

  const openDoctorDetailsModal = (doctor: (typeof doctors)[number]) => {
    setBookAppointment((p) => ({
      ...p,
      doctor,
    }));
    openModal({
      view: <ModalDoctorDetails />,
    });
  };

  const openCentreDetailsModal = () => {
    return openModal({
      view: <ModalCentreDetails dataCentre={clinics[0]} />,
    });
  };

  return (
    <div className="min-w-full">
      {/* Timezone Notification */}
      <div className="mt-6 flex justify-center text-center">
        <CSelect
          options={timeZoneOptions}
          value={timeZone}
          className="w-1/5 rounded-md bg-green-600"
          selectClassName="text-white "
          onChange={(e: string) => setTimeZone(e)}
        />
      </div>

      {/* Doctor List */}
      <div className="mx-auto mt-8 max-w-4xl divide-y divide-gray-200">
        {doctors.map((doctor, index: number) => (
          <div key={index} className="mb-5">
            {/* Doctor Header */}
            <div className="flex items-center justify-between space-x-4 p-6">
              <div className="flex items-center space-x-4">
                {doctor.image ? (
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-12 w-12 rounded-full"
                    height={48}
                    width={48}
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300">
                    🏥
                  </div>
                )}
                <div>
                  <h3
                    onClick={() => openDoctorDetailsModal(doctor)}
                    className="cursor-pointer text-lg font-bold hover:underline"
                  >
                    {doctor.name}
                  </h3>

                  <p
                    onClick={openCentreDetailsModal}
                    className="cursor-pointer text-left text-sm text-gray-500 hover:underline"
                  >
                    {doctor.clinic}
                  </p>
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() =>
                  setCurrentOpen((prev) =>
                    prev === doctor.id ? null : doctor.id
                  )
                }
              >
                <div className="flex items-center gap-2">
                  {currentOpen === doctor.id ? (
                    <>
                      <Text>Hide Appointment</Text> <BiChevronUp size={30} />
                    </>
                  ) : (
                    <>
                      <Text>See All Appointment</Text>
                      <BiChevronDown size={30} />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Doctor Times */}

            <div className="px-4 pb-4">
              {doctor.times && doctor.times.length > 0 ? (
                <div
                  className={`mt-4 grid transition-all delay-200 duration-1000 ease-in-out ${
                    currentOpen === doctor.id
                      ? 'max-h-[500px]' // a large enough value to accommodate all items (or adjust based on the number of items)
                      : 'max-h-16' // collapse the height
                  } grid-cols-10 gap-2 overflow-hidden`}
                >
                  {doctor.times.map((time: string, idx: number) => (
                    <button
                      key={idx}
                      className={`rounded-md ${currentOpen !== doctor.id && idx >= 10 ? 'opacity-50' : 'opacity-100'} bg-green-200/50 px-3 py-2 text-sm hover:bg-green-300`}
                      onClick={() => {
                        setBookAppointment((p) => ({
                          ...p,
                          doctorName: doctor.name,
                          doctorTime: time,
                        }));
                        setModalOpen(true);
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-2 w-full bg-gray-50 p-4 text-left text-sm text-gray-500">
                  <span className="rounded-md px-2 py-1 text-green-700">
                    Next available:{' '}
                    <span className="text-black">{doctor.nextAvailable}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Confirmation */}
      <ModalBookConfirmation
        size="xl"
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNextStep={nextStep}
      />
    </div>
  );
};

export default DoctorTime;
