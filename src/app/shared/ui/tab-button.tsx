import cn from '@core/utils/class-names';

interface TabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  item: {
    value: string;
    label: string;
  };
  isActive: boolean;
  onClick: () => void;
}

export function TabButton({
  item,
  isActive,
  onClick,
  ...props
}: TabButtonProps) {
  function handleClick() {
    return onClick();
  }

  return (
    <button
      className={cn(
        'relative flex items-center gap-2 py-2 text-sm outline-none',
        isActive
          ? 'font-medium text-gray-900'
          : 'text-gray-500 hover:text-gray-800'
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="whitespace-nowrap">{item.label}</span>
      <span
        className={cn(
          'absolute -bottom-px left-0 h-1 w-full',
          isActive ? 'bg-primary' : 'bg-transparent'
        )}
      />
    </button>
  );
}
