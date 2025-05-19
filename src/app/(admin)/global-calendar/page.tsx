import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/ui/page-header';
import GlobalCalendarTable from '@/app/shared/global-calendar/table/table';

const pageHeader = {
  title: 'Global Calendar',
  breadcrumb: [
    {
      href: routes.globalCalendar,
      name: 'Global Calendar',
    },
    {
      name: 'List',
    },
  ],
};

export default function Page() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <GlobalCalendarTable />
    </>
  );
}
