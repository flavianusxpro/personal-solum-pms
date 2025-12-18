import ControlledTable from '@/app/shared/ui/controlled-table'
import React, { useCallback, useMemo, useState } from 'react'
import { GetColumns } from './columns';
import { useTable } from '@/core/hooks/use-table';
import { debounce } from 'lodash';
import { useColumn } from '@/core/hooks/use-column';
import { Button } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ModalAddEditSpecialistLetter from './ModalAddEditSpecialistLetter';
import ModalDetailSpecialistLetter from './ModalDetailSpecialistLetter';

const TabSpecialistLetter = () => {
  const { openModal } = useModal();
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    search: '',
  });

  const data = [
    {
      id: 1,
      specialistType: 'ENT Specialist',
      reasonForReferral: 'Persistent sinus symptoms not improving with current medication.',
      referredBy: 'Dr. Emily',
      createdAt: '01/12/2025 7:56 AM',
    },
    {
      id: 2,
      specialistType: 'Orthopaedic',
      reasonForReferral: 'Chronic lower back pain requiring imaging and further evaluation.',
      referredBy: 'Dr. Benjamin',
      createdAt: '21/11/2025 7:56 AM',
    },
    {
      id: 3,
      specialistType: 'Dermatologist',
      reasonForReferral: 'Recurrent eczema flare-ups despite prescribed medication.',
      referredBy: 'Dr. Aaron',
      createdAt: '19/11/2025 7:56 AM',
    },
    {
      id: 4,
      specialistType: 'Cardiologist',
      reasonForReferral: 'Irregular heartbeat observed during routine checkup.',
      referredBy: 'Dr. Lee',
      createdAt: '17/11/2025 7:56 AM',
    },
    {
      id: 5,
      specialistType: 'Gastroenterologist',
      reasonForReferral: 'Abdominal discomfort with suspected GERD symptoms.',
      referredBy: 'Dr. Emily',
      createdAt: '16/11/2025 7:56 AM',
    },
  ];



  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    handlePaginate,
    searchTerm,
    handleSearch,
    handleSelectAllRow,
    handleSelectRow,
    selectedRowKeys,
    filters,
  } = useTable(data, params.perPage);

  const columns = useMemo(
    () =>
      GetColumns({
        data: data,
        handleSelectAllRow,
        checkedItems: selectedRowKeys,
        onChecked: handleSelectRow,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      handleSelectAllRow,
      selectedRowKeys,
      data,
    ]
  );

  const handlerSearch = useMemo(
    () =>
      debounce((value: string) => {
        setParams((prevState) => ({
          ...prevState,
          search: value,
        }));
      }, 500),
    []
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } = useColumn(columns);

  return (
    <div className='flex flex-col gap-9 w-full'>
      <h1 className='font-medium font-lexend text-base'>
        Medical Certificate Letter
      </h1>

      <div>
        <ControlledTable
          isDeactiveToogleColumns
          variant='modern'
          isLoading={isLoading}
          showLoadingText={true}
          data={tableData ?? []}
          scroll={{
            x: 1560,
          }}
          onRow={(record, index) => ({
            onClick: () => {
              openModal({
                view: <ModalDetailSpecialistLetter data={record} />,
                customSize: '700px',
              });
            },
          })}
          columns={visibleColumns}
          paginatorOptions={{
            pageSize: params.perPage,
            setPageSize: (page) => setParams({ ...params, perPage: page }),
            total: 10,
            current: currentPage,
            onChange: (page: number) => {
              handlePaginate(page);
              setParams({ ...params, page });
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
              <div key='action-buttos' className='flex items-center gap-2'>
                <Button
                  onClick={() => {
                    openModal({
                      view: <ModalAddEditSpecialistLetter />,
                      customSize: '1100px',
                    });
                  }}
                >
                  + Add New
                </Button>
              </div>
            ],
          }}

          className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
        />
      </div>
    </div>
  )
}

export default TabSpecialistLetter