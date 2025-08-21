'use client';

import Footer from './footer';
import PriceEstimationCost from './price-estimation';
import { useState } from 'react';

export default function AppointmentPayment() {
  const [showSaveButton, setShowSaveButton] = useState(true);
  return (
    <>
      <div className="space-y-5 px-5 pb-6 pt-5 md:px-7 md:pb-9 md:pt-7">
        <PriceEstimationCost
          showCancelButton={false}
          onSuccessPayment={() => setShowSaveButton(false)}
        />
      </div>
      <Footer showSaveButton={showSaveButton} />
    </>
  );
}
