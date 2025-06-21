'use client';

import { useProfile } from '@/hooks/useProfile';
import { adminMenuItems } from '@/layouts/hydrogen/menu-items';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export default function useAcl() {
  const { status } = useSession();

  const {
    data: dataProfile,
    isLoading: isLoadingProfile,
    isSuccess,
  } = useProfile(status === 'authenticated');

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

  const permissions = useMemo(() => {
    return dataProfile?.role.permissions;
  }, [dataProfile]);

  return {
    menuItems,
    isLoadingProfile,
    isSuccess,
    permissionRead,
    permissions,
  };
}
