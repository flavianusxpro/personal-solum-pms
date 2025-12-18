import { HeaderCell } from "@/app/shared/ui/table";
import PencilIcon from "@/core/components/icons/pencil";
import { Button, Checkbox, Dropdown } from "rizzui";
import { useModal } from "@/app/shared/modal-views/use-modal";
import ModalAddEditNewAllergy from "./ModalAddEditNewAllergy";

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
            title: <HeaderCell title="Allergen" />,
            dataIndex: 'allergen',
            key: 'allergen',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Reaction" />,
            dataIndex: 'reaction',
            key: 'reaction',
            width: 250,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Severity" />,
            dataIndex: 'severity',
            key: 'severity',
            width: 250,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Warnings" />,
            dataIndex: 'warnings',
            key: 'warnings',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Created At" />,
            dataIndex: 'createdAt',
            key: 'createdAt',
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
                                openModal({
                                    view: <ModalAddEditNewAllergy data={row} isEdit={true} />,
                                    customSize: '1100px',
                                });
                            }}>
                                <PencilIcon className="mr-2 h-4 w-4" />
                                Edit
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            ),
        },
    ];
};