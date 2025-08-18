'use client';

import ControlledTable from '@/app/shared/ui/controlled-table/index';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getColumns } from './columns';
import { useModal } from '../../modal-views/use-modal';
import { useGetAppointments } from '@/hooks/useAppointment';
import { IGetAppointmentListResponse } from '@/types/ApiResponse';
import TableHeader from '../../ui/table-header';
import { Flex, Input, Loader } from 'rizzui';
import { PiArrowLeft, PiArrowRight } from 'react-icons/pi';
import dayjs from 'dayjs';
import ActionButton from '../../ui/action-tooltip-button';
import { useProfile } from '@/hooks/useProfile';

export default function GlobalCalendarTable({}: {}) {
  const { openModal } = useModal();
  const [pageSize] = useState(100);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format('YYYY-MM-DD')
  );

  const { data: dataProfile } = useProfile(true);
  const {
    data,
    isLoading: isLoadingGetAppointments,
    refetch,
  } = useGetAppointments({
    page: 1,
    perPage: pageSize,
    sort: 'DESC',
    from: selectedDate,
    to: selectedDate,
    clinicId: dataProfile?.clinics[0]?.id || 0,
  });

  function previousDate() {
    setSelectedDate((prevDate) => {
      const prevDateObj = dayjs(prevDate);
      return prevDateObj.isValid()
        ? prevDateObj.subtract(1, 'day').format('YYYY-MM-DD')
        : dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    });
  }

  function nextDate() {
    setSelectedDate((prevDate) => {
      const prevDateObj = dayjs(prevDate);
      return prevDateObj.isValid()
        ? prevDateObj.add(1, 'day').format('YYYY-MM-DD')
        : dayjs().add(1, 'day').format('YYYY-MM-DD');
    });
  }

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
        const slot: Record<string, any> = { time };
        doctors.forEach((doc) => {
          slot[doc] = ''; // initialize doctor field with empty string
        });
        return slot;
      });

      data.forEach((item) => {
        const doctorName =
          `${item.doctor?.first_name || ''} ${item.doctor?.last_name || ''}`.trim();
        const appointmentTime = new Date(item.date);
        const timeStr = appointmentTime.toTimeString().slice(0, 5); // Format: HH:MM
        const slot = result.find((r) => r.time === timeStr);

        if (slot && item.patient) {
          slot[doctorName] =
            `${item.patient.first_name} ${item.patient.last_name}`;
          slot['type'] = item.type || ''; // additional sibling field
        }
      });

      return result;
    },
    []
  );

  const tableData = useMemo(() => {
    return formatAppointments(data?.data ?? []);
  }, [data?.data, formatAppointments]);

  const columns = React.useMemo(
    () =>
      getColumns({
        data: tableData,
        openModal,
      }),
    [openModal, tableData]
  );

  useEffect(() => {
    refetch();
  }, [selectedDate, refetch]);

  return (
    <div>
      {tableData && columns && tableData?.length > 0 && columns.length > 0 ? (
        <ControlledTable
          isLoading={isLoadingGetAppointments}
          showLoadingText={true}
          data={tableData ?? []}
          // @ts-ignore
          columns={columns}
          variant="bordered"
          tableHeader={
            <TableHeader isCustomHeader checkedItems={[]}>
              <Flex className="w-fit" align="center">
                <ActionButton
                  variant="outline"
                  tooltipContent=""
                  onClick={previousDate}
                >
                  <PiArrowLeft className="text-muted-foreground" size={20} />
                </ActionButton>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                />
                <ActionButton
                  onClick={nextDate}
                  variant="outline"
                  tooltipContent=""
                >
                  <PiArrowRight className="text-muted-foreground" size={20} />
                </ActionButton>
              </Flex>
            </TableHeader>
          }
        />
      ) : (
        <Loader />
      )}
    </div>
  );
}
