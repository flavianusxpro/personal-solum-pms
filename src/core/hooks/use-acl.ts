'use client';

import { ROLES } from '@/config/constants';
import { routes } from '@/config/routes';
import { useProfile } from '@/hooks/useProfile';
import {
  AdminMenuDropdownItem,
  AdminMenuItem,
  adminMenuItems,
} from '@/layouts/hydrogen/menu-items';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export default function useAcl() {
  const { status, data } = useSession();
  const isSuperAdmin = data?.role?.name === ROLES.SuperAdmin;

  const superAdminOnly = useMemo(() => [routes.connection.connect], []);

  const isMain = process.env.NEXT_PUBLIC_CLINIC_TYPE === 'MAIN';
  const isMainOnly = useMemo(() => {
    return [routes.connection.api];
  }, []);

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

    return adminMenuItems.reduce((acc: AdminMenuItem[], item) => {
      if (
        typeof item.href === 'string' &&
        superAdminOnly.includes(item.href) &&
        !isSuperAdmin
      )
        return acc;

      const hasParentPermission =
        item.permissionReadName.length === 0 ||
        item.permissionReadName.some((perm) => permissionRead.includes(perm));

      if (!hasParentPermission) return acc;

      // let filteredItem = { ...item };
      let filteredItem: Partial<AdminMenuItem> = { ...item };

      if (item.dropdownItems?.length) {
        const filteredDropdowns = item.dropdownItems.reduce(
          (acc: AdminMenuDropdownItem[], dropdown) => {
            if (!isMain && isMainOnly.includes(dropdown.href)) {
              return acc;
            }

            if (
              dropdown.permissionReadName.length === 0 ||
              dropdown.permissionReadName.some((perm) =>
                permissionRead.includes(perm)
              )
            ) {
              acc.push(dropdown);
            }
            return acc;
          },
          []
        );

        if (filteredDropdowns.length > 0) {
          filteredItem.dropdownItems =
            filteredDropdowns as typeof item.dropdownItems;
        } else {
          // delete filteredItem.dropdownItems; // Clean up if empty
          const { dropdownItems, ...rest } = filteredItem;
          filteredItem = rest;
        }
      }

      acc.push(filteredItem as AdminMenuItem);
      return acc;
    }, []);
  }, [isMain, isMainOnly, isSuperAdmin, permissionRead, superAdminOnly]);

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
