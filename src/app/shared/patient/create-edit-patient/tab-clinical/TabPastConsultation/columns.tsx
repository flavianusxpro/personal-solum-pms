import { HeaderCell } from "@/app/shared/ui/table";
import EyeIcon from "@/core/components/icons/eye";
import { Button, Checkbox, Dropdown } from "rizzui";
import { useModal } from "@/app/shared/modal-views/use-modal";
import { AiOutlineCloudDownload } from "react-icons/ai";

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
            title: <HeaderCell title="Date" />,
            dataIndex: 'date',
            key: 'date',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="APT Type" />,
            dataIndex: 'type',
            key: 'type',
            width: 250,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Doctor" />,
            dataIndex: 'doctor',
            key: 'doctor',
            width: 250,
            render: (data: any, row: any) => <span>Dr. {row.doctor.first_name} {row.doctor.last_name}</span>
        },
        {
            title: <HeaderCell title="REASON FOR VISIT" />,
            dataIndex: 'description',
            key: 'description',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Start" />,
            dataIndex: 'date',
            key: 'date',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Duration" />,
            dataIndex: 'duration',
            key: 'duration',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="MEDICAL CERTIFICATE" />,
            dataIndex: 'certificate',
            key: 'certificate',
            width: 320,
            render: (data: any, _: any) => (
                <Button
                    as="span"
                    variant="outline"
                    size="md"
                    className="text-sm font-normal"
                > 
                    <AiOutlineCloudDownload className="mr-4" /> Download
                </Button>
            )
        },
        {
            title: <></>,
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (_: string, row: any) => (
                <div className="relative flex items-center gap-2">
                    <Dropdown>
                        <Dropdown.Trigger onClick={(e) => e.stopPropagation()} >
                            <Button
                                as="span"
                                variant="outline"
                                size="md"
                            >
                                Action
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={(e) => {
                                e.stopPropagation();
                            }}>
                                <EyeIcon className="mr-2 h-4 w-4" />
                                View
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            ),
        },
    ];
};