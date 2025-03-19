"use client"

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiList } from '@/app/api/api_list';
import { ResponseAPI } from '@/types';
import UsersTable from '@/app/shared/roles-permissions/users-table';

const UserList: React.FC = () => {
  const { data: users, error, isLoading } = useQuery<ResponseAPI>({
    queryKey: ['users'],
    queryFn: async () => await apiList.users(),
  });

  console.log(users)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching appointment data: {error.message}</div>;
  }

  return (
    <UsersTable data={users?.users as any} />

  );
};

export default UserList;