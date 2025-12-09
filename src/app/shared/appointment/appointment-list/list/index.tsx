'use client';

import dynamic from 'next/dynamic';
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { GetColumns } from '@/app/shared/appointment/appointment-list/list/columns';
import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { useMedia } from '@core/hooks/use-media';
import { useTable } from '@core/hooks/use-table';
import { useColumn } from '@core/hooks/use-column';
import cn from '@core/utils/class-names';
import {
  useDeleteAppointment,
  useGetAppointments,
} from '@/hooks/useAppointment';
import { useModal } from '@/app/shared/modal-views/use-modal';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import { useProfile } from '@/hooks/useProfile';
import TableHeader from '@/app/shared/ui/table-header';
import { StatusSelect } from '@/app/shared/invoice/invoice-list/columns';
import AppointmentDetails from './appointment-details';
import { Button } from 'rizzui';
import { BsArrowRepeat } from 'react-icons/bs';
import ShowConfirm from '../../modal/confirm-modal';
import CSelect from '@/core/ui/select';

const TableFooter = dynamic(() => import('@/app/shared/ui/table-footer'), {
  ssr: false,
});
const FilterElement = dynamic(
  () => import('@/app/shared/appointment/appointment-list/list/filter-element'),
  { ssr: false }
);

const filterState = {
  createdAt: [null, null],
  payment_status: null,
  status: null,
  by_reschedule: null,
  inactive_patients_months: null,
  doctor: null,
  patient: null,
  filter_no_consent_form: null,
  filter_unverified_email: null,
  filter_no_ihi: null,
  filter_incomplete_address: null,
  filter_invalid_mobile: null,
};

export default function AppointmentListTable({
  range,
  setRange,
}: {
  range: string | null | undefined;
  setRange?: React.Dispatch<SetStateAction<string | null | undefined>>;
}) {
  const { isOpen: open, closeModal } = useModal();
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [filterStateValue, setFilterStateValue] = useState(filterState);
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [_, setCheckedItems] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [idAppointment, setIdAppointment] = useState<string | number>('');
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    search: '',
  });
  const aptStatusOptions = [
    { label: 'Draft', value: 1 },
    { label: 'Scheduled', value: 2 },
    { label: 'Checked In', value: 3 },
    { label: 'Finished', value: 4 },
    { label: 'Cancelled', value: 5 },
    { label: 'On Going', value: 6 },
    { label: 'No Show', value: 7 },
  ];
  const { data: dataProfile } = useProfile(true);
  const {
    data: dataAppointments,
    isLoading: isLoadingGetAppointments,
    refetch,
  } = useGetAppointments({
    range: range ? range : undefined,
    page: params.page,
    perPage: params.perPage,
    q: JSON.stringify({
      patient_search: params.search ? params.search : undefined,
      status: filterStateValue?.status || undefined,
      doctorId: filterStateValue?.doctor ? filterStateValue?.doctor : undefined,
      patientId: filterStateValue?.patient
        ? filterStateValue?.patient
        : undefined,
      inactive_patients_months: filterStateValue?.inactive_patients_months
        ? Number(filterStateValue?.inactive_patients_months)
        : undefined,
      payment_status: filterStateValue?.payment_status || undefined,
      by_reschedule: filterStateValue?.by_reschedule || undefined,
      clinicId: dataProfile?.clinics[0].id || 0,
      from: filterStateValue?.createdAt?.[0]
        ? dayjs(filterStateValue?.createdAt?.[0]).format('YYYY-MM-DD')
        : undefined,
      to: filterStateValue?.createdAt?.[1]
        ? dayjs(filterStateValue?.createdAt?.[1]).format('YYYY-MM-DD')
        : undefined,
    }),
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
    timezone_client: localTimezone,
  });

  // let dataAppointments = 

  const { mutate } = useDeleteAppointment();
  const isMediumScreen = useMedia('(max-width: 6000px)', false);
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback(
    (ids: number[]) => {
      mutate(ids, {
        onSuccess: () => {
          setIsOpen(false);
          toast.success('Appointment deleted successfully');
          refetch();
        },
        onError: (error: any) => {
          console.error('Failed to delete appointment:', error);
          toast.error(
            'Failed to delete appointment: ' + error.response.data.message
          );
        },
      });
    },
    [mutate, refetch]
  );

  const handlerSearch = useMemo(
    () =>
      debounce((value: string) => {
        setParams((prevState) => ({
          ...prevState,
          search: value,
        }));
      }, 2000),
    []
  );

  const onChecked = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setCheckedItems((prevItems) => [...prevItems, id]);
    } else {
      setCheckedItems((prevItems) => prevItems.filter((item) => item !== id));
    }
  };

  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (!isResetting) {
      setRange?.(null);
    }
  }, [filterStateValue.createdAt]);

  useEffect(() => {
    if (range !== null && !isResetting) {
      setIsResetting(true);

      setFilterStateValue((prev) => ({
        ...prev,
        createdAt: [null, null],
      }));

      setTimeout(() => setIsResetting(false), 0);
    }
  }, [range]);

  const updateFilter = useCallback(
    (columnId: string, filterValue: string | number | any[] | null) => {
      setFilterStateValue((prevState) => ({
        ...prevState,
        [columnId]: filterValue,
      }));
    },
    []
  );

  const showConfirmModal = (
    id: number,
    onClick: (value: number) => void,
    status: string
  ) => {
    closeModal(),
      openModal({
        view: <ShowConfirm onClick={onClick} status={status} id={id} />,
        customSize: '550px',
      });
  };

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    // totalItems,
    handlePaginate,
    filters,
    // updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    // handleDelete,
    handleReset,
    handleSelectAllRow,
    // handleRowSelect,
    handleSelectRow,
    setSelectedRowKeys,
    selectedRowKeys,
  } = useTable(dataAppointments?.data ?? [], params.perPage, filterStateValue);

  const sortedTableData = useMemo(() => {
    return [...tableData].sort((a, b) => {
      if (a.status === 4 && b.status !== 4) return 1;
      if (a.status !== 4 && b.status === 4) return -1;
      return 0;
    });
  }, [tableData]);

  const columns = useMemo(
    () =>
      GetColumns({
        data: dataAppointments?.data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleSelectRow,
        handleSelectAllRow,
        idAppointment,
        setIdAppointment,
        isOpen,
        setIsOpen,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      onChecked,
      isOpen,
      idAppointment,
    ]
  );

  const isPastAppointment = dataAppointments?.data?.some((item) => {
    const appointmentDate = new Date(item?.date);
    const now = new Date();
    if (isNaN(appointmentDate.getTime())) return false;

    return item?.status === 2 && appointmentDate < now;
  });

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  useEffect(() => {
    refetch();
  }, [open, refetch, filterStateValue, params]);

  const { openModal } = useModal();
  const hasNonCompletedStatus = selectedRowKeys.some(
    (item: any) => item.payment?.status !== 2
  );

  function getStatusButtonType(record: any) {
    const { date, status } = record;
    if (!date) return null;

    const appointmentDate = new Date(date);
    if (isNaN(appointmentDate.getTime())) return null;

    const currentDate = new Date();
    const diffMinutes =
      (appointmentDate.getTime() - currentDate.getTime()) / (1000 * 60);

    const isWithin30Minutes = diffMinutes > 0 && diffMinutes <= 30;
    const isPastAppointment = appointmentDate < currentDate;

    if (isPastAppointment && status !== 4) return 'FINISHED';
    if (isWithin30Minutes && ![3, 4, 5].includes(status)) return 'CHECKIN';

    return null;
  }

  const buttonTypes = selectedRowKeys.map((item) => getStatusButtonType(item));

  const isAllSame = buttonTypes.every(
    (type) => type === buttonTypes[0] && type !== null
  );

  const buttonType = isAllSame ? buttonTypes[0] : null;

  useEffect(() => {
    setParams(prev => ({ ...prev, page: 1 }));
  }, [
    range,
    params.search,
    filterStateValue?.status,
    filterStateValue?.doctor,
    filterStateValue?.patient,
    filterStateValue?.inactive_patients_months,
    filterStateValue?.payment_status,
    filterStateValue?.by_reschedule,
    dataProfile?.clinics?.[0]?.id,
    filterStateValue?.createdAt,
    filterStateValue?.filter_no_consent_form,
    filterStateValue?.filter_unverified_email,
    filterStateValue?.filter_no_ihi,
    filterStateValue?.filter_incomplete_address,
    filterStateValue?.filter_invalid_mobile,
  ]);

  return (
    <div
      className={cn(
        '[&_.table-filter>div:first-child]:grow [&_.table-filter>div:first-child]:justify-between',
        !isMediumScreen && '[&_.table-filter>div:first-child]:flex-row-reverse'
      )}
    >
      <ControlledTable
        variant="modern"
        isLoading={isLoading || isLoadingGetAppointments}
        showLoadingText={true}
        data={sortedTableData ?? []}
        scroll={{
          x: 1560,
        }}
        onRow={(record, index) => ({
          onClick: () => {
            openModal({
              view: <AppointmentDetails data={record} />,
              customSize: '1100px',
            });
          },
        })}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize: params.perPage,
          setPageSize: (page) => setParams({ ...params, perPage: page }),
          total: dataAppointments?.count,
          current: isFilter ? 1 : currentPage,
          onChange: (page: number) => {
            handlePaginate(page);
            setParams({ ...params, page });
            setIsFilter(false);
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
          columns,
          checkedColumns,
          setCheckedColumns,
          otherButton: [
            ...(isPastAppointment
              ? [
                <Button
                  key="create"
                  className="flex items-center gap-[4px] me-2.5 h-9 pe-3 ps-2.5"
                  onClick={() => { }}
                >
                  <span>
                    <BsArrowRepeat className="text-lg" />
                  </span>
                  <span>Required</span>
                </Button>,
              ]
              : []),
          ],
        }}
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        filterElement={
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
            setIsFilter={setIsFilter}
          />
        }
        tableHeader={
          <TableHeader checkedItems={selectedRowKeys}>
            <div className='flex gap-1 items-center'>
              <Button
                key="create"
                className="flex items-center gap-[4px] me-2.5 h-10 pe-3 ps-2.5 !bg-none"
                variant='outline'
                onClick={() => { }}
              >
                <span>
                  <BsArrowRepeat className="text-lg" />
                </span>
                <span>Synchronize</span>
              </Button>

              {hasNonCompletedStatus && <StatusSelect />}
              {buttonType && (
                <div>
                  <CSelect
                    className="min-w-[140px]"
                    dropdownClassName="h-auto"
                    placeholder="Select Status"
                    options={aptStatusOptions}
                    value=""
                    onChange={() => { }}
                  // onChange={handleChange}
                  // isLoading={isPending}
                  // displayValue={(option: { value: number }) =>
                  //   getAptStatusBadge(option.value)
                  // }
                  />
                </div>
              )}
            </div>
          </TableHeader>
        }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              onDeleteItem(ids.map((id) => parseInt(id)));
            }}
          ></TableFooter>
        }
      />
    </div>
  );
}
