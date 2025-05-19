'use client';

import { Button, Text } from 'rizzui';

interface TableHeaderProps {
  checkedItems: string[];
  isCustomHeader?: boolean;
}

export default function TableHeader({
  checkedItems,
  children,
  isCustomHeader = false,
}: React.PropsWithChildren<TableHeaderProps>) {
  if (isCustomHeader) {
    return (
      <div className="sticky left-0 top-0 z-10 mb-2.5 flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm dark:border-gray-300 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
        {children}
      </div>
    );
  }

  if (checkedItems?.length === 0) {
    return null;
  }

  return (
    <div className="sticky left-0 top-0 z-10 mb-2.5 flex w-full items-center justify-between rounded-md border border-gray-300 bg-gray-0 px-5 py-3.5 text-gray-900 shadow-sm dark:border-gray-300 dark:bg-gray-100 dark:text-white dark:active:bg-gray-100">
      <div>
        <Text as="strong">{checkedItems?.length}</Text> selected{' '}
      </div>
      {children}
    </div>
  );
}
