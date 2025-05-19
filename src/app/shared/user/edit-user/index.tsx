'use client';
import { routes } from '@/config/routes';
import PageHeader from '../../ui/page-header';
import { TabButton } from '../../ui/tab-button';
import { startTransition, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import UserDetails from './tab-user-details';
import TabPassword from './tab-password';
import TabActivity from './tab-activity';
import { useParams } from 'next/navigation';
import { useGetUserById } from '@/hooks/useUser';
import useQueryParams from '@/core/hooks/use-query-params';

export const navItems = [
  {
    value: 'user',
    label: 'User Details',
  },
  {
    value: 'password',
    label: 'Password',
  },
  {
    value: 'activity',
    label: 'Activity',
  },
];

export default function EditUser({ isView = false }: { isView?: boolean }) {
  const id = useParams().id as string;
  const query = useQueryParams().getParams();
  const isTabPassword = query.tab === 'password';
  const isTabActivity = query.tab === 'activity';

  const [tab, setTab] = useState(navItems[0].value);

  const { data: dataUser } = useGetUserById(id);

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const pageHeader = {
    title: id ? `${dataUser?.name ?? '-'}` : 'Create User',
    breadcrumb: [
      {
        href: routes.user.dashboard,
        name: 'Users',
      },
      {
        name: 'Account Settings',
      },
    ],
  };

  useEffect(() => {
    if (isTabPassword) {
      setTab('password');
    } else if (isTabActivity) {
      setTab('activity');
    } else {
      setTab('user');
    }
  }, [isTabPassword, isTabActivity]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex flex-col @container">
        <SimpleBar>
          <nav className="mb-7 flex items-center gap-5 border-b border-gray-300 md:gap-7 lg:gap-10">
            {navItems.map((nav) => (
              <TabButton
                item={nav}
                key={nav.value}
                isActive={tab === nav.value}
                onClick={() => selectTab(nav.value)}
                //   disabled={isPending}
              />
            ))}
          </nav>
        </SimpleBar>

        {tab === 'user' && <UserDetails isView={isView} />}
        {tab === 'password' && <TabPassword isView={isView} />}
        {tab === 'activity' && <TabActivity isView={isView} />}
      </div>
    </>
  );
}
