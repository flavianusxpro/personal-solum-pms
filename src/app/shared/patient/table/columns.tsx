'use client';

import Link from 'next/link';
import { Badge, Text, ActionIcon, Checkbox, Dropdown, Button } from 'rizzui';
import { routes } from '@/config/routes';
import EyeIcon from '@core/components/icons/eye';
import PencilIcon from '@core/components/icons/pencil';
import AvatarCard from '@core/ui/avatar-card';
import DateCell from '@core/ui/date-cell';
import { IGetAllPatientsResponse } from '@/types/ApiResponse';
import { HeaderCell } from '@/app/shared/ui/table';
import CSelect from '../../ui/select';
import toast from 'react-hot-toast';
import { Dispatch, SetStateAction, useState } from 'react';
import { useUpdatePatient } from '@/hooks/usePatient';
import { PiFlag, PiNote } from 'react-icons/pi';
import { useModal } from '../../modal-views/use-modal';
import RedFlagForm from '../modal/red-flag';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import DeleteModal from '../../ui/delete-modal';
import TrashIcon from '@/core/components/icons/trash';
import { CiWarning } from 'react-icons/ci';
import DateCellNew from '@/core/ui/date-cell-new';
import { MdVerified } from 'react-icons/md';
import AvatarCardNew from '@/core/ui/avatar-card-new';

const statusOptions = [
  { label: 'Active', value: 1 },
  { label: 'Inactive', value: 0 },
];

type Row = IGetAllPatientsResponse['data'][number];

type Columns = {
  data: IGetAllPatientsResponse['data'];
  sortConfig?: any;
  handleSelectAllRow: any;
  checkedItems: string[];
  onDeleteItem: (id: number[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  idPatient: number | string;
  setIdPatient: Dispatch<SetStateAction<number | string>>;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAllRow,
  onChecked,
  isOpen,
  setIsOpen,
  idPatient,
  setIdPatient,
}: Columns) => [
    {
      title: (
        <div className="ps-2">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAllRow}
            checked={checkedItems?.length === data?.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      className: 'no-row-click',
      width: 30,
      render: (_: any, row: any) => (
        <div className="inline-flex ps-2">
          <Checkbox
            className="cursor-pointer"
            checked={checkedItems.some((item: any) => item.id === row.id)}
            {...(onChecked && { onChange: () => onChecked(row) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="PATIENT NAME" />,
      dataIndex: 'PATIENT NAME',
      key: 'PATIENT NAME',
      width: 300,
      render: (_: any, row: any) => {
        const requiredFieldsMap: Record<string, string> = {
          mobile_number: "Mobile Number",
          email: "Email",
        };

        const missingFields = Object.keys(requiredFieldsMap).filter(
          (key: string) => row[String(key)] === null || row[String(key)] === undefined || row[String(key)] === ""
        );

        return (
          <AvatarCardNew
            src={row.photo || ''}
            name={`${row.first_name} ${row.middle_name ? row.middle_name : ''} ${row.last_name}`}
            // number={row.mobile_number}
            // description={row.email?.toLowerCase()}
            otherIcon={
              [
                () => {
                  const isVerified = row.has_filled_consent_form === true && row.ihi_number && row.ihi_number !== '';
                  return (
                    <MdVerified
                      className={`cursor-pointer ${isVerified ? 'text-blue-600' : 'text-gray-400'}`}
                      title={isVerified ? "Verified" : "Not Verified"}
                      key="verified"
                    />
                  );
                },
                () => {
                  return missingFields.length > 0 ? (
                    <CiWarning
                      key="warning"
                      className="text-yellow-700 cursor-pointer"
                      title={`Missing: ${missingFields.map(f => requiredFieldsMap[f]).join(", ")}`}
                    />
                  ) : null
                },
              ]
            }
          />
        );
      },
    },
    // {
    //   title: <HeaderCell title="Contact Detail" />,
    //   dataIndex: 'Contact Detail',
    //   key: 'contact_detail',
    //   width: 300,
    //   render: (_: any, row: any) => (
    //     <AvatarCardNew
    //       number={row.mobile_number}
    //       description={row.email?.toLowerCase()}
    //     />
    //   ),
    // },
    // {
    //   title: <HeaderCell title="GENDER" />,
    //   dataIndex: 'gender',
    //   key: 'gender',
    //   width: 150,
    //   render: (value: string) => (
    //     <Text className="font-medium capitalize text-gray-700">
    //       {value?.toLowerCase() ?? '-'}
    //     </Text>
    //   ),
    // },
    // {
    //   title: (
    //     <HeaderCell
    //       title="BIRTH DATE"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'date_of_birth'
    //       }
    //     />
    //   ),
    //   onHeaderCell: () => onHeaderCellClick('date_of_birth'),
    //   dataIndex: 'date_of_birth',
    //   key: 'date_of_birth',
    //   width: 200,
    //   render: (value: Date) => (value ? <DateCell date={value} dateFormat="DD/MM/YYYY" /> : ' - '),
    // },
    {
      title: (
        <HeaderCell
          title="LAST APPOINTMENT"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('created_at'),
      dataIndex: 'created_at',
      key: 'created_at',
      width: 200,
      render: (value: Date) => (
        <DateCellNew
          clock={true}
          date={value}
          dateFormat="DD/MM/YYYY"
          className="flex flex-row"
        />
      ),
    },
    {
      title: (
        <HeaderCell
          title="Modified"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'updated_at'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('updated_at'),
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 200,
      render: (value: Date) => (
        <DateCellNew
          clock={true}
          date={value}
          dateFormat="DD/MM/YYYY"
          className="flex flex-row items-center"
        />
      ),
    },
    {
      title: <HeaderCell title="Status" />,
      dataIndex: 'status',
      key: 'status',
      className: 'no-row-click',
      width: 110,
      render: (value: number, row: Row) => (
        // <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
        //   <StatusSelect selectItem={value} id={row?.patient_id} />
        // </div>
        // <span>{getStatusBadge(row.value)}</span>
        <div>{getStatusBadge(row?.status)}</div>
      ),
    },
    {
      title: <HeaderCell title="Action" />,
      dataIndex: 'action',
      key: 'action',
      className: 'no-row-click',
      width: 130,
      render: (_: any, row: Row) => (
        <div className="flex items-center justify-center gap-3 pe-4">
          <RenderAction
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            row={row}
            onDeleteItem={onDeleteItem}
            idPatient={idPatient}
            setIdPatient={setIdPatient}
          />
        </div>
      ),
    },
  ];

function RenderAction({
  row,
  onDeleteItem,
  isOpen,
  setIsOpen,
  idPatient,
  setIdPatient,
}: {
  row: Row;
  onDeleteItem: (id: number[]) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  idPatient: number | string;
  setIdPatient: Dispatch<SetStateAction<number | string>>;
}) {
  const { openModal, closeModal } = useModal();

  function handleRedFlagModal(modalType: string) {
    closeModal();
    openModal({
      view: <RedFlagForm patient_id={row.id} modalType={modalType} />,
      customSize: '600px',
    });
  }

  return (
    <div className='flex items-center justify-end gap-3 pe-3'>
      <Dropdown placement="bottom-end">
        <Dropdown.Trigger>
          <Button
            as="span"
            variant="outline"
          >
            Action
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={(e) => {
              e.stopPropagation();
              handleRedFlagModal('flag');
            }}
          >
            <PiFlag className="mr-2 h-4 w-4" />
            Add Flag
          </Dropdown.Item>

          <Dropdown.Item
            onClick={(e) => {
              e.stopPropagation();
              handleRedFlagModal('notes');
            }}
          >
            <PiNote className="mr-2 h-4 w-4" />
            Add Notes
          </Dropdown.Item>

          <Dropdown.Item>
            <Link
              href={routes.patient.edit(row?.patient_id?.toString())}
              className="flex items-center w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <PencilIcon className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item>
            <Link
              href={routes.patient.patientDetail(row?.patient_id?.toString())}
              className="flex items-center w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <EyeIcon className="mr-2 h-4 w-4" />
              <span>View</span>
            </Link>
          </Dropdown.Item>

          <Dropdown.Item
            onClick={(e) => {
              e.stopPropagation();
              setIdPatient(row.id);
              setIsOpen(true);
            }}
          >
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <DeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={`Delete the patient`}
        description={`Are you sure you want to delete this #${idPatient} patient?`}
        onDelete={() => onDeleteItem([Number(idPatient)])}
      />
    </div>
  );
}

function getStatusBadge(status: number) {
  switch (status) {
    case 1:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Active</Text>
        </div>
      );
    case 0:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">Inactive</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

function StatusSelect({ selectItem, id }: { selectItem: number; id: string }) {
  const selectItemValue = statusOptions.find(
    (option) => option.value === selectItem
  )?.value;

  const [value, setValue] = useState(selectItemValue);

  const { mutate, isPending } = useUpdatePatient();

  const handleChange = (value: number) => {
    mutate(
      { patient_id: id, status: value },
      {
        onSuccess: () => {
          setValue(value);
          toast.success('Status updated successfully');
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Error updating status'
          );
        },
      }
    );
  };

  // Handler untuk mencegah event bubbling dari select
  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div onClick={handleSelectClick}>
      <CSelect
        className={'min-w-[120px]'}
        dropdownClassName="h-auto"
        placeholder="Select Status"
        options={statusOptions}
        value={value}
        onChange={handleChange}
        isLoading={isPending}
        displayValue={(option: { label: string; value: number }) =>
          getStatusBadge(option.value)
        }
      // Tambahkan onClick handler untuk trigger select
      // onDropdownClick={handleSelectClick}
      />
    </div>
  );
}