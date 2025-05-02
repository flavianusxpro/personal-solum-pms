import CreateEditProduct from '@/app/shared/product/create-edit-product';
import PageHeader from '@/app/shared/ui/page-header';
import { routes } from '@/config/routes';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Create Product'),
};

const pageHeader = {
  title: 'Create New Product',
  breadcrumb: [
    {
      href: routes.management.product.list,
      name: 'Product',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateProductPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateEditProduct />
    </>
  );
}
