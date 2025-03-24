import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react';
import { PiX } from 'react-icons/pi';
import { Flex, Text, Title } from 'rizzui';
import { clinics } from '..';
import Image from 'next/image';

interface IProps {
  dataCentre: (typeof clinics)[number] | null;
}

const openHours = [
  {
    day: 'Monday',
    hours: '9:00am - 5:00pm',
  },
  {
    day: 'Tuesday',
    hours: '9:00am - 5:00pm',
  },
  {
    day: 'Wednesday',
    hours: '9:00am - 5:00pm',
  },
  {
    day: 'Thursday',
    hours: '9:00am - 5:00pm',
  },
  {
    day: 'Friday',
    hours: '9:00am - 5:00pm',
  },
  {
    day: 'Saturday',
    hours: 'Closed',
  },
  {
    day: 'Sunday',
    hours: 'Closed',
  },
];

export default function ModalCentreDetails({ dataCentre }: IProps) {
  const { closeModal } = useModal();

  return (
    <div className="p-4">
      <div className="flex w-full items-center justify-end">
        <PiX
          onClick={closeModal}
          className="h-10 w-10 cursor-pointer text-red-500"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 p-4">
        <div className="grid-cols-full flex items-center justify-center">
          <Image
            src={dataCentre?.image || '/solum.jpeg'}
            width={100}
            height={100}
            alt={dataCentre?.name || 'image'}
            className="rounded-full object-cover shadow-sm"
          />
        </div>
        <div className="text-center">
          <Text className="text-lg font-semibold">{dataCentre?.name}</Text>
        </div>

        <Title className="text-lg">Centre Details</Title>

        <div className="">
          <Text className="font-semibold">{dataCentre?.address}</Text>
          <Text className="font-semibold">{dataCentre?.suburb}</Text>
        </div>

        <div className="">
          <Text className="font-bold">Contact Number</Text>
          <Text className="font-semibold">02 8260 7550</Text>
        </div>

        <div className="">
          <Text className="font-bold">Opening Hours</Text>
          <div className="flex flex-col gap-1">
            {openHours.map((item, index) => (
              <Flex key={index} justify="between">
                <Text className="font-semibold">{item.day}:</Text>
                <Text className="font-semibold">{item.hours}</Text>
              </Flex>
            ))}
          </div>
        </div>

        <div className="">
          <Text className="font-bold">Fee Information</Text>
          <Text className="font-semibold">
            Private fees - paid at time of appointment
          </Text>
        </div>

        <div className="">
          <Text className="font-semibold">
            Initial Consult: $75 Follow up appt: $50 Script renewal: $30
          </Text>
        </div>

        <div className="">
          <Text className="font-bold">In case of emergency call 000</Text>
        </div>
      </div>
    </div>
  );
}
