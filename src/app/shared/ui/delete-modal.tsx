import React, { Dispatch, SetStateAction } from 'react'
import { PiTrashFill } from 'react-icons/pi';
import { Button, Modal, Text, Title } from 'rizzui'

interface PropTypes {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    description: string;
    onDelete: () => void;
}

const DeleteModal = (props: PropTypes) => {
    const {
        description,
        isOpen,
        onDelete,
        setIsOpen,
        title
    } = props

    return (
        <Modal rounded='sm' overlayClassName="backdrop-blur" isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <div className='flex flex-col p-5'>
                <Title
                    as="h4"
                    className="flex items-start text-gray-700 sm:items-center"
                >
                    <PiTrashFill /> {title}
                </Title>

                <Text className="mb-2 leading-relaxed text-gray-500">
                    {description}
                </Text>

                <div className="flex items-center gap-2 justify-end">
                    <Button onClick={onDelete}>
                        Yes
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                    >
                        No
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteModal