import { routes } from '@/config/routes';
import dynamic from 'next/dynamic';
import { PiPlugsConnected } from 'react-icons/pi';
import { LuFileChartColumn } from 'react-icons/lu';

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

const PiCurrencyDollar = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiCurrencyDollar)
);

const PiTicketLight = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiTicketLight)
);

const PiEnvelopeLight = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiEnvelopeLight)
);

const PiChatCircleLight = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiChatCircleLight)
);

const PiFileText = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiFileText)
);

const PiChat = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiChat)
);

const PiBuilding = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiBuilding)
);

const PiChartLine = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiChartLine)
);
const PiCreditCard = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiCreditCard)
);
const PiShieldCheck = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiShieldCheck)
);
const PiUsers = dynamic(() =>
  import('react-icons/pi').then((mod) => mod.PiUsers)
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
    name: 'Request Call Back',
    href: routes.requestCallBack,
    icon: <PiDoorOpen />,
    permissionReadName: ['requestcallback'],
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
    dropdownItems: [
      {
        name: 'Patients',
        href: routes.patient.list,
        permissionReadName: ['patient'],
      },
      {
        name: 'Setting',
        href: routes.patient.setting,
        permissionReadName: ['patient'],
      },
    ],
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
    name: 'Product & Service',
    href: routes.management.product.list,
    icon: <PiBoundingBox />,
    permissionReadName: [],
  },
  {
    name: 'Marketing',
    permissionReadName: ['marketing'],
  },
  {
    name: 'Coupon',
    href: routes.marketing.coupon,
    icon: <PiTicketLight />,
    permissionReadName: [],
  },
  {
    name: 'Email Broadcast (coming soon)',
    href: routes.marketing.emailMarketing,
    icon: <PiEnvelopeLight />,
    permissionReadName: [],
  },
  {
    name: 'Sms Broadcast (coming soon)',
    href: routes.marketing.smsMarketing,
    icon: <PiChatCircleLight />,
    permissionReadName: [],
  },
  {
    name: 'Reports & Analytics',
    permissionReadName: ['report'],
  },
  // {
  //   name: 'Report',
  //   href: routes.report,
  //   icon: <PiReport />,
  //   permissionReadName: ['report'],
  // },
  {
    name: 'Business Insight',
    href: routes.report,
    icon: <PiBriefcase />,
    permissionReadName: [],
    dropdownItems: [
      {
        name: 'Revenue & Growth',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Churn & Retention',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Billing & Transactions',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
    ],
  },
  {
    name: 'Clinic Performance Analytics',
    href: routes.report,
    icon: <PiChartLine />,
    permissionReadName: [],
    dropdownItems: [
      {
        name: 'Clinic Summary Dashboard',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Doctor & Staff Productivity',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Appointment & Capacity Report',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Service Performance',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
    ],
  },
  {
    name: 'Patient & Engagement Reports',
    href: routes.report,
    icon: <PiUsers />,
    permissionReadName: [],
    dropdownItems: [
      {
        name: 'Patient Growth',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Engagement & Retention',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Feedback & Satisfaction (NPS/CSAT)',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Communication Insights',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Referral & Source Tracking',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
    ],
  },
  {
    name: 'Financial & Billing Reports',
    href: routes.report,
    icon: <PiCreditCard />,
    permissionReadName: [],
    dropdownItems: [
      {
        name: 'Revenue Summary',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Accounts Receivable (AR) Aging',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Payment Methods Analysis',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Refund & Adjustment Logs',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Financial Forecast ',
        href: routes.report,
        icon: <PiUser />,
        permissionReadName: [],
      },
    ],
  },
  {
    name: 'Compliance, Operations & System Health',
    href: routes.report,
    icon: <PiShieldCheck />,
    permissionReadName: [],
  },
  {
    name: 'Custom Reports (optional)',
    href: routes.report,
    icon: <LuFileChartColumn />,
    permissionReadName: [],
  },
  {
    name: 'Setting',
    permissionReadName: ['setting'],
  },
  {
    name: 'Setup',
    href: routes.setting.setup,
    icon: <PiGear />,
    permissionReadName: [],
  },
  {
    name: 'Email Template',
    href: routes.setting.emailTemplate,
    icon: <PiFileText />,
    permissionReadName: [],
  },
  {
    name: 'SMS Template',
    href: routes.setting.smsTemplate,
    icon: <PiChat />,
    permissionReadName: [],
  },
  {
    name: 'Branch',
    href: routes.setting.branch,
    icon: <PiBuilding />,
    permissionReadName: [],
  },
  {
    name: 'Currency',
    href: routes.setting.currency,
    icon: <PiCurrencyDollar />,
    permissionReadName: [],
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
