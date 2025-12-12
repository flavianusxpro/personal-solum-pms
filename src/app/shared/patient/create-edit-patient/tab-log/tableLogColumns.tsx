import { HeaderCell } from "@/app/shared/ui/table";
import { render } from "@headlessui/react/dist/utils/render";
import dayjs from "dayjs";
import { Checkbox } from "rizzui";

export const GetColumns = ({
    handleSelectAllRow,
    data,
    checkedItems,
    onChecked,
}: any) => {
    return [
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
            width: 30,
            onCell: () => ({
                onClick: (e: any) => e.stopPropagation(),
            }),
            render: (_: any, row: any) => (
                <div className="inline-flex ps-3.5">
                    <Checkbox
                        aria-label={'ID'}
                        className="cursor-pointer"
                        checked={checkedItems.some((item: any) => item.id === row.id)}
                        {...(onChecked && { onChange: () => onChecked(row) })}
                    />
                </div>
            ),
        },
        {
            title: <HeaderCell title="DATE" />,
            dataIndex: 'created_at',
            key: 'created_at',
            width: 150,
            render: (date: Date, row: any) => (
                <div>
                    {dayjs(date).utc().format('DD MMM YYYY')}
                </div>
            ),
        },
        {
            title: <HeaderCell title="TIME" />,
            dataIndex: 'created_at',
            key: 'created_at',
            width: 100,
            render: (date: Date, row: any) => (
                <div className='flex flex-col'>
                    {dayjs(date).utc().format('hh:mm A')}
                </div>
            ),
        },
        {
            title: <HeaderCell title="TYPE" />,
            dataIndex: 'action',
            key: 'action',
            width: 150,
        },
        {
            title: <HeaderCell title="DESCRIPTION" />,
            dataIndex: 'description',
            key: 'description',
        },
        // {
        //     title: <HeaderCell title="UPDATED BY" />,
        //     dataIndex: 'updated_by',
        //     key: 'updated_by',
        //     width: 150,
        // },
    ];
};