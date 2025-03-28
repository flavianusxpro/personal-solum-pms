import { routes } from '@/config/routes';
import cn from '@core/utils/class-names';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Drawer, Flex } from 'rizzui';
import HamburgerButton from '../hamburger-button';
import PatientSidebar from './patient-sidebar';
import { useAtom } from 'jotai';
import patientDrawerAtom from '@/store/drawer';
import PatientDrawerSideBar from '@/app/shared/book-appointment/drawer/drawer-sidebar';

interface IProps {
  className?: string;
}
export default function PatientHeader({ className }: IProps) {
  const { status } = useSession();
  const pathname = usePathname();
  const [patientDrawer, setPatientDrawer] = useAtom(patientDrawerAtom);

  const isBookingPage = pathname === routes.bookAppointment;
  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent automatic re-render
  };

  const toggleDrawerSideBar = () => {
    setPatientDrawer((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  return (
    <header
      className={cn(
        'relative w-full bg-gradient-to-r from-orange-400 to-orange-600 p-14 text-center text-white',
        className
      )}
    >
      <HamburgerButton
        className="absolute left-4 top-4"
        view={<PatientSidebar className="static w-full 2xl:w-full" />}
      />
      <h1 className="text-3xl font-bold">Solum</h1>
      <p className="text-lg font-semibold">
        Find your nearest Solum Clinic Centre
      </p>
      <div className="absolute right-4 top-4">
        <Flex justify="between" align="center" className="gap-4">
          {!isBookingPage && (
            <Link
              href={routes.bookAppointment}
              className="font-semibold hover:underline"
            >
              Book Now
            </Link>
          )}
          {status === 'unauthenticated' ? (
            <div className="">
              <Button variant="outline" onClick={toggleDrawerSideBar}>
                Sign In
              </Button>
            </div>
          ) : (
            isBookingPage && (
              <>
                <Link
                  className="font-semibold hover:underline"
                  href={routes.myDashboard}
                >
                  MyProfile
                </Link>
                <Button variant="outline" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            )
          )}
        </Flex>
      </div>
      <Drawer isOpen={patientDrawer.isOpen} onClose={toggleDrawerSideBar}>
        <PatientDrawerSideBar onClose={toggleDrawerSideBar} />
      </Drawer>
    </header>
  );
}
