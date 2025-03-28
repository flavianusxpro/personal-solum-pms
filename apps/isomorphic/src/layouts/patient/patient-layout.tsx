'use client';
import PatientHeader from '@/layouts/patient/patient-header';
import Sidebar from './patient-sidebar';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      {/* PatientHeader should be placed first inside the main container */}
      <PatientHeader />

      <div className="flex flex-grow">
        {/* Push content below header */}
        <Sidebar className="hidden dark:bg-gray-50 xl:block" />
        <div className="flex w-full flex-col">
          <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
