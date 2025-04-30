import { PiCaretDownBold } from 'react-icons/pi';
import Pagination, { type PaginationProps } from '@core/ui/pagination';
import { Select } from 'rizzui';
import cn from '@core/utils/class-names';

const paginationLimitOptions = [5, 10, 15, 20, 25].map((v, idx) => ({
  id: idx,
  label: String(v),
  value: v,
}));

export type TablePaginationProps = {
  pageSize: number;
  setPageSize?: (value: number) => void;
  paginatorClassName?: string;
} & PaginationProps;

export default function TablePagination({
  pageSize,
  setPageSize,
  total,
  paginatorClassName = 'p-5',
  ...props
}: TablePaginationProps) {
  return (
    <div
      className={cn(
        'table-pagination flex items-center justify-center sm:justify-between',
        paginatorClassName
      )}
    >
      {!setPageSize ? (
        total && (
          <div className="hidden text-gray-500 sm:inline-flex">
            {props.current} of {Math.ceil(total / pageSize)} pages
          </div>
        )
      ) : (
        <div className="hidden items-center sm:flex">
          Rows per page:{' '}
          <Select
            options={paginationLimitOptions}
            onChange={setPageSize}
            size="sm"
            variant="flat"
            value={pageSize}
            getOptionValue={({ value }) => value}
            suffix={<PiCaretDownBold />}
            dropdownClassName="!p-1.5 border w-12 border-gray-100 !z-20 shadow-lg dropdownClassName"
            className="z-30 ms-1 w-auto [&_button]:font-medium"
            optionClassName="px-1"
          />
        </div>
      )}
      <Pagination
        total={total}
        pageSize={pageSize}
        defaultCurrent={1}
        showLessItems={true}
        prevIconClassName="py-0 text-gray-500 !leading-[26px]"
        nextIconClassName="py-0 text-gray-500 !leading-[26px]"
        {...props}
      />
    </div>
  );
}
