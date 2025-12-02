'use client';

import dayjs from 'dayjs';
import { Text, Checkbox, ModalSize, Button, Popover } from 'rizzui';
import { HeaderCell } from '@/app/shared/ui/table';
import ActionTooltipButton from '@/app/shared/ui/action-button';
import PencilIcon from '@/core/components/icons/pencil';
import DeletePopover from '@/app/shared/ui/delete-popover';
import { IGetPatientDocumentationResponse } from '@/types/ApiResponse';
import DocumentationForm from '../modal/add-documentation';
import { PiCloudArrowDown, PiEye } from 'react-icons/pi';

type Row = IGetPatientDocumentationResponse['data'][number];
type Columns = {
  data: IGetPatientDocumentationResponse['data'];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string[]) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  openModal?: ({
    view,
    customSize,
    size,
  }: {
    view: React.ReactNode;
    customSize?: string;
    size?: ModalSize;
  }) => void;
};

export const getColumns = ({
  data,
  checkedItems,
  onDeleteItem,
  handleSelectAll,
  onChecked,
  openModal,
}: Columns) => [
    {
      title: (
        <div className="ps-2">
          <Checkbox
            className="cursor-pointer"
            checked={
              checkedItems?.length > 0 &&
              data?.length > 0 &&
              checkedItems?.length === data?.length
            }
            onChange={handleSelectAll}
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 40,
      render: (_: any, row: any) => (
        <div className="inline-flex ps-2">
          <Checkbox
            className="cursor-pointer"
            checked={checkedItems.includes(row.id)}
            {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
    },
    {
      title: <HeaderCell title="NAME" />,
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (value: string) => value,
    },
    {
      title: <HeaderCell title="TYPE" />,
      dataIndex: 'type',
      key: 'type',
      width: 130,
      render: (value: string) => value,
    },
    {
      title: <HeaderCell title="SIZE" />,
      dataIndex: 'size',
      key: 'size',
      width: 100,
      render: (value: number) => (
        <Text className="text-gray-500">
          {value ? `${(value / 1024).toFixed(2)} KB` : 'N/A'}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="CREATED AT" />,
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (value: Date) => (
        <Text className="text-gray-500">
          {dayjs(value).format('DD/MM/YYYY')}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="UPDATED AT" />,
      dataIndex: 'updated_at',
      key: 'updated_at',
      width: 150,
      render: (value: Date) => (
        <Text className="text-gray-500">
          {dayjs(value).format('DD/MM/YYYY')}
        </Text>
      ),
    },
    {
      title: <HeaderCell title="ACTION" />,
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (_: string, row: Row) => (
        <div className="flex items-center justify-end gap-2">
          {/* Download button */}
          <ActionTooltipButton
            onClick={() => {
              const link = document.createElement("a");
              link.href = row.url;
              link.download = row.name || row.url.split("/").pop() || "document";
              link.target = "_blank";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            tooltipContent="Download"
            variant="outline"
          >
            <PiCloudArrowDown className="h-4 w-4" />
          </ActionTooltipButton>

          {/* Action Dropdown */}
          <Popover placement="bottom-end">
            <Popover.Trigger>
              <Button variant="outline" size="sm" className="bg-white">
                Action
              </Button>
            </Popover.Trigger>
            <Popover.Content className="z-0 min-w-[140px] px-2 py-2 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
              <div className="flex flex-col gap-1 text-gray-900">
                <Button
                  variant="text"
                  className="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                  onClick={() => window.open(row.url, '_blank')}
                >
                  View
                </Button>

                <DeletePopover
                  title={`Delete the Document`}
                  description={`Are you sure you want to delete #${row.id} document?`}
                  onDelete={() => onDeleteItem([row?.id.toString()])}
                  isCustom={true}
                  buttonText="Delete"
                  triggerVariant="text"
                  triggerClassName="flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                />
              </div>
            </Popover.Content>
          </Popover>
        </div>
      ),
    },
  ];
