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
    if (!permissionRead) return [];

    return adminMenuItems.reduce((acc: any[], item) => {
      const hasParentPermission =
        item.permissionReadName.length === 0 ||
        item.permissionReadName.some((perm) => permissionRead.includes(perm));

      if (!hasParentPermission) return acc;

      let filteredItem = { ...item };

      if (item.dropdownItems?.length) {
        const filteredDropdowns = item.dropdownItems.filter((dropdown) => {
          return (
            dropdown.permissionReadName.length === 0 ||
            dropdown.permissionReadName.some((perm) =>
              permissionRead.includes(perm)
            )
          );
        });

        if (filteredDropdowns.length > 0) {
          filteredItem.dropdownItems = filteredDropdowns;
        } else {
          delete filteredItem.dropdownItems; // Clean up if empty
        }
      }

      acc.push(filteredItem);
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
