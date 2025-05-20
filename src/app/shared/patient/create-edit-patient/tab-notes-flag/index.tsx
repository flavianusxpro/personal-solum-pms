'use client';

import ListTable from './list/table';

export default function TabNotesFlags({
  isView = false,
}: {
  isView?: boolean;
}) {
  return (
    <div className="grid">
      <ListTable />
    </div>
  );
}
