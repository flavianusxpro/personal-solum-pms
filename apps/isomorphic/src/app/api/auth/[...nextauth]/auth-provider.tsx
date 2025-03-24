'use client';

import { routes } from '@/config/routes';
import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (status === 'unauthenticated') {
      const isHomePage = pathname === '/';
      const isSignInPage = pathname === routes.signIn;

      const url =
        !isHomePage && !isSignInPage
          ? `${routes.signIn}?callbackUrl=${pathname}`
          : routes.signIn;

      router.push(url);
    }
  }, [status, router, pathname]);

  if (status === 'loading') return <p>Loading...</p>;

  return <>{children}</>;
}
