'use client';
import { TabButton } from '@/app/shared/tab-button';
import { useState, useTransition } from 'react';
import { PiCalendar } from 'react-icons/pi';
import { Flex, Text } from 'rizzui';
import SimpleBar from 'simplebar-react';

export const navItems = [
  {
    value: 'upcoming',
    label: 'Upcoming',
  },
  {
    value: 'previous',
    label: 'Previous',
  },
];

export default function MyAppointment() {
  const [tab, setTab] = useState('upcoming');
  const [isPending, startTransition] = useTransition();

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  return (
    <div className="flex h-screen flex-col gap-4 bg-gray-50 p-5">
      <div className="grid w-full grid-cols-1 gap-2 divide-y-2 rounded-md bg-white p-2 px-4">
        <Flex justify="between" align="center" className="">
          <Text className="text-lg font-semibold">My Appointments</Text>{' '}
          <PiCalendar className="h-6 w-6 text-green-600" />
        </Flex>
        <div className="w-full bg-white">
          <SimpleBar>
            <nav className="flex items-center gap-5">
              {navItems.map((nav) => (
                <TabButton
                  item={nav}
                  key={nav.value}
                  isActive={tab === nav.value}
                  onClick={() => selectTab(nav.value)}
                  disabled={isPending}
                />
              ))}
            </nav>
          </SimpleBar>
        </div>
      </div>

      {tab === 'upcoming' && <NoAppointment title="Upcoming" />}
      {tab === 'previous' && <NoAppointment title="Previous" />}
    </div>
  );
}

function NoAppointment({ title }: { title: string }) {
  return (
    <div className="rounded-lg bg-white p-4">
      <div className="rounded-lg bg-yellow-100 p-4">
        No {title} appointments found, please make a booking
      </div>
    </div>
  );
}
