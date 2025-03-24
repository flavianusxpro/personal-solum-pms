'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import { BiChevronRight } from 'react-icons/bi';
import { PiCalendar, PiCardholder } from 'react-icons/pi';
import { Flex, Text, Title } from 'rizzui';

const MyDashboard = () => {
  const { data: dataSession } = useSession();
  return (
    <div className="flex h-screen flex-col gap-4 bg-gray-50 p-5">
      <div className="">
        <Title as="h2" className="text-2xl font-semibold">
          Hi, {dataSession?.user?.name}!
        </Title>
        <Text>Welcome to your Solum Clinic Booking Account</Text>
      </div>

      <div className="grid grid-cols-1 gap-2 rounded-md bg-white p-2 px-4">
        <Flex justify="between" align="center" className="">
          <Text className="text-lg font-semibold">My Appointments</Text>{' '}
          <PiCalendar className="h-6 w-6 text-green-600" />
        </Flex>
        <div className="h-1 w-full bg-gray-50"></div>

        <div className="divide-y divide-green-500">
          <Flex justify="between" align="center" className="py-2">
            <Text className="">Upcoming</Text>{' '}
            <BiChevronRight className="h-6 w-6 text-green-600" />
          </Flex>
          <Flex justify="between" align="center" className="py-2">
            <Text className="">Previous</Text>{' '}
            <BiChevronRight className="h-6 w-6 text-green-600" />
          </Flex>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 rounded-md bg-white p-2 px-4">
        <Flex justify="between" align="center" className="">
          <Text className="text-lg font-semibold">My Family</Text>{' '}
          <BiChevronRight className="h-6 w-6 text-green-600" />
        </Flex>
        <div className="h-1 w-full bg-gray-50"></div>

        <div className="divide-y divide-green-500">
          <Text>
            If you&apos;ve booked an appointment for a family member or anyone
            other than yourself their details are linked to your booking
            account. You can unlink them here at any time.
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 rounded-md bg-white p-2 px-4">
        <Flex justify="between" align="center" className="">
          <Text className="text-lg font-semibold">Payment Methods</Text>{' '}
          <BiChevronRight className="h-6 w-6 text-green-600" />
        </Flex>
        <div className="h-1 w-full bg-gray-50"></div>

        <div className="divide-y divide-green-500">
          <Flex className="rounded-md border p-3">
            <div className="w-1/6">
              <PiCardholder className="h-8 w-8" />
            </div>
            <div className="w-full">
              <Text className="font-semibold">No saved paymeny methods</Text>
              <Text>
                You do not currently have any stored payment methods. Add a
                payment method to conveniently and securely pay for your next
                appointment.
              </Text>
            </div>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;
