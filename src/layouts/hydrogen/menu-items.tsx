import { routes } from '@/config/routes';
import dynamic from 'next/dynamic';
import { PiDoorOpen } from 'react-icons/pi';

// Dynamic imports untuk ikon yang digunakan
const PiHouse = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiHouse)
);
const PiCalendar = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiCalendar)
);
const PiBoundingBox = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiBoundingBox)
);
const PiCalendarDuotone = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiCalendarDuotone)
);
const PiCurrencyDollarDuotone = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiCurrencyDollarDuotone)
);
const PiUserCirclePlus = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiUserCirclePlus)
);
const PiUserFocus = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiUserFocus)
);
const PiUser = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiUser)
);
const PiGear = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiGear)
);

// Note: do not add href in the label object, it is rendering as label
export const adminMenuItems = [
  {
    name: 'Overview',
  },
  {
    name: 'Dashboard',
    href: routes.appointment.dashboard,
    icon: <PiHouse />,
  },
  {
    name: 'Invoice',
    href: routes.invoice.home,
    icon: <PiCurrencyDollarDuotone />,
  },
  {
    name: 'Appointment',
    href: routes.appointment.appointmentList,
    icon: <PiCalendarDuotone />,
  },
  {
    name: 'Patients',
    href: routes.patient.dashboard,
    icon: <PiUserCirclePlus />,
  },
  {
    name: 'Doctors',
    icon: <PiUserFocus />,
    href: routes.doctor.dashboard,
    dropdownItems: [
      {
        name: 'Doctor List',
        href: routes.doctor.dashboard,
        icon: <PiUser />,
      },
      {
        name: 'Setting',
        href: routes.doctor.setting,
        icon: <PiUser />,
      },
    ],
  },
  {
    name: 'Calendars',
    href: routes.eventCalendar,
    icon: <PiCalendar />,
  },
  {
    name: 'Users',
    href: routes.user.dashboard,
    icon: <PiUser />,
  },
  {
    name: 'Management',
    href: routes.management.dashboard,
    icon: <PiBoundingBox />,
    dropdownItems: [
      {
        name: 'Products',
        href: routes.product.dashboard,
        icon: <PiBoundingBox />,
      },
    ],
  },
  {
    name: 'Marketing',
    href: routes.management.dashboard,
    icon: <PiBoundingBox />,
    dropdownItems: [
      {
        name: 'Coupon',
        href: routes.product.dashboard,
        icon: <PiBoundingBox />,
      },
      {
        name: 'Email Marketing',
        href: routes.product.dashboard,
        icon: <PiBoundingBox />,
      },
      {
        name: 'Sms Marketing',
        href: routes.product.dashboard,
        icon: <PiBoundingBox />,
      },
    ],
  },
  {
    name: 'Settings',
    href: routes.setting.setup,
    icon: <PiGear />,
  },
];
export const patientMenuItems = [
  {
    name: 'Overview',
  },
  {
    name: 'Dashboard',
    href: routes.myDashboard,
    icon: <PiHouse />,
  },
  {
    name: 'My Appointment',
    icon: <PiCurrencyDollarDuotone />,
    href: routes.myAppointment.dashboard,
  },
  {
    name: 'My Family',
    href: routes.myFamily.dashboard,
    icon: <PiCalendarDuotone />,
  },
  {
    name: 'Payment Methods',
    href: routes.paymentMethods,
    icon: <PiUserCirclePlus />,
  },
  {
    name: 'My Account Details',
    href: routes.myAccountDetails,
    icon: <PiUser />,
  },
  {
    name: 'Sign Out',
    isButton: true,
    icon: <PiDoorOpen />,
  },
];
