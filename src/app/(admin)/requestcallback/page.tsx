import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/ui/page-header';
import { metaObject } from '@/config/site.config';
import RequestCallBackTable from '@/app/shared/request-call-back/table/table';

export const metadata = {
  ...metaObject('Request Call Back'),
};

const pageHeader = {
  title: 'Request Call Back',
  breadcrumb: [
    {
      href: routes.requestCallBack,
      name: 'Request Call Back',
    },
    {
      name: 'List',
    },
  ],
};

export default function Page() {
  return (
    <div>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <RequestCallBackTable />
    </div>
  );
}
