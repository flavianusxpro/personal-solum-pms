'use client';
import PageHeader from '@/app/shared/ui/page-header';
import ProductTable from '@/app/shared/product/tableDataProduct/table';
import { routes } from '@/config/routes';
import ModalButton from '@/app/shared/ui/modal-button/modal-button';
import CreateEditItemModal from '@/app/shared/product/modal/create-edit-modal';

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    {
      href: routes.management.product.list,
      name: 'Products',
    },
    {
      name: 'List',
    },
  ],
};

export default function ProductPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton
            data={productData}
            fileName="order_data"
            header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          /> */}
          <ModalButton view={<CreateEditItemModal />} />
        </div>
      </PageHeader>

      <ProductTable />
    </>
  );
}
