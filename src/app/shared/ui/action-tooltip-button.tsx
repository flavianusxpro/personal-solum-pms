import cn from '@/core/utils/class-names';
import { useColorPresetName } from '@/layouts/settings/use-theme-color';
import { ActionIcon, Tooltip } from 'rizzui';

export default function ActionButton({
  className,
  children,
  onClick,
  variant,
  buttonSize = 'sm',
  tooltipContent,
}: {
  className?: string;
  children?: React.ReactNode;
  tooltipContent: string;
  onClick?: () => void;
  variant?: 'text' | 'solid' | 'flat' | 'outline';
  buttonSize?: 'sm' | 'md' | 'lg' | 'xl';
  tooltipSize?: 'sm' | 'md' | 'lg' | 'xl';
  tootlipColor?:
    | 'invert'
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'info'
    | 'success'
    | 'warning';
}) {
  const { colorPresetName } = useColorPresetName();

  return (
    <Tooltip size="sm" content={tooltipContent} placement="top" color="invert">
      <ActionIcon
        variant={variant}
        onClick={onClick}
        size={buttonSize}
        className={cn(
          (className = 'hover:!border-gray-900 hover:text-gray-700'),
          colorPresetName === 'dark' && 'bg-slate-800',
          className
        )}
      >
        <span>{children}</span>
      </ActionIcon>
    </Tooltip>
  );
}
