import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/ui/page-header';
import ApiTable from '@/app/shared/connection-api/table/table';
import ModalButton from '@/app/shared/ui/modal/modal-button';
import CreateEditApiModal from '@/app/shared/connection-api/modal/create-edit-modal';

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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton view={<CreateEditApiModal />} />
      </PageHeader>

      <ApiTable />
    </>
  );
}
