import { HeaderCell } from "@/app/shared/ui/table";
import EyeIcon from "@/core/components/icons/eye";
import PencilIcon from "@/core/components/icons/pencil";
import TrashIcon from "@/core/components/icons/trash";
import { ActionIcon, Button, Checkbox, Dropdown } from "rizzui";
import { useModal } from "@/app/shared/modal-views/use-modal";
import { AiOutlineCloudDownload } from "react-icons/ai";
import ModalAddEditSpecialistLetter from "./ModalAddEditSpecialistLetter";

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
            title: <HeaderCell title="Specialist Type" />,
            dataIndex: 'specialistType',
            key: 'specialistType',
            width: 320,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Reason For Referral" />,
            dataIndex: 'reasonForReferral',
            key: 'reasonForReferral',
            width: 250,
            render: (data: any, _: any) => <span>{data}</span>
        },
        {
            title: <HeaderCell title="Referred By" />,
            dataIndex: 'referredBy',
            key: 'referredBy',
            width: 250,
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
            title: <></>,
            dataIndex: 'action',
            key: 'action',
            width: 100,
            render: (_: string, row: any) => (
                <div className="relative flex items-center gap-2">
                    <Button
                        as="span"
                        variant="outline"
                        size="md"
                    >
                        <AiOutlineCloudDownload />
                    </Button>
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
                                    view: <ModalAddEditSpecialistLetter data={row} isEdit={true} />,
                                    customSize: '1100px',
                                });
                            }}>
                                <PencilIcon className="mr-2 h-4 w-4" />
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {
                                e.stopPropagation();
                            }}>
                                <EyeIcon className="mr-2 h-4 w-4" />
                                View
                            </Dropdown.Item>
                            <Dropdown.Item onClick={(e) => {
                                e.stopPropagation();
                            }}>
                                <TrashIcon className="mr-2 h-4 w-4" />
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            ),
        },
    ];
};