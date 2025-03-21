import { useModal } from '@/app/shared/modal-views/use-modal';
import React from 'react';
import { PiX } from 'react-icons/pi';
import { Text, Title } from 'rizzui';
import { useAtom } from 'jotai';
import bookAppointmentAtom from '@/store/book-appointment';
import Image from 'next/image';

export default function ModalDoctorDetails() {
  const { closeModal } = useModal();
  const [bookAppointmentValue, setBookAppointment] =
    useAtom(bookAppointmentAtom);

  return (
    <div className="p-4">
      <div className="flex w-full items-center justify-end">
        <PiX
          onClick={closeModal}
          className="h-10 w-10 cursor-pointer text-red-500"
        />
      </div>
      <div className="grid grid-cols-1 gap-6 p-4">
        <div className="">
          <Image
            src={bookAppointmentValue?.doctor?.image}
            width={100}
            height={100}
            alt={bookAppointmentValue?.doctor?.name}
            className="rounded-full object-cover"
          />
          <Text className="text-lg font-semibold">
            {bookAppointmentValue?.doctor?.name}
          </Text>
        </div>

        <div className="">
          <Title className="text-lg">Practitioner Details</Title>
          <Text className="font-semibold">Male</Text>
          <Text className="font-semibold">MBChB</Text>
        </div>

        <div className="">
          <Text className="font-bold">Medical Interests</Text>
          <Text className="font-semibold">
            Palliative care, Chronic pain management
          </Text>
        </div>

        <div className="">
          <Text className="font-bold">Languages Spoken </Text>
          <Text className="font-semibold">English, Afrikaans</Text>
        </div>

        <div className="">
          <Text className="font-bold">
            Available at the following locations
          </Text>
          <Text className="font-semibold">Solum Clinic</Text>
        </div>

        <div className="">
          <Text className="font-bold">General Information</Text>
          <Text className="font-semibold">
            Fluent in English and Afrikaans With over 10 years of experience in
            Emergency and Cardiac wards across Australia, he has developed a
            robust clinical background. For the past 6 years, he has served as
            an authorised prescriber in Alternative Medicine, demonstrating
            extensive expertise in plant-based medicine, particularly in
            palliative care and chronic pain management. He earned his medical
            degree in South Africa in 2002 and is dedicated to providing
            high-quality, compassionate care in the field of alternative
            treatments at Solum Clinic. Areas of Interest: Holistic Medicine
            Palliative Care Skin Cancer
          </Text>
        </div>
      </div>
    </div>
  );
}
