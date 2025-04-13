import React, { useMemo, useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import ModalBookConfirmation from './book-confirmation';
import { useAtom } from 'jotai';
import bookAppointmentAtom from '@/store/book-appointment';
import Image from 'next/image';
import { Flex, Loader, Text } from 'rizzui';
import ModalDoctorDetails from './modal/modal-doctor-detail';
import ModalCentreDetails from './modal/modal-centre-details';
import { useModal } from '../modal-views/use-modal';
import CSelect from '../ui/select';
import { useGetDoctorByClinicForPatient } from '@/hooks/useClinic';
import { IParamGetDoctorByClinicForPatient } from '@/types/paramTypes';
import { IGetDoctorByClinicForPatientResponse } from '@/types/ApiResponse';
import StepBackButton from './step-back-button';
import cn from '@core/utils/class-names';

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

const DoctorScheduleList = ({
  onNextStep,
  onPrevStep,
}: {
  onPrevStep: () => void;
  onNextStep: () => void;
}) => {
  const { openModal } = useModal();
  const [bookAppointmentValue, setBookAppointment] =
    useAtom(bookAppointmentAtom);

  const [currentOpen, setCurrentOpen] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [timeZone, setTimeZone] = useState(timeZoneOptions[0].value);
  const [params, setParams] = useState<IParamGetDoctorByClinicForPatient>({
    id: bookAppointmentValue?.clinic?.id.toString() as string,
    page: 1,
    perPage: 10,
  });

  const { data: dataDoctor, isLoading } =
    useGetDoctorByClinicForPatient(params);

  const nextStep = () => {
    setModalOpen(false);
    onNextStep();
  };

  const openDoctorDetailsModal = (
    doctor: IGetDoctorByClinicForPatientResponse['data'][number]
  ) => {
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
      view: <ModalCentreDetails />,
    });
  };

  return (
    <div className="min-w-full">
      {/* Timezone Notification */}
      <div className="mt-6 flex flex-col justify-center gap-4 text-center">
        <Flex justify="center">
          <StepBackButton backButton={onPrevStep} />
        </Flex>
        <CSelect
          options={timeZoneOptions}
          value={timeZone}
          className="mx-auto w-1/2 rounded-md bg-green-600 sm:w-1/5"
          selectClassName="text-white "
          onChange={(e: string) => setTimeZone(e)}
        />
      </div>

      {/* Doctor List */}
      <div className="mx-auto mt-8 max-w-4xl divide-y divide-gray-200">
        {isLoading && <Loader variant="spinner" size="xl" />}
        {dataDoctor?.map((doctor, index: number) => (
          <div key={index} className="mb-5">
            {/* Doctor Header */}
            <div className="flex items-center justify-between space-x-4 p-6">
              <div className="flex items-center space-x-4">
                {doctor.url_photo ? (
                  <Image
                    src={doctor.url_photo}
                    alt={doctor.first_name}
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
                    dr. {doctor.first_name} {doctor.last_name}
                  </h3>

                  <p
                    onClick={openCentreDetailsModal}
                    className="cursor-pointer text-left text-sm text-gray-500 hover:underline"
                  >
                    {bookAppointmentValue.clinic?.name}
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

            <DoctorTime
              currentOpen={currentOpen}
              doctor={doctor}
              setModalOpen={setModalOpen}
            />
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

export default DoctorScheduleList;

function DoctorTime({
  doctor,
  currentOpen,
  setModalOpen,
}: {
  doctor: IGetDoctorByClinicForPatientResponse['data'][number];
  currentOpen: number | null;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [bookAppointmentValue, setBookAppointment] =
    useAtom(bookAppointmentAtom);

  const practices_open = doctor.appointment_schedule.practices_open;
  const practices_close = doctor.appointment_schedule.practices_close;

  const [startHours, startMinutes] = practices_open.split(':').map(Number);
  const [endHours, endMinutes] = practices_close.split(':').map(Number);

  const appointmentType = useMemo(
    () => bookAppointmentValue?.step3?.includes('Follow up'),
    [bookAppointmentValue?.step3]
  );

  const interval = useMemo(
    () =>
      appointmentType
        ? doctor.appointment_duration.followup
        : doctor.appointment_duration.initial,
    [appointmentType, doctor.appointment_duration]
  );

  const bookedTimes: string[] = useMemo(() => {
    return (
      doctor.booked_times.find(
        (item) => item.date === bookAppointmentValue.appointmentDate
      )?.booked_times ?? []
    );
  }, [bookAppointmentValue.appointmentDate, doctor.booked_times]);

  const timeList = useMemo(() => {
    const times: string[] = [];
    const start = new Date();
    start.setHours(startHours, startMinutes, 0, 0);

    const end = new Date();
    end.setHours(endHours, endMinutes, 0, 0);

    while (start <= end) {
      const timeString = start.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });

      if (!bookedTimes.includes(timeString.split(' ')[0])) {
        times.push(timeString);
      }

      start.setMinutes(start.getMinutes() + interval);
    }

    return times;
  }, [startHours, startMinutes, endHours, endMinutes, bookedTimes, interval]);

  return (
    <div className="px-4 pb-4">
      {doctor.appointment_schedule ? (
        <div className="relative">
          <div
            className={`mt-4 grid transition-all delay-200 duration-1000 ease-in-out ${
              currentOpen === doctor.id ? 'max-h-[500px]' : 'max-h-20'
            } grid-cols-5 gap-2 overflow-hidden`}
          >
            {timeList.map((time, idx) => (
              <button
                key={idx}
                className="rounded-md bg-green-200/50 px-3 py-2 text-sm hover:bg-green-300"
                onClick={() => {
                  setBookAppointment((p) => ({
                    ...p,
                    doctor: { ...doctor, doctorTime: time },
                  }));
                  setModalOpen(true);
                }}
              >
                {time}
              </button>
            ))}
            <div
              className={cn(
                'absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-white to-white/50 transition-opacity duration-1000 ease-in-out',
                currentOpen !== doctor.id
                  ? 'opacity-100'
                  : 'pointer-events-none opacity-0'
              )}
            ></div>
          </div>
        </div>
      ) : (
        <div className="mt-2 w-full bg-gray-50 p-4 text-left text-sm text-gray-500">
          <span className="rounded-md px-2 py-1 text-green-700">
            Next available:{' '}
            <span className="text-black">Please contact centre</span>
          </span>
        </div>
      )}
    </div>
  );
}
