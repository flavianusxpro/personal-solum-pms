export const routes = {
  doctor: {
    dashboard: '/doctor',
    create: '/doctor/create',
    edit: (id: string) => `/doctor/edit/${id}`,
    doctorDetail: (id: string) => `/doctor/${id}`,
    setting: '/doctor/setting',
  },
  user: {
    dashboard: '/user',
    create: '/user/create',
    edit: (id: string) => `/user/edit/${id}`,
    userDetail: (id: string) => `/user/${id}`,
  },

  patient: {
    dashboard: '/patient',
    create: '/patient/create',
    edit: (id: string) => `/patient/edit/${id}`,
    patientDetail: (id: string) => `/patient/${id}`,
  },
  management: {
    dashboard: '/management',
    product: {
      list: '/management/product',
      create: '/management/product/create',
      edit: (id: string) => `/management/product/edit/${id}`,
      productDetail: (id: string) => `/management/product/view/${id}`,
    },
  },
  marketing: {
    coupon: '/marketing/coupon',
  },
  invoice: {
    home: '/invoice',
    create: '/invoice/create',
    details: (id: string) => `/invoice/${id}`,
    edit: (id: string) => `/invoice/${id}/edit`,
  },
  requestCallBack: '/request-call-back',
  setting: {
    setup: '/setting/setup',
    communication: '/setting/communication',
    payment: '/setting/payment',
    notificationReminder: '/setting/notification-reminder',
    emailTemplate: '/setting/email-template',
    smsTemplate: '/setting/sms-template',
    roles: '/setting/roles',
    taxSettings: '/setting/tax',
    invoiceSettings: '/setting/invoice-settings',
    branch: '/setting/branch',
    currency: '/setting/currency',
  },

  pharmachy: '/pharmacy',

  bookAppointment: '/bookings',
  consentForm: '/form/consent-form',
  consentFormConfirmation: '/form/consent-form/confirmation',

  appointment: {
    dashboard: '/appointment',
    appointmentList: '/appointment/list',
  },
  calendar: '/calendar',
  globalCalendar: '/global-calendar',
  forms: {
    profileSettings: '/forms/profile-settings',
    notificationPreference: '/forms/profile-settings/notification',
    personalInformation: '/forms/profile-settings/profile',
    newsletter: '/forms/newsletter',
  },
  profile: '/profile',
  comingSoon: '/coming-soon',
  accessDenied: '/access-denied',
  notFound: '/not-found',
  maintenance: '/maintenance',
  blank: '/blank',
  auth: {
    signUp: '/auth/sign-up',
    signIn: '/auth/sign-in',
    forgotPassword: '/auth/forgot-password',
    otp: '/auth/otp',
  },
  signIn: '/auth/sign-in',
};
