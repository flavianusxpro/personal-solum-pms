import { routes } from '@/config/routes';
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: routes.signIn,
  },
});
