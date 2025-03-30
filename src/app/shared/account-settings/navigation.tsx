'use client';

import Link from 'next/link';
import { Badge, Button, Text } from 'rizzui';
import cn from '@core/utils/class-names';
import { useScrollableSlider } from '@core/hooks/use-scrollable-slider';
import { PiCaretLeftBold, PiCaretRightBold } from 'react-icons/pi';
import { usePathname } from 'next/navigation';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';

interface menuInterface {
  label: string;
  value: string;
  notif?: boolean;
}

const menuItems: menuInterface[] = [
  {
    label: 'My Details',
    value: '/forms/profile-settings',
  },
  {
    label: 'Emergency Contact',
    value: '/forms/profile-settings/emergency-contact',
  },
  {
    label: 'Appointment',
    value: '/forms/profile-settings/appointment',
  },
  {
    label: 'Password',
    value: '/forms/profile-settings/password',
  },
  {
    label: 'Notifications',
    value: '/forms/profile-settings/notification',
    notif: true,
  },
];

const menuItemsUser: menuInterface[] = [
  {
    label: 'My Details',
    value: '/forms/profile-settings',
  },
  {
    label: 'Password',
    value: '/forms/profile-settings/password',
  },
  {
    label: 'Roles',
    value: '/forms/profile-settings',
  },
];

const menuItemsDocter: menuInterface[] = [
  {
    label: 'My Details',
    value: '/forms/profile-settings',
  },
  {
    label: 'Emergency Contact',
    value: '/forms/profile-settings/emergency-contact',
  },
  {
    label: 'Billings & Appointment',
    value: '/forms/profile-settings/billing',
  },
  {
    label: 'Qualifications',
    value: '/forms/profile-settings/certifications',
  },
  {
    label: 'Password',
    value: '/forms/profile-settings/password',
  },
  {
    label: 'Calendar',
    value: '/forms/profile-settings/calendar',
  },
  {
    label: 'Meetings Type',
    value: '/forms/profile-settings/integration',
  },
];

export default function ProfileSettingsNav({ role }: { role: string }) {
  // export default function ProfileSettingsNav() {

  const pathname = usePathname();
  const { layout } = useLayout();
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();
  return (
    <div
      className={cn(
        'sticky z-20 -mx-4 -mt-4 border-b border-muted bg-white px-4 py-0 font-medium text-gray-500 dark:bg-gray-50 sm:-mt-2 md:-mx-5 md:px-5 lg:-mx-8 lg:mt-0 lg:px-8 xl:-mx-6 xl:px-6 2xl:top-20 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10',
        layout === LAYOUT_OPTIONS.LITHIUM
          ? 'top-[66px] sm:top-[70px] md:top-[73px]'
          : layout === LAYOUT_OPTIONS.BERYLLIUM
            ? 'top-[62px] sm:top-[72px] 2xl:top-[72px]'
            : 'top-[62px] md:top-[71px]'
      )}
    >
      <div className="relative flex items-center overflow-hidden">
        <Button
          title="Prev"
          variant="text"
          ref={sliderPrevBtn}
          onClick={() => scrollToTheLeft()}
          className="!absolute left-0 top-0.5 z-10 !h-[calc(100%-4px)] w-8 !justify-start bg-gradient-to-r from-white via-white to-transparent px-0 text-gray-500 hover:text-black dark:from-gray-50 dark:via-gray-50 lg:hidden"
        >
          <PiCaretLeftBold className="w-5" />
        </Button>
        <div className="flex h-[52px] items-start overflow-hidden">
          <div
            className="-mb-7 flex w-full gap-3 overflow-x-auto scroll-smooth pb-7 md:gap-5 lg:gap-8"
            ref={sliderEl}
          >
            {(role === 'doctor' || localStorage.getItem('role') === 'doctor'
              ? menuItemsDocter
              : role === 'patient' || localStorage.getItem('role') === 'patient'
                ? menuItems
                : menuItemsUser
            ).map((menu, index) => (
              <Link
                href={`${menu.value}`}
                key={`menu-${index}`}
                className={cn(
                  'group relative cursor-pointer whitespace-nowrap py-2.5 font-medium text-gray-500 before:absolute before:bottom-0 before:left-0 before:z-[1] before:h-0.5 before:bg-gray-1000 before:transition-all hover:text-gray-900',
                  menu.value.toLowerCase() === pathname
                    ? 'before:visible before:w-full before:opacity-100'
                    : 'before:invisible before:w-0 before:opacity-0'
                )}
              >
                <Text
                  as="span"
                  className="inline-flex rounded-md px-2.5 py-1.5 transition-all duration-200 group-hover:bg-gray-100/70"
                >
                  {menu.label}
                </Text>
                {menu?.notif ? (
                  <Badge
                    renderAsDot
                    color="danger"
                    enableOutlineRing
                    className="absolute right-2.5 top-2.5 translate-x-1/2"
                  />
                ) : (
                  <></>
                )}
              </Link>
            ))}
          </div>
        </div>
        <Button
          title="Next"
          variant="text"
          ref={sliderNextBtn}
          onClick={() => scrollToTheRight()}
          className="!absolute right-0 top-0.5 z-10 !h-[calc(100%-4px)] w-8 !justify-end bg-gradient-to-l from-white via-white to-transparent px-0 text-gray-500 hover:text-black dark:from-gray-50 dark:via-gray-50 lg:hidden"
        >
          <PiCaretRightBold className="w-5" />
        </Button>
      </div>
    </div>
  );
}
