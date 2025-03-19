import { routes } from '@/config/routes';
import Link from 'next/link';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
// import OrdersTable from '@/app/shared/ecommerce/order/order-list/table';
import ExportButton from '@/app/shared/export-button';
import DoctorTable from '@/app/shared/tableDataDoctor/table';
import { metaObject } from '@/config/site.config';
import { doctorData } from '@/data/doctor-data';
import { PiPlusBold } from 'react-icons/pi';
import DoctorList from './DoctorList';

export const metadata = {
  ...metaObject('Doctors'),
};

const pageHeader = {
  title: 'Doctors',
  breadcrumb: [
    {
      href: routes.eCommerce.orders,
      name: 'Doctors',
    },
    {
      name: 'List',
    },
  ],
};

export default function DoctorPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={doctorData}
            fileName="order_data"
            header="Order ID,Name,Email,Avatar,Items,Price,Status,Created At,Updated At"
          />
          <Link
            href={routes.doctor.create}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Add Doctor
            </Button>
          </Link>
        </div>
      </PageHeader>

      {/* <DoctorList data={doctorData} /> */}
    </>
  );
}
