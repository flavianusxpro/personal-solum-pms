import { routes } from '@/config/routes';
import dynamic from 'next/dynamic';
import { PiMegaphone, PiPlugsConnected, PiTrendUp } from 'react-icons/pi';
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
    name: 'Calendar',
    href: routes.globalCalendar,
    icon: <PiCalendar />,
    permissionReadName: ['calendar'],
  },
  {
    name: 'Sales',
    href: routes.invoice.home,
    icon: <PiCurrencyDollarDuotone />,
    permissionReadName: ['invoice'],
    dropdownItems: [
      {
        name: 'Invoice',
        href: routes.invoice.home,
        icon: <PiCurrencyDollarDuotone />,
        permissionReadName: ['invoice'],
      },
      {
        name: 'Credit Notes',
        href: routes.sales.creditNotes,
        icon: <PiCurrencyDollarDuotone />,
        permissionReadName: ['invoice'],
      },
    ],
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
    name: 'Communications',
    href: routes.requestCallBack,
    icon: <PiDoorOpen />,
    permissionReadName: [],
    dropdownItems: [
      {
        name: 'Callback Queue',
        href: routes.requestCallBack,
        icon: <PiDoorOpen />,
        permissionReadName: ['requestcallback'],
      },
      {
        name: 'SMS',
        href: routes.communications.sms,
        icon: <PiDoorOpen />,
        permissionReadName: [],
      },
      {
        name: 'Email',
        href: routes.communications.email,

        icon: <PiDoorOpen />,
        permissionReadName: [],
      },
      {
        name: 'Social Media',
        href: routes.communications.socialMedia,
        permissionReadName: [],
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
      // {
      //   name: 'Setting',
      //   href: routes.doctor.setting,
      //   icon: <PiUser />,
      //   permissionReadName: ['doctor'],
      // },
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
    name: 'Email Broadcast',
    href: routes.marketing.emailMarketing,
    icon: <PiEnvelopeLight />,
    permissionReadName: [],
  },
  {
    name: 'Sms Broadcast',
    href: routes.marketing.smsMarketing,
    icon: <PiChatCircleLight />,
    permissionReadName: [],
  },
  {
    name: 'Subscribe Promotion',
    href: '#',
    icon: <PiMegaphone />,
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
    href: routes.reportAnalytics.businessInsight,
    icon: <PiBriefcase />,
    permissionReadName: [],
    dropdownItems: [
      {
        name: 'Revenue & Growth',
        href: routes.reportAnalytics.revenueGrowth,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Churn & Retention',
        href: routes.reportAnalytics.churnRetention,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Billing & Transactions',
        href: routes.reportAnalytics.billingTransaction,
        icon: <PiUser />,
        permissionReadName: [],
      },
    ],
  },
  {
    name: 'Clinic Performance',
    href: routes.reportAnalytics.clinicPerformance,
    icon: <PiChartLine />,
    permissionReadName: [],
    dropdownItems: [
      {
        name: 'Clinic Overview',
        href: routes.reportAnalytics.clinicOverview,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Doctor & Staff Productivity',
        href: routes.reportAnalytics.doctorStaffProductivity,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Appointment & Capacity',
        href: routes.reportAnalytics.appointmentCapacity,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Service Insight',
        href: routes.reportAnalytics.serviceInsight,
        icon: <PiUser />,
        permissionReadName: [],
      },
    ],
  },
  {
    name: 'Patient & Engagement',
    href: routes.reportAnalytics.patientEngagement,
    icon: <PiUsers />,
    permissionReadName: [],
    dropdownItems: [
      {
        name: 'Patient Growth',
        href: routes.reportAnalytics.patientGrowth,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Engagement Trends',
        href: routes.reportAnalytics.engagementTrends,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Satisfaction Scores',
        href: routes.reportAnalytics.satisfactionScores,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Communication Analytics',
        href: routes.reportAnalytics.communicationAnalytics,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Referral Sources',
        href: routes.reportAnalytics.referralSources,
        icon: <PiUser />,
        permissionReadName: [],
      },
    ],
  },
  {
    name: 'Financial Reports',
    href: routes.reportAnalytics.financialReports,
    icon: <PiCreditCard />,
    permissionReadName: [],
    dropdownItems: [
      {
        name: 'Revenue Breakdown',
        href: routes.reportAnalytics.revenueBreakdown,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Accounts Receivable',
        href: routes.reportAnalytics.accountsReceivable,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Payment Analysis',
        href: routes.reportAnalytics.paymentAnalysis,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Refund & Adjustments',
        href: routes.reportAnalytics.refundAdjustments,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Financial Forecasting ',
        href: routes.reportAnalytics.financialForecasting,
        icon: <PiUser />,
        permissionReadName: [],
      },
    ],
  },
  {
    name: 'Marketing Insights',
    href: routes.reportAnalytics.marketingInsights,
    icon: <PiTrendUp />,
    permissionReadName: [],
    dropdownItems: [
      {
        name: 'Traffic Overview',
        href: routes.reportAnalytics.trafficOverview,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Acquisition Channels',
        href: routes.reportAnalytics.acquisitionChannels,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Campaign Performance',
        href: routes.reportAnalytics.campaignPerformance,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'SEO & Keyword Insights',
        href: routes.reportAnalytics.seoKeywordInsight,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Conversion Funnel',
        href: routes.reportAnalytics.conversionFunnel,
        icon: <PiUser />,
        permissionReadName: [],
      },
      {
        name: 'Ad Spend & ROI',
        href: routes.reportAnalytics.adSpendROI,
        icon: <PiUser />,
        permissionReadName: [],
      },
    ],
  },
  {
    name: 'Custom Reports (optional)',
    href: routes.reportAnalytics.customReports,
    icon: <LuFileChartColumn />,
    permissionReadName: [],
  },
  {
    name: 'Settings',
    permissionReadName: ['setting'],
  },
  {
    name: 'Setup',
    href: routes.setting.setup,
    icon: <PiGear />,
    permissionReadName: [],
  },
  {
    name: 'Template',
    href: routes.setting.emailTemplate,
    icon: <PiFileText />,
    permissionReadName: [],
    dropdownItems: [
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
    ],
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
