import { useGetAllClinicsForPatient } from '@/hooks/useClinic';
import bookAppointmentAtom from '@/store/book-appointment';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { Button, Flex, Loader, Text, Title } from 'rizzui';
import { useModal } from '../modal-views/use-modal';
import ModalSelectDate from './modal/modal-select-date';
import ModalCentreDetails from './modal/modal-centre-details';
import dayjs from 'dayjs';
import StepBackButton from './step-back-button';

interface IProps {
  nextStep: () => void;
  onPrevStep: () => void;
}

export default function SelectClinicDate({ nextStep, onPrevStep }: IProps) {
  const { openModal } = useModal();

  const [bookAppointmentValue, setBookAppointment] =
    useAtom(bookAppointmentAtom);
  const [showClinicOptions, setShowClinicOptions] = useState(false);

  const { data: dataClinics, isLoading: isLoadingClinics } =
    useGetAllClinicsForPatient({
      page: 1,
      perPage: 10,
    });

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
    <aside className="relative p-6 sm:w-1/3">
      <Flex justify="center">
        <StepBackButton backButton={onPrevStep} />
      </Flex>
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
  );
}
