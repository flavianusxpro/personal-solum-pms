import { HeaderCell } from "@/app/shared/ui/table";
import { Checkbox } from "rizzui";

type Columns = {
    data?: any;
    handleSelectAllRow: any;
    checkedItems: any;
    onChecked?: (id: string) => void;
};

export const GetColumnsTabEmail = ({
    data,
    handleSelectAllRow,
    checkedItems,
    onChecked,
}: Columns) => {
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
            title: <HeaderCell title="DATE & TIME" />,
            dataIndex: 'dateTime',
            key: 'dateTime',
            width: 320,
            render: (_: any, row: any) => <span>{row.dateTime}</span>
        },
        {
            title: <HeaderCell title="Type" />,
            dataIndex: 'type',
            key: 'type',
            width: 250,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Title" />,
            dataIndex: 'title',
            key: 'title',
            width: 250,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Message" />,
            dataIndex: 'message',
            key: 'message',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Created By" />,
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Status" />,
            dataIndex: 'status',
            key: 'status',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
    ];
};