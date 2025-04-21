import { Metadata } from 'next';
import CreateEditProduct from '@/app/shared/product/create-edit-product';
import PageHeader from '@/app/shared/ui/page-header';
import { metaObject } from '@/config/site.config';
import { routes } from '@/config/routes';

type Props = {
  params: { slug: string };
};

/**
 * for dynamic metadata
 * @link: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  return metaObject(`Edit ${slug}`);
}

const pageHeader = {
  title: 'Edit Product',
  breadcrumb: [
    {
      href: routes.product.dashboard,
      name: 'Products',
    },
    {
      name: 'Edit',
    },
  ],
};

export default function EditProductPage({
  params,
}: {
  params: { slug: string };
}) {
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
