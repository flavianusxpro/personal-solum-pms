import ExportButton from '@/app/shared/export-button';
import PageHeader from '@/app/shared/page-header';
import ProductTable from '@/app/shared/tableDataProduct/table';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';
import { productData } from '@/data/product-data';
import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui';

export const metadata = {
  ...metaObject('Products'),
};

const pageHeader = {
  title: 'Products',
  breadcrumb: [
    {
      href: routes.eCommerce.orders,
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
          <ExportButton
            data={productData}
            fileName="order_data"
            header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          />
          <Link
            href={routes.product.create}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Products
            </Button>
          </Link>
        </div>
      </PageHeader>

      <ProductTable data={productData} />
    </>
  );
}
