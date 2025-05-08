'use client';

import { useProfile } from '@/hooks/useProfile';
import { adminMenuItems } from '@/layouts/hydrogen/menu-items';
import { signOut } from 'next-auth/react';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

export default function useAcl() {
  const {
    data: dataProfile,
    isLoading: isLoadingProfile,
    isSuccess,
    isError,
    error,
  } = useProfile();

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

  useEffect(() => {
    if (isError) {
      console.log('🚀 ~ useAcl ~ error:', error);
      toast.error('Please login again to continue');
      signOut();
    }
  }, [error, isError]);

  return { menuItems, isLoadingProfile, isSuccess, permissionRead };
}
