'use client';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/ui/page-header';
import { PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateEditCouponModal from '@/app/shared/coupon/modal/create-edit-modal';
import CouponTable from '@/app/shared/coupon/table/table';

const pageHeader = {
  title: 'Coupon',
  breadcrumb: [
    {
      href: routes.marketing.coupon,
      name: 'Coupon',
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
                view: <CreateEditCouponModal />,
                customSize: '600px',
              });
            }}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Coupon
            </Button>
          </Button>
        </div>
      </PageHeader>

      <CouponTable />
    </>
  );
}
