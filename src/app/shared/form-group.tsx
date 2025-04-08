import cn from '@core/utils/class-names';

interface FormGroupProps {
  title: React.ReactNode;
  className?: string;
  description?: string;
  children?: React.ReactNode;
  isLabel?: boolean;
}

export default function FormGroup({
  title,
  className,
  description,
  children,
  isLabel = false,
}: FormGroupProps) {
  return (
    <div
      className={cn(
        'grid @3xl:grid-cols-12',
        className,
        isLabel ? 'gap-1' : 'gap-5'
      )}
    >
      <div className="col-span-full @4xl:col-span-4">
        {isLabel ? (
          <span className="rizzui-input-label mb-1.5 block text-sm font-medium">
            {title}
          </span>
        ) : (
          <h4 className="text-base font-medium">{title}</h4>
        )}
        {description && <p className="mt-2">{description}</p>}
      </div>
      {children && (
        <div className="col-span-full grid gap-4 @2xl:grid-cols-1 @4xl:col-span-8 @4xl:gap-5 xl:gap-7">
          {children}
        </div>
      )}
    </div>
  );
}
