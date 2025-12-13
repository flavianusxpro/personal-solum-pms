'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { PiTrashDuotone } from 'react-icons/pi';
import DateFiled from '@/app/shared/ui/controlled-table/date-field';
import { Button } from 'rizzui';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import { useMedia } from '@core/hooks/use-media';
import cn from '@/core/utils/class-names';
import { appointmentTypes } from '@/data/appointment-data';
import CSelect from '@/app/shared/ui/select';
import { useGetAllDoctors } from '@/hooks/useDoctor';
import { useProfile } from '@/hooks/useProfile';
import { useGetAllPatients } from '@/hooks/usePatient';

type FilterElementProps = {
  isFiltered: boolean;
  filters: { [key: string]: any };
  updateFilter: (columnId: string, filterValue: string | any[] | null) => void;
  handleReset: () => void;
  setIsFilter: Dispatch<SetStateAction<boolean>>;
};

export const appointmentTypesOptions = Object.entries(appointmentTypes).map(
  ([value, label]) => ({ label, value })
);

const statusOptions = [
  { value: 1, label: 'Draft' },
  { value: 2, label: 'Scheduled' },
  { value: 3, label: 'Check In' },
  { value: 4, label: 'Finished' },
  { value: 5, label: 'Cancelled' },
  { value: 6, label: 'On Going' },
  { value: 7, label: 'No Show' },
];

const paymentStatusOptions = [
  { value: 1, label: 'Pending' },
  { value: 2, label: 'Paid' },
  { value: 3, label: 'Cancelled' },
];

export default function FilterElement({
  isFiltered,
  filters,
  updateFilter,
  handleReset,
  setIsFilter,
}: FilterElementProps) {
  const { data: dataProfile, isLoading: isLoadingProfile } = useProfile(true);
  const { data: doctorDatas, isLoading: isLoadingDoctor } = useGetAllDoctors({
    page: 1,
    perPage: 1000,
    clinicId: dataProfile?.clinics[0]?.id,
  });

  const optionDoctors = React.useMemo(() => {
    if (!doctorDatas?.data) return [];
    return doctorDatas?.data?.map((doctor) => {
      return ({
        label: `Dr. ${doctor.first_name} ${doctor.last_name}`,
        value: doctor.id,
      });
    });
  }, [doctorDatas]);

  // const { data: patientDatas, isLoading: isLoadingPatient } = useGetAllPatients({
  //   page: 1,
  //   perPage: 1000,
  //   clinicId: dataProfile?.clinics?.[0]?.id || 0,
  // });

  // const optionPatients = React.useMemo(() => {
  //   if (!patientDatas?.data) return [];
  //   return patientDatas?.data?.map((patient) => {
  //     return ({
  //       label: `${patient.first_name} ${patient.last_name}`,
  //       value: patient.id,
  //     });
  //   });
  // }, [patientDatas]);

  const isMediumScreen = useMedia('(max-width: 6000px)', false);
  return (
    <div
      className={cn(
        'flex',
        isMediumScreen ? 'flex-col gap-6' : 'flex-row items-center gap-3'
      )}
    >
      <CSelect
        placeholder="Select doctor"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={optionDoctors}
        onClear={() => {
          updateFilter('doctor', null);
        }}
        // isLoading={isLoadingDoctor || isLoadingProfile}
        
        clearable
        value={filters['doctor']}
        onChange={(value: string) => {
          updateFilter('doctor', value);
          setIsFilter(true);
        }}
        {...(isMediumScreen && {
          label: 'Doctor',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <DateFiled
        selectsRange
        dateFormat="dd MMM yyyy"
        className="w-full"
        isClearable
        onClear={() => {
          updateFilter('createdAt', [null, null]);
          setIsFilter(true);
        }}
        selected={getDateRangeStateValues(filters?.['createdAt']?.[0])}
        startDate={getDateRangeStateValues(filters?.['createdAt']?.[0]) as Date}
        endDate={getDateRangeStateValues(filters?.['createdAt']?.[1]) as Date}
        onChange={(date: any) => {
          updateFilter('createdAt', date);
        }}
        placeholderText="Select appointment date"
        {...(isMediumScreen && {
          inputProps: {
            label: 'Appointment Date',
            labelClassName: 'font-medium text-gray-700',
          },
        })}
      />

      <CSelect
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={statusOptions}
        value={filters['status']}
        onClear={() => {
          updateFilter('status', '');
        }}
        clearable
        onChange={(value: string) => {
          updateFilter('status', value);
          setIsFilter(true);
        }}
        {...(isMediumScreen && {
          label: 'Appointment Status',
          placeholder: 'Select appointment status',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={paymentStatusOptions}
        onClear={() => {
          updateFilter('payment_status', '');
        }}
        clearable
        value={filters['payment_status']}
        onChange={(value: string) => {
          updateFilter('payment_status', value);
          setIsFilter(true);
        }}
        {...(isMediumScreen && {
          label: 'Payment Status',
          placeholder: 'Select payment status',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select reschedule type"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Yes',
            value: 'true',
          },
          {
            label: 'No',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('by_reschedule', '');
        }}
        clearable
        value={filters['by_reschedule']}
        onChange={(value: string) => {
          updateFilter('by_reschedule', value);
          setIsFilter(true);
        }}
        {...(isMediumScreen && {
          label: 'By Reschedule',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select last consult"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={Array.from({ length: 12 }, (_, index) => ({
          label: `${index + 1} Month `,
          value: index + 1,
        }))}
        onClear={() => {
          updateFilter('inactive_patients_months', '');
        }}
        clearable
        value={filters['inactive_patients_months']}
        onChange={(value: string) => {
          updateFilter('inactive_patients_months', value);
          setIsFilter(true);
        }}
        {...(isMediumScreen && {
          label: 'Last Consult',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select consent form"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Completed',
            value: 'true',
          },
          {
            label: 'Missing',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('filter_no_consent_form', '');
        }}
        clearable
        value={filters['filter_no_consent_form']}
        onChange={(value: string) => {
          setIsFilter(true);
          updateFilter('filter_no_consent_form', value);
        }}
        {...(isMediumScreen && {
          label: 'Consent Form',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select email verification"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Verified',
            value: 'true',
          },
          {
            label: 'Unverified',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('filter_unverified_email', '');
        }}
        clearable
        value={filters['filter_unverified_email']}
        onChange={(value: string) => {
          setIsFilter(true);
          updateFilter('filter_unverified_email', value);
        }}
        {...(isMediumScreen && {
          label: 'Email Verification',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select IHI completion"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Completed',
            value: 'true',
          },
          {
            label: 'Missing',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('filter_no_ihi', '');
        }}
        clearable
        value={filters['filter_no_ihi']}
        onChange={(value: string) => {
          setIsFilter(true);
          updateFilter('filter_no_ihi', value);
        }}
        {...(isMediumScreen && {
          label: 'IHI Completion',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select address status"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Complete',
            value: 'true',
          },
          {
            label: 'Incomplete',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('filter_incomplete_address', '');
        }}
        clearable
        value={filters['filter_incomplete_address']}
        onChange={(value: string) => {
          setIsFilter(true);
          updateFilter('filter_incomplete_address', value);
        }}
        {...(isMediumScreen && {
          label: 'Address Status',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      <CSelect
        placeholder="Select mobile number status"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={[
          {
            label: 'Valid',
            value: 'true',
          },
          {
            label: 'Invalid',
            value: 'false',
          },
        ]}
        onClear={() => {
          updateFilter('filter_invalid_mobile', '');
        }}
        clearable
        value={filters['filter_invalid_mobile']}
        onChange={(value: string) => {
          setIsFilter(true);
          updateFilter('filter_invalid_mobile', value);
        }}
        {...(isMediumScreen && {
          label: 'Mobile Number Status',
          labelClassName: 'font-medium text-gray-700',
        })}
      />

      {/* <CSelect
        placeholder="Select patient"
        dropdownClassName="!z-10 h-auto"
        className="w-full @[35rem]:w-auto"
        options={optionPatients}
        onClear={() => {
          updateFilter('patient', null);
        }}
        isLoading={isLoadingPatient || isLoadingProfile}
        clearable
        value={filters['patient']}
        onChange={(value: string) => {
          updateFilter('patient', value);
          setIsFilter(true);
        }}
        {...(isMediumScreen && {
          label: 'Patient',
          labelClassName: 'font-medium text-gray-700',
        })}
      /> */}

      {isFiltered ? (
        <Button
          size="sm"
          onClick={() => {
            handleReset();
          }}
          className="h-8 bg-gray-200/70"
          variant="flat"
        >
          <PiTrashDuotone className="me-1.5 h-[17px] w-[17px]" /> Clear
        </Button>
      ) : null}
    </div>
  );
}
