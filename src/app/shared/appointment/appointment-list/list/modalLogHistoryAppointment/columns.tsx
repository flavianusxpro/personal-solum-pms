import { HeaderCell } from "@/app/shared/ui/table";
import { useModal } from "@/app/shared/modal-views/use-modal";

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
    const { openModal } = useModal();
    return [
        {
            title: <HeaderCell title="DATE & TIME" />,
            dataIndex: 'dateTime',
            key: 'dateTime',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="EVENT" />,
            dataIndex: 'event',
            key: 'event',
            width: 250,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="SOURCE" />,
            dataIndex: 'source',
            key: 'source',
            width: 250,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="PERFORMED BY" />,
            dataIndex: 'performedBy',
            key: 'performedBy',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="STATUS" />,
            dataIndex: 'status',
            key: 'status',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="REFERENCE" />,
            dataIndex: 'reference',
            key: 'reference',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
    ];
};