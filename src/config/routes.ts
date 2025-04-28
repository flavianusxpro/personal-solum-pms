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
  product: {
    dashboard: '/product',
    create: '/product/create',
    edit: (id: string) => `/product/edit/${id}`,
    productDetail: (id: string) => `/product/view/${id}`,
  },
  patient: {
    dashboard: '/patient',
    create: '/patient/create',
    edit: (id: string) => `/patient/edit/${id}`,
    patientDetail: (id: string) => `/patient/${id}`,
  },
  management: {
    dashboard: '/management',
  },
  invoice: {
    home: '/invoice',
    create: '/invoice/create',
    details: (id: string) => `/invoice/${id}`,
    edit: (id: string) => `/invoice/${id}/edit`,
  },
  setting: {
    setup: '/setting/setup',
    communication: '/setting/communication',
    payment: '/setting/payment',
    notificationReminder: '/setting/notification-reminder',
    emailTemplate: '/setting/email-template',
    smsTemplate: '/setting/sms-template',
    roles: '/setting/roles',
  },

  bookAppointment: '/bookings',
  consentForm: '/form/consent-form',
  consentFormConfirmation: '/form/consent-form/confirmation',

  appointment: {
    dashboard: '/appointment',
    appointmentList: '/appointment/list',
  },
  eventCalendar: '/event-calendar',
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
