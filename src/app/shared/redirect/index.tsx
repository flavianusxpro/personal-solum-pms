'use client';
import { ROLES } from '@/config/constants';
import { routes } from '@/config/routes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Loader } from 'rizzui';

const Redirect = () => {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    return router.push(routes.appointment.dashboard);
  }, [data?.role?.name, data?.user, router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Loader size="xl" />
    </div>
  );
};

export default Redirect;
