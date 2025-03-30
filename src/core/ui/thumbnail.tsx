import { Text, Avatar, AvatarProps } from 'rizzui';
import cn from '../utils/class-names';

interface Props {
  src: string;
  name: string;
  className?: string;
  nameClassName?: string;
}

export default function ThumbnailCard({ src, name, className }: Props) {
  return (
    <figure className={cn('flex items-center gap-3', className)}>
      <Avatar name={name} src={src} />
    </figure>
  );
}
