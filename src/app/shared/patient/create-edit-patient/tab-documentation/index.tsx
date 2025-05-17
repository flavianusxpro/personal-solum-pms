'use client';

import ListTable from './list/table';
import Stats from './stats';

export default function TabDocumentation({
  isView = false,
}: {
  isView?: boolean;
}) {
  return (
    <div className="grid">
      {/* <Stats className="mb-6 @5xl:mb-8 @7xl:mb-11" /> */}
      <ListTable />
    </div>
  );
}
