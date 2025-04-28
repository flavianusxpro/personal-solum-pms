import { routes } from '@/config/routes';
import dynamic from 'next/dynamic';

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

const PiBriefcase = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiBriefcase)
);

const PiDoorOpen = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiDoorOpen)
);

// Note: do not add href in the label object, it is rendering as label
export const adminMenuItems = [
  {
    name: 'Overview',
    permissionReadName: ['dashboard-read'],
  },
  {
    name: 'Dashboard',
    href: routes.appointment.dashboard,
    icon: <PiHouse />,
    permissionReadName: ['dashboard-read'],
  },
  {
    name: 'Invoice',
    href: routes.invoice.home,
    icon: <PiCurrencyDollarDuotone />,
    permissionReadName: ['invoice-read'],
  },
  {
    name: 'Appointment',
    href: routes.appointment.appointmentList,
    icon: <PiCalendarDuotone />,
    permissionReadName: ['appointment-read'],
  },
  {
    name: 'Patients',
    href: routes.patient.dashboard,
    icon: <PiUserCirclePlus />,
    permissionReadName: ['patient-read'],
  },
  {
    name: 'Doctors',
    icon: <PiUserFocus />,
    href: routes.doctor.dashboard,
    permissionReadName: ['doctor-read'],
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
    permissionReadName: ['calendar-read'],
  },
  {
    name: 'Users',
    href: routes.user.dashboard,
    icon: <PiUser />,
    permissionReadName: ['user-read'],
  },
  {
    name: 'Management',
    href: routes.management.dashboard,
    icon: <PiBoundingBox />,
    permissionReadName: ['management-read'],
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
    icon: <PiBriefcase />,
    permissionReadName: ['marketing-read'],
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
    permissionReadName: ['setting-read'],
    dropdownItems: [
      {
        name: 'Setup',
        href: routes.setting.setup,
        icon: <PiUser />,
      },
      {
        name: 'Email Template',
        href: routes.setting.emailTemplate,
        icon: <PiUser />,
      },
      {
        name: 'SMS Template',
        href: routes.setting.smsTemplate,
        icon: <PiUser />,
      },
      {
        name: 'Roles',
        href: routes.setting.roles,
        icon: <PiUser />,
      },
    ],
  },
];
