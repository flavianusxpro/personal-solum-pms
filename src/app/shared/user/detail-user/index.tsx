'use client';
import { routes } from '@/config/routes';
import PageHeader from '../../ui/page-header';
import { TabButton } from '../../ui/tab-button';
import { startTransition, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import TabActivity from '../edit-user/tab-activity';
import { useParams } from 'next/navigation';
import { useGetUserById } from '@/hooks/useUser';
import useQueryParams from '@/core/hooks/use-query-params';

export const navItems = [
  {
    value: 'activity',
    label: 'Activity',
  },
];

export default function DetailUser({ isView = false }: { isView?: boolean }) {
  const id = useParams().id as string;
  const query = useQueryParams().getParams();
  const isTabActivity = query.tab === 'activity';

  const [tab, setTab] = useState(navItems[0].value);

  const { data: dataUser } = useGetUserById(id);

  function selectTab(nextTab: string) {
    startTransition(() => {
      setTab(nextTab);
    });
  }

  const pageHeader = {
    title: 'Detail User',
    breadcrumb: [
      {
        href: routes.user.dashboard,
        name: 'Users',
      },
      {
        name: 'Detail',
      },
    ],
  };

  useEffect(() => {
    setTab('activity');
  }, [isTabActivity]);

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
        {tab === 'activity' && <TabActivity isView={isView} />}
      </div>
    </>
  );
}
