import cn from '@core/utils/class-names';

interface FormGroupProps {
  className?: string;
  children?: React.ReactNode;
}

export default function FormGroupProduct({
  className,
  children,
}: FormGroupProps) {
  return (
    <div className={cn('grid gap-5 grid-cols-12', className)}>
      {children && (
        <div className="col-span-full grid gap-4 @4xl:gap-5 xl:gap-7">
          {children}
        </div>
      )}
    </div>
  );
}
