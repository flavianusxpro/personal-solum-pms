'use client';

import FormGroup from '@/app/shared/ui/form-group';
import { Grid } from 'rizzui';
import { useParams } from 'next/navigation';
import ActivityTable from './table-activity/table';

export default function TabActivity({ isView = false }: { isView?: boolean }) {
  const id = useParams<{ id: string }>().id;

  return (
    <Grid gap="4">
      <FormGroup title="Activity" className="" />
      <ActivityTable />
    </Grid>
  );
}
