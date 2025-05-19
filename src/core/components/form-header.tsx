import { ActionIcon, Flex, Title } from 'rizzui';
import { PiX } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';

interface FormHeaderProps {
  title: string;
}

export default function FormHeader({ title }: FormHeaderProps) {
  const { closeModal } = useModal();
  return (
    <Flex
      className="sticky top-0 z-10 bg-white px-6 py-4"
      justify="between"
      align="center"
      gap="4"
    >
      <Title className="text-lg">{title}</Title>
      <ActionIcon variant="text" onClick={closeModal} className="">
        <PiX className="h-6 w-6" />
      </ActionIcon>
    </Flex>
  );
}
