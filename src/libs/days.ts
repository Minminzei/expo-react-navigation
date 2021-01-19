import 'dayjs/locale/ja';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale('ja');
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Tokyo');

export default dayjs;
