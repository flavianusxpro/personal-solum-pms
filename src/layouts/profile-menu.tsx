'use client';

import { Title, Text, Avatar, Button, Popover, Flex } from 'rizzui';
import cn from '@core/utils/class-names';
import { routes } from '@/config/routes';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {
  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Avatar
            src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
            name="John Doe"
            className={cn('!h-9 w-9 sm:!h-10 sm:!w-10', avatarClassName)}
          />
          {!!username && (
            <span className="username hidden text-gray-200 dark:text-gray-700 md:inline-flex">
              Hi, Andry
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

function DropdownMenu() {
  const router = useRouter();
  const { data } = useSession();

  const { data: dataProfile, isSuccess } = useProfile(data?.accessToken);

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Prevent automatic re-render
    router.replace(routes.signIn); // Redirect immediately
  };

  const menuItems = [
    {
      name: 'My Profile',
      href: dataProfile?.id
        ? routes.user.edit(`${dataProfile.id.toString()}`)
        : '#',
    },
    {
      name: 'Password',
      href: dataProfile?.id
        ? routes.user.edit(`${dataProfile.id.toString()}?tab=password`)
        : '#',
    },
    {
      name: 'Activity Log',
      href: dataProfile?.id
        ? routes.user.edit(`${dataProfile.id.toString()}?tab=activity`)
        : '#',
    },
  ];

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex flex-col items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
          name={dataProfile?.name || ''}
        />
        <div className="ms-3 mt-2">
          <Title as="h6" className="text-center font-semibold">
            {dataProfile?.name || ''}
          </Title>
          <Text className="text-center text-sm text-gray-600">
            {dataProfile?.email || ''}
          </Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
