import cn from '@/core/utils/class-names';

interface IProps {
  className?: string;
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
