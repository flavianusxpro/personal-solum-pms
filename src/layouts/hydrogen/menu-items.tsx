import { routes } from '@/config/routes';
import dynamic from 'next/dynamic';
import { PiPlugsConnected } from 'react-icons/pi';

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

const PiReport = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiWarningOctagonLight)
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
    name: 'Calendar',
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
  // {
  //   name: 'Calendars',
  //   href: routes.calendar,
  //   icon: <PiCalendar />,
  //   permissionReadName: ['calendar'],
  // },
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
        permissionReadName: ['doctor'],
      },
      {
        name: 'Setting',
        href: routes.doctor.setting,
        icon: <PiUser />,
        permissionReadName: ['doctor'],
      },
    ],
  },
  {
    name: 'Pharmacy',
    href: routes.pharmachy,
    icon: <PiHospital />,
    permissionReadName: ['pharmacy'],
  },
  {
    name: 'Users',
    href: routes.user.dashboard,
    icon: <PiUser />,
    permissionReadName: ['user'],
    dropdownItems: [
      {
        name: 'User List',
        href: routes.user.dashboard,
        icon: <PiUser />,
        permissionReadName: ['user'],
      },
      {
        name: 'Roles',
        href: routes.setting.roles,
        icon: <PiUser />,
        permissionReadName: [],
      },
    ],
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
        permissionReadName: [],
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
        name: 'Coupon',
        href: routes.marketing.coupon,
        icon: <PiBoundingBox />,
        permissionReadName: [],
      },
      {
        name: 'Email Marketing (coming soon)',
        href: routes.marketing.emailMarketing,
        icon: <PiBoundingBox />,
        permissionReadName: [],
      },
      {
        name: 'Sms Marketing (coming soon)',
        href: routes.marketing.smsMarketing,
        icon: <PiBoundingBox />,
        permissionReadName: [],
      },
    ],
  },
  {
    name: 'Report',
    href: routes.report,
    icon: <PiReport />,
    permissionReadName: ['report'],
  },
  {
    name: 'Request Call Back',
    href: routes.requestCallBack,
    icon: <PiDoorOpen />,
    permissionReadName: ['requestcallback'],
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
        permissionReadName: [],
      },
      {
        name: 'Email Template',
        href: routes.setting.emailTemplate,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'SMS Template',
        href: routes.setting.smsTemplate,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Branch',
        href: routes.setting.branch,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Currency',
        href: routes.setting.currency,
        icon: <PiUser />,
        permissionReadName: [],
      },
    ],
  },
  {
    name: 'Connection',
    href: routes.connection.connect,
    icon: <PiPlugsConnected />,
    permissionReadName: ['management'],
    dropdownItems: [
      {
        name: 'Connect',
        href: routes.connection.connect,
        icon: <PiPlugsConnected />,
        permissionReadName: [],
      },
      {
        name: 'Api',
        href: routes.connection.api,
        icon: <PiPlugsConnected />,
        permissionReadName: [],
      },
    ],
  },
];

export type AdminMenuDropdownItem = {
  name: string;
  href: string;
  icon?: React.ReactNode;
  permissionReadName: string[];
  superAdminOnly?: boolean;
};

export type AdminMenuItem = {
  name: string;
  href?: string;
  icon?: React.ReactNode;
  permissionReadName: string[];
  dropdownItems?: AdminMenuDropdownItem[];
  superAdminOnly?: boolean;
};
