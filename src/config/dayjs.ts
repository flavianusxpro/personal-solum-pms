import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// Extend plugins ONCE here
dayjs.extend(utc);

export default dayjs;
