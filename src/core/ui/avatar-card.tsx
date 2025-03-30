import { Text, Avatar, AvatarProps } from 'rizzui';
import cn from '../utils/class-names';
import { PiCopy } from 'react-icons/pi';

interface AvatarCardProps {
  src: string;
  name: string;
  number?: string | number;
  className?: string;
  nameClassName?: string;
  avatarProps?: AvatarProps;
  description?: React.ReactNode;
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
          <PiCopy className="cursor-pointer active:scale-[0.99]" />
        </div>
        <div className="flex items-center gap-2">
          {description && (
            <Text className="text-[13px] text-gray-500">{description}</Text>
          )}
          <PiCopy className="cursor-pointer active:scale-[0.99]" />
        </div>
        {number && (
          <div className="flex items-center gap-2">
            <Text className="text-[13px] text-gray-500">{number}</Text>
            <PiCopy className="cursor-pointer active:scale-[0.99]" />
          </div>
        )}
      </figcaption>
    </figure>
  );
}
