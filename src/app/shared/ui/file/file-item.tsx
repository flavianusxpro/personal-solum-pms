import { PiPencil, PiTrashBold } from 'react-icons/pi';
import { ActionIcon, Flex, Text, Tooltip } from 'rizzui';

interface FileItemProps {
  file: {
    name: string;
    url: string;
    type?: string | undefined;
    size?: number | undefined;
    expiryDate: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onEdit, onDelete }) => {
  return (
    <Flex gap="2" align="center" className="col-span-12">
      <Text className="w-full">{file.name}</Text>
      <Text className="w-1/2">{file.expiryDate}</Text>
      <Tooltip content="Edit">
        <ActionIcon variant="text" onClick={onEdit}>
          <PiPencil className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      <Tooltip content="Delete">
        <ActionIcon variant="text" onClick={onDelete}>
          <PiTrashBold className="h-4 w-4 text-red-500" />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};

export default FileItem;
