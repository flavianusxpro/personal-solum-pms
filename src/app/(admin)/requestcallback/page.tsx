import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/ui/page-header';
import { metaObject } from '@/config/site.config';
import RequestCallBackTable from '@/app/shared/request-call-back/table/table';
import { Button } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';

export const metadata = {
  ...metaObject('Callback Queue'),
};

const pageHeader = {
  title: 'Callback Queue',
  breadcrumb: [
    {
      href: routes.requestCallBack,
      name: 'Callback Queue',
    },
    {
      name: 'List',
    },
  ],
};

export default function Page() {
  return (
    <div>
      <PageHeader 
        title={pageHeader.title} 
        breadcrumb={pageHeader.breadcrumb}
      >
        <Button>
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          <span>Add Callback</span>
        </Button>
      </PageHeader>

      <RequestCallBackTable />
    </div>
  );
}
