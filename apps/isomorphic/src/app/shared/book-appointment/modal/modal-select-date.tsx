import { useModal } from '@/app/shared/modal-views/use-modal';
import bookAppointmentAtom from '@/store/book-appointment';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import React from 'react';
import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/esm/shared/types.js';
import { PiCalendar, PiX } from 'react-icons/pi';
import { Text, Title } from 'rizzui';

interface IProps {
  onSelectDate: () => void;
}

const disabledDate = [1, 4, 7];

export default function ModalSelectDate({ onSelectDate }: IProps) {
  const { closeModal } = useModal();
  const [bookAppointmentValue, setBookAppointment] =
    useAtom(bookAppointmentAtom);

  const onChange = (
    value: Value,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setBookAppointment((prev) => ({
      ...prev,
      appointmentDate: value?.toLocaleString(),
    }));
    onSelectDate();
    closeModal();
    9;
  };

  return (
    <div className="p-4">
      <div className="flex w-full items-center justify-end">
        <PiX onClick={closeModal} className="h-10 w-10 cursor-pointer" />
      </div>
      <div className="grid grid-cols-1 gap-6 p-6">
        <Title className="text-lg">Selected Appointment Date:</Title>

        <div className="">
          <Text className="font-semibold text-red-500">Today</Text>
          <div className="flex items-center gap-4">
            <PiCalendar className="h-10 w-10" />
            <Text className="text-2xl">
              {dayjs().format('ddd MMM DD YYYY')}
            </Text>
          </div>
        </div>

        <div className="font-semibold">
          <Text>Select a new appointment date or close to continue</Text>
        </div>

        <div className="">
          <Calendar
            minDate={new Date()}
            value={bookAppointmentValue.appointmentDate}
            onChange={onChange}
            prev2Label={false}
            next2Label={false}
            tileDisabled={({ date, view }) => {
              if (['year', 'decade', 'century'].includes(view)) {
                return false;
              }
              return disabledDate.includes(date.getDate());
            }}
            className="!w-full !border-0 !bg-transparent px-4 pb-4 pt-2.5 !font-inter !text-base md:px-5 md:pb-5"
          />
        </div>
      </div>
    </div>
  );
}
