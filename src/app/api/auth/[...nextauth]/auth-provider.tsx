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
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const blacklist = useMemo(
    () => [
      routes.signIn,
      routes.auth.signUp,
      routes.auth.forgotPassword,
      routes.accessDenied,
    ],
    []
  );

  useEffect(() => {
    if (status === 'unauthenticated' && !blacklist.includes(pathname)) {
      const isSignInPage = pathname.includes(routes.signIn);

      const url = !isSignInPage
        ? `${routes.signIn}?callbackUrl=${pathname}`
        : routes.signIn;

      router.push(url);
    }
  }, [status, router, pathname, blacklist]);

  if (status === 'loading') return <p>Loading...</p>;

  return <>{children}</>;
}
