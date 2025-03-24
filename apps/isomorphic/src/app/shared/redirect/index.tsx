'use client';
import { ROLES } from '@/config/constants';
import { routes } from '@/config/routes';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Redirect = () => {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (data?.user?.role === ROLES.Administrator) {
      router.push(routes.appointment.dashboard);
    }
    if (data?.user?.role === ROLES.Patient) {
      router.push(routes.myDashboard);
    }
  }, [data?.user, router]);

  return <div></div>;
};

export default Redirect;
