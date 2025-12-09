'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@core/hooks/use-table';
import { useColumn } from '@core/hooks/use-column';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';
import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { ActionIcon, Button } from 'rizzui';
import ExpandedOrderRow from '@/app/shared/patient/table/expanded-row';
import { getColumns } from './columns';
import { useDeletePatient, useGetAllPatients } from '@/hooks/usePatient';
import debounce from 'lodash/debounce';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import TableFooter from '../../ui/table-footer';
import { useProfile } from '@/hooks/useProfile';
import TableHeader from '../../ui/table-header';
import { StatusSelect } from '../../invoice/invoice-list/columns';
import { FiSend } from 'react-icons/fi';
import PatientDetailModal from './patient-detail-modal';
import { IGetAllPatientsResponse } from '@/types/ApiResponse';

const FilterElement = dynamic(
  () => import('@/app/shared/patient/table/filter-element'),
  { ssr: false }
);

function CustomExpandIcon(props: any) {
  return (
    <ActionIcon
      size="sm"
      variant="outline"
      rounded="full"
      className="expand-row-icon ms-2"
      onClick={(e) => {
        props.onExpand(props.record, e);
      }}
    >
      {props.expanded ? (
        <PiCaretUpBold className="h-3.5 w-3.5" />
      ) : (
        <PiCaretDownBold className="h-3.5 w-3.5" />
      )}
    </ActionIcon>
  );
}

const filterState = {
  createdAt: [null, null],
  status: null,
  condition: null,
  filter_no_consent_form: null,
  filter_unverified_email: null,
  filter_no_ihi: null,
  filter_incomplete_address: null,
  filter_invalid_mobile: null,
};

export default function PatientTable() {
  const [filterStateValue, setFilterStateValue] = useState(filterState);
  const [isOpen, setIsOpen] = useState(false);
  const [idPatient, setIdPatient] = useState<string | number>('');
  const [selectedPatient, setSelectedPatient] = useState<IGetAllPatientsResponse['data'][number] | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    search: '',
  });

  const { data: dataProfile } = useProfile(true);
  const {
    data,
    isLoading: isLoadingGetAllPatients,
    refetch,
  } = useGetAllPatients({
    page: params.page,
    perPage: params.perPage,
    from: filterStateValue?.createdAt?.[0]
      ? dayjs(filterStateValue?.createdAt?.[0]).format('YYYY-MM-DD')
      : undefined,
    to: filterStateValue?.createdAt?.[1]
      ? dayjs(filterStateValue?.createdAt?.[1]).format('YYYY-MM-DD')
      : undefined,
    q: JSON.stringify({
      name: params.search,
      status: filterStateValue?.status || undefined,
    }),
    clinicId: dataProfile?.clinics?.[0]?.id || 0,
    filter_no_consent_form: filterStateValue?.filter_no_consent_form
      ? (filterStateValue.filter_no_consent_form === 'true' ? true : false)
      : undefined,
    filter_unverified_email: filterStateValue?.filter_unverified_email
      ? (filterStateValue.filter_unverified_email === 'true' ? true : false)
      : undefined,
    filter_no_ihi: filterStateValue?.filter_no_ihi
      ? (filterStateValue.filter_no_ihi === 'true' ? true : false)
      : undefined,
    filter_incomplete_address: filterStateValue?.filter_incomplete_address
      ? (filterStateValue.filter_incomplete_address === 'true' ? true : false)
      : undefined,
    filter_invalid_mobile: filterStateValue?.filter_invalid_mobile
      ? (filterStateValue.filter_invalid_mobile === 'true' ? true : false)
      : undefined,
  });

  const { mutate: mutateDeletePatient } = useDeletePatient();

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(
    (ids: number[]) => {
      mutateDeletePatient(ids, {
        onSuccess: () => {
          setIsOpen(false);
          refetch();
          toast.success('Patient deleted successfully');
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
            error?.message ||
            'Something went wrong'
          );
        },
      });
    },
    [mutateDeletePatient, refetch]
  );

  const updateFilter = useCallback(
    (columnId: string, filterValue: string | number | any[] | null) => {
      setFilterStateValue((prevState) => ({
        ...prevState,
        [columnId]: filterValue,
      }));
    },
    []
  );

  const handleReset = useCallback(() => {
    setFilterStateValue(filterState);
  }, []);

  const handlerSearch = debounce((value: string) => {
    setParams((prevState) => ({
      ...prevState,
      search: value,
    }));
  }, 1000);

  const {
    isLoading,
    isFiltered,
    tableData,
    handlePaginate,
    filters,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleSelectRow,
    handleSelectAllRow,
  } = useTable(data?.data ?? [], params.perPage, filterStateValue);

  const columns = React.useMemo(
    () =>
      getColumns({
        data: data?.data ?? [],
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleSelectRow,
        handleSelectAllRow,
        isOpen,
        setIsOpen,
        idPatient,
        setIdPatient,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleSelectRow,
      handleSelectAllRow,
      isOpen,
    ]
  );


  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  useEffect(() => {
    refetch();
  }, [params, refetch, filterStateValue]);

  useEffect(() => {
    setParams(prev => ({ ...prev, page: 1 }));
  }, [
    params.search,
    filterStateValue?.createdAt,
    filterStateValue?.status,
    filterStateValue?.condition,
    filterStateValue?.filter_no_consent_form,
    filterStateValue?.filter_unverified_email,
    filterStateValue?.filter_no_ihi,
    filterStateValue?.filter_incomplete_address,
    filterStateValue?.filter_invalid_mobile,
  ]);

  return (
    <div>
      <ControlledTable
        variant="modern"
        data={tableData ?? []}
        isLoading={isLoading || isLoadingGetAllPatients}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        onRow={(record) => ({
          onClick: (e) => {
            const target = e.target as HTMLElement;
            const isExcludedCell = target.closest('.no-row-click');

            if (!isExcludedCell) {
              setSelectedPatient(record);
              setIsDetailModalOpen(true);
            }
          },
        })}
        paginatorOptions={{
          pageSize: params.perPage,
          setPageSize: (pageSize: number) =>
            setParams((prevState) => ({
              ...prevState,
              perPage: pageSize,
            })),
          total: data?.count,
          current: params.page,
          onChange: (page: number) => {
            setParams((prevState) => ({
              ...prevState,
              page: page,
            }));
          },
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
            handlerSearch('');
          },
          onSearchChange: (event) => {
            handlerSearch(event.target.value);
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          hideIndex: 1,
          columns,
          checkedColumns,
          setCheckedColumns,
          otherButton: [
            () => {
              const hasFilledConsentForm =
                selectedRowKeys.length > 0 &&
                selectedRowKeys.every((data) => data.has_filled_consent_form === true);

              return (
                hasFilledConsentForm && (
                  <Button
                    size="sm"
                    className="me-2.5 h-9 pe-3 ps-2.5"
                    onClick={() => {
                      console.log("checkedColumns ========>>>", checkedColumns);
                    }}
                  >
                    <FiSend className="me-1.5 h-[18px] w-[18px]" strokeWidth={1.7} />
                    Send Consent Form
                  </Button>
                )
              );
            },
          ]
        }}
        filterElement={
          <FilterElement
            isFiltered={false}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
        }
        tableHeader={
          <TableHeader checkedItems={selectedRowKeys}>
            <StatusSelect />
          </TableHeader>
        }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              onDeleteItem(ids.map((id) => parseInt(id)));
            }}
          />
        }
        className={
          'rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0'
        }
      />
      {selectedPatient && (
        <PatientDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          data={selectedPatient}
        />
      )}
    </div>
  );
}
