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

const PiHospital = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiHospital)
);

// Note: do not add href in the label object, it is rendering as label
export const adminMenuItems = [
  {
    name: 'Overview',
    permissionReadName: ['dashboard'],
  },
  {
    name: 'Dashboard',
    href: routes.appointment.dashboard,
    icon: <PiHouse />,
    permissionReadName: ['dashboard'],
  },
  {
    name: 'Global Calendar (coming soon)',
    href: routes.globalCalendar,
    icon: <PiCalendar />,
    permissionReadName: ['calendar'],
  },
  {
    name: 'Invoice',
    href: routes.invoice.home,
    icon: <PiCurrencyDollarDuotone />,
    permissionReadName: ['invoice'],
  },
  {
    name: 'Appointment',
    href: routes.appointment.appointmentList,
    icon: <PiCalendarDuotone />,
    permissionReadName: ['appointment'],
  },
  {
    name: 'Calendars',
    href: routes.calendar,
    icon: <PiCalendar />,
    permissionReadName: ['calendar'],
  },
  {
    name: 'Patients',
    href: routes.patient.list,
    icon: <PiUserCirclePlus />,
    permissionReadName: ['patient'],
  },
  {
    name: 'Doctors',
    icon: <PiUserFocus />,
    href: routes.doctor.dashboard,
    permissionReadName: ['doctor'],
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
    name: 'Pharmacy',
    href: routes.pharmachy,
    icon: <PiHospital />,
    permissionReadName: ['setting'],
  },
  {
    name: 'Users',
    href: routes.user.dashboard,
    icon: <PiUser />,
    permissionReadName: ['user'],
  },
  {
    name: 'Management',
    href: routes.management.dashboard,
    icon: <PiBoundingBox />,
    permissionReadName: ['management'],
    dropdownItems: [
      {
        name: 'Product & Service',
        href: routes.management.product.list,
        icon: <PiBoundingBox />,
      },
    ],
  },
  {
    name: 'Marketing',
    href: routes.marketing,
    icon: <PiBriefcase />,
    permissionReadName: ['marketing'],
    dropdownItems: [
      {
        name: 'Coupon (coming soon)',
        href: routes.marketing.coupon,
        icon: <PiBoundingBox />,
      },
      {
        name: 'Email Marketing (coming soon)',
        href: routes.marketing.emailMarketing,
        icon: <PiBoundingBox />,
      },
      {
        name: 'Sms Marketing (coming soon)',
        href: routes.marketing.smsMarketing,
        icon: <PiBoundingBox />,
      },
    ],
  },
  {
    name: 'Request Call Back (cooming soon)',
    href: routes.requestCallBack,
    icon: <PiDoorOpen />,
    permissionReadName: ['management'],
  },
  {
    name: 'Settings',
    href: routes.setting.setup,
    icon: <PiGear />,
    permissionReadName: ['setting'],
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
      {
        name: 'Branch',
        href: routes.setting.branch,
        icon: <PiUser />,
      },
      {
        name: 'Currency',
        href: routes.setting.currency,
        icon: <PiUser />,
      },
    ],
  },
];
