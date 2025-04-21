import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/ui/page-header';
import { metaObject } from '@/config/site.config';
import CreateEditProduct from '@/app/shared/product/create-edit-product';

export const metadata = {
  ...metaObject('Product Details'),
};

export default function ProductDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Product Detail',
    breadcrumb: [
      {
        href: routes.product.dashboard,
        name: 'Product',
      },
      {
        name: 'detail',
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <CreateEditProduct />
    </>
  );
}
