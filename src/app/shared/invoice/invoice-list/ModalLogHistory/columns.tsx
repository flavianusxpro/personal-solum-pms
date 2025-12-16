import { HeaderCell } from "@/app/shared/ui/table";
import { Checkbox } from "rizzui";

type Columns = {
    //   data: IGetInvoiceListResponse['data'];
    data: any[];
    handleSelectAll: any;
    onChecked?: (id: string) => void;
    checkedItems: string[];
};

export const getColumns = ({
    data,
    checkedItems,
    handleSelectAll,
    onChecked,
}: Columns) => {
    return [
        {
            title: (
                <div className="ps-2">
                    <Checkbox
                        title={'Select All'}
                        onChange={handleSelectAll}
                        checked={checkedItems.length === data.length}
                        className="cursor-pointer"
                    />
                </div>
            ),
            dataIndex: 'checked',
            key: 'checked',
            width: 30,
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
            title: <HeaderCell title="DATE & TIME" />,
            dataIndex: 'datetime',
            key: 'datetime',
            width: 200,
            render: (datetime: string) => <p className="w-max">{datetime}</p>,
        },
        {
            title: <HeaderCell title="EVENT" />,
            dataIndex: 'event',
            key: 'event',
            width: 400,
            render: (event: string) => <p className="w-max">{event}</p>,
        },
        {
            title: <HeaderCell title="SOURCE" />,
            dataIndex: 'source',
            key: 'source',
            width: 250,
            render: (source: string) => <p className="w-max">{source}</p>,
        },
        {
            title: <HeaderCell title="PERFORMED BY" />,
            dataIndex: 'performed_by',
            key: 'performed_by',
            width: 650,
            render: (performed_by: string) => <p className="w-max">{performed_by}</p>,
        },
        {
            title: <HeaderCell title="STATUS" />,
            dataIndex: 'status',
            key: 'status',
            width: 600,
            render: (data: string) => <p className="w-max">{data}</p>,
        },
        {
            title: <HeaderCell title="REFERENCE" />,
            dataIndex: 'reference',
            key: 'reference',
            width: 600,
            render: (data: string) => <p className="w-max">{data}</p>,
        },
    ];
}