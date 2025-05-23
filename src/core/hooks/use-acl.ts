'use client';

import { routes } from '@/config/routes';
import { useProfile } from '@/hooks/useProfile';
import { adminMenuItems } from '@/layouts/hydrogen/menu-items';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

export default function useAcl() {
  const router = useRouter();
  const { data } = useSession();

  const {
    data: dataProfile,
    isLoading: isLoadingProfile,
    isSuccess,
    isError,
    error,
  } = useProfile(data?.accessToken);

  const permissionRead = useMemo(() => {
    return dataProfile?.role?.permissions.reduce(
      (acc: string[], permission) => {
        if (permission.name.includes('read'))
          acc.push(permission.name.split('-')[0]);
        return acc;
      },
      []
    );
  }, [dataProfile]);

  // use this to filter the menu items based on the permissions
  const menuItems = useMemo(() => {
    return adminMenuItems.reduce((acc: any[], item) => {
      if (permissionRead?.includes(item.permissionReadName[0])) {
        acc.push(item);
      }
      return acc;
    }, []);
  }, [permissionRead]);

  const handleSignOut = async () => {
    toast.error('Please login again to continue');
    router.replace(routes.auth.signIn);
    await signOut({ redirect: false });
  };

  useEffect(() => {
    if (isError) {
      handleSignOut();
    }
  }, [isError]);

  return { menuItems, isLoadingProfile, isSuccess, permissionRead };
}
