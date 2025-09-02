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
import dayjs from '@/config/dayjs';
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
      const timeSlots = getTimeSlots('00:00', '23:59', 15);

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

        // Extract time directly from the date string to avoid timezone conversion
        let timeStr: string;

        // Parse time directly from the ISO string format: "2025-09-10T09:00:00.000Z"
        const timeMatch = item.date.match(/T(\d{2}):(\d{2}):(\d{2})/);
        if (timeMatch) {
          const hour = timeMatch[1];
          const minute = timeMatch[2];
          timeStr = `${hour}:${minute}`;
        } else {
          // Fallback to local_date if direct extraction fails
          if (item.local_date) {
            const localTimeMatch = item.local_date.match(
              /(\d{1,2}):(\d{2})\s*(AM|PM)/
            );
            if (localTimeMatch) {
              let hour = parseInt(localTimeMatch[1]);
              const minute = localTimeMatch[2];
              const period = localTimeMatch[3];

              // Convert 12-hour format to 24-hour format
              if (period === 'PM' && hour !== 12) {
                hour += 12;
              } else if (period === 'AM' && hour === 12) {
                hour = 0;
              }

              timeStr = `${hour.toString().padStart(2, '0')}:${minute}`;
            } else {
              // Fallback to parsing the date string directly
              const localDate = new Date(item.local_date);
              timeStr = localDate.toTimeString().slice(0, 5);
            }
          } else {
            // Last resort: use UTC time
            const appointmentTime = dayjs.utc(item.date);
            timeStr = appointmentTime.format('HH:mm');
          }
        }

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
