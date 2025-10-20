import { COUNTRY_CODES } from './appointment.constants';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('id');

const useAppointment = () => {
  const getCountryFromPhone = (phone: string): string => {
    if (!phone) return '-';

    const cleanPhone = phone.replace(/\s+/g, '');

    const prefixes = Object.keys(COUNTRY_CODES);

    const match = prefixes
      .filter((code) => cleanPhone.startsWith('+' + code))
      .sort((a, b) => b.length - a.length)[0];

    return match ? COUNTRY_CODES[match] : 'Unknown Country';
  };

  const convertTime = (
    date: string,
    time: string,
    fromTz: string,
    toTz: string
  ): { date: string; time: string } => {
    const dateOnly = date ? dayjs(date).format('YYYY-MM-DD') : '';
    if (dateOnly) {
      const sourceTime = dayjs.tz(
        `${dateOnly} ${time}`,
        'YYYY-MM-DD HH:mm',
        fromTz
      );
      const targetTime = sourceTime.tz(toTz);

      return {
        date: targetTime.format('DD MMMM YYYY'),
        time: targetTime.format('hh:mm A'),
      };
    }
    return { date: '', time: '' };
  };

  const getTimezoneName = (tz: string, date: string, time: string) => {
    const dateObj = date
      ? dayjs.tz(`${date} ${time}`, 'YYYY-MM-DD HH:mm', tz).toDate()
      : '';

    if (dateObj) {
      return new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'shortGeneric',
      })
        .formatToParts(dateObj)
        .find((part) => part.type === 'timeZoneName')?.value;
    }
    return '';
  };

  return {
    convertTime,
    getCountryFromPhone,
    getTimezoneName,
  };
};

export default useAppointment;
