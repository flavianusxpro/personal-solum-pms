import { Text, Avatar, AvatarProps, Tooltip, ActionIcon } from 'rizzui';
import cn from '../utils/class-names';
import { PiCopy, PiWarning } from 'react-icons/pi';
import { useCopyToClipboard } from 'react-use';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface AvatarCardProps {
  src: string;
  name: string;
  number?: string | number;
  className?: string;
  nameClassName?: string;
  avatarProps?: AvatarProps;
  description?: string | number;
  warning?: string | null;
}

export default function AvatarCard({
  src,
  name,
  number,
  className,
  description,
  avatarProps,
  nameClassName,
  warning,
}: AvatarCardProps) {
  const [state, copyToClipboard] = useCopyToClipboard();

  const handleCopy = (text: string | number) => {
    copyToClipboard(String(text));
  };

  useEffect(() => {
    if (state.error) {
      console.error('Failed to copy: ', state.error);
    } else if (state.value) {
      toast.success('Copied to clipboard');
    }
  }, [state]);

  return (
    <figure className={cn('flex items-center gap-3', className)}>
      <Avatar name={name} src={src} {...avatarProps} />
      <figcaption className="grid gap-0.5">
        <div className="flex items-center gap-2">
          <Text
            className={cn(
              'font-lexend text-sm font-medium text-gray-900 dark:text-gray-700',
              nameClassName
            )}
          >
            {name}
          </Text>
          <PiCopy
            onClick={() => handleCopy(name)}
            className="cursor-pointer active:scale-[0.99]"
          />
          {warning && (
            <Tooltip content={warning} placement="top" color="invert" size="sm">
              <ActionIcon
                variant="text"
                size="sm"
                className={cn(
                  (className = 'hover:!border-gray-900 hover:text-gray-700'),
                  className
                )}
              >
                <PiWarning className="h-4 w-5 text-red-600" />
              </ActionIcon>
            </Tooltip>
          )}
        </div>
        {description && (
          <div className="flex items-center gap-2">
            <Text className="text-[13px] text-gray-500">{description}</Text>
            <PiCopy
              onClick={() => handleCopy(description)}
              className="cursor-pointer active:scale-[0.99]"
            />
          </div>
        )}
        {number && (
          <div className="flex items-center gap-2">
            <Text className="text-[13px] text-gray-500">{number}</Text>
            <PiCopy
              onClick={() => handleCopy(number)}
              className="cursor-pointer active:scale-[0.99]"
            />
          </div>
        )}
      </figcaption>
    </figure>
  );
}
