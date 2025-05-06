'use client';
import TaxSettingTable from '@/app/shared/tax-settings/table/table';
import FormGroup from '@/app/shared/ui/form-group';

export default function Page() {
  return (
    <>
      <FormGroup
        title="Tax Settings"
        description="Manage your tax settings here. You can add, edit, or delete tax rates as per your requirements."
        className="mb-10 pt-7 @2xl:pt-9 @3xl:pt-11"
      />
      <TaxSettingTable />;
    </>
  );
}
