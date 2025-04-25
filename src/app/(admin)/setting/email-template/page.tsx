'use client';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import { PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import EmailTemplateTable from '@/app/shared/email-template/table/table';
import CreateEditEmailTemplateModal from '@/app/shared/email-template/modal/create-edit-modal';

const pageHeader = {
  title: 'Email Templates',
  breadcrumb: [
    {
      href: routes.setting.emailTemplate,
      name: 'Email Templates',
    },
    {
      name: 'List',
    },
  ],
};

export default function Page() {
  const { openModal } = useModal();
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Button
            onClick={() => {
              openModal({
                view: <CreateEditEmailTemplateModal />,
                size: 'xl',
              });
            }}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Template
            </Button>
          </Button>
        </div>
      </PageHeader>

      <EmailTemplateTable />
    </>
  );
}
