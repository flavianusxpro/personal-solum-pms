'use client';

import Footer from './footer';
import PriceEstimationCost from './price-estimation';

export default function AppointmentPayment() {
  return (
    <>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
        <PriceEstimationCost showCancelButton={false} />
      </div>
      <Footer />
    </>
  );
}
