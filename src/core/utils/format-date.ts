import dayjs from '@/config/dayjs';

export function formatDate(
  date?: Date,
  format: string = 'DD MMM, YYYY'
): string {
  if (!date) return '';
  return dayjs(date).utc().format(format);
}

export function formatTime(date?: Date, format: string = 'hh:mm'): string {
  if (!date) return '';
  return dayjs(date).format(format);
}
