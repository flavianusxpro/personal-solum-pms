'use client';
import TaxSettingTable from '@/app/shared/tax-settings/table/table';
import FormGroup from '@/app/shared/ui/form-group';

export default function Page() {
  return (
    <>
      <FormGroup
        title=""
        description=""
        className="mb-4 pt-7 @2xl:pt-9 @3xl:pt-11"
      />
      <TaxSettingTable />;
    </>
  );
}
