'use client';

import ControlledTable from '@/app/shared/ui/controlled-table/index';
import { useColumn } from '@core/hooks/use-column';
import React, { useCallback, useMemo, useState } from 'react';
import { getColumns } from './columns';
import { useModal } from '../../modal-views/use-modal';
import { useGetAppointments } from '@/hooks/useAppointment';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import TableHeader from '../../ui/table-header';
import CSelect from '../../ui/select';
import { Flex } from 'rizzui';

export default function GlobalCalendarTable({}: {}) {
  const { openModal } = useModal();
  const [pageSize] = useState(100);

  const {
    data,
    isLoading: isLoadingGetRoles,
    refetch,
  } = useGetAppointments({
    page: 1,
    perPage: pageSize,
    sort: 'DESC',
  });

  function getTimeSlots(
    startTime: string,
    endTime: string,
    intervalMinutes: number
  ) {
    const slots = [];
    let current = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    while (current <= end) {
      const timeStr = current.toTimeString().slice(0, 5); // HH:MM
      slots.push(timeStr);
      current.setMinutes(current.getMinutes() + intervalMinutes);
    }

    return slots;
  }

  const formatAppointments = useCallback(
    (data: IGetAppointmentListResponse['data']) => {
      const timeSlots = getTimeSlots('09:00', '17:00', 15);
      const doctors = Array.from(
        new Set(
          data.map((item) =>
            `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim()
          )
        )
      );

      const result = timeSlots.map((time) => {
        const slot: any = { time };
        doctors.forEach((doc) => {
          slot[doc] = ''; // initialize each doctor column
        });
        return slot;
      });

      data.forEach((item) => {
        const doctorName =
          `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim();
        const appointmentTime = new Date(item.date);
        const timeStr = appointmentTime.toTimeString().slice(0, 5); // HH:MM
        const slot = result.find((r) => r.time === timeStr);
        if (slot) {
          slot[doctorName] = item.patient
            ? `${item.patient.first_name} ${item.patient.last_name}`
            : 'Unknown Patient';
        }
      });

      return result;
    },
    []
  );

  const tableData = useMemo(() => {
    return formatAppointments(data?.data ?? []);
  }, [data?.data, formatAppointments]);

  // const { isLoading, tableData } = useTable([], pageSize);

  const columns = React.useMemo(
    () =>
      getColumns({
        data: formatAppointments(data?.data ?? []),
        openModal,
      }),
    [data?.data, formatAppointments, openModal]
  );

  const { visibleColumns } = useColumn(columns);

  return (
    <div>
      {tableData && tableData?.length > 0 && (
        <ControlledTable
          // isLoading={isLoading }
          showLoadingText={true}
          data={tableData}
          // @ts-ignore
          columns={visibleColumns}
          className={
            'rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0'
          }
          tableHeader={
            <TableHeader>
              <CSelect
                className="w-40"
                placeholder="Select Branch"
                options={[]}
                onChange={() => {}}
              />

              <Flex></Flex>
            </TableHeader>
          }
        />
      )}
    </div>
  );
}
