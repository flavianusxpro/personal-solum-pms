import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Extend plugins ONCE here
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export default dayjs;
