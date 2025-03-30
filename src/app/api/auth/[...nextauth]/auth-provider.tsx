'use client';

import { routes } from '@/config/routes';
import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function AuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}): React.ReactNode {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const whitelist = useMemo(() => [routes.signIn, routes.bookAppointment], []);

  useEffect(() => {
    if (status === 'unauthenticated' && !whitelist.includes(pathname)) {
      const isHomePage = pathname === '/';
      const isSignInPage = pathname.includes(routes.signIn);

      const url =
        !isHomePage && !isSignInPage
          ? `${routes.signIn}?callbackUrl=${pathname}`
          : routes.signIn;

      router.push(url);
    }
  }, [status, router, pathname, whitelist]);

  if (status === 'loading') return <p>Loading...</p>;

  return <>{children}</>;
}
