import { routes } from '@/config/routes';
import useAcl from '@/core/hooks/use-acl';
import { useProfile } from '@/hooks/useProfile';
import Header from '@/layouts/hydrogen/header';
import Sidebar from '@/layouts/hydrogen/sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { permissionRead, isSuccess } = useAcl();

  const whiteList = useMemo(
    () => [
      routes.profile,
      routes.forms.profileSettings,
      routes.pharmachy,
      routes.requestCallBack,
    ],
    []
  );

  useEffect(() => {
    if (
      !permissionRead?.includes(pathname.split('/')?.[1]) &&
      isSuccess &&
      permissionRead &&
      !whiteList?.includes(pathname)
    ) {
      return router.push(routes.accessDenied);
    }
  }, [isSuccess, pathname, permissionRead, router, whiteList]);

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
