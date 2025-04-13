import { routes } from '@/config/routes';
import { DUMMY_ID } from '@/config/constants';

// Note: do not add href in the label object, it is rendering as label
export const pageLinks = [
  // label start
  {
    name: 'Home',
  },
  {
    name: 'Invoice List',
    href: routes.invoice.home,
  },
  {
    name: 'Profile Settings',
    href: routes.forms.profileSettings,
  },
  {
    name: 'Personal Information',
    href: routes.forms.personalInformation,
  },
  // label start
  {
    name: 'Pages',
  },
  // label end
  {
    name: 'Profile',
    href: routes.profile,
  },
  // label start
  {
    name: 'Authentication',
  },
  // label end
  {
    name: 'Modern Sign Up',
    href: routes.auth.signUp,
  },
  {
    name: 'Modern Sign In',
    href: routes.auth.signUp,
  },
  {
    name: 'Modern Forgot Password',
    href: routes.auth.forgotPassword,
  },
  {
    name: 'Modern OTP Page',
    href: routes.auth.otp,
  },
];
