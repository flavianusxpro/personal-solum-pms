'use client';

import { PiArrowLineUpBold } from 'react-icons/pi';
import { Button } from 'rizzui';
import cn from '@core/utils/class-names';
import { exportToCSV } from '@core/utils/export-to-csv';
import { useCallback } from 'react';

type ExportButtonProps = {
  data: unknown[];
  header: string;
  fileName: string;
  className?: string;
};

export default function ExportButton({
  data,
  header,
  fileName,
  className,
}: ExportButtonProps) {
  const handleExport = useCallback(() => {
    exportToCSV(data, header, fileName);
  }, [data, header, fileName]);

  return (
    <Button
      variant="outline"
      onClick={handleExport}
      className={cn('w-full @lg:w-auto', className)}
    >
      <PiArrowLineUpBold className="me-1.5 h-[17px] w-[17px]" />
      Export
    </Button>
  );
}
