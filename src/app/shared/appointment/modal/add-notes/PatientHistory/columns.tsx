import { HeaderCell } from "@/app/shared/ui/table";
import { Checkbox } from "rizzui";

type Columns = {
    data?: any;
    handleSelectAllRow: any;
    checkedItems: any;
    onChecked?: (id: string) => void;
};

export const GetColumns = ({
    data,
    handleSelectAllRow,
    checkedItems,
    onChecked,
}: Columns) => {
    return [
        // {
        //     title: (
        //         <div className="ps-2">
        //             <Checkbox
        //                 title={'Select All'}
        //                 onChange={handleSelectAllRow}
        //                 checked={checkedItems?.length === data?.length}
        //                 className="cursor-pointer"
        //             />
        //         </div>
        //     ),
        //     dataIndex: 'checked',
        //     key: 'checked',
        //     width: 30,
        //     onCell: () => ({
        //         onClick: (e: any) => e.stopPropagation(),
        //     }),
        //     render: (_: any, row: any) => (
        //         <div className="inline-flex ps-3.5">
        //             <Checkbox
        //                 aria-label={'ID'}
        //                 className="cursor-pointer"
        //                 checked={checkedItems.some((item: any) => item.id === row.id)}
        //                 {...(onChecked && { onChange: () => onChecked(row) })}
        //             />
        //         </div>
        //     ),
        // },
        {
            title: <HeaderCell title="DATE" />,
            dataIndex: 'date',
            key: 'date',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="TIME" />,
            dataIndex: 'time',
            key: 'time',
            width: 250,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="TYPE" />,
            dataIndex: 'type',
            key: 'type',
            width: 250,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Description" />,
            dataIndex: 'description',
            key: 'description',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
    ];
};