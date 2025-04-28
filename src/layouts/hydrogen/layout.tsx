import { routes } from '@/config/routes';
import Header from '@/layouts/hydrogen/header';
import Sidebar from '@/layouts/hydrogen/sidebar';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const permissionRead = useMemo(() => {
    return data?.role?.permissions.reduce((acc: string[], permission) => {
      if (permission.name.includes('read'))
        acc.push(permission.name.split('-')[0]);
      return acc;
    }, []);
  }, [data]);

  useEffect(() => {
    if (!permissionRead?.includes(pathname.split('/')?.[1])) {
      return router.push(routes.accessDenied);
    }
  }, [pathname, permissionRead, router]);

  return (
    <main className="flex min-h-screen flex-grow">
      <Sidebar className="fixed hidden dark:bg-gray-50 xl:block" />
      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
        <Header />
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          {children}
        </div>
      </div>
    </main>
  );
}
