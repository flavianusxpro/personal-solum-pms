import { routes } from '@/config/routes';
import cn from '@core/utils/class-names';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, Flex } from 'rizzui';

interface IProps {
  toggleDrawerSideBar: () => void;
  className?: string;
}
export default function PatientHeader({
  toggleDrawerSideBar,
  className,
}: IProps) {
  const { status } = useSession();
  const pathname = usePathname();

  const isBookingPage = pathname === routes.bookAppointment;
  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent automatic re-render
  };

  return (
    <header
      className={cn(
        'relative w-full bg-gradient-to-r from-orange-400 to-orange-600 p-14 text-center text-white',
        className
      )}
    >
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
          )}
        </Flex>
      </div>
    </header>
  );
}
