'use client';

import PageHeader from '@/app/shared/ui/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';
import { useState } from 'react';

const pageHeader = {
  title: 'Alice Ronnie',
  breadcrumb: [
    {
      href: '/appointment',
      name: 'Home',
    },
    {
      name: 'Account Settings',
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<string>('doctor');

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="mb-3 flex w-max items-center gap-3">
        <p>Test role:</p>
        <div className="flex w-max items-center gap-3">
          <div
            onClick={() => {
              setRole('doctor');
              localStorage.setItem('role', 'doctor');
            }}
            className={`cursor-pointer rounded-md px-4 py-2 duration-100 hover:brightness-[94%] active:scale-[0.98] ${role === 'doctor' ? 'bg-blue-300 text-white' : 'bg-slate-100 text-slate-500'} flex items-center justify-center`}
          >
            <p>Doctor</p>
          </div>
          <div
            onClick={() => {
              setRole('patient');
              localStorage.setItem('role', 'patient');
            }}
            className={`cursor-pointer rounded-md px-4 py-2 duration-100 hover:brightness-[94%] active:scale-[0.98] ${role === 'patient' ? 'bg-blue-300 text-white' : 'bg-slate-100 text-slate-500'} flex items-center justify-center`}
          >
            <p>Patient</p>
          </div>
          <div
            onClick={() => {
              setRole('user');
              localStorage.setItem('role', 'user');
            }}
            className={`cursor-pointer rounded-md px-4 py-2 duration-100 hover:brightness-[94%] active:scale-[0.98] ${role === 'user' ? 'bg-blue-300 text-white' : 'bg-slate-100 text-slate-500'} flex items-center justify-center`}
          >
            <p>User</p>
          </div>
        </div>
      </div>
      <ProfileSettingsNav role={role} />
      {children}
    </>
  );
}
