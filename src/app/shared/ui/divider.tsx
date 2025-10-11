import cn from '@/core/utils/class-names';
import { Text, Title } from 'rizzui';

interface IProps {
  className?: string;
  text?: string;
  borderColor?: string;
  textColor?: string;
}
export default function Divider({ className }: IProps) {
  return (
    <div className={cn('flex items-center justify-center py-10', className)}>
      <div className="h-px w-full border-t border-dashed"></div>
    </div>
  );
}

export function DividerSidebar({ className }: IProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className="h-px w-full border-t"></div>
    </div>
  );
}

export function DividerWithText({
  className = 'my-6',
  text,
  borderColor = 'border-gray-200',
  textColor = 'text-gray-400',
}: IProps) {
  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <div className={`flex-grow border-t ${borderColor} `}></div>
      <Title
        as="h6"
        className={`mx-4 text-xs font-normal tracking-widest ${textColor}`}
      >
        {text}
      </Title>
      <div className={`flex-grow border-t ${borderColor} `}></div>
    </div>
  );
}
