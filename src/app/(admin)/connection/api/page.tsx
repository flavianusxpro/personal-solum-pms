import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/ui/page-header';
import ApiTable from '@/app/shared/connection-api/table/table';

const pageHeader = {
  title: 'Connection',
  breadcrumb: [
    {
      href: routes.connection.api,
      name: 'Connection',
    },
    {
      href: routes.connection.api,
      name: 'Api',
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

      <ApiTable />
    </>
  );
}
