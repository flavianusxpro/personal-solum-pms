import cn from '../utils/class-names';
import { formatDate } from '../utils/format-date';

interface DateCellProps {
  date: Date;
  className?: string;
  dateFormat?: string;
  dateClassName?: string;
  timeFormat?: string;
  timeClassName?: string;
  clock?: boolean;
}

export default function DateCellNew({
  clock = false,
  date,
  className,
  timeClassName,
  dateClassName,
  dateFormat = 'D MMMM YYYY',
  timeFormat = 'h:mm A',
}: DateCellProps) {
  return (
    <div className={cn('grid gap-1', className)}>
      <time
        dateTime={formatDate(date, 'YYYY-MM-DD')}
        className={cn('font-medium text-gray-700 align-middle', dateClassName)}
      >
        {formatDate(date, dateFormat)}
      </time>
      {clock ? (
        <time
          dateTime={formatDate(date, 'HH:mm:ss')}
          className={cn('text-[13px] text-gray-500 align-middle', timeClassName)}
        >
          {formatDate(date, timeFormat)}
        </time>
      ) : null}
    </div>
  );
}
