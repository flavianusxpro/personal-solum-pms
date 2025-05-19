'use client';

import { useIsMounted } from '@core/hooks/use-is-mounted';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import Header from '@/layouts/hydrogen/header';
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-grow">
      <div className="flex w-full flex-col">
        <Header />
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          {children}
        </div>
      </div>
    </main>
  );
}
