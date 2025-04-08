import { Text, Avatar, AvatarProps } from 'rizzui';
import cn from '../utils/class-names';
import { PiCopy } from 'react-icons/pi';
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
}

export default function AvatarCard({
  src,
  name,
  number,
  className,
  description,
  avatarProps,
  nameClassName,
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
