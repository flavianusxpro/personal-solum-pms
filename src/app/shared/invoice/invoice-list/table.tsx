'use client';

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@core/hooks/use-table';
import { useColumn } from '@core/hooks/use-column';
import { Button } from 'rizzui';
import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { getColumns, StatusSelect } from './columns';
import { useDeleteInvoice, useGetInvoices } from '@/hooks/useInvoice';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import { currencyAtom } from '@/store/currency';
import { useAtom } from 'jotai';
import { useProfile } from '@/hooks/useProfile';
import cn from '@core/utils/class-names';
import { useMedia } from '@core/hooks/use-media';
import { useSetAtom } from 'jotai';
import { summaryInvoiceAtom } from '@/store/invoice';
import { RiMailSendLine } from 'react-icons/ri';
import { GoCreditCard } from 'react-icons/go';
import { CiWallet } from 'react-icons/ci';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import ModalSendInvoice from './ModalSendInvoice';
import { useModal } from '../../modal-views/use-modal';

const FilterElement = dynamic(
  () => import('@/app/shared/invoice/invoice-list/filter-element'),
  {
    ssr: false,
    loading: () => <div className="p-4 text-center">Loading filters...</div>,
  }
);

const TableFooter = dynamic(() => import('@/app/shared/ui/table-footer'), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Loading footer...</div>,
});

const TableHeader = dynamic(() => import('@/app/shared/ui/table-header'), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Loading header...</div>,
});

const filterState = {
  createdAt: [null, null],
  status: null,
};

export default function InvoiceTableList() {
  const [currencyData] = useAtom(currencyAtom);
  const { data: dataProfile } = useProfile(true);
  const [filterStateValue, setFilterStateValue] = useState(filterState);
  const [isOpen, setIsOpen] = useState(false);
  const [idInvoice, setIdInvoice] = useState<string | number>('');
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    search: '',
  });
  const router = useRouter();
  const {
    data: dataInvoices,
    isLoading: isLoadingGetInvoices,
    refetch,
  } = useGetInvoices({
    page: params.page,
    perPage: params.pageSize,
    from: filterStateValue?.createdAt?.[0]
      ? dayjs(filterStateValue?.createdAt?.[0]).format('YYYY-MM-DD')
      : undefined,
    to: filterStateValue?.createdAt[1]
      ? dayjs(filterStateValue?.createdAt?.[1]).format('YYYY-MM-DD')
      : undefined,
    status: filterStateValue?.status || undefined,
    q: JSON.stringify({ patientName: params.search }),
    clinicId: dataProfile?.clinics?.[0]?.id,
  });

  const setSummaryInvoiceAtom = useSetAtom(summaryInvoiceAtom);
  useEffect(() => {
    if (dataInvoices) {
      setSummaryInvoiceAtom(dataInvoices.summary);
    }
  }, [dataInvoices]);
  const { openModal } = useModal();
  const { mutate: mutateDelete } = useDeleteInvoice();

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((ids: number[]) => {
    mutateDelete(ids, {
      onSuccess: () => {
        setIsOpen(false);
        refetch();
        toast.success('Invoice deleted successfully');
      },
      onError: (error: any) => {
        toast.error('Error deleting invoice: ' + error.response.data.message);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateFilter = useCallback(
    (columnId: string, filterValue: string | number | any[] | null) => {
      setFilterStateValue((prevState) => ({
        ...prevState,
        [columnId]: filterValue,
      }));
    },
    []
  );

  const handlerSearch = useCallback(
    debounce((value: string) => {
      setParams((prevState) => ({
        ...prevState,
        search: value,
      }));
    }, 500), // Reduced from 1000ms to 500ms
    []
  );

  const processedData = useMemo(() => {
    return dataInvoices?.data ?? [];
  }, [dataInvoices?.data]);

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    // updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(processedData, params.pageSize, filterStateValue);

  const columns = useMemo(
    () =>
      getColumns({
        data: processedData,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
        currencyData: currencyData.active,
        idInvoice,
        setIdInvoice,
        isOpen,
        setIsOpen,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      processedData,
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
      idInvoice,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  // Optimized useEffect to prevent unnecessary refetches
  useEffect(() => {
    if (params.page || params.pageSize || params.search) {
      refetch();
    }
  }, [params.page, params.pageSize, params.search, refetch]);

  const isMediumScreen = useMedia('(max-width: 6000px)', false);

  return (
    <>
      <div
        className={cn(
          '[&_.table-filter>div:first-child]:grow [&_.table-filter>div:first-child]:justify-between',
          !isMediumScreen &&
          '[&_.table-filter>div:first-child]:flex-row-reverse'
        )}
      >
        <ControlledTable
          variant="modern"
          data={tableData ?? []}
          isLoading={isLoading || isLoadingGetInvoices}
          showLoadingText={true}
          scroll={{
            x: 1560,
          }}
          onRow={(record) => ({
            onClick: () => {
              router.push(routes.invoice.details(record.id.toString()));
            },
            className: 'cursor-pointer',
          })}
          // @ts-ignore
          columns={visibleColumns}
          paginatorOptions={{
            pageSize: params.pageSize,
            setPageSize: (pageSize: number) =>
              setParams((p) => ({ ...p, pageSize })),
            total: dataInvoices?.count,
            current: params.page,
            onChange: (page: number) => setParams((p) => ({ ...p, page })),
          }}
          filterOptions={{
            searchTerm,
            onSearchClear: () => {
              handlerSearch('');
              handleSearch('');
            },
            onSearchChange: (event) => {
              handlerSearch(event.target.value);
              handleSearch(event.target.value);
            },
            hasSearched: isFiltered,
            columns,
            checkedColumns,
            setCheckedColumns,
            otherButton: [
              <div
                key='action-buttons'
                className='flex items-center gap-2'
              >
                {selectedRowKeys.length > 0 && (
                  <>
                    <Button
                      key="synchronize"
                      className="flex items-center gap-[4px] !bg-none"
                      variant="outline"
                      onClick={() => {
                        openModal({
                          view: <ModalSendInvoice />,
                          customSize: '900px',
                        });
                      }}
                      size='md'
                    >
                      <span>
                        <RiMailSendLine className="text-lg" />
                      </span>
                      <span>Send</span>
                    </Button>
                    <Button
                      key="synchronize"
                      className="flex items-center gap-[4px] !bg-none"
                      variant="outline"
                      onClick={() => { }}
                      size='md'
                    >
                      <span>
                        <GoCreditCard className="text-lg" />
                      </span>
                      <span>Pay Now</span>
                    </Button>
                    <StatusSelect
                      prefix={<CiWallet />}
                    />
                  </>
                )}
              </div>
            ]
          }}
          filterElement={
            <FilterElement
              isFiltered={isFiltered}
              filters={filters}
              updateFilter={updateFilter}
              handleReset={handleReset}
            />
          }
          // tableHeader={
          //   <TableHeader checkedItems={selectedRowKeys}>
          //     <StatusSelect />
          //   </TableHeader>
          // }
          tableFooter={
            <TableFooter
              checkedItems={selectedRowKeys}
              handleDelete={(ids: string[]) => {
                setSelectedRowKeys([]);
                onDeleteItem(ids.map((id) => parseInt(id)));
              }}
            >
            </TableFooter>
          }
          className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        />
      </div>
    </>
  );
}
