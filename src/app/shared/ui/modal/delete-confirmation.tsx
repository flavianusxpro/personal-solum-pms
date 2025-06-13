import { Button, Text, Title } from 'rizzui';
import { useModal } from '../../modal-views/use-modal';

interface DeleteConfirmationModalProps {
  onDelete: () => void;
}

export default function DeleteConfirmationModal(
  props: DeleteConfirmationModalProps
) {
  const { onDelete } = props;
  const { closeModal } = useModal();
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Title className="text-lg font-semibold">Delete Confirmation</Title>
      <Text className="mt-2 text-sm text-gray-600">
        Are you sure you want to delete this item?
      </Text>
      <div className="mt-4 flex space-x-2">
        <Button
          variant="outline"
          color="secondary"
          onClick={closeModal}
          className="px-4 py-2 text-sm font-semibold"
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          color="danger"
          onClick={() => {
            onDelete();
            closeModal();
          }}
          className="px-4 py-2 text-sm font-semibold"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
