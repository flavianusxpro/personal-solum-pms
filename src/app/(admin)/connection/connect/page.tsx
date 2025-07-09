import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/ui/page-header';
import Connection from '@/app/shared/connection-connect';

const pageHeader = {
  title: 'Connection',
  breadcrumb: [
    {
      href: routes.connection.connect,
      name: 'Connection',
    },
    {
      href: routes.connection.connect,
      name: 'Connect',
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

      <Connection />
    </>
  );
}
