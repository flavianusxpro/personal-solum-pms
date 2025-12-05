import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekYear from "dayjs/plugin/weekYear";

// Extend plugins ONCE here
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);
dayjs.extend(weekYear)

dayjs.locale('en', {
  ...dayjs.Ls.en,
  weekStart: 1 
});

export default dayjs;