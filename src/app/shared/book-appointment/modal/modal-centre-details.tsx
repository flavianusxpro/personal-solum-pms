import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react';
import { PiX } from 'react-icons/pi';
import { Flex, Text, Title } from 'rizzui';
import Image from 'next/image';
import { useGetClinicByIdForPatient } from '@/hooks/useClinic';
import { useAtom } from 'jotai';
import bookAppointmentAtom from '@/store/book-appointment';

interface IProps {}

export default function ModalCentreDetails() {
  const [bookAppointmentValue, setBookAppointment] =
    useAtom(bookAppointmentAtom);
  const { closeModal } = useModal();
  const { data: dataClinic } = useGetClinicByIdForPatient(
    bookAppointmentValue.clinic?.id.toString() as string
  );

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
            src={dataClinic?.logo || '/solum.jpeg'}
            width={100}
            height={100}
            alt={dataClinic?.name || 'image'}
            className="rounded-full object-cover shadow-sm"
          />
        </div>
        <div className="text-center">
          <Text className="text-lg font-semibold">{dataClinic?.name}</Text>
        </div>

        <Title className="text-lg">Centre Details</Title>

        <div className="">
          <Text className="font-semibold">{dataClinic?.address}</Text>
        </div>

        <div className="">
          <Text className="font-bold">Contact Number</Text>
          <Text className="font-semibold">{dataClinic?.mobile_number}</Text>
        </div>

        <div className="">
          <Text className="font-bold">Opening Hours</Text>
          <div className="flex flex-col gap-1">
            {/* {openHours.map((item, index) => (
              <Flex key={index} justify="between">
                <Text className="font-semibold">{item.day}:</Text>
                <Text className="font-semibold">{item.hours}</Text>
              </Flex>
              ))} */}
            <Flex justify="between">
              <Text className="font-semibold">-:</Text>
              <Text className="font-semibold">-</Text>
            </Flex>
          </div>
        </div>

        <div className="">
          <Text className="font-bold">Fee Information</Text>
          <Text className="font-semibold">-</Text>
        </div>

        <div className="">
          <Text className="font-semibold">
            Initial Consult: - Follow up appt: - Script renewal: -
          </Text>
        </div>

        <div className="">
          <Text className="font-bold">In case of emergency call 000</Text>
        </div>
      </div>
    </div>
  );
}
